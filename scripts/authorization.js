document.addEventListener('DOMContentLoaded', () => {

  // Находим все нужные нам элементы на странице
  const form = document.querySelector('form');
  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');
  
  const loginError = document.getElementById('login-error');
  const passwordError = document.getElementById('password-error');
  const generalError = document.getElementById('general-error');

  // "Слушаем" отправку формы
  form.addEventListener('submit', (event) => {
    // 1. Отменяем стандартное поведение формы
    event.preventDefault();

    // 2. Сбрасываем все предыдущие ошибки перед новой проверкой
    clearErrors();

    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // 3. Проверяем поля на ошибки
    let isValid = true;

    if (loginValue === '') {
      showError(loginInput, loginError, 'Это обязательное поле!');
      isValid = false;
    }
    
    if (passwordValue === '') {
      showError(passwordInput, passwordError, 'Это обязательное поле!');
      isValid = false;
    }

    // ПОМЕНЯТЬ (когда будем подключать к бэку)
    // Если оба поля прошли проверку на пустоту, проверяем их правильность
    if (isValid && (loginValue !== 'user' || passwordValue !== '12345')) {
      showGeneralError('Неверный логин или пароль.');
      loginInput.classList.add('input-error');
      passwordInput.classList.add('input-error');
      isValid = false;
    }

    // ПОМЕНЯТЬ (когда будем подключать к бэку)
    // 4. Если ошибок нет, считаем вход успешным
    if (isValid) {
      alert('Вход выполнен успешно!');
      // Здесь будет отправка данных на сервер
    }
  });

  // Добавляем "слушателей" на поля ввода, чтобы ошибки исчезали при наборе текста
  loginInput.addEventListener('input', () => {
    hideError(loginInput, loginError);
    generalError.classList.remove('visible');
  });

  passwordInput.addEventListener('input', () => {
    hideError(passwordInput, passwordError);
    generalError.classList.remove('visible');
  });


  // Функция для показа ошибки для конкретного поля
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
  
  // Функция для скрытия ошибки для конкретного поля
  function hideError(inputElement, errorElement) {
    inputElement.classList.remove('input-error');
    errorElement.classList.remove('visible');
  }

  // Функция для показа общей ошибки
  function showGeneralError(message) {
    generalError.textContent = message;
    generalError.classList.add('visible');
  }

  // Функция для очистки всех ошибок перед новой проверкой
  function clearErrors() {
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    loginError.classList.remove('visible');
    passwordError.classList.remove('visible');
    generalError.classList.remove('visible');
  }
});