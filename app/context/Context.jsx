
'use client'
import React, { createContext, useState } from 'react';

// Create the context
const MyContext = createContext('');

export default function ContextProvider({ children }) {
    // State that you want to share across the component tree
    const [signup, setSignup] = useState(false);
    let [token, settoken] = useState(null)

    // The value that will be shared via the context
   
    return (
        <MyContext.Provider value={{signup,setSignup ,token, settoken}}>
            {children}
        </MyContext.Provider>
    );
}

// Export the context to use it in other components
export { MyContext };
