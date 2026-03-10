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
