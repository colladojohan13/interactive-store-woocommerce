/* Small, progressive interactions for the WooCommerce concept storefront. */
(() => {
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
