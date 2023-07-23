import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const refs = {
  openModalOrderBtn: document.querySelector('[data-modal-order-open]'),
  closeModalOrderBtn: document.querySelector('[data-modal-order-close]'),
  modalOrder: document.querySelector('[data-modal-order]'),
  modalOrderForm: document.querySelector('.modal-order-form'),
  modalOrderSubmitBtn: document.querySelector('.modal-order-form__button'),
};

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
  const feedbackFormState = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    comment: comment.value,
  };
  refs.modalOrderSubmitBtn.disabled = false;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}
//Check localStorage after page reload and get last saved data (or empty filds otherwise)
function onClickPageReload() {
  const storageData =
    JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  const { name, phone, email, comment } = storageData;
  if (storageData) {
    refs.modalOrderForm.elements.name.value = name || '';
    refs.modalOrderForm.elements.phone.value = phone || '';
    refs.modalOrderForm.elements.email.value = email || '';
    refs.modalOrderForm.elements.comment.value = comment || '';
  }
}
//Clean localStorage and form inputs after form submit,log current values to console
function onFormSubmit(evt) {
  evt.preventDefault();

  const { name, phone, email, comment } = evt.currentTarget.elements;
  refs.modalOrderSubmitBtn.disabled = false;

  if (name.value === '' || phone.value === '' || email.value === '') {
    refs.modalOrderSubmitBtn.disabled = true;
    return Notiflix.Report.warning(
      'Please fill out all required fields!',
      '',
      'Ok',
      {
        position: 'center-top',
        titleMaxLength: '100',
      }
    );
  }

  console.log({
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    comment: comment.value.trim(),
  });
  Notiflix.Report.success('Your order has completed successfully!', '', 'Ok', {
    position: 'center-top',
    titleMaxLength: '100',
  });
  localStorage.removeItem('feedback-form-state');
  // Clear data from form inputs
  evt.currentTarget.reset();
}
