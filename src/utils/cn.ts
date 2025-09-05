// ===================================
// TODO CLEAN - CLASS NAME UTILITY
// Utility for conditionally joining class names
// ===================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names conditionally and merges Tailwind classes
 * @param inputs - Class names, objects, or arrays to combine
 * @returns Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;