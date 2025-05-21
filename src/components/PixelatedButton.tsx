import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PixelatedButtonProps extends ShadcnButtonProps {}

export function PixelatedButton({ className, children, variant, size, ...props }: PixelatedButtonProps) {
  const basePixelStyle = 
    'border-2 md:border-4 rounded-none transition-all duration-100 ease-in-out transform active:translate-y-px active:translate-x-px';

  // Default styling for pixelated buttons
  const defaultVariantStyle = 
    'bg-primary text-primary-foreground border-accent shadow-[2px_2px_0px_hsl(var(--accent))] md:shadow-[3px_3px_0px_hsl(var(--accent))] hover:shadow-[1px_1px_0px_hsl(var(--accent))] md:hover:shadow-[2px_2px_0px_hsl(var(--accent))] active:shadow-[0px_0px_0px_hsl(var(--accent))]';
  
  // Style for outline variant
  const outlineVariantStyle =
    'bg-transparent border-accent text-accent shadow-[2px_2px_0px_hsl(var(--accent))] md:shadow-[3px_3px_0px_hsl(var(--accent))] hover:bg-accent hover:text-accent-foreground hover:shadow-[1px_1px_0px_hsl(var(--accent))] md:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:shadow-[0px_0px_0px_hsl(var(--accent))]';

  let variantStyle = defaultVariantStyle;
  if (variant === 'outline') {
    variantStyle = outlineVariantStyle;
  } else if (variant && variant !== 'default') {
    // For other shadcn variants, we might not want the full pixel border/shadow
    // or we might want to define specific pixelated versions for them.
    // For now, they'll get the basePixelStyle and their original variant styles.
    variantStyle = ''; 
  }


  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={cn(
        basePixelStyle,
        variantStyle,
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
