import React, { useState } from "react";

function Order() {
  const [cart, setCart] = useState([]);
  const menu = [
    { name: "Chicken Biryani", price: 260 },
    { name: "Paneer Tikka", price: 200 },
    { name: "Veg Thali", price: 150 },
  ];

  const addToCart = (item) => {
    const exists = cart.find((c) => c.name === item.name);
    if (exists) {
      setCart(cart.map((c) => (c.name === item.name ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ padding: 20, background: "black", color: "gold", minHeight: "100vh" }}>
      <h2 style={{ fontSize: 28, marginBottom: 20 }}>Menu</h2>
      {menu.map((item) => (
        <div key={item.name} style={{ marginBottom: 10 }}>
          {item.name} - ₹{item.price}
          <button
            onClick={() => addToCart(item)}
            style={{ marginLeft: 10, background: "gold", color: "black", padding: "5px 10px", borderRadius: 5 }}
          >
            Add
          </button>
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((c, i) => (
            <li key={i}>
              {c.name} x {c.qty} = ₹{c.qty * c.price}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
      <button style={{ marginTop: 20, background: "gold", color: "black", padding: "10px 20px", borderRadius: 5 }}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Order;
