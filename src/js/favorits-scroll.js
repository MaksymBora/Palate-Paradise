const scrollToTopBtn = document.querySelector('.scroll-to-top');

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    setTimeout(() => {
      scrollToTopBtn.style.display = 'block';
    }, 500);
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
