import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Controller, useFormContext } from 'react-hook-form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export interface InputLabelProps extends InputProps {
  label: string
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
          error
            ? 'border-red-400 focus-visible:ring-red-400 placeholder:text-red-400a'
            : ''
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ name, label, errorMessage, ...rest }, ref) => {
    const { control } = useFormContext()

    return (
      <div className="grid gap-1" ref={ref}>
        <Label
          htmlFor={name}
          className={rest.error ? 'text-red-400 placeholder:text-red-300' : ''}
        >
          {label}
        </Label>
        <Controller
          control={control}
          name={name ? name : ''}
          render={({ field }) => <Input {...field} {...rest} />}
        />
        {errorMessage && (
          <p className="text-red-400 text-xs text-ellipsis italic">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

InputLabel.displayName = 'InputLabel'
Input.displayName = 'Input'

export { Input }
