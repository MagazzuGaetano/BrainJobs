import React from 'react'
import UserItem from '../UserItem/UserItem'


const UserList = props => (
  props.users.map(user => (
    <UserItem
      key={user.id} 
      user={user}
      deleteUser={user.deleteUser} />
  ))
)

export default UserList