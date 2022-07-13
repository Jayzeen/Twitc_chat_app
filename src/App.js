import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
} from 'stream-chat-react'
import { useCookies } from 'react-cookie'


// ---------------- IMPORTING STYLINGS ----------------
import '@stream-io/stream-chat-css/dist/css/index.css'


// ---------------- IMPORTING COMPONENTS ----------------
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import Video from './components/Video'


// ---------------- DEFINING CONSTANTS ----------------
// const filters = { type: 'gaming' }
// const options = { state: true, presence: true, limit: 10 }
// const sort = { last_message_at: -1 }

const apiKey = 'mu3wgdx9ehyf'
const client = StreamChat.getInstance(apiKey)


// ---------------- MAIN APP ----------------
const App = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(null)
  const [users, setUsers] = useState(null)


  const authToken = cookie.AuthToken

  useEffect(() => {
    async function fetchUsers() {
      if (authToken) {
        const { users } = await client.queryUsers({ role: 'user' })
        setUsers(users)
      }
    }
    fetchUsers()
  }, [])


  const setUpClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookie.UserId,
          name: cookie.Name,
          hashedPassword: cookie.HashedPassword,
        },
        authToken,
      )

      const channel = client.channel('gaming', 'gaming-test', {
        name: 'Gaming Test',
      })
      setChannel(channel)

    } catch (error) {
      console.log(error)
    }
  }

  if (authToken) setUpClient()

  return (
    <>
      {!authToken && <Auth />}
      {authToken &&
        <Chat client={client} darkMode={true}>
          <Channel channel={channel}>
            {/* <Video /> */}
            <MessagingContainer users={users} />
          </Channel>
        </Chat>
      }
    </>
  )
}

export default App
