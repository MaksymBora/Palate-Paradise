const scrollToTopBtn = document.querySelector('.scroll-to-top');

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  const isScrollingUp = window.scrollY < prevScrollPos;
  prevScrollPos = window.scrollY;

  if (
    window.scrollY > 0 &&
    (isScrollingUp || window.scrollY > window.innerHeight / 2)
  ) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
