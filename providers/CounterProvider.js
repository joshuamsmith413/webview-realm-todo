import React, { useContext, useState, createContext, useEffect, useRef } from "react";

const CounterContext = createContext(null);

const CounterProvider = ({children}) => {
const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1)
    }

    const decrement = () => {
        setCount(count-1)
    }

    return (
        <CounterContext.Provider 
            value={{
                count,
                increment,
                decrement
            }} 
        >
            {children}
        </CounterContext.Provider>
    )
}

const useCounter = () => {
    const count = useContext(CounterContext);
    if (count == null) {
        throw new Error("no count", count);
    }
    return count
}

export { CounterProvider, useCounter }