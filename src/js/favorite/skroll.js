const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Функція, яка прокручує на початок сторінки
function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

scrollToTopBtn.addEventListener("click", scrollToTop);

// Показуємо або приховуємо кнопку в залежності від прокрутки сторінки
window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
        scrollToTopBtn.classList.add("show-btn");
    } else {
        scrollToTopBtn.classList.remove("show-btn");
    }
});