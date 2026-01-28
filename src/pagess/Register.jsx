import {useState,useContext} from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import API from "../api";
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };
    
    return( 
        <div className='max-w-md-auto mt-20 p-6 bg-white shadow rounded'>
            <h1 className = "text-2xl font-bold mb-4"> Register </h1>
            <form onSubmit={handleSubmit} className = 'flex flex-col gap-3'>
                <input type="text" placeholder = 'Name' className = "bolder p-2" 
                    value = {form.name} onChange={(e)=> setForm({...form,name:e.target.value}) }
                />
                <input className='border p-2 rounded' type = "text" placeholder = "email" value={form.email} onChange={(e)=>setForm({...form , email: e.target.value})} required
               />
        <input type="password" placeholder="Password" className="border p-2 rounded "
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 text-white p-2 rounded">Register</button>
            </form>
        </div>
    )
}