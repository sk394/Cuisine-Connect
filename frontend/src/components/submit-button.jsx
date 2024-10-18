'use client'
 
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
 
export function SubmitButton({message, className}) {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" disabled={pending} className={className}>
      {message}
    </Button>
  )
}