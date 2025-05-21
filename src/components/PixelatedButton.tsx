
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PixelatedButtonProps extends ShadcnButtonProps {}

export function PixelatedButton({ className, children, variant, size, ...props }: PixelatedButtonProps) {
  const basePixelStyle = 
    'border-2 md:border-4 rounded-sm transition-all duration-100 ease-in-out transform active:translate-y-px active:translate-x-px';

  // Default styling for pixelated buttons: Accent background, Accent-foreground text, Primary shadow
  const defaultVariantStyle = 
    'bg-accent text-accent-foreground border-accent shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[3px_3px_0px_hsl(var(--primary))] hover:bg-accent/90 hover:shadow-[1px_1px_0px_hsl(var(--primary))] md:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:shadow-[0px_0px_0px_hsl(var(--primary))]';
  
  // Style for outline variant: Transparent background, Accent border/text, Primary shadow
  const outlineVariantStyle =
    'bg-transparent border-accent text-accent shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[3px_3px_0px_hsl(var(--primary))] hover:bg-accent hover:text-accent-foreground hover:shadow-[1px_1px_0px_hsl(var(--primary))] md:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:shadow-[0px_0px_0px_hsl(var(--primary))]';

  let variantStyle = ''; // Initialize with empty
  if (variant === 'outline') {
    variantStyle = outlineVariantStyle;
  } else if (variant === 'default' || !variant) { // Apply default if variant is 'default' or undefined
    variantStyle = defaultVariantStyle;
  }
  // For other shadcn variants (link, ghost, secondary, destructive), 
  // we let ShadCN's styles take precedence, only applying basePixelStyle.
  // Specific overrides for ghost/link are handled in the cn() call below.

  return (
    <ShadcnButton
      variant={variant} // Pass original variant to ShadcnButton
      size={size}
      className={cn(
        basePixelStyle, // Base pixel styles (border, rounding)
        variantStyle,   // Our custom default or outline styles
        (variant === 'ghost' || variant === 'link') && 'border-transparent shadow-none hover:shadow-none active:shadow-none', // Special handling for ghost/link
        'uppercase tracking-wider text-sm md:text-base py-2 px-3 md:py-2 md:px-4', // General text styling
        size === 'sm' && 'text-xs md:text-sm py-1 px-2 md:py-1 md:px-3',
        size === 'lg' && 'text-base md:text-lg py-3 px-5 md:py-3 md:px-6',
        className
      )}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
}
