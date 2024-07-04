const input = document.querySelector('.todo__form-input');
const inputBtn = document.querySelector('.todo__form-enter');

const listContainer = document.querySelector('.todo__list');

const listQty = document.querySelector('.list__qty');
const filter = document.querySelector('.list__filter');
const filterAll = document.querySelector('.list__filter-btn--all');
const filterActive = document.querySelector('.list__filter-btn--active');
const filterDone = document.querySelector('.list__filter-btn--done');
const clearList = document.querySelector('.list__clear');

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let id = JSON.parse(localStorage.getItem('id')) || 1;

const renderList = (list) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  localStorage.setItem('id', JSON.stringify(id));

  listContainer.innerHTML = '';

  if (list.length === 0) {
    listContainer.insertAdjacentHTML(
      'afterbegin',
      `
         <p class="todo__list-empty">
          <span> List is empty now !</span>
          <img src="./images/sentiment_dissatisfied.svg" alt="sad icon" />
         </p>
        `
    );
  } else {
    list.forEach((item) => {
      listContainer.insertAdjacentHTML(
        'afterbegin',
        `
        <li class="list-item" id="${item.id}">
          <button class="list-item__btn  list-item__btn-done">
          ${item.done ? '<img src="./images/check.svg" alt="check icon" />' : ''}
            
          </button>
          <p class="list-item__detail">${item.text}</p>
          <button class="list-item__btn list-item__btn-delete">
            <img src="./images/delete.svg" alt="delete icon" />
          </button>
        </li>
        `
      );
    });
  }

  listQty.textContent = `${list.filter((item) => !item.done).length} items left`;
};

const itemDone = (e) => {
  if (e.target.closest('.list-item__btn-done')) {
    const doneItemId = +e.target.closest('.list-item').id;
    const doneItem = todoList.find((item) => item.id === doneItemId);

    if (doneItem) doneItem.done = !doneItem.done;
    renderList(todoList);
  }
};

const itemDelete = (e) => {
  if (e.target.closest('.list-item__btn-delete')) {
    const deleteItemId = +e.target.closest('.list-item').id;
    const deleteItemIndex = todoList.findIndex((item) => item.id === deleteItemId);

    todoList.splice(deleteItemIndex, 1);
    renderList(todoList);
  }
};

const filterSelect = (e) => {
  if (e.target.classList.contains('list__filter-btn')) {
    filter.querySelectorAll('.list__filter-btn').forEach((btn) => btn.classList.remove('list__filter-btn-focus'));

    e.target.classList.add('list__filter-btn-focus');

    if (e.target === filterAll) {
      renderList(todoList);
    }

    if (e.target === filterActive) {
      const activeTodoList = todoList.filter((item) => !item.done);
      renderList(activeTodoList);
    }

    if (e.target === filterDone) {
      const doneTodoList = todoList.filter((item) => item.done);
      renderList(doneTodoList);
    }
  }
};

const listClear = () => {
  todoList.length = 0;
  renderList(todoList);
};

const storeListItem = () => {
  if (input.value === '') return;

  todoList.push({
    text: input.value.trim(),
    done: false,
    id: id,
  });

  input.value = '';
  ++id;
  renderList(todoList);
};

const clickEnter = (e) => {
  e.preventDefault();
  storeListItem();
};

const pressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    storeListItem();
  }
};

input.addEventListener('keypress', pressEnter);
inputBtn.addEventListener('click', clickEnter);

listContainer.addEventListener('click', itemDone);
listContainer.addEventListener('click', itemDelete);

filter.addEventListener('click', filterSelect);
clearList.addEventListener('click', listClear);

const init = () => {
  renderList(todoList);
};

init();
