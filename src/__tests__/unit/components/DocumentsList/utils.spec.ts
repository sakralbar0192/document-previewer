import { describe, it, expect } from 'vitest'

describe('Document utilities', () => {
  describe('calculateFileSize', () => {
    const calculateFileSize = (text: string): number => {
      const estimatedBytes = text.length * 2 + 3 + (text.match(/\n/g) || []).length * 2
      return Math.max(estimatedBytes, 1024)
    }

    it('should return minimum 1KB for short text', () => {
      const text = 'Короткий текст'
      const size = calculateFileSize(text)
      expect(size).toBeGreaterThanOrEqual(1024)
      expect(size).toBe(1024)
    })

    it('should handle text with newlines', () => {
      const text = 'Текст\nс\nпереносами\nстрок'
      const size = calculateFileSize(text)
      expect(size).toBeGreaterThanOrEqual(1024)
    })

    it('should return minimum 1KB for very short text', () => {
      const text = 'a'
      const size = calculateFileSize(text)
      expect(size).toBe(1024)
    })

    it('should handle empty text', () => {
      const text = ''
      const size = calculateFileSize(text)
      expect(size).toBe(1024)
    })
  })

  describe('formatFileSize', () => {
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) {
        return '0 B'
      }

      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 B')
      expect(formatFileSize(512)).toBe('512 B')
      expect(formatFileSize(1023)).toBe('1023 B')
    })

    it('should format kilobytes correctly', () => {
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(1024 * 1024 - 1)).toBe('1024 KB')
    })

    it('should format megabytes correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB')
    })

    it('should format gigabytes correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB')
    })

    it('should handle edge cases', () => {
      expect(formatFileSize(1)).toBe('1 B')
      expect(formatFileSize(1025)).toBe('1 KB')
    })
  })

  describe('Combined size calculation and formatting', () => {
    const calculateFileSize = (text: string): number => {
      const estimatedBytes = text.length * 2 + 3 + (text.match(/\n/g) || []).length * 2
      return Math.max(estimatedBytes, 1024)
    }

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) {
        return '0 B'
      }

      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    it('should work together correctly', () => {
      const testCases = [
        { text: 'Короткий текст', expectedPattern: /^\d+ KB$/ },
        { text: 'Очень длинный текст с большим количеством символов для проверки работы функции', expectedPattern: /^\d+(\.\d+)? KB$/ },
        { text: 'Текст\nс\nмножеством\nпереносов\nстрок', expectedPattern: /^\d+ KB$/ },
      ]

      testCases.forEach(({ text, expectedPattern }) => {
        const size = calculateFileSize(text)
        const formatted = formatFileSize(size)
        expect(formatted).toMatch(expectedPattern)
      })
    })

    it('should handle realistic document sizes', () => {
      const realisticTexts = [
        'Краткое техническое задание',
        'Детальное техническое задание с подробным описанием всех требований, технических характеристик, функциональных возможностей и критериев приемки проекта',
        'Очень длинное техническое задание с множеством разделов, подразделов, технических спецификаций, требований к производительности, безопасности, интеграции и документированию',
      ]

      realisticTexts.forEach(text => {
        const size = calculateFileSize(text)
        const formatted = formatFileSize(size)

        expect(size).toBeGreaterThan(0)
        expect(formatted).toMatch(/^\d+(\.\d+)? [BKMGT]B$/)
      })
    })
  })
})
