import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { TextInput } from 'react-native';

type TextareaProps = ComponentPropsWithoutRef<typeof TextInput>;

const Textarea = forwardRef<ElementRef<typeof TextInput>, TextareaProps>(
  ({ className, multiline = true, numberOfLines = 4, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'native:text-xs native:leading-[1.25] min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground web:flex web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-0 web:focus-visible:ring-primary web:focus-visible:ring-offset-0 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea, TextareaProps };
