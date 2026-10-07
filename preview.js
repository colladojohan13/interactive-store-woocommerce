/* Interactive Store portfolio demo. All state is local to this browser. */
const products = [
  { id: 'arc-14', name: 'Arc 14', kind: 'Laptop concept', category: 'computers', categoryName: 'Computers', price: 64900, image: 'assets/arc-14-laptop-concept.jpg', label: 'Featured', description: 'A refined graphite laptop concept for focused work and everyday creativity. A clean silhouette and considered details bring the design into focus.', story: 'Arc 14 is imagined as a quiet companion for focused work. Its graphite finish and clean form bring a calm feeling to a busy desk.' },
  { id: 'pulse', name: 'Pulse', kind: 'Wireless headphones concept', category: 'electronics', categoryName: 'Electronics', price: 8900, image: 'assets/pulse-headphones-concept.png', label: 'Featured', description: 'A minimalist over-ear headphone concept with a soft graphite finish, created for immersive everyday listening.', story: 'Pulse pairs a familiar over-ear shape with an understated charcoal finish. The concept feels equally at home on a desk or on the move.' },
  { id: 'link', name: 'Link', kind: 'USB-C dock concept', category: 'accessories', categoryName: 'Accessories', price: 3900, image: 'assets/link-usbc-dock-concept.png', label: 'Featured', description: 'A compact desktop dock concept that brings a tidy, connected workspace together.', story: 'Link is the small detail that gives a desk a more considered feel. A simple graphite form keeps visual clutter low.' },
  { id: 'haven', name: 'Haven', kind: 'Smart speaker concept', category: 'home-tech', categoryName: 'Home Tech', price: 6900, image: 'assets/haven-smart-speaker-concept.png', label: 'Featured', description: 'A quiet smart speaker concept with a charcoal woven texture, designed to feel at home in any room.', story: 'Haven brings a soft, woven texture to a compact silhouette. The concept is intended to sit comfortably among everyday objects.' },
  { id: 'vista', name: 'Vista', kind: 'Desktop monitor concept', category: 'computers', categoryName: 'Computers', price: 28900, image: 'assets/vista-monitor-concept.png', label: 'New concept', description: 'A slim graphite desktop monitor concept with a calm, expansive screen for creative work.', story: 'Vista brings a quiet, spacious focal point to a desk. The restrained frame lets the screen take center stage.' },
  { id: 'frame', name: 'Frame', kind: 'Digital camera concept', category: 'electronics', categoryName: 'Electronics', price: 35900, image: 'assets/frame-camera-concept.png', label: 'New concept', description: 'A compact graphite camera concept made for capturing the moments worth keeping.', story: 'Frame is imagined for everyday makers. Its straightforward form keeps attention on the moment in front of the lens.' },
  { id: 'form', name: 'Form', kind: 'Wireless keyboard concept', category: 'accessories', categoryName: 'Accessories', price: 5400, image: 'assets/form-keyboard-concept.png', label: 'New concept', description: 'A compact graphite keyboard concept for a focused, uncluttered workspace.', story: 'Form balances familiar keys with an understated silhouette. It feels at home alongside the rest of the collection.' },
  { id: 'glow', name: 'Glow', kind: 'Desk lamp concept', category: 'home-tech', categoryName: 'Home Tech', price: 7900, image: 'assets/glow-lamp-concept.png', label: 'New concept', description: 'A slim graphite desk lamp concept with a warm, comfortable glow for late projects.', story: 'Glow adds a warmer note to the workspace. Its curved arm and simple base keep the look light and composed.' }
];
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const bagKey = 'interactive-store-demo-bag-v1';
const wishlistKey = 'interactive-store-demo-wishlist-v1';
const ordersKey = 'interactive-store-demo-orders-v1';
const money = value => `RD$${Math.round(value).toLocaleString('en-US')}`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
function getBag() {
  const value = read(bagKey, {});
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, qty]) => productById[id] && Number.isInteger(qty) && qty > 0 && qty <= 9));
}
function getWishlist() {
  const value = read(wishlistKey, []);
  return Array.isArray(value) ? [...new Set(value.filter(id => productById[id]))] : [];
}
function sampleOrders() {
  const daysAgo = days => new Date(Date.now() - days * 86400000).toISOString();
  return [
    { id: 'IS-SAMPLE-1003', date: daysAgo(2), status: 'Processing', sample: true, customer: 'Alex Demo', city: 'Santiago', delivery: 'standard', items: [{ id: 'arc-14', qty: 1, price: 64900 }, { id: 'link', qty: 1, price: 3900 }], subtotal: 68800, discount: 0, shipping: 250, total: 69050 },
    { id: 'IS-SAMPLE-1002', date: daysAgo(5), status: 'Delivered', sample: true, customer: 'Sam Example', city: 'Santo Domingo', delivery: 'pickup', items: [{ id: 'pulse', qty: 1, price: 8900 }, { id: 'haven', qty: 1, price: 6900 }], subtotal: 15800, discount: 0, shipping: 0, total: 15800 },
    { id: 'IS-SAMPLE-1001', date: daysAgo(9), status: 'Canceled', sample: true, customer: 'Taylor Sample', city: 'Santiago', delivery: 'standard', items: [{ id: 'form', qty: 1, price: 5400 }], subtotal: 5400, discount: 0, shipping: 250, total: 5650 }
  ];
}
function getOrders() {
  let value = read(ordersKey, null);
  if (!Array.isArray(value)) { value = sampleOrders(); write(ordersKey, value); }
  return value.filter(order => order && typeof order.id === 'string' && Array.isArray(order.items));
}
function updateCounters() {
  const count = Object.values(getBag()).reduce((sum, qty) => sum + qty, 0);
  document.querySelectorAll('.bag-count').forEach(el => { el.textContent = count; el.setAttribute('aria-label', `${count} items in bag`); });
  document.querySelectorAll('.wish-count').forEach(el => { const n = getWishlist().length; el.textContent = n; el.setAttribute('aria-label', `${n} saved products`); });
}
function saveBag(bag) { write(bagKey, bag); updateCounters(); }
function addToBag(id, qty = 1) {
  if (!productById[id]) return;
  const bag = getBag(); bag[id] = Math.min(9, (bag[id] || 0) + qty); saveBag(bag);
}
function toggleWishlist(id) {
  const saved = getWishlist();
  const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
  write(wishlistKey, next); updateCounters();
  document.querySelectorAll(`[data-wish-id="${id}"]`).forEach(button => setWishState(button, next.includes(id)));
  if (document.body.dataset.page === 'wishlist') renderWishlist();
}
function setWishState(button, saved) {
  button.classList.toggle('is-saved', saved);
  button.setAttribute('aria-pressed', String(saved));
  button.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${productById[button.dataset.wishId].name} ${saved ? 'from' : 'to'} wishlist`);
  button.textContent = saved ? '♥' : '♡';
}
function card(product) {
  const article = document.createElement('article'); article.className = 'store-card';
  article.innerHTML = `<a class="store-card__link" href="product.html?item=${encodeURIComponent(product.id)}"><span class="store-card__media"><img src="${product.image}" width="1024" height="1024" alt="${product.name} ${product.kind}" loading="lazy"></span><span class="store-card__body"><span class="store-card__eyebrow">${product.categoryName} · Concept</span><strong>${product.name}</strong><span class="store-card__kind">${product.kind}</span><span class="store-card__bottom"><b>${money(product.price)}</b><span aria-hidden="true">↗</span></span></span></a><button class="wish-button" type="button" data-wish-id="${product.id}"></button>`;
  const button = article.querySelector('.wish-button'); setWishState(button, getWishlist().includes(product.id));
  button.addEventListener('click', () => toggleWishlist(product.id));
  return article;
}
function renderShop() {
  const grid = document.getElementById('catalog-grid');
  const search = document.getElementById('catalog-search');
  const sort = document.getElementById('catalog-sort');
  const price = document.getElementById('catalog-price');
  const chips = [...document.querySelectorAll('.filter-chip')];
  const controls = document.getElementById('catalog-controls');
  const backdrop = document.getElementById('mobile-filter-backdrop');
  const trigger = document.getElementById('mobile-filter-open');
  const applied = document.getElementById('applied-filters');
  const mobile = matchMedia('(max-width: 650px)');
  const queryCategory = new URLSearchParams(location.search).get('category');
  let category = chips.some(chip => chip.dataset.category === queryCategory) ? queryCategory : 'all';
  let draftCategory = category;
  let committedPrice = '';
  let committedSort = 'featured';
  function matchesFor(selectedCategory, selectedPrice, selectedSort) {
    const term = search.value.trim().toLowerCase();
    const ceiling = Number(selectedPrice) || Infinity;
    const matches = products.filter(product => (selectedCategory === 'all' || product.category === selectedCategory) && product.price <= ceiling && `${product.name} ${product.kind} ${product.categoryName}`.toLowerCase().includes(term));
    if (selectedSort === 'price-low') matches.sort((a, b) => a.price - b.price);
    if (selectedSort === 'price-high') matches.sort((a, b) => b.price - a.price);
    if (selectedSort === 'name') matches.sort((a, b) => a.name.localeCompare(b.name));
    return matches;
  }
  function syncChips(selected) { chips.forEach(chip => { const active = chip.dataset.category === selected; chip.classList.toggle('is-active', active); chip.setAttribute('aria-pressed', String(active)); }); }
  function syncUrl() { const url = new URL(location.href); category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category); history.replaceState(null, '', url); }
  function addApplied(label, reset) {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = `${label} ×`;
    button.setAttribute('aria-label', `Remove ${label} filter`); button.addEventListener('click', reset); applied.append(button);
  }
  function draw() {
    const matches = matchesFor(category, committedPrice, committedSort);
    grid.replaceChildren(...matches.map(card));
    document.getElementById('result-count').textContent = `${matches.length} concept ${matches.length === 1 ? 'product' : 'products'}`;
    document.getElementById('catalog-empty').hidden = matches.length !== 0;
    if (!controls.classList.contains('is-open')) syncChips(category);
    applied.replaceChildren();
    if (category !== 'all') addApplied(chips.find(chip => chip.dataset.category === category).textContent, () => { category = 'all'; draftCategory = category; syncUrl(); draw(); });
    if (committedPrice) addApplied([...price.options].find(option => option.value === committedPrice).textContent, () => { committedPrice = ''; price.value = ''; draw(); });
    if (committedSort !== 'featured') addApplied([...sort.options].find(option => option.value === committedSort).textContent, () => { committedSort = 'featured'; sort.value = 'featured'; draw(); });
    const activeCount = (category !== 'all') + Boolean(committedPrice) + (committedSort !== 'featured');
    document.getElementById('mobile-filter-count').textContent = activeCount;
    trigger.setAttribute('aria-label', `Filter and sort, ${activeCount} active filters`);
  }
  function updateApply() {
    const count = matchesFor(draftCategory, price.value, sort.value).length;
    document.getElementById('mobile-filter-apply').textContent = `Show ${count} ${count === 1 ? 'product' : 'products'}`;
  }
  function closeFilters() {
    controls.classList.remove('is-open'); backdrop.hidden = true; document.body.classList.remove('filters-open');
    controls.removeAttribute('role'); controls.removeAttribute('aria-modal'); controls.removeAttribute('aria-label');
    trigger.setAttribute('aria-expanded', 'false'); draftCategory = category; price.value = committedPrice; sort.value = committedSort; syncChips(category); trigger.focus();
  }
  trigger.addEventListener('click', () => {
    draftCategory = category; price.value = committedPrice; sort.value = committedSort; syncChips(draftCategory); updateApply();
    backdrop.hidden = false; controls.classList.add('is-open'); document.body.classList.add('filters-open');
    controls.setAttribute('role', 'dialog'); controls.setAttribute('aria-modal', 'true'); controls.setAttribute('aria-label', 'Filter and sort products');
    trigger.setAttribute('aria-expanded', 'true'); document.getElementById('mobile-filter-close').focus();
  });
  document.getElementById('mobile-filter-close').addEventListener('click', closeFilters);
  backdrop.addEventListener('click', closeFilters);
  document.getElementById('mobile-filter-clear').addEventListener('click', () => { draftCategory = 'all'; price.value = ''; sort.value = 'featured'; syncChips(draftCategory); updateApply(); });
  document.getElementById('mobile-filter-apply').addEventListener('click', () => { category = draftCategory; committedPrice = price.value; committedSort = sort.value; syncUrl(); closeFilters(); draw(); });
  controls.addEventListener('keydown', event => {
    if (event.key === 'Escape' && controls.classList.contains('is-open')) { closeFilters(); return; }
    if (event.key !== 'Tab' || !controls.classList.contains('is-open')) return;
    const focusable = [...controls.querySelectorAll('button, select')].filter(el => !el.hidden);
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches && controls.classList.contains('is-open')) closeFilters(); });
  chips.forEach(chip => chip.addEventListener('click', () => { if (mobile.matches && controls.classList.contains('is-open')) { draftCategory = chip.dataset.category; syncChips(draftCategory); updateApply(); } else { category = chip.dataset.category; draftCategory = category; syncUrl(); draw(); } }));
  [sort, price].forEach(input => input.addEventListener('change', () => { if (mobile.matches && controls.classList.contains('is-open')) updateApply(); else { committedPrice = price.value; committedSort = sort.value; draw(); } }));
  search.addEventListener('input', () => { draw(); if (controls.classList.contains('is-open')) updateApply(); });
  draw();
}
function renderProduct() {
  const product = productById[new URLSearchParams(location.search).get('item')];
  if (!product) { location.replace('shop.html'); return; }
  document.title = `${product.name} — Interactive Store`;
  document.querySelector('meta[name="description"]').content = `${product.name}: ${product.kind} in the fictional Interactive Store concept collection.`;
  document.getElementById('breadcrumb-product').textContent = product.name;
  const image = document.getElementById('product-image');
  const gallery = product.id === 'arc-14' ? [
    { src: product.image, label: 'Arc 14 concept, open front view' },
    { src: 'assets/arc-14-side-concept.jpg', label: 'Arc 14 concept, low three-quarter view' },
    { src: 'assets/arc-14-desk-concept.jpg', label: 'Arc 14 concept on a home workspace desk' }
  ] : [{ src: product.image, label: `${product.name} ${product.kind}` }];
  const thumbnails = document.getElementById('product-thumbnails');
  const zoom = document.getElementById('product-zoom');
  const zoomImage = document.getElementById('product-zoom-image');
  function selectImage(index) {
    const selected = gallery[index];
    image.src = selected.src; image.alt = selected.label;
    zoomImage.src = selected.src; zoomImage.alt = selected.label;
    document.getElementById('product-image-count').textContent = `Concept product · ${String(index + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
    thumbnails.querySelectorAll('button').forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === index)));
  }
  thumbnails.replaceChildren(...gallery.map((item, index) => {
    const button = document.createElement('button'); button.type = 'button';
    button.setAttribute('aria-label', `View image ${index + 1} of ${gallery.length}: ${item.label}`);
    button.innerHTML = `<img src="${item.src}" alt="" width="150" height="150" loading="lazy">`;
    button.addEventListener('click', () => selectImage(index));
    return button;
  }));
  selectImage(0);
  document.getElementById('product-zoom-open').addEventListener('click', () => zoom.showModal());
  document.getElementById('product-zoom-close').addEventListener('click', () => zoom.close());
  document.getElementById('product-category').textContent = `${product.categoryName} · Concept collection`;
  document.getElementById('product-category-fact').textContent = product.categoryName;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-subtitle').textContent = product.kind;
  document.getElementById('product-price').textContent = money(product.price);
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('story-title').textContent = `Meet ${product.name}.`;
  document.getElementById('story-description').textContent = product.story;
  document.getElementById('related-grid').replaceChildren(...products.filter(item => item.id !== product.id).slice(0, 3).map(card));
  const wish = document.getElementById('product-wish'); wish.dataset.wishId = product.id; setWishState(wish, getWishlist().includes(product.id)); wish.addEventListener('click', () => toggleWishlist(product.id));
  const isArc = product.id === 'arc-14';
  ['product-details', 'product-comparison', 'arc-3d'].forEach(id => { document.getElementById(id).hidden = !isArc; });
  const demo3d = document.getElementById('product-3d'); demo3d.hidden = !isArc;
  if (isArc) {
    const frame = document.getElementById('product-3d-frame');
    const load = document.getElementById('load-product-3d');
    function loadViewer() {
      if (frame.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://docs.cecomsa.com/laptop-3d/index.html';
      iframe.title = 'Separate laptop 3D demonstration';
      iframe.loading = 'lazy'; iframe.allow = 'fullscreen; xr-spatial-tracking'; iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
      load.hidden = true;
    }
    load.addEventListener('click', loadViewer);
    demo3d.addEventListener('click', () => { loadViewer(); });
  }
  document.getElementById('add-to-bag').addEventListener('click', () => {
    const quantity = Number(document.getElementById('product-quantity').value);
    const feedback = document.getElementById('product-feedback');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9) { feedback.textContent = 'Choose a quantity from 1 to 9.'; return; }
    addToBag(product.id, quantity);
    feedback.replaceChildren(document.createTextNode(`${product.name} added to your demo bag. `));
    const link = document.createElement('a'); link.href = 'bag.html'; link.textContent = 'View bag ↗'; feedback.append(link);
  });
}
function renderBag() {
  const bag = getBag(); const items = document.getElementById('bag-items'); items.replaceChildren();
  let subtotal = 0;
  Object.entries(bag).forEach(([id, qty]) => {
    const product = productById[id]; subtotal += product.price * qty;
    const row = document.createElement('article'); row.className = 'bag-item';
    row.innerHTML = `<a href="product.html?item=${encodeURIComponent(id)}"><img src="${product.image}" alt="${product.name} ${product.kind}" width="180" height="180"></a><div class="bag-item__details"><span class="store-eyebrow">${product.categoryName} · Concept</span><a href="product.html?item=${encodeURIComponent(id)}">${product.name}</a><span>${product.kind}</span><button type="button" class="bag-remove">Remove</button></div><div class="bag-item__end"><strong>${money(product.price * qty)}</strong><label>Qty <input type="number" min="1" max="9" value="${qty}" aria-label="Quantity for ${product.name}"></label></div>`;
    row.querySelector('.bag-remove').addEventListener('click', () => { const next = getBag(); delete next[id]; saveBag(next); renderBag(); });
    row.querySelector('input').addEventListener('change', event => { const next = getBag(); const value = Number(event.target.value); if (!Number.isInteger(value) || value < 1 || value > 9) { event.target.value = next[id]; return; } next[id] = value; saveBag(next); renderBag(); });
    items.append(row);
  });
  document.getElementById('bag-empty').hidden = Object.keys(bag).length !== 0;
  document.getElementById('bag-subtotal').textContent = money(subtotal);
  document.getElementById('bag-checkout').hidden = Object.keys(bag).length === 0;
}
function renderWishlist() {
  const saved = getWishlist();
  document.getElementById('wishlist-grid').replaceChildren(...saved.map(id => card(productById[id])));
  document.getElementById('wishlist-empty').hidden = saved.length !== 0;
  document.getElementById('wishlist-count').textContent = `${saved.length} saved ${saved.length === 1 ? 'product' : 'products'}`;
}
function totals(bag, delivery, promo) {
  const subtotal = Object.entries(bag).reduce((sum, [id, qty]) => sum + productById[id].price * qty, 0);
  const discount = promo.trim().toUpperCase() === 'DEMO10' ? Math.round(subtotal * .1) : 0;
  const shipping = delivery === 'standard' ? 250 : 0;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
function renderCheckout() {
  const bag = getBag(); if (!Object.keys(bag).length) { location.replace('bag.html'); return; }
  const form = document.getElementById('checkout-form');
  const delivery = form.elements.delivery;
  const promo = document.getElementById('promo-code');
  const items = document.getElementById('checkout-items');
  items.replaceChildren(...Object.entries(bag).map(([id, qty]) => { const row = document.createElement('div'); row.className = 'checkout-line'; row.innerHTML = `<span>${productById[id].name} × ${qty}</span><strong>${money(productById[id].price * qty)}</strong>`; return row; }));
  function update() {
    const t = totals(bag, delivery.value, promo.value);
    document.getElementById('checkout-subtotal').textContent = money(t.subtotal);
    document.getElementById('checkout-discount').textContent = t.discount ? `−${money(t.discount)}` : money(0);
    document.getElementById('checkout-shipping').textContent = money(t.shipping);
    document.getElementById('checkout-total').textContent = money(t.total);
  }
  form.addEventListener('change', update); promo.addEventListener('input', update); update();
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const customer = form.elements.customer.value.trim(); const city = form.elements.city.value.trim();
    if (!customer || !city) return;
    const t = totals(bag, delivery.value, promo.value);
    const order = { id: `IS-DEMO-${Date.now().toString(36).toUpperCase()}`, date: new Date().toISOString(), status: 'Demo placed', sample: false, customer: customer.slice(0, 60), city: city.slice(0, 60), delivery: delivery.value, items: Object.entries(bag).map(([id, qty]) => ({ id, qty, price: productById[id].price })), ...t };
    if (!write(ordersKey, [order, ...getOrders()])) { document.getElementById('checkout-error').textContent = 'This browser could not save the demo order. Check that site storage is enabled.'; return; }
    saveBag({}); location.href = `orders.html?order=${encodeURIComponent(order.id)}`;
  });
}
function renderOrders() {
  const all = getOrders(); const list = document.getElementById('orders-list'); const filter = document.getElementById('orders-filter');
  const selectedId = new URLSearchParams(location.search).get('order');
  function draw() {
    const shown = all.filter(order => filter.value === 'all' || (filter.value === 'sample' ? order.sample : !order.sample));
    list.replaceChildren(...shown.map(order => {
      const row = document.createElement('article'); row.className = `order-card${order.id === selectedId ? ' is-highlighted' : ''}`;
      const date = new Date(order.date); const dateText = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date);
      const names = order.items.filter(item => item && productById[item.id]).map(item => `${productById[item.id].name} × ${item.qty}`).join(', ');
      row.innerHTML = `<div class="order-card__head"><div><span class="store-eyebrow">${order.sample ? 'Sample data' : 'Your browser demo'}</span><h2>${escapeHTML(order.id)}</h2></div><span class="order-status">${escapeHTML(order.status)}</span></div><p>${escapeHTML(dateText)} · ${escapeHTML(order.customer || '')} · ${escapeHTML(order.city || '')}</p><p>${escapeHTML(names)}</p><div class="order-card__foot"><span>${order.delivery === 'pickup' ? 'Demo pickup' : 'Demo delivery'}</span><strong>${money(Number(order.total) || 0)}</strong></div>`;
      return row;
    }));
    document.getElementById('orders-empty').hidden = shown.length !== 0;
    document.getElementById('orders-count').textContent = `${shown.length} ${shown.length === 1 ? 'order' : 'orders'}`;
  }
  filter.addEventListener('change', draw); draw();
}
function renderHome() {
  const arrivals = document.getElementById('home-new-grid');
  if (arrivals) arrivals.replaceChildren(...products.slice(4).map(card));
}
updateCounters();
const page = document.body.dataset.page;
if (page === 'home') renderHome();
if (page === 'shop') renderShop();
if (page === 'product') renderProduct();
if (page === 'bag') renderBag();
if (page === 'wishlist') renderWishlist();
if (page === 'checkout') renderCheckout();
if (page === 'orders') renderOrders();
