'use client'

import { cn } from '@/lib/utils'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const NumberTicker = ({
  value,
  direction = 'up',
  delay = 0,
  damping = 20,
  stiffness = 100,
  className
}) => {
  const ref = useRef(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        if (value === 0) {
          motionValue.set(0)
          return ref.current && (ref.current.textContent = 0)
        }

        motionValue.set(direction === 'down' ? 0 : value)
      }, delay * 1000)
  }, [motionValue, isInView, delay, value, direction])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('es-CL').format(
          latest.toFixed(0)
        )
      }
    })
  }, [springValue])

  return (
    <span
      className={cn(
        'inline-block tabular-nums text-black dark:text-white',
        className
      )}
      ref={ref}
    />
  )
}

export { NumberTicker }
