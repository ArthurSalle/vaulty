import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replace(/\D/g, '')
  phoneNumber = phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ')
  return phoneNumber
}
