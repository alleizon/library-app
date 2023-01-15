/* eslint-disable no-use-before-define */
const myLibrary = [
  {
    name: "Game of Thrones",
    author: "George R. R. Martin",
    pages: 300,
    read: true,
  },

  {
    name: "Game of Thrones",
    author: "George R. R. Martin",
    pages: 300,
    read: true,
  },

  {
    name: "Game of Thrones",
    author: "George R. R. Martin",
    pages: 300,
    read: true,
  },
];

addLibraryToContainer();

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function addLibraryToContainer() {
  const container = document.querySelector(".container");

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    container.appendChild(createBookCard(book, bookCard));
  });
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
