import { createContext, useState } from 'react'

export const UserContext = createContext({})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const url = import.meta.env.VITE_SERVER_URL
  return <UserContext.Provider value={{ user, setUser, url }}>{children}</UserContext.Provider>
}
