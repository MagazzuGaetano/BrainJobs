import React from 'react'

import UserDetails from '../../components/User/UserDetails/UserDetails'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'



class UserPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      error: null
    }
  }

  componentWillMount() {
    if (!this.context.token) return this.props.history.push('/login')

    const { id } = this.props.match.params
    const options = {
      headers: {
        'Authorization': 'Bearer ' + this.context.token
      }
    }
    fetch(this.context.API_URL + '/users/' + id, options)
      .then(data => data.json())
      .then(data => {
        if (!data.message)
          this.setState({user: data})
        else
          this.setState({error: data.message})
      })
      .catch(err => console.log(err))
  }

  render() {
    const { user, error } = this.state
    return (
      <div className="container">
        {!error && user && <UserDetails key={user.id} user={user} />}
        {error && <Notification message={error} />}
      </div>
    )
  }
}

export default UserPage