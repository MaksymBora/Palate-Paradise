// const scrollToTopBtn = document.querySelector('.scroll-to-top');

// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// }

// scrollToTopBtn.addEventListener('click', scrollToTop);

// window.addEventListener('scroll', () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     setTimeout(() => {
//       scrollToTopBtn.style.display = 'block';
//     }, 500);
//   } else {
//     scrollToTopBtn.style.display = 'none';
//   }
// });

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
  // Перевірка, чи поточне значення scrollY більше попереднього, тобто чи користувач скролить вгору
  const isScrollingUp = window.scrollY < prevScrollPos;
  prevScrollPos = window.scrollY;

  // Показати або приховати кнопку в залежності від умови
  if (
    window.scrollY > 0 &&
    (isScrollingUp || window.scrollY > window.innerHeight / 2)
  ) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
