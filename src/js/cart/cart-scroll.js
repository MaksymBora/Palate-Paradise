const scrollToTopBtn = document.querySelector('.scroll-to-top');
const carSection = document.querySelector('.cart-section');
let prevScrollPos = window.pageYOffset;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  scrollToTopBtn.style.display = 'none';
}

function scrollToTopButtonVisibility() {
  const windowHeight = window.innerHeight;
  const carSectionHeight = carSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY <= prevScrollPos || scrollY + windowHeight >= carSectionHeight) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
  if (scrollY === 0) {
    scrollToTopBtn.style.display = 'none';
  }
  prevScrollPos = scrollY;
}

scrollToTopBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', scrollToTopButtonVisibility);
