export function showLoader() {
  const loader = document.querySelector('.loader-spinner');
  if (loader) {
    loader.style.display = 'block';
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader-spinner');
  if (loader) {
    loader.style.display = 'none';
  }
}
