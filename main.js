/* eslint-disable no-use-before-define */

function addBookToContainer(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = myLibrary.length - 1;
  const closeIcon = document.createElement("p");
  closeIcon.classList.add("close-icon");
  closeIcon.innerHTML = "&#x2715";
  closeIcon.addEventListener("click", removeBook);
  bookCard.appendChild(closeIcon);
  container.appendChild(createBookCard(book, bookCard));
}

function createBookCard(book, bookCard) {
  const bookKeys = Object.keys(book);
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  bookCard.appendChild(bookInfo);

  bookKeys.forEach((property, index) => {
    if (index < 3) {
      const p = document.createElement("p");
      p.classList.add(`book-${property}`);
      const spanProp = document.createElement("span");
      spanProp.classList.add("book-property");
      const spanValue = document.createElement("span");
      spanValue.textContent = book[property];
      const spanText = property.charAt(0).toUpperCase() + property.slice(1);
      spanProp.textContent = `${spanText}: `;
      p.appendChild(spanProp);
      p.appendChild(spanValue);
      bookInfo.appendChild(p);
    } else {
      const btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.classList.add(`book-${property}`);
      const read = book[property] ? "read" : "not-read";
      if (!book[property]) btn.classList.add("not-read");
      btn.textContent = read;
      btn.addEventListener("click", toggleBookRead);
      bookCard.appendChild(btn);
    }
  });
  return bookCard;
}

function addBookToLibrary() {
  const name = document.getElementById("form-name").value;
  const author = document.getElementById("form-author").value;
  const pages = document.getElementById("form-pages").value;
  const read = document.getElementById("form-read").checked;
  const book = new Book(name, author, parseInt(pages, 10), read);
  myLibrary.push(book);

  return book;
}

function toggleBookRead(e) {
  const bookIndex = e.target.parentElement.attributes["data-index"].value;
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
  const { read } = myLibrary[bookIndex];
  e.target.classList.toggle("not-read");
  e.target.textContent = read ? "read" : "not-read";
}

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function removeBook(e) {
  const divIndex = e.target.parentElement.attributes["data-index"].value;
  for (let i = +divIndex + 1; i < myLibrary.length; i += 1) {
    const nextDiv = document.querySelector(`[data-index="${i}"]`);
    nextDiv.dataset.index = i - 1;
  }
  myLibrary.splice(divIndex, 1);
  e.target.parentElement.remove();
}

function clearForm() {
  document.getElementById("form-name").value = null;
  document.getElementById("form-author").value = null;
  document.getElementById("form-pages").value = null;
  document.getElementById("form-read").checked = false;
}

function toggleForm() {
  const form = document.querySelector("#book-form");
  form.style.visibility = formHidden ? "visible" : "hidden";
  form.classList.toggle("form-toggle");
  darkness.style.display = "block";
  formHidden = !formHidden;
}

const container = document.querySelector(".container");
const darkness = document.querySelector(".bg-darkness");

darkness.addEventListener("click", () => {
  toggleForm();
  darkness.style.display = "none";
});

let formHidden = true;

const myLibrary = [];

const formToggle = document.getElementById("add-book");
formToggle.addEventListener("click", toggleForm);

const addBtn = document.getElementById("form-add");
addBtn.addEventListener("click", () => {
  const book = addBookToLibrary();
  addBookToContainer(book);
  toggleForm();
  darkness.style.display = "none";
  clearForm();
});
