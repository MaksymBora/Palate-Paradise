import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import RecipeApiService from '../service/service-api';

const refs = {
  openModalOrderBtn: document.querySelector('[data-modal-order-open]'),
  closeModalOrderBtn: document.querySelector('[data-modal-order-close]'),
  modalOrder: document.querySelector('[data-modal-order]'),
  modalOrderForm: document.querySelector('.modal-order-form'),
  modalOrderSubmitBtn: document.querySelector('.modal-order-form__button'),
};
const ORDER_FORM_KEY = 'order-form-state';

refs.openModalOrderBtn.addEventListener('click', onToggleModalOrder);
refs.closeModalOrderBtn.addEventListener('click', onToggleModalOrder);
refs.modalOrderForm.addEventListener('input', onTextareaInput);
refs.modalOrderForm.addEventListener('submit', throttle(onFormSubmit, 500));

// Open and close modal-order modal window
function onToggleModalOrder() {
  refs.modalOrder.classList.toggle('is-hidden');
}

refs.modalOrderSubmitBtn.disabled = true;
onClickPageReload();

// Track the input event on the form and keep input data in localStorage
function onTextareaInput(evt) {
  const { name, phone, email, comment } = evt.currentTarget.elements;
  const orderFormState = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    comment: comment.value.trim(),
  };

  localStorage.setItem(ORDER_FORM_KEY, JSON.stringify(orderFormState));

  if (
    name.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    email.value.trim() !== ''
  )
    refs.modalOrderSubmitBtn.disabled = false;
}
//Check localStorage after page reload and get last saved data (or empty fields otherwise)
function onClickPageReload() {
  const storageData = JSON.parse(localStorage.getItem(ORDER_FORM_KEY)) || {};
  const { name, phone, email, comment } = storageData;
  if (storageData) {
    refs.modalOrderForm.elements.name.value = name || '';
    refs.modalOrderForm.elements.phone.value = phone || '';
    refs.modalOrderForm.elements.email.value = email || '';
    refs.modalOrderForm.elements.comment.value = comment || '';
  }
  if (name === '' || phone === '' || email === '') {
    refs.modalOrderSubmitBtn.disabled = true;
  }
}
//Clean localStorage and form inputs after form submit
function onFormSubmit(evt) {
  evt.preventDefault();

  const { name, phone, email, comment } = evt.currentTarget.elements;

  console.log({
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    comment: comment.value.trim(),
  });

  onSuccessMes();

  refs.modalOrderSubmitBtn.disabled = true;
  localStorage.removeItem(ORDER_FORM_KEY);
  // Clear data from form inputs
  evt.currentTarget.reset();
}

function onSuccessMes() {
  Notiflix.Report.success('Your order has completed successfully!', '', 'Ok', {
    position: 'center-top',
    titleMaxLength: '100',
  });
}
