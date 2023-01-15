/* eslint-disable no-use-before-define */
const container = document.querySelector(".container");

function addBookToContainer(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  container.appendChild(createBookCard(book, bookCard));
}

function createBookCard(book, bookCard) {
  const bookKeys = Object.keys(book);
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  bookCard.appendChild(bookInfo);

  bookKeys.forEach((property, index) => {
    const p = document.createElement("p");
    p.classList.add(`book-${property}`);

    if (index < 3) {
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
      p.textContent = `${property}: ${book[property]}`;
      bookCard.appendChild(p);
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

let formHidden = true;

const myLibrary = [];

const addBtn = document.getElementById("add-book");
addBtn.addEventListener("click", () => {
  const form = document.querySelector("#book-form");
  form.style.visibility = formHidden ? "visible" : "hidden";
  formHidden = !formHidden;
});

const formAddBtn = document.getElementById("form-add");
formAddBtn.addEventListener("click", () => {
  const book = addBookToLibrary();
  addBookToContainer(book);
});

function Book(book, author, pages, read) {
  this.name = book;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
