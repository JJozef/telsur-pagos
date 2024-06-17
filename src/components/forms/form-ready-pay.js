/* eslint-disable camelcase */
/* eslint-disable react/jsx-handler-names */
'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Ring } from '@uiball/loaders'
import { z } from 'zod'
import { useStore } from '@/store/main'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Image from 'next/image'

const formSchema = z.object({
  email: z
    .string()
    .email('Ingrese un email válido.')
    .min(1, {
      message: 'Por favor, ingrese un email.'
    })
    .max(255, {
      message: 'El email debe tener a lo más 255 caracteres.'
    }),
  pay_method: z.enum(['webpay', 'servipag'], {
    required_error: 'Por favor, seleccione un método de pago.'
  })
})

const FormReadyToPay = ({ onSuccess }) => {
  const [isLoading, startStransition] = useTransition()
  const { setCurrentStep, setPaymentStatus } = useStore()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pay_method: 'webpay'
    }
  })

  async function onSubmit(values) {
    const { email, pay_method } = values

    // this is for demonstration purposes only.
    startStransition(async () => {
      const res = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            data: {
              status: 'success',
              email,
              pay_method
            }
          })
        }, 2500)
      )

      const { status } = res.data

      if (status === 'error') {
        return form.setError('email', {
          type: 'manual',
          message: 'El email no existe.'
        })
      } else if (status === 'success') {
        setPaymentStatus(res.data)
        return setCurrentStep(4)
      } else {
        return form.setError('email', {
          type: 'manual',
          message: 'Ha ocurrido un error inesperado.'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <FormField
          control={form.control}
          name='pay_method'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='grid md:grid-cols-2 gap-4'
                >
                  <FormItem className='w-full'>
                    <FormControl>
                      <RadioGroupItem value='webpay' className='peer sr-only' />
                    </FormControl>
                    <FormLabel className='h-[11.5rem] flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                      <Image
                        className='size-full'
                        src='/images/logo-webpay-plus.png'
                        alt='Webpay Plus'
                        width={50}
                        height={50}
                        unoptimized
                      />
                    </FormLabel>
                  </FormItem>
                  <FormItem className='w-full'>
                    <FormControl>
                      <RadioGroupItem
                        value='servipag'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel className='h-[11.5rem] flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                      <Image
                        className='size-full'
                        src='/images/servipag.png'
                        alt='Servipag'
                        width={50}
                        height={50}
                        unoptimized
                      />
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-16 flex items-baseline justify-between gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    className='max-w-xs text-base sm:text-xs'
                    placeholder='Ingrese su correo electrónico'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ingrese su correo electrónico para recibir el comprobante de
                  pago.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={!form.formState.isValid || isLoading}>
            {!isLoading && 'Pagar'}
            {isLoading && <Ring size={20} color='currentColor' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { FormReadyToPay }
