const scrollToTopBtn = document.querySelector('.scroll-to-top');
const section = document.querySelector('.image-container');
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
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY <= prevScrollPos || scrollY + windowHeight >= sectionHeight) {
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
