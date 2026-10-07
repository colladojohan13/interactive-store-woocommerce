/* Browser-local shortlist for the WooCommerce demo. No account data is shared. */
(() => {
  const key = 'interactive-store-wp-wishlist-v1';
  const catalog = Array.isArray(window.interactiveStoreWishlist) ? window.interactiveStoreWishlist : [];
  const byId = Object.fromEntries(catalog.map(item => [String(item.id), item]));
  function read() {
    try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? [...new Set(value.map(String).filter(id => byId[id]))] : []; }
    catch { return []; }
  }
  function save(ids) { try { localStorage.setItem(key, JSON.stringify(ids)); } catch { /* Private mode may disable storage. */ } }
  function renderButtons() {
    const saved = read();
    document.querySelectorAll('.is-wishlist-button').forEach(button => {
      const active = saved.includes(button.dataset.productId);
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-saved', active);
      button.innerHTML = active ? '♥ <span>Saved</span>' : '♡ <span>Save</span>';
    });
  }
  function renderPage() {
    const grid = document.getElementById('is-wishlist-items');
    if (!grid) return;
    grid.replaceChildren();
    const saved = read();
    document.getElementById('is-wishlist-empty').hidden = saved.length !== 0;
    saved.forEach(id => {
      const item = byId[id];
      const article = document.createElement('article'); article.className = 'is-wishlist-card';
      const link = document.createElement('a'); link.href = item.url;
      if (item.image) { const image = document.createElement('img'); image.src = item.image; image.alt = item.name; image.loading = 'lazy'; link.append(image); }
      const name = document.createElement('strong'); name.textContent = item.name; link.append(name);
      const price = document.createElement('span'); price.textContent = item.price; link.append(price);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Remove from wishlist';
      remove.addEventListener('click', () => { save(read().filter(savedId => savedId !== id)); renderPage(); renderButtons(); });
      article.append(link, remove); grid.append(article);
    });
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('.is-wishlist-button');
    if (!button || !byId[button.dataset.productId]) return;
    const id = button.dataset.productId; const saved = read();
    save(saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id]);
    renderButtons(); renderPage();
  });
  renderButtons(); renderPage();
})();
