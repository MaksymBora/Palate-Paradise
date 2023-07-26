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
//     scrollToTopBtn.style.display = 'block';
//   } else {
//     scrollToTopBtn.style.display = 'none';
//   }
// });

const scrollToTopBtn = document.querySelector('.scroll-to-top');
const contentWrapper = document.querySelector('.content-wrapper');

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

window.addEventListener('scroll', () => {
  const contentRect = contentWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Коли позиція контенту нижче від вікна, з'являється кнопка
  if (contentRect.bottom <= windowHeight) {
    setTimeout(() => {
      scrollToTopBtn.style.display = 'block';
    }, 500); // 500 мілісекунд (0.5 секунди) затримки
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
