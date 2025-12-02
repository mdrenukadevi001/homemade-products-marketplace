import React, {useState, useEffect} from 'react';
import API from '../utils/api';

export default function ArtisanDashboard({user}){
  if (!user || !user.isArtisan) return <div>Please login as an artisan to access this page.</div>;
  const [name,setName]=useState(''); const [price,setPrice]=useState(''); const [desc,setDesc]=useState(''); const [files,setFiles]=useState(null); const [list,setList]=useState([]);
  useEffect(()=>{ API.get('/products').then(r=>setList(r.data)).catch(()=>{}); },[]);
  const submit=async e=>{ e.preventDefault();
    try{
      const form = new FormData();
      form.append('name', name);
      form.append('description', desc);
      form.append('price', price);
      if(files) for(let i=0;i<files.length;i++) form.append('images', files[i]);
      const res = await API.post('/products', form, { headers: { 'Content-Type':'multipart/form-data' }});
      setList(prev=>[res.data.product, ...prev]);
      setName(''); setPrice(''); setDesc(''); setFiles(null);
    }catch(e){ alert(e.response?.data?.message || 'Error'); }
  };
  return (<div style={{padding:'20px', maxWidth:'1200px', margin:'0 auto', fontFamily:'Arial'}}>
    <h2 style={{color:'#333', marginBottom:'20px'}}>Artisan Dashboard</h2>
    <form onSubmit={submit} style={{maxWidth:'500px', background:'#f9f9f9', padding:'20px', borderRadius:'8px', border:'1px solid #ddd', marginBottom:'30px'}}>
      <input placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} required style={{display:'block',width:'100%',padding:'10px',margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px', fontSize:'16px'}}/>
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required style={{display:'block',width:'100%',padding:'10px',margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px', fontSize:'16px'}}/>
      <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} required style={{display:'block',width:'100%',padding:'10px',margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px', fontSize:'16px', minHeight:'80px'}}/>
      <input type="file" multiple accept="image/*" onChange={e=>setFiles(e.target.files)} required style={{display:'block',width:'100%',padding:'10px',margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px', fontSize:'16px'}}/>
      <button type="submit" style={{padding:'10px 20px', backgroundColor:'#4CAF50', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'16px'}}>Add Product</button>
    </form>

    <h3 style={{color:'#333', marginBottom:'20px'}}>Your Products</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:'20px'}}>
      {list.filter(p=> !user || !p.artisan || p.artisan._id===user._id || p.artisan===user._id).map(p=>(
        <div key={p._id} style={{background:'#fff',padding:'15px',borderRadius:'8px', border:'1px solid #ddd'}}>
          <h4 style={{margin:'0 0 10px 0', color:'#333'}}>{p.name}</h4>
          <p style={{margin:'0 0 10px 0', color:'#666'}}>{p.description}</p>
          <p style={{margin:'0 0 10px 0', fontWeight:'bold', color:'#4CAF50'}}>${p.price}</p>
          {p.images && p.images.map((img, i) => <img key={i} src={`http://localhost:5000${img}`} alt={p.name} style={{width:'100%', height:'150px', objectFit:'cover', borderRadius:'4px', marginBottom:'10px'}} />)}
        </div>
      ))}
    </div>
  </div>);
}
