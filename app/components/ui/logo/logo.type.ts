export interface ILogoProps {
  variant?: 'header' | 'footer'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface ILogoSizeClasses {
  icon: string
  text: string
  iconText: string
}

export interface ILogoVariantClasses {
  iconBg: string
  iconText: string
  text: string
}

export type TLogoSizes = {
  [K in NonNullable<ILogoProps['size']>]: ILogoSizeClasses
}

export type TLogoVariants = {
  [K in NonNullable<ILogoProps['variant']>]: ILogoVariantClasses
}
