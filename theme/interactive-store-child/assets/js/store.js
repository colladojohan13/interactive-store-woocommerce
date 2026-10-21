/* Small, progressive interactions for the WooCommerce concept storefront. */
(() => {
  const recentKey = 'interactive-store-wc-recent-v1';
  const catalog = Array.isArray(window.interactiveStoreWishlist) ? window.interactiveStoreWishlist : [];
  if (document.querySelector('.is-quick-view-trigger') && typeof HTMLDialogElement !== 'undefined') {
    const dialog = document.createElement('dialog');
    dialog.className = 'is-quick-view';
    dialog.setAttribute('aria-label', 'Product quick view');
    const closeButton = document.createElement('button');
    closeButton.type = 'button'; closeButton.className = 'is-quick-view__close';
    closeButton.setAttribute('aria-label', 'Close quick view'); closeButton.textContent = '×';
    const content = document.createElement('div'); content.className = 'is-quick-view__content';
    dialog.append(closeButton, content); document.body.append(dialog);
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    document.addEventListener('click', event => {
      const trigger = event.target.closest('.is-quick-view-trigger');
      if (!trigger) return;
      const item = catalog.find(entry => Number(entry.id) === Number(trigger.dataset.productId));
      if (!item) return;
      const media = document.createElement('div'); media.className = 'is-quick-view__media';
      if (item.image) {
        const img = document.createElement('img'); img.src = item.image; img.alt = item.name; media.append(img);
      }
      const details = document.createElement('div'); details.className = 'is-quick-view__details';
      const category = document.createElement('span'); category.className = 'is-quick-view__category'; category.textContent = item.category || 'Collection';
      const title = document.createElement('h2'); title.textContent = item.name;
      const rating = document.createElement('p'); rating.className = 'is-quick-view__rating';
      rating.textContent = item.reviews ? `★ ${Number(item.rating).toFixed(1)} · ${item.reviews} sample reviews` : 'New in the collection';
      const price = document.createElement('strong'); price.className = 'is-quick-view__price'; price.textContent = item.price;
      const description = document.createElement('p'); description.className = 'is-quick-view__description'; description.textContent = item.description || 'Explore this fictional product concept in the full detail page.';
      const actions = document.createElement('div'); actions.className = 'is-quick-view__actions';
      const link = document.createElement('a'); link.href = item.url; link.textContent = 'View details ↗'; actions.append(link);
      if (item.cartUrl) { const add = document.createElement('a'); add.href = item.cartUrl; add.className = 'is-quick-view__cart'; add.textContent = 'Add to cart'; actions.append(add); }
      details.append(category, title, rating, price, description, actions);
      content.replaceChildren(media, details);
      dialog.showModal(); closeButton.focus();
    });
  }
  const getRecent = () => {
    try {
      const value = JSON.parse(localStorage.getItem(recentKey) || '[]');
      return Array.isArray(value) ? [...new Set(value.map(Number).filter(Number.isInteger))].slice(0, 4) : [];
    } catch { return []; }
  };
  const single = document.querySelector('.is-wishlist-button--single[data-product-id]');
  if (single) {
    const id = Number(single.dataset.productId);
    if (catalog.some(item => Number(item.id) === id)) {
      try { localStorage.setItem(recentKey, JSON.stringify([id, ...getRecent().filter(item => item !== id)].slice(0, 4))); } catch { /* Browsing still works without storage. */ }
    }
  }
  const recentSection = document.getElementById('is-recently-viewed');
  if (recentSection) {
    const grid = document.getElementById('is-recent-grid');
    const visited = getRecent().map(id => catalog.find(item => Number(item.id) === id)).filter(Boolean);
    visited.forEach(item => {
      const card = document.createElement('a'); card.className = 'is-recently-viewed__card'; card.href = item.url;
      if (item.image) {
        const image = document.createElement('img'); image.src = item.image; image.alt = ''; image.loading = 'lazy'; card.append(image);
      }
      const details = document.createElement('span'); details.className = 'is-recently-viewed__details';
      const name = document.createElement('strong'); name.textContent = item.name;
      const price = document.createElement('span'); price.textContent = item.price;
      details.append(name, price); card.append(details); grid.append(card);
    });
    recentSection.hidden = visited.length === 0;
  }
  const panel = document.getElementById('is-shop-toolbar');
  const open = document.getElementById('is-shop-mobile-open');
  const close = document.getElementById('is-shop-mobile-close');
  const backdrop = document.getElementById('is-shop-backdrop');
  if (panel && open && close && backdrop) {
    const mobile = matchMedia('(max-width: 650px)');
    function closePanel() {
      panel.classList.remove('is-open');
      panel.removeAttribute('role'); panel.removeAttribute('aria-modal'); panel.removeAttribute('aria-label');
      backdrop.hidden = true; document.body.classList.remove('is-filter-open');
      open.setAttribute('aria-expanded', 'false'); open.focus();
    }
    open.addEventListener('click', () => {
      panel.classList.add('is-open'); panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Filter and sort products');
      backdrop.hidden = false; document.body.classList.add('is-filter-open');
      open.setAttribute('aria-expanded', 'true'); close.focus();
    });
    close.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closePanel(); return; }
      if (event.key !== 'Tab' || !panel.classList.contains('is-open')) return;
      const focusable = [...panel.querySelectorAll('a, button, select')].filter(item => !item.hidden);
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    mobile.addEventListener('change', () => { if (!mobile.matches && panel.classList.contains('is-open')) closePanel(); });
  }

  const frame = document.getElementById('is-arc-3d-frame');
  const load = document.getElementById('is-load-arc-3d');
  if (frame && load) {
    function loadViewer() {
      if (frame.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://docs.cecomsa.com/laptop-3d/index.html';
      iframe.title = 'Separate laptop 3D demonstration';
      iframe.loading = 'lazy'; iframe.allow = 'fullscreen; xr-spatial-tracking'; iframe.allowFullscreen = true;
      frame.replaceChildren(iframe); load.hidden = true;
    }
    load.addEventListener('click', loadViewer);
    document.querySelector('.is-arc-3d-link')?.addEventListener('click', loadViewer);
  }
})();
