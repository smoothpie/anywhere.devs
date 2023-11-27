'use client'
import s from './Error.module.scss'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className={s.container}>
      <h2>Something went wrong</h2>
    </div>
  )
}