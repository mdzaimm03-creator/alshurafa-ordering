
async function load(){
  const res = await fetch('menu.json');
  const data = await res.json();

  const catBar = document.getElementById('catBar');
  const menu = document.getElementById('menu');
  const cartItems = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');
  const cart = [];

  function renderCats(){
    catBar.innerHTML='';
    Object.keys(data).forEach((cat, idx)=>{
      const b = document.createElement('button');
      b.textContent = cat;
      b.onclick = ()=> renderMenu(cat);
      catBar.appendChild(b);
      if(idx===0) renderMenu(cat);
    });
  }

  function addToCart(name,size,price){
    const key = name+'|'+size;
    const found = cart.find(c=>c.key===key);
    if(found) found.qty++;
    else cart.push({key,name,size,price,qty:1});
    renderCart();
  }

  window.addToCart = addToCart;

  function renderMenu(cat){
    menu.innerHTML='';
    (data[cat]||[]).forEach(it=>{
      const div = document.createElement('div'); div.className='item';
      const left = document.createElement('div'); left.className='left';
      left.innerHTML = `<div class="name">${it.name}</div>`;
      const right = document.createElement('div'); right.className='prices';
      const halfP = (it.half && it.half>0) ? `Half: ₹${it.half}` : '';
      const fullP = (it.full && it.full>0) ? `Full: ₹${it.full}` : '';
      right.innerHTML = `
        ${halfP ? `<div class="price-line">${halfP} <button class="btn" onclick="addToCart('${it.name}','Half',${it.half})">Add Half</button></div>` : ''}
        ${fullP ? `<div class="price-line">${fullP} <button class="btn" onclick="addToCart('${it.name}','Full',${it.full})">Add Full</button></div>` : ''}
      `;
      div.appendChild(left); div.appendChild(right);
      menu.appendChild(div);
    });
  }

  function renderCart(){
    cartItems.innerHTML='';
    let total = 0;
    cart.forEach(c=>{
      const li = document.createElement('li');
      li.textContent = `${c.name} (${c.size}) x ${c.qty} = ₹${c.price*c.qty}`;
      cartItems.appendChild(li);
      total += c.price*c.qty;
    });
    totalEl.textContent = total;
  }

  // Share location
  document.getElementById('shareLoc').onclick = ()=>{
    if(!navigator.geolocation){ alert('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(pos=>{
      const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
      document.getElementById('address').value = url;
    }, err=> alert('Location error'));
  };

  // WhatsApp order
  document.getElementById('placeOrder').onclick = ()=>{
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    if(!name||!phone||!address){ alert('Please fill Name, Phone, Address'); return; }
    if(cart.length===0){ alert('Please add items'); return; }
    let msg = `*New Order - Al Shurafa*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0A%0A`;
    cart.forEach(c=> msg += `${c.name} (${c.size}) x ${c.qty} = ₹${c.price*c.qty}%0A`);
    msg += `%0ATotal: ₹${document.getElementById('total').textContent}`;
    const wa = 'https://wa.me/919503924721?text=' + msg;
    window.open(wa,'_blank');
  };

  renderCats();
}
load();
