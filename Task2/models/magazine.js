const LibraryItem = require("./library_item");

class Magazine extends LibraryItem {
  constructor(itemId, title, author, issueNumber, publicationDate) {
    super(itemId, title, author);
    this.issueNumber = issueNumber;
    this.publicationDate = publicationDate;
    this.itemType = "Magazine";
  }

  displayInfo() {
    const status = this.isAvailable
      ? "Available"
      : `Borrowed by User ${this.borrowedBy}`;
    return `Magazine: '${this.title}' by ${this.author} | Issue #${this.issueNumber} | Date: ${this.publicationDate} | Status: ${status}`;
  }
}

module.exports = Magazine;
