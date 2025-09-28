import { apiClient } from '@/shared/utils/apiClient'
import type { Document } from '../types/document'
import { useId } from 'vue'

export interface ApiError {
  message: string
  code: string
}

export class DocumentsService {
  async searchDocuments(query: string): Promise<Document[]> {
    try {
      const response = await apiClient.get<Document[]>('/user/docs', {
        params: { search: query }
      })

      return response.data.map((doc: Document) => ({
        id: doc.id || useId(),
        name: doc.name || '',
        description: doc.description || '',
        imageUrl: doc.image || '',
      }))
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async downloadDocument(document: Document): Promise<Blob> {
    try {
      const content = document.description || document.name

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })

      return blob
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      await apiClient.delete(`/user/docs/${id}`)
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleApiError(error: any): Error {
    if (error.response) {
      const apiError: ApiError = error.response.data
      return new Error(apiError.message || 'API Error')
    }
    if (error.request) {
      return new Error('Network Error')
    }
    return new Error('Unknown Error')
  }
}

export const documentsService = new DocumentsService()
