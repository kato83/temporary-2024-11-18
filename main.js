const getTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

[...document.getElementsByClassName('delete-btn')]
  .forEach(node => node.addEventListener('click', () => console.log(confirm('このTODOを削除してもよろしいですか？'))));

/**
 * HTMLエスケープを実施する関数
 * @param {string} str エスケープしたい対象の文字列
 * @returns エスケープした結果の文字列
 */
const escapeHTML = (str) => str.replace(/[&'`"<>]/g, match => ({
  '&': '&amp;',
  "'": '&#x27;',
  '`': '&#x60;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
}[match]));

/**
 * 画面の描画処理
 */
const render = () => {
  /** @type {Array<{completed: boolean, text: string, id: string}>} */
  const todos = getTodos();
  const completedTodoList = document.querySelector('#completed-todo-list');
  completedTodoList.innerHTML = '';
  const uncompletedTodoList = document.querySelector('#uncompleted-todo-list');
  uncompletedTodoList.innerHTML = '';
  todos.forEach(todo => {
    const todoHTML = `<div class="todo-card ${todo.completed ? 'todo-completed' : ''}" data-id="${todo.id}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} />
        <span class="todo-text" contenteditable="true">${escapeHTML(todo.text)}</span>
        <button class="delete-btn">削除</button>
      </div>`;
    if (todo.completed) {
      document.querySelector('#completed-todo-list').insertAdjacentHTML('beforeend', todoHTML);
    } else {
      document.querySelector('#uncompleted-todo-list').insertAdjacentHTML('beforeend', todoHTML);
    }
  });
};

// form submit 時の処理
document.querySelector('#todo-form')
  .addEventListener('submit', (e) => {
    // ページリロードを防ぐ
    e.preventDefault();
    // localStorage の保存処理
    const form = new FormData(e.target);
    const text = form.get('text');
    const todos = [
      ...getTodos(),
      {
        completed: false,
        text: text,
        id: crypto.randomUUID()
      }
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
    // form の内容をリセットする
    e.target.reset();
  });

render();

// 削除処理
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn') && confirm('このTODOを削除してもよろしいですか？')) {
    /** @type {HTMLElement} */
    const todoElement = e.target.closest('.todo-card');
    const uuid = todoElement.dataset.id;
    /** @type {Array<{completed: boolean, text: string, id: string}>} */
    const todos = getTodos();
    const newTodos = todos.filter(todo => todo.id !== uuid);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    render();
  }
});

// チェックボックスによる完了、未完了をセットするようにする
document.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    /** @type {HTMLElement} */
    const todoElement = e.target.closest('.todo-card');
    const uuid = todoElement.dataset.id;
    /** @type {Array<{completed: boolean, text: string, id: string}>} */
    const todos = getTodos();
    for (const todo of todos) {
      // チェックボックスを変更した対象のTODOかチェック
      if (todo.id === uuid) {
        todo.completed = !todo.completed;
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
  }
});