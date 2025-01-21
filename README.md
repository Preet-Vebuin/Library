# Library
# Library Management System

This is a command-line-based Library Management System built using Node.js. It provides functionalities for managing books, users, and borrowing/returning books, allowing efficient library operations.

---

## Features

1. 📋 **Add User**: Add new users to the library system.
2. 📚 **Add Book**: Add new books to the library under various genres.
3. 📖 **Show Books**: Display all books available in the library, categorized by genres.
4. 🔄 **Borrow Book**: Users can borrow books if they are available.
5. 🛑 **Return Book**: Users can return books they have borrowed.
6. 🔍 **Find Book**: Search for books in the library by title.
7. 🗑️ **Remove Book**: Remove books from the library by their ISBN.
8. 📝 **List Book Titles**: List all book titles available in the library, categorized by genres.
9. 🔢 **Count Total Books**: Display the total number of books in the library.
10. ✍️ **Find Books by Author**: Check if books by a specific author are available in the library.
11. ❌ **Exit**: Exit the application.

---

## Installation

1. 📥 Clone the repository:
    ```bash
    git clone <repository_url>
    ```

2. 📂 Navigate to the project directory:
    ```bash
    cd library-management-system
    ```

3. 📦 Install the required dependencies:
    ```bash
    npm install
    ```

---

## How to Run

1. ▶️ Execute the program:
    ```bash
    node <filename>.js
    ```

2. 📌 Follow the on-screen instructions to use the system.

---

## Usage Instructions

### Menu Options
- 📋 **Add User**: Enter the user’s name and a unique user ID.
- 📚 **Add Book**: Enter the book’s title, author, ISBN, genre, and the number of copies available.
- 📖 **Show Books**: View all books in the library grouped by genres.
- 🔄 **Borrow Book**: Provide the user ID and book ISBN to borrow a book.
- 🛑 **Return Book**: Provide the user ID and book ISBN to return a borrowed book.
- 🔍 **Find Book**: Search for books by their title (case-insensitive).
- 🗑️ **Remove Book**: Enter the ISBN of the book to remove it from the library.
- 📝 **List Book Titles**: Display all book titles grouped by their genres.
- 🔢 **Count Total Books**: View the total number of books available in the library.
- ✍️ **Find Books by Author**: Check if books by a specific author are available in the library.
- ❌ **Exit**: Close the application.

---

## Code Highlights

### Constructor Functions

- **📖 Book Constructor**:
  Manages book details such as title, author, ISBN, genre, availability, and copies.
  ```javascript
  function Book(title, author, ISBN, genre, isAvailable = true, copies) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.copies = copies;
      this.ISBN = ISBN;
      this.isAvailable = isAvailable;
  }
  ```

- **👤 User Constructor**:
  Manages user details and borrowed books.
  ```javascript
  function User(name, userId) {
      this.name = name;
      this.userId = userId;
      this.borrowedBooks = [];
  }
  ```

### Library Management

- **➕ Add Books to Genres**:
  Automatically creates new genres if they don’t exist.
  ```javascript
  Library.prototype.addBook = function(book) {
      let genre = this.genres.find(g => g[0].toLowerCase() === book.genre.toLowerCase());
      if (!genre) {
          genre = [book.genre, []];
          this.genres.push(genre);
      }
      genre[1].push(book);
  };
  ```

- **🔍 Search for Books**:
  Find books by title or author.
  ```javascript
  Library.prototype.findBookByTitle = function(title) {
      let foundBooks = [];
      this.genres.forEach(([genreName, books]) => {
          const booksInGenre = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
          if (booksInGenre.length > 0) foundBooks = foundBooks.concat(booksInGenre);
      });
      if (foundBooks.length === 0) {
          console.log(`No books found with the title "${title}".`);
      } else {
          console.log(`Found books with the title "${title}":`);
          foundBooks.forEach(book => console.log(`${book.title} by ${book.author} (ISBN: ${book.ISBN})`));
      }
  };
  ```

---
