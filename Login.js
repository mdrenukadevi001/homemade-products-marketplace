import React, {useState} from 'react';
import API from '../utils/api';
export default function Login({onLogin}){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit=async e=>{ e.preventDefault();
    try{
      const res=await API.post('/users/login',{email,password});
      localStorage.setItem('hm_user', JSON.stringify(res.data.user));
      localStorage.setItem('hm_token', res.data.token);
      onLogin && onLogin(res.data.user);
    }catch(e){ alert(e.response?.data?.message || 'Error'); }
  };
  return (<div className="form-container">
    <form onSubmit={submit} className="form">
      <h2 className="form-title">Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="form-input"/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="form-input"/>
      <button type="submit" className="form-button">Login</button>
    </form>
  </div>);
}
