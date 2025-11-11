document.addEventListener('DOMContentLoaded', () => {

  // Находим все необходимые элементы
  const form = document.querySelector('form');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const cityInput = document.getElementById('city');
  const regionInput = document.getElementById('region');
  const genderSelect = document.getElementById('gender');
  const birthDateInput = document.getElementById('birth-date');

  // Находим все элементы для вывода ошибок
  const firstNameError = document.getElementById('first-name-error');
  const lastNameError = document.getElementById('last-name-error');
  const cityError = document.getElementById('city-error');
  const regionError = document.getElementById('region-error');
  const genderError = document.getElementById('gender-error');
  const birthDateError = document.getElementById('birth-date-error');

  // Слушаем отправку формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    // ПОМЕНЯТЬ
    if (isFormValid) {
      alert('Профиль успешно сохранен!');
      // Здесь будет логика отправки данных на сервер
      // form.submit();
    }
  });

  // Основная функция валидации
  function validateForm() {
    let isValid = true;
    clearAllErrors();

    // 1. Проверка Имени
    if (firstNameInput.value.trim() === '') {
      showError(firstNameInput, firstNameError, 'Это обязательное поле');
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(firstNameInput.value)) {
      showError(firstNameInput, firstNameError, 'Имя может содержать только буквы, пробел или дефис');
      isValid = false;
    }

    // 2. Проверка Фамилии
    if (lastNameInput.value.trim() === '') {
      showError(lastNameInput, lastNameError, 'Это обязательное поле');
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(lastNameInput.value)) {
      showError(lastNameInput, lastNameError, 'Фамилия может содержать только буквы, пробел или дефис');
      isValid = false;
    }

    // 3. Проверка Города
    if (cityInput.value.trim() === '') {
      showError(cityInput, cityError, 'Пожалуйста, укажите ваш город');
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(cityInput.value)) {
      showError(cityInput, cityError, 'Название города может содержать только буквы, пробел или дефис');
      isValid = false;
    }

    // 4. Проверка Региона
    if (regionInput.value.trim() === '') {
      showError(regionInput, regionError, 'Пожалуйста, укажите ваш регион');
      isValid = false;
    }

    // 5. Проверка Пола
    if (genderSelect.value === '') {
      showError(genderSelect, genderError, 'Пожалуйста, выберите ваш пол');
      isValid = false;
    }

    // 6. Проверка Даты Рождения
    const birthDateValue = birthDateInput.value;
    if (birthDateValue === '') {
      showError(birthDateInput, birthDateError, 'Укажите вашу дату рождения');
      isValid = false;
    } else {
      const birthDate = new Date(birthDateValue);
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

      if (birthDate > today) {
        showError(birthDateInput, birthDateError, 'Дата рождения не может быть в будущем');
        isValid = false;
      } else if (birthDate > eighteenYearsAgo) {
        showError(birthDateInput, birthDateError, 'Регистрация доступна только с 18 лет');
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
  
  function hideError(inputElement, errorElement) {
    inputElement.classList.remove('input-error');
    errorElement.classList.remove('visible');
  }

  function clearAllErrors() {
    hideError(firstNameInput, firstNameError);
    hideError(lastNameInput, lastNameError);
    hideError(cityInput, cityError);
    hideError(regionInput, regionError);
    hideError(genderSelect, genderError);
    hideError(birthDateInput, birthDateError);
  }
});