const LibraryItem = require("./library_item");

class Book extends LibraryItem {
  constructor(itemId, title, author, isbn, pages) {
    super(itemId, title, author);

    this.reservedBy = null;
    this.isReserved = false;
    this.isbn = isbn;
    this.pages = pages;
    this.itemType = "Book";
  }

  displayInfo() {
    const status = this.isAvailable
      ? "Available"
      : `Borrowed by User ${this.borrowedBy}`;
    const reservation = this.isReserved
      ? `, Reserved by User ${this.reservedBy}`
      : "";
    return `Book: '${this.title}' by ${this.author} | ISBN: ${this.isbn} | Pages: ${this.pages} | Status: ${status}${reservation}`;
  }

  reserve(userId) {
    if (!this.isReserved) {
      this.isReserved = true;
      this.reservedBy = userId;
      return true;
    }
    return false;
  }

  cancelReservation() {
    this.isReserved = false;
    this.reservedBy = null;
  }
}

module.exports = Book;
