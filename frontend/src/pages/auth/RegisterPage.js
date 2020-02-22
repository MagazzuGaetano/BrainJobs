import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'

import './auth.css'


class RegisterPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        email: '',
        password: '',
        confirm: ''
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

    const { username, email, password, confirm } = this.state.fields

    if (password !== confirm) this.setState({error: "password doesn't match!"})

    if (this.checkIfValid(username) &&
        this.checkIfValid(email) &&
        this.checkIfValid(password) &&
        password === confirm) {

      const options = {
        method: 'post',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      const url = this.context.API_URL + '/auth/register'
      fetch(url, options)
        .then(data => data.json())
        .then(data => {
          if (!data.message)
            this.props.history.push("/")
          else
            this.setState({error: data.message})
        })
        .catch(err => console.log(err))

    }
  }

  handleChange(e) {
    const { fields } = this.state
    this.setState({
      fields: { ...fields, [e.target.name]: e.target.value }
    })
  }

  render() {
    const { fields, error } = this.state
    const { username, email, password, confirm } = fields

    if (this.context.token) return <Redirect from="/register" to="/jobs" />

    return (
      <div id="auth">
        <div className="box">
          {error && <Notification message={error} />}
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-3">Register</h2>
            <Input 
              type={'text'}
              title={'Username'}
              name={'username'}
              value={username}
              placeholder={'Enter your username'}
              handleChange={this.handleChange}
              required={true}
            />
            <Input 
              type={'email'}
              title={'Email'}
              name={'email'}
              value={email}
              placeholder={'Enter your email'}
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
            <Input 
              type={'password'}
              title={'Confirm Password'}
              name={'confirm'}
              value={confirm}
              placeholder={'Confirm your password'}
              handleChange={this.handleChange}
              required={true}
            />
            <div className="field is-grouped is-pulled-right">
              <Button className="button is-success" 
                      title={'Register'} />

              <NavLink to="/login" className="button is-link">
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterPage