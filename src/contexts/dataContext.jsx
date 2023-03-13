import { createContext,useState } from "react";

export const DataContext = createContext();


export function DataContextProvider(props){

    const [ user, setUser ] = useState('')
    const valor =  {user,setUser}

    return (
    <DataContext.Provider value={valor}>
        {props.children}
    </DataContext.Provider>
    )
}