import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { TextInput } from 'react-native';

type InputProps = ComponentPropsWithoutRef<typeof TextInput>;

const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-10 rounded-md border border-input bg-background px-3 text-xs file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:flex web:w-full web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-0 web:focus-visible:ring-primary web:focus-visible:ring-offset-0',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, InputProps };
