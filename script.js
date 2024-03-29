function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author; 
  this.pages = pages;
  this.read = read;
  this.index = index;
}

function generateBook(libraryArray) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  let read = false;
  document.querySelector('#read').value == "y" ? read = true : read = false;
  const index = libraryArray.length;
  const book = new Book(title, author, pages, read, index);
  return book;
}

function createCardInfoDiv(book, div) {
  let infoDiv = document.createElement('div');
  infoDiv.classList.add('info')
  let bookTitle = document.createElement("h4");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;
  let bookAuthor = document.createElement("p");
  bookAuthor.classList.add("body");
  bookAuthor.textContent = `By ${book.author}`;
  let bookPages = document.createElement("p");
  bookPages.classList.add("body");
  bookPages.textContent = `${book.pages} pages`;

  infoDiv.appendChild(bookTitle);
  infoDiv.appendChild(bookAuthor);
  infoDiv.appendChild(bookPages);

  return infoDiv;
}

function createBookReadDiv(book) {
  let bookRead = document.createElement('div');
  bookRead.classList.add('read');
  let bookReadCheckbox = document.createElement("input");
  bookReadCheckbox.type = 'checkbox'
  bookReadCheckbox.id = 'read-book';
  bookReadCheckbox.name = 'read-book';
  book.read == true ? bookReadCheckbox.checked = true : bookReadCheckbox.checked = false;
  bookReadCheckbox.addEventListener('change', function(e) {
    label = document.querySelector(`div[data-index="${book.index}"] label`);
    if (e.target.checked) {
      label.textContent = 'Read';
    } else {
      label.textContent = 'Unread';
    }
  })
  let bookReadLabel = document.createElement("label");
  bookReadLabel.classList.add("body");
  bookReadLabel.for = 'read-book';
  book.read == true ? bookReadLabel.textContent = 'Read' : bookReadLabel.textContent = 'Unread'; 

  bookRead.appendChild(bookReadCheckbox);
  bookRead.appendChild(bookReadLabel);

  return bookRead
}

function createRemoveButton(book) {
  let bookRemoveButton = document.createElement('button');
  bookRemoveButton.classList.add('remove')
  bookRemoveButton.textContent = 'Remove book'
  bookRemoveButton.addEventListener('click', () => {
    document.querySelector(`[data-index="${book.index}"]`).remove();
  })

  return bookRemoveButton;
}

function addBookInfoToDiv(book, div) {
  const infoDiv = createCardInfoDiv(book, div);
  infoDiv.appendChild(createBookReadDiv(book));
  const bookRemoveButton = createRemoveButton(book);

  div.setAttribute('data-index',`${book.index}`);
  div.appendChild(infoDiv);
  div.appendChild(bookRemoveButton);
}

function addBookDivToContainer(book, container) {
  let bookElement = document.createElement("div");
  bookElement.classList.add("card");

  addBookInfoToDiv(book, bookElement);
  container.appendChild(bookElement);
}

// For initialisation of dummy books

function addBooksToContainer() {
  if (document.querySelector('.container')) {
    document.querySelector('.container').remove();
  };
  const container = document.createElement("div");
  document.body.appendChild(container);
  container.classList.add('container')
  
  for (const book of myLibrary) {
    addBookDivToContainer(book, container)
  }
}



const myLibrary = [];
const container = document.getElementById("container");
const dialog = document.querySelector("#dialog");

const form = document.querySelector("#form");
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const book = generateBook(myLibrary);
  myLibrary.push(book)
  addBooksToContainer();
})

const showButton = document.querySelector("#show-button");
showButton.addEventListener("click", () => {
  dialog.showModal();
});

const hideButton = document.querySelector("#hide-button");
hideButton.addEventListener("click", () => {
  dialog.close();
});

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, false, 0);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 324, true, 1);
const book3 = new Book("1984", "George Orwell", 328, true, 2);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 432, false, 3);
const book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 224, false, 4);

myLibrary.push(book1, book2, book3, book4, book5);
addBooksToContainer()


