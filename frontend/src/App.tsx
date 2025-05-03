import { useEffect, useState } from 'react'
import { TMessageResponse } from './types/message'
import { getMessages } from './libs/api/message'

function App() {
  const [messages, setMessages] = useState<TMessageResponse[]>([])

  useEffect(() => {
    getMessages().then((response) => {
      setMessages(response.data.messages)
    })
  }, [])

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p style={{ fontSize: '12px', color: 'gray' }}>{message.author_name} / {message.created_at}</p>
        </div>
      ))}
    </>
  )
}

export default App
