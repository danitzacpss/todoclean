import React, { Component, ReactNode } from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { Card } from './Card';
import { generateWhatsAppURL } from '@/utils/whatsapp';
// import { WHATSAPP_MESSAGES } from '@/utils/constants'; // Unused
import { trackEvent } from '@/utils/analytics';

interface ErrorInfo {
  componentStack: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'section' | 'component';
  resetOnPropsChange?: boolean;
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
  level: 'page' | 'section' | 'component';
  errorId: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    trackEvent({
      event: 'error_boundary_catch',
      category: 'error',
      label: this.state.errorId
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught an Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    trackEvent({
      event: 'error_boundary_reset',
      category: 'error',
      label: 'boundary_reset'
    });

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  override render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback: Fallback, level = 'component' } = this.props;

    if (hasError) {
      if (Fallback) {
        return (
          <Fallback
            error={error}
            errorInfo={errorInfo}
            resetErrorBoundary={this.resetErrorBoundary}
            level={level}
            errorId={errorId}
          />
        );
      }

      switch (level) {
        case 'page':
          return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 flex items-center justify-center p-4">
              <Card className="max-w-2xl w-full p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                  ¡Oops! Algo salió mal
                </h1>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Ha ocurrido un error inesperado en la aplicación. Nuestro equipo ha sido notificado.
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-medium text-red-900 mb-2">Detalles técnicos:</h3>
                  <p className="text-sm text-red-700 font-mono">ID: {errorId}</p>
                  {error?.message && (
                    <p className="text-sm text-red-700 mt-1">Error: {error.message}</p>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={this.resetErrorBoundary}>
                      <ArrowPathIcon className="w-5 h-5 mr-2" />
                      Intentar de nuevo
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'}>
                      <HomeIcon className="w-5 h-5 mr-2" />
                      Ir al inicio
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const errorMessage = `Error ID: ${errorId}\nError: ${error?.message || 'Error desconocido'}\n\nReporto este error técnico.`;
                      window.open(generateWhatsAppURL(errorMessage), '_blank');
                    }}
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                    Reportar error
                  </Button>
                </div>
              </Card>
            </div>
          );

        case 'section':
          return (
            <Card className="p-6 bg-red-50 border border-red-200 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Error en esta sección
              </h3>
              
              <p className="text-neutral-600 mb-4 text-sm">
                No pudimos cargar esta sección correctamente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button size="sm" onClick={this.resetErrorBoundary}>
                  <ArrowPathIcon className="w-4 h-4 mr-1" />
                  Reintentar
                </Button>
              </div>
            </Card>
          );

        default:
          return (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-amber-900">
                    Componente no disponible
                  </h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Este elemento no pudo cargarse correctamente.
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={this.resetErrorBoundary}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  <ArrowPathIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
      }
    }

    return children;
  }
}

export const PageErrorBoundary: React.FC<Omit<ErrorBoundaryProps, 'level'>> = (props) => (
  <ErrorBoundary {...props} level="page" />
);

export const SectionErrorBoundary: React.FC<Omit<ErrorBoundaryProps, 'level'>> = (props) => (
  <ErrorBoundary {...props} level="section" />
);

export const ComponentErrorBoundary: React.FC<Omit<ErrorBoundaryProps, 'level'>> = (props) => (
  <ErrorBoundary {...props} level="component" />
);

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

export function useAsyncError() {
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);
  
  return React.useCallback((error: Error) => {
    trackEvent({
      event: 'async_error',
      category: 'error',
      label: 'async_error'
    });
    
    forceUpdate();
    throw error;
  }, [forceUpdate]);
}

export default ErrorBoundary;