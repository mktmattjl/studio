
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PixelatedButtonProps extends ShadcnButtonProps {}

export function PixelatedButton({ className, children, variant, size, ...props }: PixelatedButtonProps) {
  const basePixelStyle = 
    'border-2 md:border-4 rounded-sm transition-all duration-100 ease-in-out transform active:translate-y-px active:translate-x-px';

  // Default styling for pixelated buttons
  const defaultVariantStyle = 
    'bg-primary text-primary-foreground border-primary shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[3px_3px_0px_hsl(var(--primary))] hover:shadow-[1px_1px_0px_hsl(var(--primary))] md:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:shadow-[0px_0px_0px_hsl(var(--primary))]';
  
  // Style for outline variant
  const outlineVariantStyle =
    'bg-transparent border-accent text-accent shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[3px_3px_0px_hsl(var(--primary))] hover:bg-accent hover:text-accent-foreground hover:shadow-[1px_1px_0px_hsl(var(--primary))] md:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:shadow-[0px_0px_0px_hsl(var(--primary))]';

  let variantStyle = defaultVariantStyle;
  if (variant === 'outline') {
    variantStyle = outlineVariantStyle;
  } else if (variant === 'link' || variant === 'ghost' || variant === 'secondary' || variant === 'destructive') {
    // For other shadcn variants, we might not want the full pixel border/shadow or specific pixelated versions.
    // For now, 'ghost' and 'link' will not have the pronounced pixel shadow.
    // 'secondary' and 'destructive' might need their own specific pixel styles if used frequently.
    variantStyle = ''; // Reset to only apply basePixelStyle + ShadCN's own variant styles
    if (variant === 'ghost') {
      // Ghosts shouldn't have a border typically, or a very subtle one.
      // Keeping the basePixelStyle for consistency if a border is desired, but usually ghost is borderless.
      // If you want ghost to have a border, it can be added here, or basePixelStyle can be conditional.
    }
  }


  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={cn(
        basePixelStyle,
        variantStyle,
        (variant === 'ghost' || variant === 'link') && 'border-transparent shadow-none hover:shadow-none active:shadow-none', // Remove border and shadow for ghost/link
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

