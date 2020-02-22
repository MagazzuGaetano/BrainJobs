import React from 'react'

export default React.createContext({
  API_URL: null,
  token: null,
  username: null,
  login: () => {},
  logout: () => {}
})
