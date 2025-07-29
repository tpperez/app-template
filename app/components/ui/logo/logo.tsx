import { ILogoProps, TLogoSizes, TLogoVariants } from './logo.type'

const Logo = ({
  variant = 'header',
  size = 'md',
  className = '',
}: ILogoProps) => {
  const sizeClasses: TLogoSizes = {
    sm: {
      icon: 'h-6 w-6',
      text: 'text-base',
      iconText: 'text-xs',
    },
    md: {
      icon: 'h-8 w-8',
      text: 'text-xl',
      iconText: 'text-sm',
    },
    lg: {
      icon: 'h-10 w-10',
      text: 'text-2xl',
      iconText: 'text-base',
    },
  }

  const variantClasses: TLogoVariants = {
    header: {
      iconBg: 'bg-gradient-to-r from-gray-900 to-gray-700',
      iconText: 'text-white',
      text: 'text-gray-900',
    },
    footer: {
      iconBg: 'bg-gradient-to-r from-white to-gray-200',
      iconText: 'text-gray-900',
      text: 'text-white',
    },
  }

  const currentSize = sizeClasses[size]
  const currentVariant = variantClasses[variant]

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`mr-3 flex items-center justify-center rounded-lg ${currentSize.icon} ${currentVariant.iconBg} `}
      >
        <span
          className={`font-bold ${currentSize.iconText} ${currentVariant.iconText} `}
        >
          TS
        </span>
      </div>
      <span className={`font-bold ${currentSize.text} ${currentVariant.text} `}>
        Next.js Stack
      </span>
    </div>
  )
}

export default Logo
