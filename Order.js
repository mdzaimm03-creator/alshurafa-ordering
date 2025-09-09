import React, { useMemo, useState } from "react";
import { WHATSAPP_NUMBER } from "../config";

const MENU = {
  "Starters (Non-Veg)": [
    { name: "Crispy Chicken Fry", price: 70 },
    { name: "Chicken Lollipop", price: 130 },
    { name: "Chicken 65", price: 190 }
  ],
  "Starters (Veg)": [
    { name: "Paneer Kurkure", price: 120 },
    { name: "Paneer Chilly", price: 140 },
    { name: "Veg Manchurian", price: 160 }
  ],
  "Soups": [
    { name: "Tomato Soup", price: 90 },
    { name: "Sweet Corn Soup", price: 90 },
    { name: "Hot & Sour Soup", price: 140 }
  ],
  "Biryanis": [
    { name: "Hyderabadi Chicken Dum Biryani", price: 260 },
    { name: "Mutton Dum Biryani", price: 400 },
    { name: "Veg Dum Biryani", price: 180 }
  ],
  "Main Course": [
    { name: "Butter Chicken", price: 300 },
    { name: "Chicken Tikka Masala", price: 260 },
    { name: "Shahi Paneer", price: 260 }
  ]
};

export default function Order(){
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const add = (item)=>{
    const found = cart.find(x=>x.name===item.name);
    if(found){
      setCart(cart.map(x=> x.name===item.name ? {...x, qty:x.qty+1} : x));
    }else{
      setCart([...cart, {...item, qty:1}]);
    }
  };
  const dec = (item)=>{
    setCart(cart
      .map(x=> x.name===item.name ? {...x, qty: x.qty-1} : x)
      .filter(x=> x.qty>0)
    );
  };

  const total = useMemo(()=> cart.reduce((s,i)=> s + i.price*i.qty, 0), [cart]);

  const placeOrder = ()=>{
    if(!cart.length){ alert("Cart is empty."); return; }
    if(!name || !phone || !address){ alert("Please fill Name, Phone and Address."); return; }
    const lines = [];
    lines.push("*New COD Order*");
    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`Address: ${address}`);
    if(note) lines.push(`Note: ${note}`);
    lines.push("");
    cart.forEach(it=> lines.push(`• ${it.name} x ${it.qty} = ₹${it.qty*it.price}`));
    lines.push("");
    lines.push(`Total: ₹${total}`);
    const msg = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-3">
      {Object.entries(MENU).map(([cat, items])=> (
        <div className="card" key={cat}>
          <h3 style={{marginTop:0}}>{cat}</h3>
          {items.map(it=> (
            <div key={it.name} style={{display:"flex",justifyContent:"space-between",margin:"8px 0"}}>
              <span>{it.name} – ₹{it.price}</span>
              <div>
                <button className="btn" onClick={()=>add(it)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="card" style={{gridColumn:"1 / -1"}}>
        <h3 style={{marginTop:0}}>Your Cart</h3>
        {!cart.length && <p>No items yet.</p>}
        {!!cart.length && (
          <div>
            {cart.map(it=> (
              <div key={it.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"6px 0"}}>
                <span>{it.name} – ₹{it.price} × {it.qty} = ₹{it.price*it.qty}</span>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn" onClick={()=>dec(it)}>-</button>
                  <button className="btn" onClick={()=>add(it)}>+</button>
                </div>
              </div>
            ))}
            <div className="hr"></div>
            <p style={{fontWeight:800}}>Total: ₹{total}</p>
          </div>
        )}

        <div className="hr"></div>
        <h4 style={{margin:"6px 0"}}>Delivery Details</h4>
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:12}}>
          <input className="input" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Your Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
        <textarea className="input" rows="3" placeholder="Full Address (Area, Landmark)" value={address} onChange={e=>setAddress(e.target.value)} style={{marginTop:10}}/>
        <input className="input" placeholder="Note (Optional)" value={note} onChange={e=>setNote(e.target.value)} style={{marginTop:10}}/>

        <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
          <button className="btn" onClick={placeOrder}>Place Order on WhatsApp</button>
          <a className="btn" href="/menu.pdf" download>Download Menu</a>
        </div>
      </div>
    </div>
  );
}
