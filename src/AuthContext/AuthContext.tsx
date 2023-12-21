"use client"
import { SessionProvider } from "next-auth/react"


const AuthContext = ({children}:any) => {
  return (
    <div>
      <SessionProvider>
      {children}
      </SessionProvider>
    </div>
  )
}

export default AuthContext
