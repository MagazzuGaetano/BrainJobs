import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'

import './auth.css'


class LoginPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: ''
      },
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  checkIfValid(value) {
    return (
      value !== undefined &&
      value !== null &&
      value !== ""
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    const { username, password } = this.state.fields

    if (this.checkIfValid(username) &&
        this.checkIfValid(password)) {

      const options = {
        method: 'post',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      const url = this.context.API_URL + '/auth/login'
      fetch(url, options)
        .then(data => data.json())
        .then(data => {
          if (data.auth) {
            this.context.login(data.token, data.username)
            this.props.history.push("/jobs")
          }
          if(data.message)
            this.setState({error: data.message})
        })
        .catch(err => console.log(err))
    }
  }

  handleChange(e) {
    const { fields } = this.state
    this.setState({
      fields: {...fields, [e.target.name] : e.target.value}
    })
  }

  render() {
    const { fields, error } = this.state
    const { username, password } = fields
    
    if (this.context.token) return <Redirect from="/login" to="/jobs" />

    return (
      <div id="auth">
        <div className="box">
          {error && <Notification message={error} />}
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-3">Login</h2>
            <Input 
              type={'text'}
              title={'Username'}
              name={'username'}
              value={username}
              placeholder={'Enter your username or email'}
              handleChange={this.handleChange}
              required={true}
            />
            <Input
              type={'password'}
              title={'Password'}
              name={'password'}
              value={password}
              placeholder={'Enter your password'}
              handleChange={this.handleChange}
              required={true}
            />
            <div className="field is-grouped is-pulled-right">
              <Button className="button is-link" title={'Login'}/>
              <NavLink to="/register" className="button is-success">
                Register
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage