import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { View } from 'react-native';
import { Label } from './label';

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root className={cn('gap-2 web:grid', className)} {...props} ref={ref} />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'native:h-5 native:w-5 aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-black web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        props.disabled && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <View className="native:h-[10] native:w-[10] aspect-square h-[9px] w-[9px] rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

function RadioGroupItemWithLabel({
  value,
  label,
  onLabelPress,
}: Readonly<{
  value: string;
  label: string;
  onLabelPress?(): void;
}>) {
  return (
    <View className={'flex-row items-center gap-2'}>
      <RadioGroupItem aria-labelledby={'label-for-' + value} value={value} onPress={onLabelPress} />
      <Label nativeID={'label-for-' + value} onPress={onLabelPress}>
        {label}
      </Label>
    </View>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel };
