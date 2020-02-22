import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import JobsPage from './pages/jobs/JobsPage'
import JobPage from './pages/jobs/JobPage'
import AddJobPage from './pages/jobs/AddJobPage'
import UsersPage from './pages/users/UsersPage'
import UserPage from './pages/users/UserPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFoundPage from './pages/notfound/NotFoundPage'
import Navbar from './components/Navbar/Navbar'

import Context from './context/Context'

import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      API_URL: 'http://localhost:8081/api/v1',
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || ""
    }
  }

  login = (token, username) => {
    localStorage.setItem("token", token)
    localStorage.setItem("username", username)
    this.setState({ token: token, username: username })
  }

  logout = () => {
    localStorage.clear()
    this.setState({ token: null, username: null })
  }

  render() {
    return (
      <BrowserRouter>
        <Context.Provider 
          value={{
            API_URL: this.state.API_URL,
            token: this.state.token,
            username: this.state.username,
            login: this.login,
            logout: this.logout
          }}
        >
          <Navbar />
          <main className="section">
            <Switch>
              <Redirect from="/" to="/jobs" exact />
              <Route path="/jobs" component={JobsPage} exact />
              <Route path="/jobs/add" component={AddJobPage} exact />
              <Route path="/jobs/:id" component={JobPage} exact />
              <Route path="/users" component={UsersPage} exact />
              <Route path="/users/:id" component={UserPage} exact />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/register" component={RegisterPage} exact />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </main>
        </Context.Provider>
      </BrowserRouter>
    )
  }
}

export default App
