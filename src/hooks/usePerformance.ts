// ===================================
// TODO CLEAN - PERFORMANCE HOOKS
// Hooks para optimización de rendimiento
// ===================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/utils/analytics';

// ==========================================
// LAZY LOADING HOOK
// ==========================================

export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            trackEvent('image_lazy_loaded', { src });
          };
          img.onerror = () => {
            setIsError(true);
            trackEvent('image_load_error', { src });
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { imageSrc, isLoaded, isError, imgRef };
}

// ==========================================
// INTERSECTION OBSERVER HOOK
// ==========================================

export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry),
      options
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, callback, options]);

  return setElement;
}

// ==========================================
// SCROLL REVEAL HOOK
// ==========================================

export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  
  const ref = useIntersectionObserver(
    (entry) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        trackEvent('scroll_reveal', { 
          element: entry.target.tagName.toLowerCase() 
        });
      }
    },
    { threshold }
  );

  return { ref, isVisible };
}

// ==========================================
// DEBOUNCE HOOK
// ==========================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ==========================================
// THROTTLE HOOK
// ==========================================

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const lastRan = useRef<number>(0);
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    const now = Date.now();
    
    if (now - lastRan.current >= delay) {
      func(...args);
      lastRan.current = now;
    } else {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        func(...args);
        lastRan.current = Date.now();
      }, delay - (now - lastRan.current));
    }
  }, [func, delay]) as T;
}

// ==========================================
// PERFORMANCE METRICS HOOK
// ==========================================

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
    fcp?: number;
  }>({});

  useEffect(() => {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      trackEvent('performance_lcp', { value: lastEntry.startTime });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        trackEvent('performance_fid', { value: entry.processingStart - entry.startTime });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          setMetrics(prev => ({ 
            ...prev, 
            cls: (prev.cls || 0) + entry.value 
          }));
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte & First Contentful Paint
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
        trackEvent('performance_ttfb', { value: ttfb });
      }
      
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        trackEvent('performance_fcp', { value: fcpEntry.startTime });
      }
    }
  }, []);

  return metrics;
}

// ==========================================
// NETWORK STATUS HOOK
// ==========================================

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get connection info if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      setConnectionType(connection.effectiveType || connection.type || 'unknown');
      
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || connection.type || 'unknown');
        trackEvent('connection_change', { type: connection.effectiveType || connection.type });
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
}

// ==========================================
// MEMORY USAGE HOOK
// ==========================================

export function useMemoryStatus() {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
    percent: number;
  } | null>(null);

  useEffect(() => {
    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const used = memory.usedJSHeapSize;
        const total = memory.totalJSHeapSize;
        const percent = (used / total) * 100;
        
        setMemoryInfo({ used, total, percent });
        
        if (percent > 80) {
          trackEvent('memory_warning', { percent, used, total });
        }
      }
    };

    // Check memory every 10 seconds
    const interval = setInterval(checkMemory, 10000);
    checkMemory(); // Initial check

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// ==========================================
// PREFETCH HOOK
// ==========================================

export function usePrefetch() {
  const prefetchedUrls = useRef<Set<string>>(new Set());

  const prefetch = useCallback((url: string, priority: 'low' | 'high' = 'low') => {
    if (prefetchedUrls.current.has(url)) return;

    const link = document.createElement('link');
    link.rel = priority === 'high' ? 'preload' : 'prefetch';
    link.href = url;
    
    if (url.endsWith('.js')) {
      link.as = 'script';
    } else if (url.endsWith('.css')) {
      link.as = 'style';
    } else if (url.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      link.as = 'image';
    }

    document.head.appendChild(link);
    prefetchedUrls.current.add(url);
    
    trackEvent('resource_prefetch', { url, priority });
  }, []);

  const prefetchPage = useCallback((path: string) => {
    // Prefetch the JavaScript chunks for a specific page
    const chunks = [
      `/assets/pages/${path.replace('/', '')}.js`,
      `/assets/pages/${path.replace('/', '')}.css`
    ];
    
    chunks.forEach(chunk => prefetch(chunk, 'low'));
  }, [prefetch]);

  return { prefetch, prefetchPage };
}

// ==========================================
// BATTERY STATUS HOOK
// ==========================================

export function useBatteryStatus() {
  const [batteryInfo, setBatteryInfo] = useState<{
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
  } | null>(null);

  useEffect(() => {
    const getBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          
          const updateBatteryInfo = () => {
            setBatteryInfo({
              level: battery.level,
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            });
          };

          updateBatteryInfo();
          
          battery.addEventListener('chargingchange', updateBatteryInfo);
          battery.addEventListener('levelchange', updateBatteryInfo);
          
          return () => {
            battery.removeEventListener('chargingchange', updateBatteryInfo);
            battery.removeEventListener('levelchange', updateBatteryInfo);
          };
        } catch (error) {
          console.warn('Battery API not available');
        }
      }
    };

    getBattery();
  }, []);

  return batteryInfo;
}

// ==========================================
// RESOURCE TIMING HOOK
// ==========================================

export function useResourceTiming(resourceName?: string) {
  const [timings, setTimings] = useState<{
    dns: number;
    tcp: number;
    request: number;
    response: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (!resourceName || entry.name.includes(resourceName)) {
          const navigation = entry as PerformanceNavigationTiming;
          
          setTimings({
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            total: navigation.responseEnd - navigation.navigationStart
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'resource'] });
    
    return () => observer.disconnect();
  }, [resourceName]);

  return timings;
}

export default {
  useLazyImage,
  useIntersectionObserver,
  useScrollReveal,
  useDebounce,
  useThrottle,
  usePerformanceMetrics,
  useNetworkStatus,
  useMemoryStatus,
  usePrefetch,
  useBatteryStatus,
  useResourceTiming
};