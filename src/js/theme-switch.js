const Theme = {
  DAY: 'day-mode',
  NIGHT: 'night-mode',
};

const bodyTheme = document.querySelector('body');
const desktopThemeSwitcher = document.getElementById('desktop-theme-switcher');
const mobileThemeSwitcher = document.getElementById('mobile-theme-switcher');

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');

  const isDarkTheme = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? Theme.NIGHT : Theme.DAY);

  // Update the state of all theme switchers
  desktopThemeSwitcher.checked = isDarkTheme;
  mobileThemeSwitcher.checked = isDarkTheme;
}

function updateSwitchers() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.NIGHT) {
    bodyTheme.classList.add('dark-theme');
  } else {
    bodyTheme.classList.remove('dark-theme');
  }

  // Update the state of all theme switchers
  desktopThemeSwitcher.checked = savedTheme === Theme.NIGHT;
  mobileThemeSwitcher.checked = savedTheme === Theme.NIGHT;
}

// Check the stored theme when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.NIGHT || savedTheme === Theme.DAY) {
    updateSwitchers();
  } else {
    // If the theme is not set in localStorage, set it to the default (light) theme
    localStorage.setItem('theme', Theme.DAY);
    updateSwitchers(); // Ensure the switcher state reflects the default theme
  }
});

// Save the switcher state when it changes
desktopThemeSwitcher.addEventListener('change', () => {
  toggleTheme();
});

mobileThemeSwitcher.addEventListener('change', () => {
  toggleTheme();
});
