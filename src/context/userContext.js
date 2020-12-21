import { createContext, useState } from "react"

export const UserContext = createContext()

// userProvider holds the user and pass it down to all the components
export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={[user, setUser]} >
            {children}
        </UserContext.Provider>
    )
}

