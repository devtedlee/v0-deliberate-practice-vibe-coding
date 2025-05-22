import { cn } from '@/lib/utils'

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('should handle conditional class names', () => {
    expect(cn('bg-red-500', { 'text-white': true, 'font-bold': false })).toBe('bg-red-500 text-white')
  })

  it('should override conflicting class names with tailwind-merge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2') // tailwind-merge should handle this
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
  })

  it('should handle mixed array and object inputs', () => {
    expect(cn('p-4', ['m-2', { 'text-lg': true }], 'font-semibold')).toBe('p-4 m-2 text-lg font-semibold')
  })
})
