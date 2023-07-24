import RecipeApiService from "../service/service-api";

const STORAGE_KEY = 'email';

const ratingStars = document.querySelectorAll('.rating');
// const star = document.querySelector

const addRatingFormEl = document.querySelector('.form-check');
const ratingValue = document.querySelector('.rating-value');
const saveEmailLocalStorage = document.querySelector(".rating-email")

const recipeApiService = new RecipeApiService();


addRatingFormEl.addEventListener('submit', handleSubmitRating);

saveEmailLocalStorage.addEventListener('input', saveLocalStorage);
// console.log(ratingStars);


ratingStars.forEach(element => {
    element.addEventListener('change', changeRatingStar);
    // console.log('dsdf')
});

getLocalStorage();

function handleSubmitRating(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // console.log(formData);

    // formData.forEach((element) => {
    //     console.log(element)
    // })
    event.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);

}

function changeRatingStar (event) {
    // console.log(event.target.value)
    console.log(event.target.nextElementSibling);

    ratingValue.textContent = event.target.value;

    const stars = event.target.nextElementSibling;

    stars.classList.toggle('is-active')

}

function saveLocalStorage(event) {
    const email = event.target.value;
    localStorage.setItem(STORAGE_KEY, email)
    // console.log(email);
}

function getLocalStorage() {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    
    if (savedEmail) {
        saveEmailLocalStorage.value = savedEmail;
    }
}

function updateRating (data) {

// recipeApiService.getRecipeById()
// .then((data) => {
//     data.results.map( ({_id, rating}) => {
//             console.log(_id, rating)
//             console.log(recipeId = _id)
//             // console.log(rating = _id)
//         })
// })

}

updateRating('werty')

// const retingToUpdate = {
//     "rate": 5,
//     "email": "test@gmail.com"
//   };
  
//   const options = {
//     method: "PATCH",
//     body: JSON.stringify(retingToUpdate),
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//   };

// fetch( `https://tasty-treats-backend.p.goit.global/api/recipes/${id}/rating`, options)
//        .then((response) => response.json())
//        .then((data) => {
//         data.results.map( ({id, rating}) => {
//                 console.log(id, rating)
//             })
//         //    const {_id} = data
//         //    console.log(data.results);
//     })