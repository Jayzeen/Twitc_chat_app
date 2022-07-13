import React from 'react'
import { useState } from 'react'
import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react'
import { useCookies } from 'react-cookie'
import UserList from './UserList'
import { FaUsers, FaArrowAltCircleLeft } from 'react-icons/fa'


const MessagingContainer = ({ users }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [userListVisible, setUserListVisible] = useState(false)

  const logout = () => {
    removeCookie('Name', cookie.Name)
    removeCookie('HashedPassword', cookie.hashedPassword)
    removeCookie('UserId', cookie.userId)
    removeCookie('AuthToken', cookie.token)

    window.location.reload()
  }

  return (
    <div className="messaging-container">
      {!userListVisible && (
        <Window>
          <FaUsers className="icon" onClick={() => setUserListVisible(true)} />
          <ChannelHeader />
          <MessageList />
          <MessageInput />
          <button className="logout_button" onClick={logout}>Logout</button>
        </Window>
      )}
      {userListVisible && (
        <Window>
          <div className="chat_container">
            <FaArrowAltCircleLeft className="icon" onClick={() => setUserListVisible(false)} />
            <ChannelHeader title='Users' />
            <UserList users={users} />
          </div>
        </Window>
      )}

      <Thread />
    </div>
  )
}

export default MessagingContainer