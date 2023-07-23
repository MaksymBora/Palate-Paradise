// import RecipeApiService from "../service/service-api";

const ratingStars = document.querySelectorAll('.rating');

const addRatingFormEl = document.querySelector('.form-check');
const ratingValue = document.querySelector('.rating-value');




addRatingFormEl.addEventListener('submit', handleSubmitRating);
// console.log(ratingStars);


ratingStars.forEach(element => {
    element.addEventListener('change', changeRatingStar);
    // console.log('dsdf')
});



function handleSubmitRating(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData);

    formData.forEach((element) => {
        console.log(element)
    })


}



function changeRatingStar (event) {
    // console.log(event.target.value)
    // console.log(ratingValue)

    ratingValue.textContent = event.target.value;
}
