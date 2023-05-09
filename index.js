// variables globales
const form = document.getElementById("formulario");
const toDo = document.getElementById("listaToDo");
const template = document.getElementById("template");
const alert = document.querySelector(".alert");
let todos = []; // se pone let xq en algunos momentos se tiene que sobre escribir y con el const no se puede
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");
  const data = new FormData(form); //captura todos los campos del formulario
  const [toDo] = [...data.values()]; // destructuracion donde se captura los valores de los campos del formulario
  if (!toDo.trim()) {
    // que no contenga valores en blanco
    alert.classList.remove("d-none");
    return;
  }
  agregarToDo(toDo);
  listarToDo();
});
const agregarToDo = (todo) => {
  const objetoToDo = {
    nombre: todo,
    id: `${Date.now()}`, //genera un numero unico // lo transformo en un string
  };
  todos.push(objetoToDo); // se empuja todos los objetos al arrays de toDo
};
// pintar la lista de to do
const listarToDo = () => {
  localStorage.setItem("ToDo", JSON.stringify(todos)); // se almacena los objetos del array
  toDo.textContent = ""; // vacia las lista a la hora de recargar la pagina
  const fragment = document.createDocumentFragment(); // evita el reflow
  todos.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".lead").textContent = item.nombre; // se clona y cambia lo q esta en la etiqueta
    clone.querySelector(".btn").dataset.id = item.id; // se manipula el id de cada boton // el dataset siempre guarda string
    fragment.appendChild(clone);
  });
  toDo.appendChild(fragment);
};
//delegacion de eventos donde hace click en todo el documento
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
    listarToDo();
  }
});
document.addEventListener("DOMContentLoaded", (e) => {
  // carga el dom antes
  if (localStorage.getItem("ToDo")) {
    // verfica si existe los elementos
    todos = JSON.parse(localStorage.getItem("ToDo")); // los muestra
    listarToDo();
  }
});
