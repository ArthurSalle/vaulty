import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import parsePhoneNumber from 'libphonenumber-js'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phoneNumber: string) {
  return parsePhoneNumber(phoneNumber!, 'FR')?.formatInternational()
}

export function generateId() {
  return crypto.randomUUID()
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getFirstLetterCapitalized(word: string) {
  return word.charAt(0).toUpperCase()
}

export function getRelationColor(relation: string) {
  switch (relation) {
    case 'Myself':
      return 'border-amber-400'
      break
    case 'Family':
      return 'border-rose-400'
      break
    case 'Friends':
      return 'border-indigo-400'
      break
    case 'Work mates':
      return 'border-teal-400'
      break
    case 'Others':
      return 'border-neutral-500'
      break

    default:
      return ''
  }
}

export function formatDate(date: Date) {
  return format(new Date(date), 'dd/MM/yyyy')
}
