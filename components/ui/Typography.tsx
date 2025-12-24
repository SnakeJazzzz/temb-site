import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-lg' | 'caption' | 'meta' | 'nav' | 'button';
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  italic?: boolean;
}

// Variant configuration mapping
const variantConfig = {
  h1: {
    element: 'h1' as keyof JSX.IntrinsicElements,
    className: 'text-[4rem] leading-[1.1] tracking-[0.08em] font-extralight',
    responsiveClassName: 'max-md:text-5xl max-sm:text-4xl',
  },
  h2: {
    element: 'h2' as keyof JSX.IntrinsicElements,
    className: 'text-[2.5rem] leading-[1.2] tracking-[0.04em] font-light',
    responsiveClassName: 'max-md:text-4xl max-sm:text-3xl',
  },
  h3: {
    element: 'h3' as keyof JSX.IntrinsicElements,
    className: 'text-[1.75rem] leading-[1.3] tracking-[0.02em] font-normal',
    responsiveClassName: 'max-md:text-2xl max-sm:text-xl',
  },
  h4: {
    element: 'h4' as keyof JSX.IntrinsicElements,
    className: 'text-[1.25rem] leading-[1.4] tracking-[0.01em] font-medium',
    responsiveClassName: 'max-md:text-lg',
  },
  body: {
    element: 'p' as keyof JSX.IntrinsicElements,
    className: 'text-base leading-[1.6] tracking-normal font-light',
    responsiveClassName: '',
  },
  'body-lg': {
    element: 'p' as keyof JSX.IntrinsicElements,
    className: 'text-lg leading-[1.6] tracking-normal font-light',
    responsiveClassName: 'max-sm:text-base',
  },
  caption: {
    element: 'span' as keyof JSX.IntrinsicElements,
    className: 'text-xs leading-[1.4] tracking-[0.02em] font-normal',
    responsiveClassName: '',
  },
  meta: {
    element: 'span' as keyof JSX.IntrinsicElements,
    className: 'text-sm leading-[1.4] tracking-[0.04em] font-extralight',
    responsiveClassName: '',
  },
  nav: {
    element: 'span' as keyof JSX.IntrinsicElements,
    className: 'text-sm leading-none tracking-[0.08em] font-medium uppercase',
    responsiveClassName: '',
  },
  button: {
    element: 'span' as keyof JSX.IntrinsicElements,
    className: 'text-sm leading-none tracking-[0.1em] font-medium uppercase',
    responsiveClassName: '',
  },
} as const;

/**
 * Typography component for The Electronic Music Book (TEMB)
 *
 * Implements the Condor font typography system with predefined variants
 * that embody editorial sophistication and minimal luxury aesthetic.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">THE ELECTRONIC MUSIC BOOK</Typography>
 * <Typography variant="body" as="div">Some content</Typography>
 * <Typography variant="h2" italic>Italic Heading</Typography>
 * ```
 */
export default function Typography({
  variant,
  children,
  as,
  className,
  italic = false,
}: TypographyProps) {
  const config = variantConfig[variant];
  const Component = as || config.element;

  return (
    <Component
      className={cn(
        'font-condor',
        config.className,
        config.responsiveClassName,
        italic && 'italic',
        className
      )}
    >
      {children}
    </Component>
  );
}
