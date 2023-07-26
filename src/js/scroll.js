const scrollToTopBtn = document.querySelector('.scroll-to-top');
const contentWrapper = document.querySelector('.content-wrapper');
let prevScrollPos = window.pageYOffset;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function toggleScrollToTopButton() {
  const contentRect = contentWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollY = window.pageYOffset;

  if (scrollY < prevScrollPos || contentRect.bottom <= windowHeight) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }

  prevScrollPos = scrollY;
}

scrollToTopBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleScrollToTopButton);
