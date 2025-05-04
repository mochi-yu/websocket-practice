import { useEffect, useState } from 'react'
import { TMessageRequest, TMessageResponse, ValidateMessageRequest } from './types/message'
import { getMessages } from './libs/api/message'
import { postMessage } from './libs/api/message'

function App() {
  const [messages, setMessages] = useState<TMessageResponse[]>([])

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages().then((response) => {
      setMessages(response.data.messages)
    })
  }, [])

  const handleSubmit = () => {
    const req: TMessageRequest = {
      author_name: name,
      content: message,
    }

    const error = ValidateMessageRequest(req)
    if (error) {
      alert(error)
      return
    }

    postMessage(req).then(() => {
      setMessage('')
      getMessages().then((response) => {
        setMessages(response.data.messages)
      })
    })
  }

  return (
    <>
      <form style={{ border: '1px solid #ccc', padding: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ width: '100px' }}>名前</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
            <span style={{ width: '100px' }}>メッセージ</span>
            <textarea style={{ width: '300px', height: '100px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>送信</button>
      </form>

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
