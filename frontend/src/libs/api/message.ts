import { apiClient } from './client'
import { TMessageRequest, TMessageResponse } from '../../types/message'

const postMessage = async (message: TMessageRequest) => {
  const response = await apiClient.post<{message: string}>('/messages', message)
  return response
}

const getMessages = async () => {
  const response = await apiClient.get<{messages: TMessageResponse[]}>('/messages')
  return response
}

export { postMessage, getMessages }
