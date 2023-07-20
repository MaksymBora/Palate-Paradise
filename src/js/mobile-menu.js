

 const changeTheme = document.querySelector("#theme-switch");
  	changeTheme.addEventListener('change', toggleTheme);

  function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); 
    body.classList.toggle('light-theme'); 

    // нинішня тема
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    toggleTheme();
    changeTheme.checked = true;
  }


  // відкриття модалки
  const openModalBtn = document.querySelector('open-mobile');
  const closeModalBtn = document.querySelector('close-mobile');
  const modal = document.querySelector('mobile-menu');


  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  
  function openModal() {
    modal.style.display = 'block';
  }

  
  function closeModal() {
    modal.style.display = 'none';
  }

  

