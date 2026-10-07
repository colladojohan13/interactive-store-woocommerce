/* Interactive portfolio preview. The bag is local to this browser; no orders are sent. */
const products = [
  { id: 'arc-14', name: 'Arc 14', kind: 'Laptop concept', category: 'computers', categoryName: 'Computers', price: 64900, image: 'assets/arc-14-laptop-concept.png', description: 'A refined graphite laptop concept for focused work and everyday creativity. A clean silhouette and considered details bring the design into focus.', story: 'Arc 14 is imagined as a quiet companion for focused work. Its graphite finish and clean form bring a calm feeling to a busy desk.' },
  { id: 'pulse', name: 'Pulse', kind: 'Wireless headphones concept', category: 'electronics', categoryName: 'Electronics', price: 8900, image: 'assets/pulse-headphones-concept.png', description: 'A minimalist over-ear headphone concept with a soft graphite finish, created for immersive everyday listening.', story: 'Pulse pairs a familiar over-ear shape with an understated charcoal finish. The concept feels equally at home on a desk or on the move.' },
  { id: 'link', name: 'Link', kind: 'USB-C dock concept', category: 'accessories', categoryName: 'Accessories', price: 3900, image: 'assets/link-usbc-dock-concept.png', description: 'A compact desktop dock concept that brings a tidy, connected workspace together.', story: 'Link is the small detail that gives a desk a more considered feel. A simple graphite form keeps visual clutter low.' },
  { id: 'haven', name: 'Haven', kind: 'Smart speaker concept', category: 'home-tech', categoryName: 'Home Tech', price: 6900, image: 'assets/haven-smart-speaker-concept.png', description: 'A quiet smart speaker concept with a charcoal woven texture, designed to feel at home in any room.', story: 'Haven brings a soft, woven texture to a compact silhouette. The concept is intended to sit comfortably among everyday objects.' }
];
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const bagKey = 'interactive-store-demo-bag-v1';
const money = value => `RD$${value.toLocaleString('en-US')}`;

function getBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(bagKey) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([id, quantity]) => productById[id] && Number.isInteger(quantity) && quantity > 0 && quantity <= 9));
  } catch { return {}; }
}
function saveBag(bag) {
  try { localStorage.setItem(bagKey, JSON.stringify(bag)); } catch { /* Storage may be unavailable in private browsing. */ }
  updateBagCount();
}
function updateBagCount() {
  const count = Object.values(getBag()).reduce((sum, quantity) => sum + quantity, 0);
  document.querySelectorAll('.bag-count').forEach(element => { element.textContent = count; element.setAttribute('aria-label', `${count} items in bag`); });
}
function card(product) {
  const link = document.createElement('a');
  link.className = 'store-card';
  link.href = `product.html?item=${encodeURIComponent(product.id)}`;
  link.innerHTML = `<span class="store-card__media"><img src="${product.image}" width="1024" height="1024" alt="${product.name} ${product.kind}" loading="lazy"></span><span class="store-card__body"><span class="store-card__eyebrow">${product.categoryName} · Concept</span><strong>${product.name}</strong><span class="store-card__kind">${product.kind}</span><span class="store-card__bottom"><b>${money(product.price)}</b><span aria-hidden="true">↗</span></span></span>`;
  return link;
}
function renderShop() {
  const grid = document.getElementById('catalog-grid');
  const search = document.getElementById('catalog-search');
  const chips = [...document.querySelectorAll('.filter-chip')];
  const queryCategory = new URLSearchParams(location.search).get('category');
  let category = chips.some(chip => chip.dataset.category === queryCategory) ? queryCategory : 'all';
  function draw() {
    const term = search.value.trim().toLowerCase();
    const matches = products.filter(product => (category === 'all' || product.category === category) && `${product.name} ${product.kind} ${product.categoryName}`.toLowerCase().includes(term));
    grid.replaceChildren(...matches.map(card));
    document.getElementById('result-count').textContent = `${matches.length} concept ${matches.length === 1 ? 'product' : 'products'}`;
    document.getElementById('catalog-empty').hidden = matches.length !== 0;
    chips.forEach(chip => { const active = chip.dataset.category === category; chip.classList.toggle('is-active', active); chip.setAttribute('aria-pressed', String(active)); });
  }
  chips.forEach(chip => chip.addEventListener('click', () => { category = chip.dataset.category; const url = new URL(location.href); category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category); history.replaceState(null, '', url); draw(); }));
  search.addEventListener('input', draw);
  draw();
}
function renderProduct() {
  const id = new URLSearchParams(location.search).get('item');
  const product = productById[id];
  if (!product) { location.replace('shop.html'); return; }
  document.title = `${product.name} — Interactive Store`;
  document.querySelector('meta[name="description"]').content = `${product.name}: ${product.kind} in the fictional Interactive Store concept collection.`;
  document.getElementById('breadcrumb-product').textContent = product.name;
  const image = document.getElementById('product-image'); image.src = product.image; image.alt = `${product.name} ${product.kind}`;
  document.getElementById('product-category').textContent = `${product.categoryName} · Concept collection`;
  document.getElementById('product-category-fact').textContent = product.categoryName;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-subtitle').textContent = product.kind;
  document.getElementById('product-price').textContent = money(product.price);
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('story-title').textContent = `Meet ${product.name}.`;
  document.getElementById('story-description').textContent = product.story;
  document.getElementById('related-grid').replaceChildren(...products.filter(item => item.id !== product.id).slice(0, 3).map(card));
  document.getElementById('add-to-bag').addEventListener('click', () => {
    const quantity = Number(document.getElementById('product-quantity').value);
    const feedback = document.getElementById('product-feedback');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9) { feedback.textContent = 'Choose a quantity from 1 to 9.'; return; }
    const bag = getBag(); bag[product.id] = Math.min(9, (bag[product.id] || 0) + quantity); saveBag(bag);
    feedback.replaceChildren(document.createTextNode(`${product.name} added to your demo bag. `));
    const link = document.createElement('a'); link.href = 'bag.html'; link.textContent = 'View bag ↗'; feedback.append(link);
  });
}
function renderBag() {
  const bag = getBag();
  const items = document.getElementById('bag-items');
  items.replaceChildren();
  let subtotal = 0;
  Object.entries(bag).forEach(([id, quantity]) => {
    const product = productById[id]; subtotal += product.price * quantity;
    const row = document.createElement('article'); row.className = 'bag-item';
    row.innerHTML = `<a href="product.html?item=${encodeURIComponent(id)}"><img src="${product.image}" alt="${product.name} ${product.kind}" width="180" height="180"></a><div class="bag-item__details"><span class="store-eyebrow">${product.categoryName} · Concept</span><a href="product.html?item=${encodeURIComponent(id)}">${product.name}</a><span>${product.kind}</span><button type="button" class="bag-remove">Remove</button></div><div class="bag-item__end"><strong>${money(product.price * quantity)}</strong><label>Qty <input type="number" min="1" max="9" value="${quantity}" aria-label="Quantity for ${product.name}"></label></div>`;
    row.querySelector('.bag-remove').addEventListener('click', () => { const next = getBag(); delete next[id]; saveBag(next); renderBag(); });
    row.querySelector('input').addEventListener('change', event => { const next = getBag(); const value = Number(event.target.value); if (!Number.isInteger(value) || value < 1 || value > 9) { event.target.value = next[id]; return; } next[id] = value; saveBag(next); renderBag(); });
    items.append(row);
  });
  document.getElementById('bag-empty').hidden = Object.keys(bag).length !== 0;
  document.getElementById('bag-subtotal').textContent = money(subtotal);
}
updateBagCount();
const page = document.body.dataset.page;
if (page === 'shop') renderShop();
if (page === 'product') renderProduct();
if (page === 'bag') renderBag();
