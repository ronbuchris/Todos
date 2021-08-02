function onInit() {
  console.log('Hi');
  renderTodos();
}

function renderTodos() {
  var todos = getTodosForDisplay();
  var noTodos = getNoTodosSentence();
  var strHTMLs = [];
  if (todos.length === 0) strHTMLs.push(`<h1>${noTodos}</h1>`);
  else {
    strHTMLs = todos.map(function (todo) {
      return `<li class="${
        todo.isDone ? 'done' : ''
      }" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`;
    });
  }
  var elTodoList = document.querySelector('.todo-list');
  elTodoList.innerHTML = strHTMLs.join('');

  document.querySelector('.total-count').innerText = getTotalCount();
  document.querySelector('.active-count').innerText = getActiveCount();
}

function onToggleTodo(todoId) {
  console.log('Toggling: ', todoId);
  toggleTodo(todoId);
  renderTodos();
}

function onRemoveTodo(todoId, ev) {
  console.log('Removing: ', todoId);
  ev.stopPropagation();
  removeTodo(todoId);
  renderTodos();
}

function onAddTodo() {
  var elTxt = document.querySelector('[name=newTodoTxt]');
  var txt = elTxt.value;
  if (!txt) return;

  var elImportance = document.querySelector('[name=importanceTodo]');
  var importanceRate = elImportance.value;

  addTodo(txt, importanceRate);
  elImportance.value = '';
  elTxt.value = '';

  renderTodos();
}

function onSetFilter(filterBy) {
  console.log('Filtering by:', filterBy);
  setFilterBy(filterBy);
  renderTodos();
}

function onSetSort(sortBy) {
  console.log('sorting by:', sortBy);
  setSortBy(sortBy);
  renderTodos();
}
