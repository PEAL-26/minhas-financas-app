import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { Label } from './label';

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'checked' | 'onCheckedChange'
> & {
  checked?: boolean;
  onCheckedChange?(checked: boolean): void;
};

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'web:peer native:h-[20] native:w-[20] native:rounded h-4 w-4 shrink-0 rounded-sm border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          className,
        )}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('h-full w-full items-center justify-center')}>
          <Check size={12} strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5} color="#000" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

function CheckboxWithLabel({
  checked = false,
  value,
  label,
  onChecked,
  labelClassName,
}: Readonly<{
  label: string;
  value?: string;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
  labelClassName?: string;
}>) {
  const [currentChecked, setChecked] = useState(checked);

  const handleChecked = (checked: boolean) => {
    setChecked(checked);
    onChecked?.(checked);
  };

  return (
    <View className={'flex-row items-center gap-2'}>
      <Checkbox
        aria-labelledby={'label-for-' + value || label}
        checked={currentChecked}
        onCheckedChange={handleChecked}
      />
      <Label
        className={labelClassName}
        nativeID={'label-for-' + value || label}
        onPress={() => handleChecked(!currentChecked)}
      >
        {label}
      </Label>
    </View>
  );
}

export { Checkbox, CheckboxWithLabel };
