import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SettingCardProps {
  title: string;
  description?: string;
  currentValue?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'danger' | 'warning';
  disabled?: boolean;
  showArrow?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const SettingCard: React.FC<SettingCardProps> = ({
                                                          title,
                                                          description,
                                                          currentValue,
                                                          buttonText,
                                                          onButtonClick,
                                                          onClick,
                                                          className,
                                                          variant = 'default',
                                                          disabled = false,
                                                          showArrow = false,
                                                          icon,
                                                          children,
                                                        }) => {
  const isClickable = onClick && !disabled;
  
  const variantStyles = {
    default: 'border-border bg-card',
    danger: 'border-red-200 bg-red-50/50',
    warning: 'border-yellow-200 bg-yellow-50/50'
  };
  
  const iconStyles = {
    default: 'text-muted-foreground',
    danger: 'text-red-500',
    warning: 'text-yellow-600'
  };
  
  const buttonVariants = {
    default: 'outline',
    danger: 'destructive',
    warning: 'outline'
  } as const;
  
  return (
    <Card
      className={cn(
        'transition-all duration-200',
        variantStyles[variant],
        isClickable && 'cursor-pointer hover:shadow-sm hover:border-muted-foreground/25',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={isClickable ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="w-full flex gap-2">
          {icon && (
            <div className={cn('mt-0.5 flex-shrink-0', iconStyles[variant])}>
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-medium leading-none mb-1">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-4">
          {/* 현재 값 또는 커스텀 콘텐츠 */}
          <div className="min-w-0 flex-1">
            {children || (
              currentValue && (
                <span className="text-xl font-bold text-muted-foreground truncate">
                  {currentValue}
                </span>
              )
            )}
          </div>
          
          {/* 액션 영역 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {buttonText && onButtonClick && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick();
                }}
                disabled={disabled}
                variant={buttonVariants[variant]}
                size="sm"
                className={cn(
                  'h-8 px-3',
                  variant === 'default' && 'hover:bg-accent hover:text-accent-foreground',
                  variant === 'warning' && 'border-yellow-300 text-yellow-700 hover:bg-yellow-100'
                )}
              >
                {buttonText}
              </Button>
            )}
            
            {showArrow && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};