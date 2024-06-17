'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateRut } from '@cristiansantana/chile-rut'
import { Ring } from '@uiball/loaders'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { useStore } from '@/store/main'

const formSchema = z.object({
  rut: z
    .string()
    .min(10, {
      message: 'El R.U.T. debe tener al menos 10 caracteres.'
    })
    .max(10, {
      message: 'El R.U.T. debe tener a lo más 10 caracteres.'
    })
})

const FormLandingRut = () => {
  const [isLoading, startTransition] = useTransition()
  const { setCurrentStep, setRutClient } = useStore()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: ''
    }
  })

  // this is for demonstration purposes only.
  async function onSubmit(values) {
    const { rut } = values

    const isValid = validateRut(rut)

    if (!isValid) {
      return form.setError('rut', {
        type: 'manual',
        message: 'El R.U.T. ingresado es inválido.'
      })
    }

    startTransition(async () => {
      const res = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            status: 'success',
            rut
          })
        }, 2500)
      )

      if (res.status !== 'success') {
        return form.setError('rut', {
          type: 'manual',
          message: 'No se pudo encontrar el R.U.T. ingresado.'
        })
      } else {
        setCurrentStep(2)
        setRutClient(res.rut)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-md mx-auto rounded-md flex items-start gap-1 py-3 px-0'
      >
        <FormField
          control={form.control}
          name='rut'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  className='text-base sm:text-xs'
                  placeholder='Ingrese su R.U.T. (Ej: 12345678-9)'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={!form.formState.isValid || isLoading}>
          {!isLoading && 'Consultar'}
          {isLoading && <Ring size={20} color='currentColor' />}
        </Button>
      </form>
    </Form>
  )
}

export { FormLandingRut }
