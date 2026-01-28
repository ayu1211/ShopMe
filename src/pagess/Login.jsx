import {useState , useContext} from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../api";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const{data} = await API.post("/auth/login",{email,password});
            login(data.user,data.token);
            navigate("/");

        }catch (err) {
            alert(err.response?.data?.message || "Login failed");

        }
    };
   return(
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
        <h1 className = "text-2xl font-bold mb-4">Login</h1>
        <form onSubmit= {handleSubmit } className="flex flex-col gap-3">
        <input type= "email" placeholder="Email" className="border p-2"
            value= {email} onChange={(e)=> setEmail(e.target.value)} required
        /> 
         <input type = "password" placeholder="Password" className="border p-2"
            value = {password} onChange={(e)=>setPassword(e.target.value)} required
        />
       
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
   )
}