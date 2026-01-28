import { createContext , useState , useEffect } from "react"
import { useRouteLoaderData } from "react-router-dom";
export const AuthContext = createContext(); 
export const AuthProvider = ({children}) => {
    const [ user, setUser] = useState(null); 
    useEffect(() =>  {
        const saved = localStorage.getItem('user');
        if(saved) setUser(JSON.parse(saved)); 
    } , []); 
    const login = (user, token)  =>{ 
        localStorage.setItem("token", token );
        localStorage.setItem("user" , JSON.stringify(user));
        setUser(user);

    }
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        setUser(null)
    }
    ;
    return (
        <AuthContext.Provider value= {{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};