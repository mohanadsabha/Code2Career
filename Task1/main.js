/**
 * First Way - Object Literal
 */
const book1 = {
  title: "Learning JavaScript",
  author: "Belal Mohsen",
  isRead: true,
  toggleReadStatus: function () {
    this.isRead = !this.isRead;
  },
  describe: function () {
    return `${this.title} by ${this.author} - Read: ${this.isRead}`;
  },
};

/**
 * Second Way - Factory Function
 */
function createBook(title, author, isRead) {
  return {
    title: title,
    author: author,
    isRead: isRead,
    toggleReadStatus: function () {
      this.isRead = !this.isRead;
    },
    describe: function () {
      return `${this.title} by ${this.author} - Read: ${this.isRead}`;
    },
  };
}

const book2 = createBook("Learning JavaScript", "Belal Mohsen", true);

/**
 * Third Way - Constructor Function
 */
function Book(title, author, isRead = false) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

Book.prototype.describe = function () {
  return `${this.title} by ${this.author} - Read: ${this.isRead}`;
};

const book3 = new Book("Learning JavaScript", "Belal Mohsen", true);

/**
 * Fourth Way - Classes
 */
class BookClass {
  constructor(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }
  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
  describe() {
    return `${this.title} by ${this.author} - Read: ${this.isRead}`;
  }
}

const book4 = new BookClass("Learning JavaScript", "Belal Mohsen", true);
