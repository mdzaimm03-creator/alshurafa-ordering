import React from "react";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_NAME } from "../config";

export default function Home(){
  const nav = useNavigate();
  return (
    <div>
      <div className="header">
        <span className="badge">Hot • Fast • Delicious</span>
        <h1 style={{fontSize:36,margin:"10px 0"}}>{RESTAURANT_NAME}</h1>
        <p style={{opacity:.8}}>Order online (Cash on Delivery). Tap below to start.</p>
      </div>
      <div className="card" style={{position:"relative"}}>
        <img src="/banner.jpg" alt="Banner" style={{width:"100%",borderRadius:12,background:"#111",height:220,objectFit:"cover"}}/>
        <div style={{display:"flex",justifyContent:"center",marginTop:16}}>
          <button className="btn" onClick={()=>nav("/order")}>👉 Start Order</button>
        </div>
      </div>
    </div>
  )
}
