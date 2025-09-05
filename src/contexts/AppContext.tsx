// ===================================
// TODO CLEAN - APP CONTEXT
// Global application state and configuration
// ===================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppContextType } from '@/types';
import { SITE_CONFIG } from '@/utils/constants';

// ==========================================
// CONTEXT TYPE DEFINITIONS
// ==========================================

interface AppState {
  theme: 'light' | 'dark';
  isOnline: boolean;
  user: any | null;
  config: typeof SITE_CONFIG;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

type AppAction = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_USER'; payload: any | null }
  | { type: 'ADD_NOTIFICATION'; payload: { type: string; message: string } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// ==========================================
// INITIAL STATE
// ==========================================

const initialState: AppState = {
  theme: 'light', // Will be overridden by localStorage/system preference
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  user: null,
  config: SITE_CONFIG,
  notifications: [],
};

// ==========================================
// REDUCER
// ==========================================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
      
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
      
    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        isOnline: action.payload,
      };
      
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
      
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: action.payload.type as any,
            message: action.payload.message,
            timestamp: new Date(),
          },
        ],
      };
      
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
      
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };
      
    default:
      return state;
  }
}

// ==========================================
// CONTEXT CREATION
// ==========================================

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    addNotification: (type: string, message: string) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
  };
} | null>(null);

// ==========================================
// PROVIDER COMPONENT
// ==========================================

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('todo-clean-theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch({ type: 'SET_THEME', payload: prefersDark ? 'dark' : 'light' });
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('todo-clean-theme', state.theme);
    
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('todo-clean-theme')) {
        dispatch({ type: 'SET_THEME', payload: e.matches ? 'dark' : 'light' });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // ==========================================
  // ONLINE STATUS MANAGEMENT
  // ==========================================

  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ==========================================
  // NOTIFICATION MANAGEMENT
  // ==========================================

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    if (state.notifications.length > 0) {
      const timer = setTimeout(() => {
        const oldestNotification = state.notifications[0];
        if (oldestNotification) {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: oldestNotification.id });
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  // ==========================================
  // ACTION CREATORS
  // ==========================================

  const actions = {
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    
    setTheme: (theme: 'light' | 'dark') => 
      dispatch({ type: 'SET_THEME', payload: theme }),
    
    addNotification: (type: string, message: string) => 
      dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } }),
    
    removeNotification: (id: string) => 
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    
    clearNotifications: () => 
      dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
  };

  // ==========================================
  // ERROR BOUNDARY INTEGRATION
  // ==========================================

  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      actions.addNotification(
        'error',
        'Ha ocurrido un error inesperado. Por favor recarga la página.'
      );
      
      // Track error in analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      actions.addNotification(
        'error',
        'Error de conexión. Por favor verifica tu internet.'
      );
      
      // Track error in analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: 'Unhandled promise rejection',
          fatal: false,
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // ==========================================
  // DEVELOPMENT HELPERS
  // ==========================================

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Add global debug helpers
      (window as any).__TODO_CLEAN_APP_STATE__ = state;
      (window as any).__TODO_CLEAN_ACTIONS__ = actions;
      
      console.log('🎛️ App Context initialized', {
        theme: state.theme,
        online: state.isOnline,
        notifications: state.notifications.length,
      });
    }
  }, [state, actions]);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const contextValue = {
    state,
    dispatch,
    actions,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOKS
// ==========================================

export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}

export function useTheme() {
  const { state, actions } = useAppContext();
  
  return {
    theme: state.theme,
    toggleTheme: actions.toggleTheme,
    setTheme: actions.setTheme,
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light',
  };
}

export function useOnlineStatus() {
  const { state } = useAppContext();
  return state.isOnline;
}

export function useNotifications() {
  const { state, actions } = useAppContext();
  
  return {
    notifications: state.notifications,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification,
    clearNotifications: actions.clearNotifications,
  };
}

export function useConfig() {
  const { state } = useAppContext();
  return state.config;
}

// ==========================================
// TYPED CONTEXT EXPORT
// ==========================================

export type { AppState, AppAction };
export default AppContext;