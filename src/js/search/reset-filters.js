// Функция для сброса фильтров
export function resetFilters() {
  const resetButton = document.querySelector('.reset');

  // Сбрасываем выбранные опции в списке времени
  const selectedTimeOption = document.getElementById('selected-time');
  selectedTimeOption.textContent = 'min';
  selectedTimeOption.style.color = '';

  // Сбрасываем выбранные опции в списке области
  const selectedAreaOption = document.getElementById('selected-area');
  selectedAreaOption.textContent = 'Country';
  selectedAreaOption.style.color = '';

  // Сбрасываем выбранные опции в списке ингредиентов
  const selectedIngredientsOption = document.getElementById(
    'selected-ingredients'
  );
  selectedIngredientsOption.textContent = 'Vegetables';
  selectedIngredientsOption.style.color = '';

  //Все рецепты
  const recipesContainer = document.querySelector('.recipes');

  // Добавляем класс "pressed" при клике на кнопку
  resetButton.classList.add('pressed');

  // Удаляем класс "pressed" через небольшой промежуток времени, чтобы вернуть обычный стиль кнопки
  setTimeout(function () {
    resetButton.classList.remove('pressed');
  }, 100);
}
