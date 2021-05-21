let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todo-input");
let todoButton = document.getElementById("todo-button");
let todoFilter = document.getElementById("todo-filter");

//önce dizi oluşacak
//dizi üzerinden yapılacaklar listesi oluşturulacak
//kalıcı yapmak için storageden yardım alacağz

const getTodoFromStorage = () => {
  const storage = JSON.parse(localStorage.getItem("todoListe"));
  return storage ? storage : [];
};

const getDonesFromStorage = () => {
  const storage = JSON.parse(localStorage.getItem("dones"));
  return storage ? storage : [];
};

let todoListe = getTodoFromStorage();
let dones = getDonesFromStorage();

function todoPage() {
  todoListe.forEach((todo) => {
    createTodoItem(todo);
  });
}

function getDonesToPage() {
  dones.forEach((done) => {
    createDoneItem(done);
  });
}

function saveToDoStorage(todo) {
  todoListe.push(todo);
  localStorage.setItem("todoListe", JSON.stringify(todoListe));
  createTodoItem(todo);
}

todoButton.addEventListener("click", () => {
  var input = todoInput.value;
  if (input) saveToDoStorage(input);
  todoInput.value = "";
});

todoInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) todoButton.click();
});

window.addEventListener("load", () => {
  todoPage();
  getDonesToPage();
});

function removeToDo(target) {
  let todo = target.parentNode.childNodes[0].innerHTML;
  removeToDoFromStorage(todo);
  target.parentNode.classList.add(
    "animate__animated",
    "animate__slideOutLeft",
    "animate__faster"
  );
  target.parentNode.addEventListener("animationed", () => {
    target.parentNode.remove();
  });
}
function removeToDoFromStorage(todo) {
  let index = todoListe.indexOf(todo);
  if (index > -1) {
    todoListe.splice(index, 1);
    localStorage.setItem("todoListe", JSON.stringify(todoListe));
  }
}
function removeDoneFromStorage(done) {
  let index = dones.indexOf(done);
  if (index > -1) {
    dones.splice(index, 1);
    localStorage.setItem("dones", JSON.stringify(dones));
  }
}

function checkToDo(target) {
  let todo = target.parentNode.childNodes[0].innerHTML;
  moveTodoDone(todo, target);
}

function moveTodoDone(todo, target) {
  removeToDoFromStorage(todo);
  dones.push(todo);
  localStorage.setItem("dones", JSON.stringify(dones));
  makedItDone(target);
}
function moveDoneToTodos(done, target) {
  removeDoneFromStorage("done");
  todoListe.push(done);
  localStorage.setItem("todoListe", JSON.stringify(todoListe));
  makeItToDo(target);
}
function makeItToDo(target) {
  target.parentNode.classList.remove("done");
  target.parentNode.classList.add("todo");
  target.parentNode.childNodes[2].setAttribute("onclick", "removeToDo(this)");
  target.className = "";
  target.classList.add("fas", "fa-square");
  target.setAttribute("onclick", "checkToDo(this)");
}

function makedItDone(target) {
  let done = target.parentNode.classList.add("done");
  target.parentNode.classList.remove("todo");
  target.parentNode.childNodes[2].setAttribute("onclick", "removeDone(this)");
  target.className = "";
  target.classList.add("fas", "fa-check-square");
  target.setAttribute("onclick", "uncheckDone(this)");
}

function uncheckDone(target) {
  let done = target.parentNode.childNodes[0].innerHTML;
  moveDoneToTodos(done, target);
}

function removeDone(target) {
  let done = target.parentNode.childNodes[0].innerHTML;
  removeDoneFromStorage(done);
  target.parentNode.classList.add(
    "animate__animated",
    "animate__slideOutLeft",
    "animate__faster"
  );
  target.parentNode.addEventListener("animationed", () => {
    target.parentNode.remove();
  });
}

function createTodoItem(text) {
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item", "todo");
  let todoItemLi = document.createElement("li");
  todoItemLi.innerHTML = text;
  let todoItemCheck = document.createElement("i");
  todoItemCheck.classList.add("fas", "fa-square");
  todoItemCheck.setAttribute("onclick", "checkToDo(this)");
  let todoItemRemove = document.createElement("i");
  todoItemRemove.classList.add("fas", "fa-trash-alt");
  todoItemRemove.setAttribute("onclick", "removeToDo(this)");
  todoItem.appendChild(todoItemLi);
  todoItem.appendChild(todoItemCheck);
  todoItem.appendChild(todoItemRemove);
  todoList.appendChild(todoItem);
}

function createDoneItem(text) {
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item", "done");
  let todoItemLi = document.createElement("li");
  todoItemLi.innerHTML = text;
  let todoItemCheck = document.createElement("i");
  todoItemCheck.classList.add("fas", "fa-check-square");
  todoItemCheck.setAttribute("onclick", "uncheckToDo(this)");
  let todoItemRemove = document.createElement("i");
  todoItemRemove.classList.add("fas", "fa-trash-alt");
  todoItemRemove.setAttribute("onclick", "removeDone(this)");
  todoItem.appendChild(todoItemLi);
  todoItem.appendChild(todoItemCheck);
  todoItem.appendChild(todoItemRemove);
  todoList.appendChild(todoItem);
}

todoFilter.addEventListener("click", () => {
  todoList.dataset.filter = (parseInt(todoList.dataset.filter) + 1) % 3;
  listFilter();
});

function listFilter() {
  const items = todoList.getElementsByClassName("todo-item");
  let array = [].map.call(items, (item) => item);
  const filter = todoList.dataset.filter;
  array.forEach((item) => {
    switch (filter) {
      case "0":
        todoFilter.className = "";
        todoFilter.classList.add("far", "fa-square");
        item.style.display = "flex";
        break;
      case "1":
        todoFilter.className = "";
        todoFilter.classList.add("fas", "fa-square");
        if (item.classList.contains("done")) item.style.display = "none";
        else item.style.display = "flex";
        break;
      case "2":
        todoFilter.className = "";
        todoFilter.classList.add("fas", "fa-check-square");
        if (item.classList.contains("todo")) item.style.display = "none";
        else item.style.display = "flex";
        break;
    }
  });
}

//end
