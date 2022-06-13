let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book)
  displayBooksOnPage();
}

function displayBooksOnPage () {
  const books = document.querySelector(".books");

  //Remove all previously displayed cards before I loop over again
  const removeDivs = document.querySelectorAll(".card");
  console.log("Show me the node counts of current divs......", removeDivs)
  for (let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove();
  }

  //Loop over the library array and display to the cards
  let index = 0
  myLibrary.forEach(myLibrarys => {
    const card = document.createElement("div");
    card.classList.add("card");
    books.appendChild(card);

    //Create remove button and add class for each card 
    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book-button");
    removeBookButton.textContent = "Remove From Library";
    console.log("Show me my current array objects inside of foreach......", myLibrary)

    // Link the data attribute of the remove button to the array and card
    removeBookButton.dataset.linkedArray = index;
    console.log("Show me the dataset link back to the array...", removeBookButton.dataset.linkedArray)
    card.appendChild(removeBookButton)

    // Start event listener/remove array item from array and card from parent link via data link
    removeBookButton.addEventListener("click", removeBookFromLibrary)

    function removeBookFromLibrary () {
      let retrieveBookToRemove = removeBookButton.linkedArray
      console.log("Attempting to remove array item via data attribute.....", parseInt(retrieveBookToRemove))
      myLibrary.splice(parseInt(retrieveBookToRemove), 1);
      card.remove();
      displayBooksOnPage();
    }

    // Create read status button and add clas attribute for each array card
    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status-button");
    readStatusButton.textContent = "Toggle Read Status";

    // Link the data attribute of the toggle read button to the array and card
    readStatusButton.dataset.linkedArray = index;
    console.log("Show me the dataset link back to the array for READ STATUS.....", readStatusButton.dataset.linkedArray)
    card.appendChild(readStatusButton);

    // Create event listener/toggle logic for array objects prototype for read status change
    readStatusButton.addEventListener("click", toggleReadStatus)

    function toggleReadStatus () {
      let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
      Book.prototype = Object.create(Book.prototype);
      const toggleBook = new Book();
      console.log("What is the toggle initial value?.....", myLibrary[parseInt(retrieveBookToToggle)].read);

      // Run check to see what read value is present to toggle from
      if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "Yes") {
        toggleBook.read = "No";
        myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      } else if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "No") {
        toggleBook.read = "Yes";
        myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      }
      displayBooksOnPage()
    }

    // Loop over the object keys and values and display to each card
    for (let key in myLibrarys) {
      console.log(`${key}: ${myLibrarys[key]}`);
      const para = document.createElement("p");
      para.textContent = (`${myLibrarys[key]}`)
      card.appendChild(para);
    }
  index++;
  })
}

// Event Listener to display the form on click
const addBookButton = document.querySelector(".add-book-button")
addBookButton.addEventListener("click", displayTheForm)

function displayTheForm() {
  document.getElementById("add-book-form").style.display = "";
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", intakeFormData);

function intakeFormData () {
  let Title = document.getElementById("Title").value;
  let Author = document.getElementById("Author").value;
  let Pages = document.getElementById("Pages").value;
  let Read = document.getElementById("Read").value;

  if ((Title == "") || (Author == "") || (Pages == "") || (Read = "")) {
    return;
  }

  //Call function to input the book data to array
  addBookToLibrary(Title, Author, Pages, Read)

  //Reset the form after successful submission
  document.getElementById("add-book").reset()
}

const clearButton = document.querySelector(".reset-button");
clearButton.addEventListener("click", clearForm)

function clearForm () {
  document.getElementById("add-book").reset();
}
