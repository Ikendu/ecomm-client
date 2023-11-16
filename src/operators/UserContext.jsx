import { createContext, useState } from 'react'

export const UserContext = createContext({})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const url = `https://hairview-api.onrender.com`
  return <UserContext.Provider value={{ user, setUser, url }}>{children}</UserContext.Provider>
}
