/* eslint-disable func-names */
// Объявляем переменные для элементов формы и списка комментариев
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const dateInput = document.getElementById('date');
const commentList = document.getElementById('comment-list');

// Добавляем обработчик события на форму при отправке
document.getElementById('comment-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Проверям валидность формы
  let isValid = true;
  if (!nameInput.value) {
    nameInput.classList.add('invalid');
    document.getElementById('name-error').textContent = 'Пожалуйста, введите имя';
    isValid = false;
  } else {
    nameInput.classList.remove('invalid');
    document.getElementById('name-error').textContent = '';
  } if (!commentInput.value) {
    commentInput.classList.add('invalid');
    document.getElementById('comment-error').textContent = 'Пожалуйста, введите комментарий';
    isValid = false;
  } else {
    commentInput.classList.remove('invalid');
    document.getElementById('comment-error').textContent = '';
  } if (!isValid) {
    return;
  }

  // Создаем новый элемент комментария
  const comment = document.createElement('div');
  comment.classList.add('comments__item');

  // Создаем элемент текста комментария
  const commentText = document.createElement('div');
  const commentContent = document.createElement('div');
  const commentAuthor = document.createElement('span');

  commentText.classList.add('comments__text');
  commentAuthor.classList.add('comments__author');

  comment.appendChild(commentAuthor);
  commentContent.textContent = commentInput.value;
  commentText.appendChild(commentContent);
  comment.appendChild(commentText);

  commentList.appendChild(comment);
  commentAuthor.textContent = `${nameInput.value}:`;

  // Создаем элементы заголовка комментария
  const commentFooter = document.createElement('div');
  const commentDate = document.createElement('span');

  commentFooter.classList.add('comments__footer');
  commentDate.classList.add('comments__date');

  // Устанавливаем и проверяем дату
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  // Проверка, была ли выбрана дата
  if (dateInput && dateInput.value) {
    const selectedDate = new Date(dateInput.value);

    if (selectedDate.toDateString() === now.toDateString()) {
      commentDate.textContent = `Сегодня, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (selectedDate.toDateString() === yesterday.toDateString()) {
      const hours = yesterday.getHours() + 18;
      const minutes = yesterday.getMinutes() + 39;
      const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
      commentDate.textContent = `Вчера, ${formattedTime}`;
    } else {
      const formattedDate = selectedDate.toLocaleDateString();
      const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      commentDate.textContent = `${formattedDate} ${formattedTime}`;
    }
  } else if (now.toDateString() === new Date().toDateString()) {
    commentDate.textContent = `Сегодня, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    commentDate.textContent = `${formattedDate} ${formattedTime}`;
  }

  // Добавляем кнопки лайк и удалить
  const commentActions = document.createElement('div');
  commentActions.classList.add('comments__actions');
  const likeBtn = document.createElement('span');
  likeBtn.classList.add('comments__like-btn');
  likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('comments__delete-btn');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Добавляем элементы заголовка в блок комментария
  comment.appendChild(commentFooter);
  commentFooter.appendChild(commentDate);
  commentFooter.appendChild(commentActions);
  commentActions.appendChild(likeBtn);
  commentActions.appendChild(deleteBtn);

  // Добавляем обработчики событий на кнопки
  likeBtn.addEventListener('click', () => {
    if (likeBtn.classList.contains('liked')) {
      likeBtn.classList.remove('liked');
    } else {
      likeBtn.classList.add('liked');
    }
  });
  deleteBtn.addEventListener('click', () => {
    comment.remove();
  });

  // Очищаем форму
  nameInput.value = '';
  dateInput.value = '';
  commentInput.value = '';
});

// Удаляем сообщение об ошибке при изменении содержимого поля
document.getElementById('name').addEventListener('input', function () {
  this.classList.remove('invalid');
  document.getElementById('name-error').textContent = '';
});
document.getElementById('comment').addEventListener('input', function () {
  this.classList.remove('invalid');
  document.getElementById('comment-error').textContent = '';
});
