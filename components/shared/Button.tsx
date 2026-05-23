/**
 * Button Component - Professional SaaS Design
 * Based on Cerebral, Notion, Claude.ai patterns
 *
 * Props are a discriminated union: pass `href` to render as a link,
 * or `disabled` to render as a disabled button. The two are mutually
 * exclusive at the type level, so `<Button href="/x" disabled>` fails
 * to compile. A runtime safety net renders the anchor as inert
 * (`aria-disabled` + `preventDefault`) if `disabled` ever leaks in via
 * type-bypassing code (e.g., spread from `Record<string, unknown>`).
 */

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';

type Variant = 'primary' | 'secondary' | 'text';
type Size = 'small' | 'medium' | 'large';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never;
  };

type AsAnchor = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  > & {
    href: string;
    /** Anchors cannot be disabled. Use a button (omit `href`) for that. */
    disabled?: never;
  };

export type ButtonProps = AsButton | AsAnchor;

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-large
  transition-all duration-150 ease-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`
  .replace(/\s+/g, ' ')
  .trim();

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-accent-500 text-white
    hover:bg-accent-600 active:bg-accent-700
    focus:ring-accent-500
  `
    .replace(/\s+/g, ' ')
    .trim(),

  secondary: `
    bg-white border-2 border-gray-300 text-gray-900
    hover:bg-gray-50 hover:border-gray-400
    active:bg-gray-100
    focus:ring-gray-400
  `
    .replace(/\s+/g, ' ')
    .trim(),

  text: `
    bg-transparent text-accent-600
    hover:text-accent-700 hover:bg-accent-50
    active:bg-accent-100
    focus:ring-accent-500
  `
    .replace(/\s+/g, ' ')
    .trim(),
};

const sizeStyles: Record<Size, string> = {
  small: 'px-3 py-1.5 text-sm min-h-[36px]',
  medium: 'px-4 py-2.5 text-base min-h-[44px]',
  large: 'px-6 py-3 text-base min-h-[48px]',
};

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'medium',
    children,
    className = '',
  } = props;

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  // Discriminate by presence of `href` on the props object.
  if ('href' in props && props.href !== undefined) {
    // Runtime safety net: TypeScript's `disabled?: never` blocks this at
    // compile time, but `as any` / untyped JS could slip a truthy disabled
    // through. Render an inert anchor in that case.
    const disabledLike = (props as { disabled?: unknown }).disabled;
    if (disabledLike) {
      return (
        <a
          href={props.href}
          aria-disabled="true"
          tabIndex={-1}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...anchorProps } = props;
    return (
      <a href={href} className={combinedClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
