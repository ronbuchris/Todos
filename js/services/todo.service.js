var gTodos = [];
var gFilterBy = 'all';
var gSortBy = 'text';
_createTodos();

function getTodosForDisplay() {
  if (gSortBy === 'text') {
    gTodos.sort(function (a, b) {
      return a.txt < b.txt ? -1 : 1;
    });
  } else if (gSortBy === 'created') {
    gTodos.sort(function (a, b) {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  } else if (gSortBy === 'importance') {
    gTodos.sort(function (a, b) {
      return a.importance > b.importance ? -1 : 1;
    });
  }

  if (gFilterBy === 'all') return gTodos;

  var todos = gTodos.filter(function (todo) {
    return (
      (gFilterBy === 'active' && !todo.isDone) ||
      (gFilterBy === 'done' && todo.isDone)
    );
  });

  return todos;
}

function removeTodo(todoId) {
  if (!window.confirm('Do you really want to remove?')) return;
  var idx = gTodos.findIndex(function (todo) {
    return todo.id === todoId;
  });
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function addTodo(txt, importanceRate = 1) {
  var todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    createdAt: Date.now(),
    importance: importanceRate,
  };
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find(function (todo) {
    return todo.id === todoId;
  });
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy;
}

function setSortBy(sortBy) {
  gSortBy = sortBy;
}

function getTotalCount() {
  return gTodos.length;
}
function getActiveCount() {
  var activeTodos = gTodos.filter(function (todo) {
    return !todo.isDone;
  });
  return activeTodos.length;
}

function _saveTodosToStorage() {
  saveToStorage('todoDB', gTodos);
}

function _createTodos() {
  var todos = loadFromStorage('todoDB');
  if (todos && todos.length) {
    gTodos = todos;
  } else {
    addTodo('Learn HTML');
    addTodo('Master CSS');
    addTodo('Practive JS');
  }
}

function _makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getNoTodosSentence() {
  if (gFilterBy === 'all') return 'No Todos';
  if (gFilterBy === 'active') return 'No Active Todos';
  if (gFilterBy === 'done') return 'No Done Todos';
}
