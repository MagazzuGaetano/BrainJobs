import React from 'react'

import UserList from '../../components/User/UserList/UserList'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'


class UsersPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      error: null
    }
    this.deleteUser = this.deleteUser.bind(this)
  }

  componentWillMount() {
    if (!this.context.token) return this.props.history.push('/login')

    const options = {
      headers: {
        'Authorization': 'Bearer ' + this.context.token
      }
    }
    fetch(this.context.API_URL + '/users/', options)
      .then(data => data.json())
      .then(data =>  {
        if (!data.message)
          this.setState({ users: data })
        else
          this.setState({ error: data.message })
      })
      .catch(err => console.log(err))
  }

  deleteUser(id) {
    const options = {
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + this.context.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch(this.context.API_URL + '/users/' + id, options)
      .then(() => {
        const { users } = this.state
        this.setState({
            users: users.filter(user => user.id !== id)
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { users, error } = this.state
    const _users = users.map(user => { return {...user, deleteUser: this.deleteUser} })

    return (
      <div className="container">
        {users && users.length > 0 && !error && <UserList users={_users} />}

        {users && users.length <= 0 && <div className="box">No users yet</div>}

        {error && <Notification message={error} />}
      </div>
    )
  }
}

export default UsersPage