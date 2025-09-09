import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Order";
import { RESTAURANT_NAME } from "./config";

export default function App(){
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/favicon.ico" alt="logo" width="24" height="24"/>
            <Link to="/" style={{fontWeight:800,color:"#facc15"}}>{RESTAURANT_NAME}</Link>
          </div>
          <div style={{display:"flex",gap:12}}>
            <Link to="/">Home</Link>
            <Link to="/order">Order</Link>
          </div>
        </nav>
        <div className="hr"></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/order" element={<Order/>} />
        </Routes>
        <div className="hr"></div>
        <footer style={{textAlign:"center",opacity:.7,fontSize:12,marginBottom:20}}>© {new Date().getFullYear()} {RESTAURANT_NAME} — COD only</footer>
      </div>
    </Router>
  )
}
