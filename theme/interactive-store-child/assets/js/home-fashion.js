(() => {
  const rail = document.querySelector('.fashion-rail__items');
  if (!rail) return;
  const items = [...rail.querySelectorAll('.fashion-rail__item')];
  const name = document.getElementById('fashion-name');
  const description = document.getElementById('fashion-description');
  const price = document.getElementById('fashion-price');
  const link = document.getElementById('fashion-link');
  const add = document.getElementById('fashion-add');
  function select(item) {
    items.forEach(button => {
      const active = button === item;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    name.textContent = item.dataset.fashionName;
    description.textContent = item.dataset.fashionDescription;
    price.textContent = item.dataset.fashionPrice;
    link.href = item.dataset.fashionUrl;
    add.href = item.dataset.fashionCartUrl;
  }
  items.forEach(item => {
    item.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') select(item); });
    item.addEventListener('focus', () => select(item));
    item.addEventListener('click', () => select(item));
  });
  rail.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const current = items.findIndex(item => item.classList.contains('is-active'));
    items[(current + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length].focus();
  });
})();
