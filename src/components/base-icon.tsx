import { component$, Slot } from '@qwik.dev/core';

import { SVGProps } from '@qwik.dev/core';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number,
  color?: string,
  strokeWidth?: number,
  strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit' | undefined,
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel' | undefined
}

export interface BaseIconProps extends IconProps {
 name: string
}

export const BaseIcon = component$(({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...restProps
}: BaseIconProps) => {
  return <svg
    {...restProps}
    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'
    width={size} height={size}
    stroke={color} stroke-width={strokeWidth}
    stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin}
    class={`lucide lucide-${name} ${restProps.class ?? ''}`}
  >
    <Slot/>
  </svg>;
});
