import cn from '@/app/utils/cn'

import type { ILogoProps } from './logo.type'
import { logoVariants } from './logo.variant'

const Logo = ({ variant, text, className }: ILogoProps) => {
  return (
    <p className={cn(logoVariants({ variant }), className)}>
      <span data-slot='logo-icon'>⚛️</span>
      <span data-slot='logo-text'>{text}</span>
    </p>
  )
}

export default Logo
