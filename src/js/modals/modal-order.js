import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import axios from 'axios';
import { showLoader, hideLoader } from '../loader.js';

const ORDER_FORM_KEY = 'order-form-state';

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
refs.modalOrderForm.addEventListener('submit', throttle(submitForm, 500));

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
    name: name.value,
    phone: phone.value,
    email: email.value,
    comment: comment.value,
  };

  localStorage.setItem(ORDER_FORM_KEY, JSON.stringify(orderFormState));

  if (
    name.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    email.value.trim() !== ''
  )
    refs.modalOrderSubmitBtn.disabled = false;
}

// Check localStorage after page reload and get last saved data (or empty fields otherwise)
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

// Clean localStorage and form inputs after form submit
function submitForm(evt) {
  evt.preventDefault();

  showSuccessMessage();

  refs.modalOrderSubmitBtn.disabled = true;
  localStorage.removeItem(ORDER_FORM_KEY);
  // Clear data from form inputs
  refs.modalOrderForm.reset();
}

function showSuccessMessage() {
  Notiflix.Report.success('Your order has completed successfully!', '', 'Ok', {
    position: 'center-top',
    titleMaxLength: '100',
    onClose: closeModal,
  });
}

function closeModal() {
  refs.modalOrder.classList.add('is-hidden');
}

export default {
  data() {
    return {
      api: 'https://tasty-treats-backend.p.goit.global/api/',
      order: {
        name: '',
        phone: '',
        email: '',
        comment: '',
      },
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();

      // Get the current values of form fields
      const name = this.$refs.name.value.trim();
      const phone = this.$refs.phone.value.trim();
      const email = this.$refs.email.value.trim();
      const comment = this.$refs.comment.value.trim();

      // Check if all required fields are filled
      if (name === '' || phone === '' || email === '') {
        Notiflix.Notify.failure('Please fill in all the required fields.');
        return;
      }

      // Set the headers for the POST request
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      // Prepare the data to be sent in the POST request
      const data = {
        name,
        phone,
        email,
        comment,
      };

      // Send data to the server
      axios
        .post(this.api + 'orders/add', data, { headers })
        .then(response => {
          console.log('Response from server:', response);
          console.log('Response data:', response.data);
          // Handle successful server response
          this.showSuccessMessage();
          this.clearForm();
        })
        .catch(error => {
          console.error(error);
          // Handle error
          this.showErrorMessage();
        });
    },

    showSuccessMessage() {
      Notiflix.Report.success(
        'Your order has completed successfully!',
        '',
        'Ok',
        {
          position: 'center-top',
          titleMaxLength: '100',
          onClose: closeModal,
        }
      );
    },

    showErrorMessage() {
      Notiflix.Report.failure(
        'An error occurred while submitting the order. Please try again later.',
        '',
        'Ok',
        {
          position: 'center-top',
          titleMaxLength: '100',
        }
      );
    },

    clearForm() {
      // Clear form fields after successful submission
      this.$refs.name.value = '';
      this.$refs.phone.value = '';
      this.$refs.email.value = '';
      this.$refs.comment.value = '';
    },
  },
};
