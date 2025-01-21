const readline = require("readline");

// for Input through CMD
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const users = [];
const existingUserIds = new Set();
const existingISBNs = new Set();

// Book Constructor

// Book Constructors
function Book(title, author, ISBN,genre, isAvailable = true,copies) {
    this.title = title;
    this.author = author;
    this.genre=genre;
    this.copies=copies;
    this.ISBN = ISBN;
    this.isAvailable = isAvailable;

    // Check if ISBN is unique
    if (existingISBNs.has(ISBN)) {
        console.log(`Error: ISBN ${ISBN} already exists.`);
        return;  }
    else{
    existingISBNs.add(ISBN); 
    console.log(existingISBNs)
    console.log(`Book "${title}" added successfully!`);
                
    }}

// User Constructor
function User(name, userId) {
    this.name = name;
    this.userId = userId;
    this.borrowedBooks = [];

    // Check if userId is unique
    
    existingUserIds.add(userId);
    users.push()
    }

// Borrow a book method
User.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
        book.isAvailable = false;
        this.borrowedBooks.push(book);

        console.log(`${this.name} borrowed "${book.title}".`);
    } else {
        console.log(`"${book.title}" is not available.`);
    }
};

// Return a book method
User.prototype.returnBook = function(book) {
    const bookIndex = this.borrowedBooks.indexOf(book);
    if (bookIndex !== -1) {
        book.isAvailable = true;
        this.borrowedBooks.splice(bookIndex, 1);
        console.log(`${this.name} returned "${book.title}".`);
    } else {
        console.log(`${this.name} does not have "${book.title}".`);
    }
};

// Add a book method
function Library() {
    this.genres = [ 
        ["Fiction", []],
        ["Non-Fiction", []],
        ["Science", []]
    ];
}

// Object of library
const library = new Library();

// Method to add a book to the library
Library.prototype.addBook = function(book) {

    if (!book || !book.genre) {
        console.log("Error: Book genre is undefined or not provided.");
        return;
    }

    // Check if the genre exists in the library
    let genre = this.genres.find(g => g[0].toLowerCase() === book.genre.toLowerCase());

    // If the genre doesn't exist, create a new genre and add the book
    if (!genre) {
        console.log(`Genre "${book.genre}" not found. Adding a new genre.`);
        genre = [book.genre, []];  // Create new genre with an empty books array
        this.genres.push(genre);  // Add the new genre to the library
    }

    // Add the book to the genre's books array
    genre[1].push(book);
    console.log(`Book "${book.title}" added to the "${book.genre}" genre.`);


};

// remove book
Library.prototype.removeBook = function(ISBN) {
    const bookIndex = this.books.findIndex(b => b.ISBN === ISBN);

    if (bookIndex === -1) {
        console.log(`Error: Book with ISBN ${ISBN} not found.`);
        return;
    }

    // Remove the book from the array
    const removedBook = this.books.splice(bookIndex, 1)[0];
    console.log(`Book "${removedBook.title}" removed from the library.`);
};

// Method to find books by title (case-insensitive)
Library.prototype.findBookByTitle = function(title) {
    // Iterate through genres to search for books by title
    let foundBooks = [];

    this.genres.forEach(([genreName, books]) => {
        // Filter books by title in the current genre
        const booksInGenre = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

        // Add the found books to the foundBooks array
        if (booksInGenre.length > 0) {
            foundBooks = foundBooks.concat(booksInGenre);
        }
    });

    if (foundBooks.length === 0) {
        console.log(`No books found with the title "${title}".`);
        return;
    }

    console.log(`Found books with the title "${title}":`);
    foundBooks.forEach(book => {
        console.log(`${book.title} by ${book.author} (ISBN: ${book.ISBN})`);
    });
};

// Listing the bookTitles
Library.prototype.listBookTitles = function() {
    this.genres.forEach(([genreName, books]) => {
        console.log(`\nBooks in ${genreName} genre:`);
        const titles = books.map(book => book.title);  // Get all book titles in this genre
        console.log(titles.join(", "));  // Join them with commas to display in one line
    });
};

// Check if there are any books by a specific author (using some)
Library.prototype.isBookByAuthorAvailable = function(author) {
    const bookExists = this.genres.some(([genreName, books]) => {
        return books.some(book => book.author.toLowerCase() === author.toLowerCase());  // Check if the author matches
    });
    
    if (bookExists) {
        console.log(`There are books by ${author} in the library.`);
    } else {
        console.log(`No books found by ${author} in the library.`);
    }
};

// Count total books
Library.prototype.countTotalBooks = function() {
    const totalBooks = this.genres.reduce((total, [genreName, books]) => {
        return total + books.length;  // Add the number of books in each genre
    }, 0);  // Initialize total with 0
    console.log(`Total books in the library: ${totalBooks}`);
};


// Add a user method
function addUser() {
    rl.question("Enter User Name: ", function(name) {
        if (name.trim() === "") {
            console.log("Error: Name cannot be empty.");
            return addUser(); 
        }
        rl.question("Enter User ID: ", function(userId) {
            if (name.trim() === "") {
                console.log("Error: Name cannot be empty.");
                return addUser(); 
            }
            if (existingUserIds.has(userId)) {
                console.log(`Error: User ID ${userId} already exists.`);
                return addUser();  }
            const user = new User(name, userId);
            if (user) { 
                users.push(user);
                console.log(`User "${name}" added successfully!`);
                }
            main(); });
    });
}

// Add book to library
function addBook() {
    rl.question("Enter Book Title: ", function(title) {
        
        rl.question("Enter Book Author: ", function(author) {
            rl.question("Enter Book ISBN: ", function(ISBN) {
                rl.question("Enter Book Genre (e.g., Fiction, Non-Fiction, Science): ", function(genre) {
                    rl.question("Enter the number of copies: ", function(copies) {
                        copies = parseInt(copies); // Convert the number of copies to an integer

                        // Validate the number of copies
                        if (isNaN(copies) || copies <= 0) {
                            console.log("Error: Please enter a valid number of copies.");
                            return addBook(); // Prompt the user again
                        }

                        // Check if the ISBN already exists
                        if (existingISBNs.has(ISBN)) {
                            console.log(`Error: ISBN ${ISBN} already exists. Please enter a unique ISBN.`);
                            return main(); // Go back to the main menu without re-running addBook
                        }

                        // Create the book object
                        const book = new Book(title, author, ISBN, genre, true, copies);

                        // Add the ISBN to the existingISBNs set to track uniqueness
                        existingISBNs.add(ISBN);
                        
                        // Add the book to the library
                        library.addBook(book);
                        // Return to the main menu
                        main(); // Return to main menu after adding the book
                    });
                });
            });
        });
    });
}

// Show all books
function showBooks() {
    if (library.genres.length === 0) {
        console.log("No books available in the library.");
    } else {
        console.log("\nBooks in Library:");

        library.genres.forEach(([genreName, books]) => {
            console.log(`\nGenre: ${genreName}`);
            if (books.length === 0) {
                console.log("  No books available in this genre.");
            } else {
                books.forEach((book, index) => {
                    console.log(`${index + 1}. ${book.title} by ${book.author} (ISBN: ${book.ISBN}) - Available: ${book.isAvailable ? "Yes" : "No"} - Copies: ${book.copies}`);
                });
            }
        });
    }
    main(); 
}

// for borrowing book
function borrowBook() {
    rl.question("Enter User ID to borrow a book: ", function(userId) {
        // Convert userId to a number for comparison
        const storedUserId = userId;

        // Check if the user exists in the system
        if (!existingUserIds.has(storedUserId)) {
            console.log("Error: User ID not found.");
            return borrowBook(); // Ask for User ID again
        }

        const user = users.find(u => u.userId === storedUserId);

        if (!user) {
            console.log("Error: User not found in the users array.");
            return borrowBook(); // Ask for User ID again
        }

        rl.question("Enter Book ISBN to borrow: ", function(ISBN) {
            // Find the book in the books array
            const book = library.books.find(b => b.ISBN === ISBN);

            if (!book) {
                console.log("Error: Book with the provided ISBN not found.");
                return borrowBook(); // Ask for ISBN again
            }

            // Let the user borrow the book
            user.borrowBook(book);
            main(); // Return to main menu
        });
    });
}

// returning book
function returnBook() {
    rl.question("Enter User ID to borrow a book: ", function(userId) {
        const storedUserId = userId;


        if (!existingUserIds.has(userId)) {
            console.log("Error: User ID not found.");
            return borrowBook(); // Ask for User ID again
        }

        rl.question("Enter Book ISBN to borrow: ", function(ISBN) {
            const book = books.find(b => b.ISBN === ISBN); // Find book by ISBN
            
            if (!book) {
                console.log("Error: Book with the provided ISBN not found.");
                return returnBook(); // Ask for ISBN again
            }
            const user = users.find(u => u.userId === storedUserId);

            user.returnBook(book); // Proceed to borrow the book
            main(); // Return to main menu
        });
    });
}

//find book
function findBook() {
    rl.question("Enter Book Title to search: ", function(title) {
        library.findBookByTitle(title);  // This uses the findBookByTitle method from the Library object
        main();  // Return to main menu
    });
}

//remove book
function removeBook() {
    rl.question("Enter Book ISBN to remove: ", function(ISBN) {
        library.removeBook(ISBN);  // This uses the removeBook method from the Library object
        main();  // Return to main menu
    });
}

// for listing all book titles
function listBookTitles() {
    library.listBookTitles();
    main();  // Return to main menu
   }

// function for finding totalcount  
function CountTotalBooks(){
    library.countTotalBooks()
    main();
}
// function for Finding Author's book 
function isBookByAuthorAvailable(){ rl.question("Enter the author name to search: ", function(author) {
    library.isBookByAuthorAvailable(author);  // Check for books by author
    main();  // Return to main menu
});}

// Main function
function main() {
    console.log("<------  Welcome to Thinkbiz Library Management System ----->\n");
    console.log("1. Add User");
    console.log("2. Add Book in library");
    console.log("3. Show Books");
    console.log("4. Exit\n");
    console.log("5. borrow Book");
    console.log("6. Return Book");
    console.log("7. Find Book in library");
    console.log("8. Remove Book from library");
    console.log("9. list Book title from library");
    console.log("10. Count total number of books from library");
    console.log("11. Find book by Author name from library");
   
    users.forEach(user => {
        console.log(`User: ${user.name} , User ID: ${user.userId}`);
        
        if (user.borrowedBooks.length === 0) {
            console.log("  Borrowed Books: None");
        } else {
            console.log("  Borrowed Books:");
            user.borrowedBooks.forEach(book => {
                console.log(`    - ${book.title} (ISBN: ${book.ISBN})`);
            });
        }
    });
    

    console.log("\nBooks in Library:");
    // console.log(library);
   library.genres.forEach(([genreName, books]) => {
    console.log(`\nGenre: ${genreName}`);
    books.forEach(book => {
        console.log(`${book.title} by ${book.author} (ISBN: ${book.ISBN}) - Available: ${book.isAvailable ? "Yes" : "No"} - Copies: ${book.copies}`);
    });
});

    rl.question("Choose an option (1, 2, 3, or 4): ", function(choice) {
        switch(choice) {
            case '1':
                addUser();
                break;
            case '2':
                addBook();
                break;
            case '3':
                showBooks();
                break;
            case '4':
                console.log("Exiting the system...");
                rl.close();
                break;
            case '5':
                borrowBook();
                break;
            case '6':
                returnBook();
                break;
            case '7':
                findBook();
                break;      
            case '8':
                removeBook();
                break;
                case '9':
                   listBookTitles();
                break;          
                case '10':
                    CountTotalBooks(); 
                break;          
                case '11':
                    isBookByAuthorAvailable();
                break;          
                
                default:
                console.log("Invalid choice, please try again.");
                main();
                break;
        }
    });
}

// Start the application
main();
