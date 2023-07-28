import Notiflix from 'notiflix';

const refs = {
  //   openModalOrderBtn: document.querySelector('[data-modal-order-cart]'),
  closeModalOrderBtn: document.querySelector('[data-modal-order-close]'),
  modalOrder: document.querySelector('[data-modal-order-backdrop]'),
  modalOrderForm: document.querySelector('.modal-order-form'),
  modalOrderSubmitBtn: document.querySelector('.modal-order-form__button'),
};

const ORDER_FORM_KEY = 'order-form-state';

// refs.openModalOrderBtn.addEventListener('click', onToggleModalOrder);
refs.closeModalOrderBtn.addEventListener('click', onToggleModalOrder);
refs.modalOrderForm.addEventListener('input', onTextareaInput);
refs.modalOrderForm.addEventListener('submit', onFormSubmit);

setTimeout(() => {
  const modalOrder = document.querySelectorAll('button[data-modal-order-cart]');
  modalOrder.forEach(button => {
    console.log(button);
    button.addEventListener('click', onToggleModalOrder);
  });

  function onToggleModalOrder() {
    refs.modalOrder.classList.toggle('is-hidden');

    // Clear the form inputs when the form is closed
    if (refs.modalOrder.classList.contains('is-hidden')) {
      refs.modalOrderForm.reset();
    }
  }
}, 2000);

// Open and close modal-order modal window
function onToggleModalOrder() {
  refs.modalOrder.classList.toggle('is-hidden');

  // Clear the form inputs when the form is closed
  if (refs.modalOrder.classList.contains('is-hidden')) {
    refs.modalOrderForm.reset();
  }
}

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
function onFormSubmit(evt) {
  evt.preventDefault();

  const { name, phone, email, comment } = evt.currentTarget.elements;

  const nameValue = name.value.trim();
  const phoneValue = phone.value.trim();
  const emailValue = email.value.trim();
  const commentValue = comment.value.trim();

  // Validate name: Allow only letters and spaces
  const namePattern = /^[a-zA-Zа-яА-Я ]+$/;
  if (!namePattern.test(nameValue)) {
    // Invalid name format
    Notiflix.Report.failure('Error', 'Please enter a valid name.', 'Ok');
    return;
  }

  // Validate phone number: Use specific pattern for +380000000000 format
  const phonePattern = /^\+\d{12}$/;
  if (!phonePattern.test(phoneValue)) {
    // Invalid phone number format
    Notiflix.Report.failure(
      'Error',
      'Please enter a valid phone number in the format +380000000000.',
      'Ok'
    );
    return;
  }

  // Validate email: Use regular expression for email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    // Invalid email format
    Notiflix.Report.failure(
      'Error',
      'Please enter a valid email address.',
      'Ok'
    );
    return;
  }

  // Validate comment: Limit maximum characters to 200
  const maxCommentLength = 200;
  if (commentValue.length > maxCommentLength) {
    Notiflix.Report.failure(
      'Error',
      `Please limit the comment to ${maxCommentLength} characters.`,
      'Ok'
    );
    return;
  }

  const postToAdd = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    comment: commentValue,
  };

  // Log the data being sent to the server
  // console.log('Data sent to server:', postToAdd);

  // Show loader before sending the request
  Notiflix.Loading.standard('Sending your order...');

  const options = {
    method: 'POST',
    body: JSON.stringify(postToAdd),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch('https://tasty-treats-backend.p.goit.global/api/orders/add', options)
    .then(response => {
      if (response.status === 201) {
        // Successful response, order created
        // You may also want to parse the response JSON if the backend sends additional data
        return response.json();
      } else if (response.status >= 400 && response.status < 500) {
        // Client-side error (4xx) - Bad Request or Validation Error
        throw new Error('Bad Request');
      } else {
        // Other server-side error (5xx) - Internal Server Error
        throw new Error('Server Error');
      }
    })
    .then(data => {
      console.log('Data received from server:', data);
      // Show success message using Notiflix
      Notiflix.Report.success(
        'Your order has completed successfully!',
        '',
        'Ok',
        {
          position: 'center-top',
          titleMaxLength: '100',
        }
      );
      onToggleModalOrder();
    })
    .catch(error => {
      console.error('Error:', error);
      // Show error message using Notiflix
      Notiflix.Report.failure(
        'Error',
        'An error occurred while submitting the order. Please try again later.',
        'Ok'
      );
    })
    .finally(() => {
      // Hide the loader after request completion
      Notiflix.Loading.remove();
    });
}
