export type TMessageRequest = {
  content: string
  author_name: string
}

export type TMessageResponse = {
  id: string
  content: string
  author_name: string
  created_at: string
}

export const ValidateMessageRequest = (req: TMessageRequest) => {
  if (req.content.length === 0) {
    return 'メッセージを入力してください'
  }
  if (req.author_name.length === 0) {
    return '名前を入力してください'
  }
}
