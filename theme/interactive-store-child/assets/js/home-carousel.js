/* Browse WooCommerce concepts without leaving the WordPress homepage. */
(() => {
  const carousel = document.getElementById('home-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.home-carousel__slide')];
  if (!slides.length) return;
  const dots = document.getElementById('carousel-dots');
  const viewport = document.getElementById('carousel-viewport');
  const save = document.getElementById('carousel-save');
  const money = value => `RD$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`;
  let active = 0;
  let pointerX = null;
  let ignoreClick = false;

  function updateWishlistState(id, name) {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem('interactive-store-wp-wishlist-v1') || '[]'); } catch { /* Storage may be unavailable. */ }
    const selected = Array.isArray(saved) && saved.map(String).includes(String(id));
    save.dataset.productId = id;
    save.setAttribute('aria-pressed', String(selected));
    save.setAttribute('aria-label', `${selected ? 'Remove' : 'Save'} ${name} ${selected ? 'from' : 'to'} wishlist`);
    save.innerHTML = `${selected ? '♥' : '♡'} <span>${selected ? 'Saved' : 'Save'}</span>`;
    save.classList.toggle('is-saved', selected);
  }

  function select(index) {
    active = (index + slides.length) % slides.length;
    const data = slides[active].dataset;
    slides.forEach((slide, i) => {
      let offset = (i - active + slides.length) % slides.length;
      if (offset > slides.length / 2) offset -= slides.length;
      const visible = Math.abs(offset) <= 2 && offset !== slides.length / 2;
      slide.dataset.position = visible ? String(offset) : 'hidden';
      slide.tabIndex = visible ? 0 : -1;
      slide.setAttribute('aria-hidden', String(!visible));
      slide.setAttribute('aria-label', i === active ? `Turn ${data.name} card to see more` : `Show ${slides[i].dataset.name}`);
      slide.classList.remove('is-flipped');
    });
    dots.querySelectorAll('button').forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
    document.getElementById('carousel-current').textContent = String(active + 1).padStart(2, '0');
    document.getElementById('carousel-category').textContent = `${data.category} · Concept`;
    document.getElementById('carousel-name').textContent = data.name;
    document.getElementById('carousel-description').textContent = data.description;
    const rating = Number(data.rating);
    const count = Number(data.reviewCount);
    document.getElementById('carousel-rating').textContent = count ? `★ ${rating.toFixed(1)} (${count} demo reviews)` : 'New concept';
    const price = document.getElementById('carousel-price');
    price.replaceChildren();
    const current = document.createElement('span');
    current.textContent = money(Number(data.price));
    price.append(current);
    if (data.sale === 'true' && Number(data.regular) > Number(data.price)) {
      const previous = document.createElement('del');
      previous.textContent = money(Number(data.regular));
      price.append(previous);
    }
    document.getElementById('carousel-link').href = data.url;
    document.getElementById('carousel-add').href = data.cartUrl;
    updateWishlistState(data.productId, data.name);
  }

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show ${slide.dataset.name}, product ${index + 1} of ${slides.length}`);
    dot.addEventListener('click', () => select(index));
    dots.append(dot);
    slide.addEventListener('click', () => {
      if (index === active) slide.classList.toggle('is-flipped');
      else select(index);
    });
  });
  document.getElementById('carousel-prev').addEventListener('click', () => select(active - 1));
  document.getElementById('carousel-next').addEventListener('click', () => select(active + 1));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    select(active + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.closest('.home-carousel__slide')) slides[active].focus();
  });
  viewport.addEventListener('pointerdown', event => { pointerX = event.clientX; });
  viewport.addEventListener('pointerup', event => {
    if (pointerX === null) return;
    const distance = event.clientX - pointerX;
    pointerX = null;
    if (Math.abs(distance) < 45) return;
    ignoreClick = true;
    select(active + (distance < 0 ? 1 : -1));
    setTimeout(() => { ignoreClick = false; }, 350);
  });
  viewport.addEventListener('pointercancel', () => { pointerX = null; });
  viewport.addEventListener('click', event => {
    if (!ignoreClick) return;
    event.preventDefault();
    event.stopPropagation();
    ignoreClick = false;
  }, true);
  select(0);
})();
