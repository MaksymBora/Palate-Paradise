document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.querySelector('.open-mobile');
  const mobileMenu = document.querySelector('.mobile');
  const backdrop = document.querySelector('.backdrop');
  const body = document.body;

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    backdrop.classList.toggle('visually-hidden', !isMenuOpen);

    if (isMenuOpen) {
      bodyUnLock();
    } else {
      bodyLock();
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyUnLock();
  });

  function bodyLock() {
    body.style.overflow = 'hidden';
    backdrop.classList.remove('visually-hidden');
  }

  function bodyUnLock() {
    body.style.removeProperty('overflow');
    backdrop.classList.add('visually-hidden');
  }
});
