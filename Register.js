import React, {useState} from 'react';
import API from '../utils/api';
export default function Register({onRegister}){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [isArtisan,setIsArtisan]=useState(false);
  const submit=async e=>{ e.preventDefault();
    try{
      const res=await API.post('/users/register',{name,email,password,isArtisan});
      localStorage.setItem('hm_user', JSON.stringify(res.data.user));
      localStorage.setItem('hm_token', res.data.token);
      onRegister && onRegister(res.data.user);
    }catch(e){ alert(e.response?.data?.message || 'Error'); }
  };
  return (<div className="form-container">
    <form onSubmit={submit} className="form">
      <h2 className="form-title">Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required className="form-input"/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="form-input"/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="form-input"/>
      <label className="form-label"><input type="checkbox" checked={isArtisan} onChange={e=>setIsArtisan(e.target.checked)} className="form-checkbox"/> I am an artisan</label>
      <button type="submit" className="form-button">Register</button>
    </form>
  </div>);
}
