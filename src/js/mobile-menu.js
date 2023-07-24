// const changeTheme = document.querySelector('#theme-switch');
// changeTheme.addEventListener('change', toggleTheme);

// function toggleTheme() {
//   const body = document.body;
//   body.classList.toggle('dark-theme');
//   body.classList.toggle('light-theme');

//   // нинішня тема
//   const isDarkTheme = body.classList.contains('dark-theme');
//   localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
// }

// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'dark') {
//   toggleTheme();
//   changeTheme.checked = true;
// }

// відкриття модалки
(() => {
  const mobileMenu = document.querySelector('.mobile');
  const openMenuBtn = document.querySelector('.open-mobile');
  const closeMenuBtn = document.querySelector('.close-mobile');
  const backdrop = document.querySelector(".backdrop");
  const body = document.body;

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');
    openMenuBtn.setAttribute('aria-expanded', isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    if (isMenuOpen) {
      bodyUnLock();
    } else {
      bodyLock();
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) {
      toggleMenu();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyUnLock();
  });

  function bodyLock() {
    body.style.overflow = 'hidden';
    backdrop.classList.remove("visually-hidden");
  }

  function bodyUnLock() {
    body.style.removeProperty('overflow');
    backdrop.classList.add("visually-hidden");
  }
})();


