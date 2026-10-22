/* Interactive Store portfolio demo. All state is local to this browser. */
const products = [
  { id: 'arc-14', name: 'Arc 14', kind: 'Laptop concept', category: 'computers', categoryName: 'Computers', price: 64900, image: 'assets/arc-14-laptop-concept.jpg', label: 'Featured', description: 'A refined graphite laptop concept for focused work and everyday creativity. A clean silhouette and considered details bring the design into focus.', story: 'Arc 14 is imagined as a quiet companion for focused work. Its graphite finish and clean form bring a calm feeling to a busy desk.' },
  { id: 'pulse', name: 'Pulse', kind: 'Wireless headphones concept', category: 'electronics', categoryName: 'Electronics', price: 8900, compareAt: 10900, image: 'assets/pulse-headphones-concept.png', label: 'Featured', description: 'A minimalist over-ear headphone concept with a soft graphite finish, created for immersive everyday listening.', story: 'Pulse pairs a familiar over-ear shape with an understated charcoal finish. The concept feels equally at home on a desk or on the move.' },
  { id: 'link', name: 'Link', kind: 'USB-C dock concept', category: 'accessories', categoryName: 'Accessories', price: 3900, image: 'assets/link-usbc-dock-concept.png', label: 'Featured', description: 'A compact desktop dock concept that brings a tidy, connected workspace together.', story: 'Link is the small detail that gives a desk a more considered feel. A simple graphite form keeps visual clutter low.' },
  { id: 'haven', name: 'Haven', kind: 'Smart speaker concept', category: 'home-tech', categoryName: 'Home Tech', price: 6900, image: 'assets/haven-smart-speaker-concept.png', label: 'Featured', description: 'A quiet smart speaker concept with a charcoal woven texture, designed to feel at home in any room.', story: 'Haven brings a soft, woven texture to a compact silhouette. The concept is intended to sit comfortably among everyday objects.' },
  { id: 'vista', name: 'Vista', kind: 'Desktop monitor concept', category: 'computers', categoryName: 'Computers', price: 28900, compareAt: 32900, image: 'assets/vista-monitor-concept.png', label: 'New concept', description: 'A slim graphite desktop monitor concept with a calm, expansive screen for creative work.', story: 'Vista brings a quiet, spacious focal point to a desk. The restrained frame lets the screen take center stage.' },
  { id: 'frame', name: 'Frame', kind: 'Digital camera concept', category: 'electronics', categoryName: 'Electronics', price: 35900, image: 'assets/frame-camera-concept.png', label: 'New concept', description: 'A compact graphite camera concept made for capturing the moments worth keeping.', story: 'Frame is imagined for everyday makers. Its straightforward form keeps attention on the moment in front of the lens.' },
  { id: 'form', name: 'Form', kind: 'Wireless keyboard concept', category: 'accessories', categoryName: 'Accessories', price: 5400, image: 'assets/form-keyboard-concept.png', label: 'New concept', description: 'A compact graphite keyboard concept for a focused, uncluttered workspace.', story: 'Form balances familiar keys with an understated silhouette. It feels at home alongside the rest of the collection.' },
  { id: 'glow', name: 'Glow', kind: 'Desk lamp concept', category: 'home-tech', categoryName: 'Home Tech', price: 7900, compareAt: 9900, image: 'assets/glow-lamp-concept.png', label: 'New concept', description: 'A slim graphite desk lamp concept with a warm, comfortable glow for late projects.', story: 'Glow adds a warmer note to the workspace. Its curved arm and simple base keep the look light and composed.' },
  { id: 'drift-hoodie', name: 'Drift Hoodie', kind: 'Forest green hoodie concept', category: 'fashion', categoryName: 'Fashion', price: 3900, compareAt: 4800, image: 'assets/forest-hoodie-concept.webp', label: 'Everyday edit', description: 'A relaxed forest green hoodie concept with a heavyweight feel for easy everyday layering.', story: 'Drift brings a calm color and comfortable shape to the collection. The garment, image and price are fictional portfolio concepts.' },
  { id: 'studio-overshirt', name: 'Studio Overshirt', kind: 'Sand overshirt concept', category: 'fashion', categoryName: 'Fashion', price: 4800, image: 'assets/sand-overshirt-concept.webp', label: 'Everyday edit', description: 'A versatile sand-colored overshirt concept with a relaxed cut and considered pocket details.', story: 'Studio is imagined as the layer you reach for across changing seasons. Its neutral color works with the rest of the everyday edit.' },
  { id: 'night-bomber', name: 'Nightfall Bomber', kind: 'Charcoal bomber concept', category: 'fashion', categoryName: 'Fashion', price: 6900, image: 'assets/charcoal-bomber-concept.webp', label: 'Everyday edit', description: 'A clean charcoal bomber concept with understated hardware and a lightweight silhouette.', story: 'Nightfall keeps the familiar bomber shape minimal, with subtle texture and a dark finish designed for daily wear.' },
  { id: 'softline-tee', name: 'Softline Tee', kind: 'Mauve T-shirt concept', category: 'fashion', categoryName: 'Fashion', price: 2500, image: 'assets/mauve-tee-concept.webp', label: 'Everyday edit', description: 'A soft dusty-mauve crewneck tee concept with a relaxed fit and simple, timeless shape.', story: 'Softline gives the collection a gentle accent color. Its easy silhouette brings comfort into the everyday edit.' }
];
const sampleReviews = {
  'arc-14': [{ name: 'Avery Example', rating: 5, comment: 'The gallery makes it easy to see the laptop concept from different angles.' }, { name: 'Jordan Demo', rating: 4, comment: 'I like the clean presentation and the separate 3D preview.' }],
  pulse: [{ name: 'Riley Sample', rating: 5, comment: 'The close-up image gives the headphones a polished look.' }, { name: 'Casey Demo', rating: 4, comment: 'A clear product page with just the details I need for this concept.' }],
  link: [{ name: 'Alex Example', rating: 4, comment: 'Simple desk setup, and the product is easy to find in the collection.' }, { name: 'Morgan Demo', rating: 5, comment: 'The compact shape works nicely alongside the laptop concept.' }],
  haven: [{ name: 'Taylor Sample', rating: 5, comment: 'The woven texture looks great in the lifestyle image.' }, { name: 'Sam Example', rating: 4, comment: 'The page communicates the speaker concept clearly.' }],
  vista: [{ name: 'Jamie Demo', rating: 5, comment: 'A calm monitor design that fits the rest of the collection.' }, { name: 'Robin Sample', rating: 4, comment: 'The large image helps me imagine it on a desk.' }],
  frame: [{ name: 'Drew Example', rating: 4, comment: 'The camera concept has a clean, familiar shape.' }, { name: 'Lee Demo', rating: 5, comment: 'I like how quickly I can move from the catalog to the full view.' }],
  form: [{ name: 'Sky Sample', rating: 5, comment: 'The keyboard looks right at home in a minimal workspace.' }, { name: 'Pat Demo', rating: 4, comment: 'Good balance of image, description and clear actions.' }],
  glow: [{ name: 'Quinn Example', rating: 5, comment: 'The warm light adds a nice contrast to the graphite collection.' }, { name: 'Devon Demo', rating: 4, comment: 'The image tells the story of this desk lamp concept well.' }],
  'drift-hoodie': [{ name: 'Alex Example', rating: 5, comment: 'The forest green color works beautifully in this clothing concept.' }, { name: 'Morgan Demo', rating: 4, comment: 'The hanging product image makes the hoodie easy to inspect.' }],
  'studio-overshirt': [{ name: 'Riley Sample', rating: 5, comment: 'The neutral color and pockets give the overshirt a versatile look.' }, { name: 'Jamie Demo', rating: 4, comment: 'I like seeing the garment presented clearly from the front.' }],
  'night-bomber': [{ name: 'Casey Example', rating: 5, comment: 'A clean bomber silhouette with understated details.' }, { name: 'Taylor Demo', rating: 4, comment: 'The charcoal finish fits the wider collection.' }],
  'softline-tee': [{ name: 'Sam Sample', rating: 5, comment: 'The mauve tone adds a softer option to the edit.' }, { name: 'Jordan Demo', rating: 4, comment: 'A simple piece that is easy to imagine in a wardrobe.' }]
};
const productById = Object.fromEntries(products.map(product => [product.id, product]));
const bagKey = 'interactive-store-demo-bag-v1';
const wishlistKey = 'interactive-store-demo-wishlist-v1';
const ordersKey = 'interactive-store-demo-orders-v1';
const recentKey = 'interactive-store-demo-recent-v1';
const reviewsKey = 'interactive-store-demo-reviews-v1';
const money = value => `RD$${Math.round(value).toLocaleString('en-US')}`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
function getLocalReviews(id) {
  const all = read(reviewsKey, {});
  const entries = all && typeof all === 'object' && !Array.isArray(all) ? all[id] : null;
  return Array.isArray(entries) ? entries.filter(item => item && typeof item.name === 'string' && typeof item.comment === 'string' && Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5).slice(0, 10) : [];
}
function getRating(id) {
  const entries = [...sampleReviews[id], ...getLocalReviews(id)];
  return { average: entries.reduce((total, item) => total + item.rating, 0) / entries.length, count: entries.length };
}
function ratingMarkup(id, href = false) {
  const { average, count } = getRating(id);
  const content = `<span class="rating-number">${average.toFixed(1)}</span><span class="rating-stars" style="--rating-fill:${average * 20}%" aria-hidden="true">★★★★★</span><span class="rating-count">(${count} demo reviews)</span>`;
  return href ? `<a class="product-rating-link" href="#product-reviews" aria-label="${average.toFixed(1)} out of 5 from ${count} demo reviews. Read reviews">${content}</a>` : `<span class="store-card__rating" aria-label="${average.toFixed(1)} out of 5 from ${count} demo reviews">${content}</span>`;
}
const salePercent = product => product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
const priceMarkup = product => `<span class="current-price">${money(product.price)}</span>${product.compareAt ? `<del class="original-price">${money(product.compareAt)}</del>` : ''}`;
function setupHeader() {
  const header = document.querySelector('.preview-header');
  if (!header) return;
  const inner = header.querySelector('.preview-header__inner');
  const nav = header.querySelector('.preview-nav');
  const oldBag = header.querySelector('.preview-header__cta');
  const page = document.body.dataset.page;
  const currentCategory = page === 'shop' ? new URLSearchParams(location.search).get('category') : null;
  const active = (name) => page === name ? ' aria-current="page"' : '';
  const categoryActive = (name) => currentCategory === name ? ' aria-current="page"' : '';
  nav.innerHTML = `<strong class="preview-nav__title">Browse Interactive Store</strong><a href="index.html"${active('home')}>Home</a><a href="shop.html"${(page === 'shop' && !currentCategory) || page === 'product' ? ' aria-current="page"' : ''}>Shop</a><a href="shop.html?category=computers"${categoryActive('computers')}>Computers</a><a href="shop.html?category=electronics"${categoryActive('electronics')}>Electronics</a><a href="shop.html?category=accessories"${categoryActive('accessories')}>Accessories</a><a href="shop.html?category=home-tech"${categoryActive('home-tech')}>Home Tech</a><a href="shop.html?category=fashion"${categoryActive('fashion')}>Fashion</a><a href="wishlist.html"${active('wishlist')}>Wishlist <span class="wish-count">0</span></a><a class="nav-mobile-orders" href="orders.html"${active('orders')}>My demo orders</a>`;
  nav.id = 'preview-main-nav';
  oldBag?.remove();
  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>',
    camera: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h4l1.5-2h7L17 7h4v12H3z"></path><circle cx="12" cy="13" r="3.5"></circle><path d="m19 2 1 2 2 1-2 1-1 2-1-2-2-1 2-1z"></path></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3"></rect><path d="M6 11a6 6 0 0 0 12 0M12 17v4m-4 0h8"></path></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-7.1 7-12a7 7 0 0 0-14 0c0 4.9 7 12 7 12z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 11.2h11.8L21 8H6"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10h-6v-6H9v6H3z"></path></svg>',
    shop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h18l-1.5 12h-15zM5 9l2-6h10l2 6M9 13v4m6-4v4"></path></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.2-8.8 11-8.8 11s-8.8-6.8-8.8-11a5.2 5.2 0 0 1 8.8-3.7 5.2 5.2 0 0 1 8.8 3.7z"></path></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>'
  };
  const actions = document.createElement('div'); actions.className = 'preview-header__actions';
  actions.innerHTML = `<a class="header-account" href="orders.html"${active('orders')}>Demo orders</a><a class="header-bag" href="bag.html" aria-label="Demo bag"${active('bag')}>${icons.bag}<span class="bag-count">0</span></a>`;
  inner.append(actions);
  const searchShell = document.createElement('div'); searchShell.className = 'header-search-shell';
  searchShell.innerHTML = `<div class="header-search-line"><form id="header-search-form" class="header-search-form" role="search"><button class="header-search-submit" type="submit" aria-label="Search products">${icons.search}</button><label class="header-visually-hidden" for="header-search-input">Search products and categories</label><input id="header-search-input" type="search" placeholder="Search products and categories" autocomplete="off" maxlength="80"><span class="header-search-tools"><button type="button" disabled title="Image search coming soon" aria-label="Image search, coming soon">${icons.camera}</button><button type="button" disabled title="Voice search coming soon" aria-label="Voice search, coming soon">${icons.mic}</button></span></form><button class="header-location" type="button" disabled title="Location search coming soon" aria-label="Location search, coming soon">${icons.pin}</button></div><div id="header-search-panel" class="header-search-panel" hidden><p>Popular in the store</p><div id="header-search-results" class="header-search-results" aria-live="polite"></div><a id="header-search-all" class="header-search-all" href="shop.html">View all products ↗</a></div>`;
  inner.append(searchShell);
  const categoryStrip = document.createElement('nav'); categoryStrip.className = 'header-category-strip'; categoryStrip.setAttribute('aria-label', 'Quick categories');
  categoryStrip.innerHTML = `<a href="shop.html?category=computers"${categoryActive('computers')}>Computers</a><a href="shop.html?category=electronics"${categoryActive('electronics')}>Electronics</a><a href="shop.html?category=fashion"${categoryActive('fashion')}>Fashion</a><a href="shop.html?category=accessories"${categoryActive('accessories')}>Accessories</a><a href="shop.html?category=home-tech"${categoryActive('home-tech')}>Home Tech</a>`;
  inner.append(categoryStrip);
  const bottomNav = document.createElement('nav'); bottomNav.className = 'mobile-bottom-nav'; bottomNav.setAttribute('aria-label', 'Mobile navigation');
  bottomNav.innerHTML = `<a href="index.html"${active('home')}>${icons.home}<span>Home</span></a><a href="shop.html"${page === 'shop' || page === 'product' ? ' aria-current="page"' : ''}>${icons.shop}<span>Shop</span></a><a href="wishlist.html"${active('wishlist')}>${icons.heart}<span>Saved</span><b class="wish-count">0</b></a><a href="bag.html"${page === 'bag' || page === 'checkout' ? ' aria-current="page"' : ''}>${icons.bag}<span>Bag</span><b class="bag-count">0</b></a><button id="header-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="preview-main-nav">${icons.menu}<span>Menu</span></button>`;
  header.append(bottomNav);
  const panel = document.getElementById('header-search-panel');
  const menuToggle = document.getElementById('header-menu-toggle');
  const searchInput = document.getElementById('header-search-input');
  const results = document.getElementById('header-search-results');
  const allLink = document.getElementById('header-search-all');
  function closeSearch() { panel.hidden = true; }
  function closeMenu(returnFocus = false) { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open menu'); if (returnFocus) menuToggle.focus(); }
  function drawSuggestions() {
    const term = searchInput.value.trim().toLowerCase();
    const matches = products.filter(product => `${product.name} ${product.kind} ${product.categoryName}`.toLowerCase().includes(term)).slice(0, 4);
    results.replaceChildren();
    if (!matches.length) { const empty = document.createElement('p'); empty.textContent = 'No products found. Try another search or browse the collection.'; results.append(empty); }
    else matches.forEach(product => {
      const link = document.createElement('a'); link.href = `product.html?item=${encodeURIComponent(product.id)}`;
      link.innerHTML = `<img src="${product.image}" alt="" width="64" height="64"><span><strong>${product.name}</strong><small>${product.kind}</small></span><b>${money(product.price)}</b>`;
      results.append(link);
    });
    allLink.href = term ? `shop.html?q=${encodeURIComponent(searchInput.value.trim())}` : 'shop.html';
    allLink.textContent = term ? `View all results for “${searchInput.value.trim()}” ↗` : 'View all products ↗';
  }
  searchInput.addEventListener('focus', () => { closeMenu(); drawSuggestions(); panel.hidden = false; });
  menuToggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('is-open'); closeSearch(); nav.classList.toggle('is-open', opening);
    menuToggle.setAttribute('aria-expanded', String(opening)); menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  });
  searchInput.addEventListener('input', () => { drawSuggestions(); panel.hidden = false; });
  document.getElementById('header-search-form').addEventListener('submit', event => {
    event.preventDefault();
    location.href = searchInput.value.trim() ? `shop.html?q=${encodeURIComponent(searchInput.value.trim())}` : 'shop.html';
  });
  nav.addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!panel.hidden) closeSearch(); else if (nav.classList.contains('is-open')) closeMenu(true); } });
  document.addEventListener('click', event => { if (!searchShell.contains(event.target)) closeSearch(); if (!header.contains(event.target)) closeMenu(); });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
}
function getBag() {
  const value = read(bagKey, {});
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, qty]) => productById[id] && Number.isInteger(qty) && qty > 0 && qty <= 9));
}
function getWishlist() {
  const value = read(wishlistKey, []);
  return Array.isArray(value) ? [...new Set(value.filter(id => productById[id]))] : [];
}
function getRecent() {
  const value = read(recentKey, []);
  return Array.isArray(value) ? [...new Set(value.filter(id => productById[id]))].slice(0, 4) : [];
}
function rememberProduct(id) { write(recentKey, [id, ...getRecent().filter(item => item !== id)].slice(0, 4)); }
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
  document.querySelector('.header-bag')?.setAttribute('aria-label', `Demo bag, ${count} ${count === 1 ? 'item' : 'items'}`);
  document.querySelectorAll('.wish-count').forEach(el => { const n = getWishlist().length; el.textContent = n; el.setAttribute('aria-label', `${n} saved products`); });
}
function saveBag(bag) { write(bagKey, bag); updateCounters(); }
function animateProductToBag(product, trigger) {
  if (!trigger || matchMedia('(prefers-reduced-motion: reduce)').matches || document.visibilityState !== 'visible') return;
  const target = document.querySelector('.header-bag');
  if (!target || !Element.prototype.animate) return;
  const image = trigger.closest('.store-card')?.querySelector('.store-card__media img')
    || trigger.closest('.quick-view')?.querySelector('#quick-view-image')
    || trigger.closest('.home-discover')?.querySelector('#discover-image')
    || trigger.closest('.home-carousel')?.querySelector('.home-carousel__slide[data-position="0"] .home-carousel__face--front img')
    || trigger.closest('.fashion-rail')?.querySelector('.fashion-rail__item.is-active img')
    || document.getElementById('product-image');
  let sourceRect = image?.getBoundingClientRect();
  if (!sourceRect || sourceRect.width < 10 || sourceRect.left + sourceRect.width / 2 < 0 || sourceRect.left + sourceRect.width / 2 > innerWidth || sourceRect.top + sourceRect.height / 2 < 0 || sourceRect.top + sourceRect.height / 2 > innerHeight) sourceRect = trigger.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.top + sourceRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;
  const dx = endX - startX;
  const dy = endY - startY;
  const flyer = document.createElement('img');
  flyer.className = 'bag-fly-item';
  flyer.src = image?.currentSrc || product.image;
  flyer.alt = '';
  flyer.setAttribute('aria-hidden', 'true');
  flyer.style.left = `${startX}px`;
  flyer.style.top = `${startY}px`;
  document.body.append(flyer);
  const flight = flyer.animate([
    { transform: 'translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg)', opacity: 1, offset: 0 },
    { transform: `translate(-50%, -50%) translate(${dx * .46}px, ${dy * .26 - 58}px) scale(.82) rotate(-7deg)`, opacity: 1, offset: .46 },
    { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(.16) rotate(8deg)`, opacity: .2, offset: 1 }
  ], { duration: 920, easing: 'ease-in-out', fill: 'forwards' });
  flight.finished.then(() => {
    target.animate([
      { transform: 'scale(1)' }, { transform: 'scale(1.24)', offset: .42 }, { transform: 'scale(1)' }
    ], { duration: 360, easing: 'ease-out' });
    flyer.remove();
  }).catch(() => flyer.remove());
}
function addToBag(id, qty = 1, trigger = null) {
  if (!productById[id]) return false;
  const bag = getBag();
  const next = Math.min(9, (bag[id] || 0) + qty);
  if (next === bag[id]) return false;
  bag[id] = next;
  saveBag(bag);
  animateProductToBag(productById[id], trigger);
  return true;
}
let noticeTimer;
function showBagNotice(product) {
  let notice = document.getElementById('bag-notice');
  if (!notice) {
    notice = document.createElement('div'); notice.id = 'bag-notice'; notice.className = 'bag-notice';
    notice.setAttribute('role', 'status'); document.body.append(notice);
  }
  notice.replaceChildren(document.createTextNode(`${product.name} added to your demo bag. `));
  const link = document.createElement('a'); link.href = 'bag.html'; link.textContent = 'View bag ↗'; notice.append(link);
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { notice.hidden = true; }, 6000);
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
function openQuickView(product, trigger) {
  let dialog = document.getElementById('quick-view');
  if (!dialog) {
    dialog = document.createElement('dialog'); dialog.id = 'quick-view'; dialog.className = 'quick-view';
    dialog.setAttribute('aria-labelledby', 'quick-view-title');
    dialog.innerHTML = `<button class="quick-view__close" type="button" aria-label="Close quick view">×</button><div class="quick-view__layout"><div class="quick-view__media"><img id="quick-view-image" width="600" height="600" alt=""></div><div class="quick-view__info"><p class="store-eyebrow" id="quick-view-category"></p><h2 id="quick-view-title"></h2><p id="quick-view-kind" class="quick-view__kind"></p><div id="quick-view-rating"></div><div id="quick-view-price" class="quick-view__price"></div><p id="quick-view-description" class="quick-view__description"></p><p class="quick-view__note">Fictional concept · Illustrative prices and reviews · No payment</p><div class="quick-view__actions"><button id="quick-view-add" class="store-button" type="button">Add to cart</button><button id="quick-view-save" class="quick-view__save" type="button"></button></div><a id="quick-view-details" class="quick-view__details" href="product.html">See full product details and reviews ↗</a></div></div>`;
    document.body.append(dialog);
    dialog.querySelector('.quick-view__close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
  const set = (id, value) => { dialog.querySelector(id).textContent = value; };
  const image = dialog.querySelector('#quick-view-image'); image.src = product.image; image.alt = `${product.name} ${product.kind}`;
  set('#quick-view-category', `${product.categoryName} · Concept collection`);
  set('#quick-view-title', product.name); set('#quick-view-kind', product.kind);
  dialog.querySelector('#quick-view-rating').innerHTML = ratingMarkup(product.id);
  dialog.querySelector('#quick-view-price').innerHTML = priceMarkup(product);
  set('#quick-view-description', product.description);
  dialog.querySelector('#quick-view-details').href = `product.html?item=${encodeURIComponent(product.id)}`;
  dialog.querySelector('#quick-view-add').onclick = event => { const added = addToBag(product.id, 1, event.currentTarget); dialog.close(); if (added) showBagNotice(product); };
  const save = dialog.querySelector('#quick-view-save');
  const syncSave = () => { const saved = getWishlist().includes(product.id); save.textContent = saved ? '♥ Saved' : '♡ Save'; save.setAttribute('aria-pressed', String(saved)); };
  save.onclick = () => { toggleWishlist(product.id); syncSave(); }; syncSave();
  dialog.addEventListener('close', () => trigger.focus(), { once: true });
  if (dialog.showModal) dialog.showModal(); else location.href = `product.html?item=${encodeURIComponent(product.id)}`;
}
function card(product) {
  const article = document.createElement('article'); article.className = 'store-card';
  article.innerHTML = `<a class="store-card__link" href="product.html?item=${encodeURIComponent(product.id)}"><span class="store-card__media"><img src="${product.image}" width="1024" height="1024" alt="${product.name} ${product.kind}" loading="lazy">${product.compareAt ? `<span class="sale-badge">−${salePercent(product)}% <small>demo offer</small></span>` : ''}</span><span class="store-card__body"><span class="store-card__eyebrow">${product.categoryName} · Concept</span><strong>${product.name}</strong><span class="store-card__kind">${product.kind}</span>${ratingMarkup(product.id)}<span class="store-card__bottom"><b>${priceMarkup(product)}</b><span aria-hidden="true">↗</span></span></span></a><button class="wish-button" type="button" data-wish-id="${product.id}"></button><div class="store-card__actions"><button class="store-card__peek" type="button" aria-label="Quick view ${product.name}">Quick view</button><button class="store-card__add" type="button" aria-label="Add ${product.name} to demo cart">Add to cart</button></div>`;
  const button = article.querySelector('.wish-button'); setWishState(button, getWishlist().includes(product.id));
  button.addEventListener('click', () => toggleWishlist(product.id));
  article.querySelector('.store-card__peek').addEventListener('click', event => openQuickView(product, event.currentTarget));
  article.querySelector('.store-card__add').addEventListener('click', event => { if (addToBag(product.id, 1, event.currentTarget)) showBagNotice(product); });
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
  const params = new URLSearchParams(location.search);
  const queryCategory = params.get('category');
  let category = chips.some(chip => chip.dataset.category === queryCategory) ? queryCategory : 'all';
  let draftCategory = category;
  let committedPrice = [...price.options].some(option => option.value && option.value === params.get('price')) ? params.get('price') : '';
  let committedSort = [...sort.options].some(option => option.value === params.get('sort')) ? params.get('sort') : 'featured';
  search.value = (params.get('q') || '').slice(0, 80);
  price.value = committedPrice; sort.value = committedSort;
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
  function syncUrl() {
    const url = new URL(location.href);
    const values = { category: category === 'all' ? '' : category, q: search.value.trim(), price: committedPrice, sort: committedSort === 'featured' ? '' : committedSort };
    Object.entries(values).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    history.replaceState(null, '', url);
  }
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
    if (search.value.trim()) addApplied(`Search: ${search.value.trim()}`, () => { search.value = ''; syncUrl(); draw(); search.focus(); });
    if (category !== 'all') addApplied(chips.find(chip => chip.dataset.category === category).textContent, () => { category = 'all'; draftCategory = category; syncUrl(); draw(); });
    if (committedPrice) addApplied([...price.options].find(option => option.value === committedPrice).textContent, () => { committedPrice = ''; price.value = ''; syncUrl(); draw(); });
    if (committedSort !== 'featured') addApplied([...sort.options].find(option => option.value === committedSort).textContent, () => { committedSort = 'featured'; sort.value = 'featured'; syncUrl(); draw(); });
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
  [sort, price].forEach(input => input.addEventListener('change', () => { if (mobile.matches && controls.classList.contains('is-open')) updateApply(); else { committedPrice = price.value; committedSort = sort.value; syncUrl(); draw(); } }));
  search.addEventListener('input', () => { syncUrl(); draw(); if (controls.classList.contains('is-open')) updateApply(); });
  const recent = getRecent();
  const recentSection = document.getElementById('recently-viewed');
  recentSection.hidden = recent.length === 0;
  if (recent.length) document.getElementById('recent-grid').replaceChildren(...recent.map(id => card(productById[id])));
  draw();
}
function renderReviews(product) {
  const list = document.getElementById('product-review-list');
  const summary = document.getElementById('reviews-summary');
  const form = document.getElementById('product-review-form');
  const feedback = document.getElementById('review-feedback');
  const choices = [...form.querySelectorAll('input[name="rating"]')];
  function draw() {
    const local = getLocalReviews(product.id);
    const { average, count } = getRating(product.id);
    document.getElementById('product-rating').innerHTML = ratingMarkup(product.id, true);
    summary.innerHTML = `<strong>${average.toFixed(1)}<span> / 5</span></strong><span class="rating-stars" style="--rating-fill:${average * 20}%" aria-hidden="true">★★★★★</span><small>${count} demo reviews</small>`;
    list.replaceChildren(...[...local.map((item, index) => ({ ...item, localIndex: index })), ...sampleReviews[product.id].map(item => ({ ...item, sample: true }))].map(item => {
      const article = document.createElement('article'); article.className = 'review-card';
      article.innerHTML = `<div class="review-card__top"><span class="rating-stars" style="--rating-fill:${item.rating * 20}%" aria-label="${item.rating} out of 5 stars">★★★★★</span><small>${item.sample ? 'Fictional example' : 'Saved in this browser'}</small></div><h3>${escapeHTML(item.name.slice(0, 40))}</h3><p>${escapeHTML(item.comment.slice(0, 300))}</p>`;
      if (!item.sample) {
        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'review-card__remove'; remove.textContent = 'Remove my demo review';
        remove.addEventListener('click', () => {
          const all = read(reviewsKey, {}); const safeAll = all && typeof all === 'object' && !Array.isArray(all) ? all : {}; const current = getLocalReviews(product.id);
          current.splice(item.localIndex, 1); safeAll[product.id] = current;
          if (write(reviewsKey, safeAll)) { feedback.textContent = 'Your demo review was removed.'; draw(); }
          else feedback.textContent = 'This browser could not update your demo reviews.';
        });
        article.append(remove);
      }
      return article;
    }));
  }
  form.addEventListener('change', () => { const rating = Number(form.elements.rating.value); choices.forEach(input => input.parentElement.classList.toggle('is-selected', Number(input.value) <= rating)); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim(); const comment = form.elements.comment.value.trim(); const rating = Number(form.elements.rating.value);
    if (!name || comment.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) { feedback.textContent = 'Choose a rating and write at least 10 characters.'; return; }
    const all = read(reviewsKey, {}); const safeAll = all && typeof all === 'object' && !Array.isArray(all) ? all : {};
    safeAll[product.id] = [{ name: name.slice(0, 40), comment: comment.slice(0, 300), rating }, ...getLocalReviews(product.id)].slice(0, 10);
    if (!write(reviewsKey, safeAll)) { feedback.textContent = 'This browser could not save your review. Check that site storage is enabled.'; return; }
    form.reset(); choices.forEach(input => input.parentElement.classList.remove('is-selected'));
    feedback.textContent = 'Your demo review is now visible in this browser.';
    draw();
  });
  draw();
}
function renderProduct() {
  const product = productById[new URLSearchParams(location.search).get('item')];
  if (!product) { location.replace('shop.html'); return; }
  rememberProduct(product.id);
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
  document.getElementById('product-price').innerHTML = priceMarkup(product);
  document.getElementById('product-sale-note').hidden = !product.compareAt;
  if (product.compareAt) document.getElementById('product-sale-percent').textContent = `Save ${salePercent(product)}% ·`;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('story-title').textContent = `Meet ${product.name}.`;
  document.getElementById('story-description').textContent = product.story;
  renderReviews(product);
  document.getElementById('related-grid').replaceChildren(...products.filter(item => item.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 3).map(card));
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
      iframe.title = 'Separate laptop 3D demonstration';
      iframe.loading = 'lazy'; iframe.allow = 'fullscreen; xr-spatial-tracking'; iframe.allowFullscreen = true;
      window.addEventListener('message', event => {
        if (event.origin !== 'https://docs.cecomsa.com' || event.source !== iframe.contentWindow || event.data?.type !== 'laptop-viewer-height') return;
        const height = Number(event.data.height);
        if (Number.isFinite(height) && height >= 300 && height <= 1600) iframe.style.height = `${Math.ceil(height)}px`;
      });
      iframe.src = 'https://docs.cecomsa.com/laptop-3d/index.html';
      frame.replaceChildren(iframe);
      load.hidden = true;
    }
    load.addEventListener('click', loadViewer);
    demo3d.addEventListener('click', () => { loadViewer(); });
  }
  document.getElementById('add-to-bag').addEventListener('click', event => {
    const quantity = Number(document.getElementById('product-quantity').value);
    const feedback = document.getElementById('product-feedback');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9) { feedback.textContent = 'Choose a quantity from 1 to 9.'; return; }
    if (!addToBag(product.id, quantity, event.currentTarget)) { feedback.textContent = 'The demo bag allows up to 9 of this product.'; return; }
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
function renderFashionRail() {
  const rail = document.getElementById('fashion-rail-items');
  if (!rail) return;
  const clothing = products.filter(product => product.category === 'fashion');
  let selected = clothing[0];
  const items = clothing.map((product, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'fashion-rail__item';
    button.setAttribute('aria-label', `Show ${product.name}`);
    button.innerHTML = `<img src="${product.image}" width="900" height="900" alt="" loading="lazy"><span>${String(index + 1).padStart(2, '0')} / ${product.name}</span>`;
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') select(product); });
    button.addEventListener('focus', () => select(product));
    button.addEventListener('click', () => select(product));
    return button;
  });
  rail.replaceChildren(...items);
  const save = document.getElementById('fashion-save');
  function select(product) {
    selected = product;
    items.forEach((button, index) => {
      const current = clothing[index].id === product.id;
      button.classList.toggle('is-active', current);
      button.setAttribute('aria-pressed', String(current));
    });
    document.getElementById('fashion-name').textContent = product.name;
    document.getElementById('fashion-description').textContent = product.description;
    document.getElementById('fashion-price').innerHTML = priceMarkup(product);
    document.getElementById('fashion-rating').innerHTML = ratingMarkup(product.id);
    document.getElementById('fashion-link').href = `product.html?item=${encodeURIComponent(product.id)}`;
    save.dataset.wishId = product.id;
    setWishState(save, getWishlist().includes(product.id));
  }
  rail.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = (clothing.indexOf(selected) + (event.key === 'ArrowRight' ? 1 : -1) + clothing.length) % clothing.length;
    items[next].focus();
  });
  document.getElementById('fashion-add').addEventListener('click', event => { if (addToBag(selected.id, 1, event.currentTarget)) showBagNotice(selected); });
  save.addEventListener('click', () => toggleWishlist(selected.id));
  select(selected);
}
function setupDiscover() {
  const stage = document.getElementById('discover-stage');
  if (!stage) return;
  const choices = [...document.querySelectorAll('[data-discover]')];
  const image = document.getElementById('discover-image');
  const add = document.getElementById('discover-add');
  let active = productById['arc-14'];
  let animationTimer;
  function select(id) {
    const product = productById[id];
    if (!product || product.id === active.id) return;
    active = product;
    choices.forEach(button => {
      const selected = button.dataset.discover === id;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    image.src = product.image;
    image.alt = `${product.name} ${product.kind}`;
    document.getElementById('discover-category').textContent = `${product.categoryName} · Concept`;
    document.getElementById('discover-name').textContent = product.name;
    document.getElementById('discover-description').textContent = product.description;
    document.getElementById('discover-price').textContent = money(product.price);
    document.getElementById('discover-link').href = `product.html?item=${encodeURIComponent(product.id)}`;
    if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      stage.classList.remove('is-changing');
      void stage.offsetWidth;
      stage.classList.add('is-changing');
      clearTimeout(animationTimer);
      animationTimer = setTimeout(() => stage.classList.remove('is-changing'), 450);
    }
  }
  choices.forEach((button, index) => {
    button.addEventListener('click', () => select(button.dataset.discover));
    button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const next = choices[(index + (event.key === 'ArrowRight' ? 1 : -1) + choices.length) % choices.length];
      next.focus();
      select(next.dataset.discover);
    });
  });
  add.addEventListener('click', event => { if (addToBag(active.id, 1, event.currentTarget)) showBagNotice(active); });
}
function renderHome() {
  const arrivals = document.getElementById('home-new-grid');
  if (arrivals) arrivals.replaceChildren(...products.slice(4, 8).map(card));
  const featured = document.getElementById('home-featured-grid');
  if (featured) featured.replaceChildren(...['pulse', 'drift-hoodie', 'arc-14', 'haven'].map(id => card(productById[id])));
  const carousel = document.getElementById('home-carousel');
  if (!carousel) return;
  const track = document.getElementById('carousel-track');
  const dots = document.getElementById('carousel-dots');
  const viewport = document.getElementById('carousel-viewport');
  let active = 0;
  const slides = products.map((product, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'home-carousel__slide';
    button.innerHTML = `<span class="home-carousel__flip"><span class="home-carousel__face home-carousel__face--front" aria-hidden="true">${product.compareAt ? `<span class="home-carousel__sale">−${salePercent(product)}%</span>` : ''}<img src="${product.image}" alt="" width="1024" height="1024" loading="lazy"><span><strong>${product.name}</strong><small>${product.categoryName}</small></span></span><span class="home-carousel__face home-carousel__face--back" aria-hidden="true"><small>${product.categoryName} · Concept</small><strong>${product.name}</strong><span>${product.description}</span><b>${money(product.price)}</b></span></span>`;
    button.addEventListener('click', () => {
      if (index === active) button.classList.toggle('is-flipped');
      else select(index);
    });
    return button;
  });
  const indicators = products.map((product, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.setAttribute('aria-label', `Show ${product.name}, product ${index + 1} of ${products.length}`);
    button.addEventListener('click', () => select(index));
    return button;
  });
  track.replaceChildren(...slides); dots.replaceChildren(...indicators);
  document.getElementById('carousel-total').textContent = String(products.length).padStart(2, '0');
  const save = document.getElementById('carousel-save');
  function select(index) {
    active = (index + products.length) % products.length;
    const product = products[active];
    slides.forEach((slide, i) => {
      let offset = (i - active + products.length) % products.length;
      if (offset > products.length / 2) offset -= products.length;
      const visible = Math.abs(offset) <= 2 && offset !== products.length / 2;
      slide.dataset.position = visible ? String(offset) : 'hidden';
      slide.tabIndex = visible ? 0 : -1;
      slide.setAttribute('aria-hidden', String(!visible));
      slide.setAttribute('aria-label', i === active ? `Turn ${product.name} card to see more` : `Show ${products[i].name}`);
      slide.classList.remove('is-flipped');
    });
    indicators.forEach((indicator, i) => indicator.setAttribute('aria-current', String(i === active)));
    document.getElementById('carousel-current').textContent = String(active + 1).padStart(2, '0');
    document.getElementById('carousel-category').textContent = `${product.categoryName} · Concept`;
    document.getElementById('carousel-name').textContent = product.name;
    document.getElementById('carousel-description').textContent = product.description;
    document.getElementById('carousel-rating').innerHTML = ratingMarkup(product.id);
    document.getElementById('carousel-price').innerHTML = priceMarkup(product);
    document.getElementById('carousel-link').href = `product.html?item=${encodeURIComponent(product.id)}`;
    save.dataset.wishId = product.id;
    setWishState(save, getWishlist().includes(product.id));
  }
  document.getElementById('carousel-prev').addEventListener('click', () => select(active - 1));
  document.getElementById('carousel-next').addEventListener('click', () => select(active + 1));
  document.getElementById('carousel-add').addEventListener('click', event => { const product = products[active]; if (addToBag(product.id, 1, event.currentTarget)) showBagNotice(product); });
  save.addEventListener('click', () => toggleWishlist(products[active].id));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.closest('.home-carousel__slide')) slides[active].focus();
  });
  let pointerX = null;
  let ignoreClick = false;
  viewport.addEventListener('pointerdown', event => { pointerX = event.clientX; });
  viewport.addEventListener('pointerup', event => {
    if (pointerX === null) return;
    const distance = event.clientX - pointerX; pointerX = null;
    if (Math.abs(distance) < 45) return;
    ignoreClick = true;
    select(active + (distance < 0 ? 1 : -1));
    setTimeout(() => { ignoreClick = false; }, 350);
  });
  viewport.addEventListener('pointercancel', () => { pointerX = null; });
  viewport.addEventListener('click', event => { if (ignoreClick) { event.preventDefault(); event.stopPropagation(); ignoreClick = false; } }, true);
  select(0);
}
setupHeader();
updateCounters();
const page = document.body.dataset.page;
if (page === 'home') { renderHome(); renderFashionRail(); setupDiscover(); }
if (page === 'shop') renderShop();
if (page === 'product') renderProduct();
if (page === 'bag') renderBag();
if (page === 'wishlist') renderWishlist();
if (page === 'checkout') renderCheckout();
if (page === 'orders') renderOrders();
