class LibraryItem {
  constructor(itemId, title, author) {
    if (this.constructor === LibraryItem) {
      throw new Error("Abstract class cannot be instantiated directly");
    }
    this.itemId = itemId;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
    this.borrowedBy = null;
  }

  displayInfo() {
    throw new Error("displayInfo method must be implemented");
  }

  checkAvailability() {
    return this.isAvailable;
  }

  borrow(userId) {
    if (this.isAvailable) {
      this.isAvailable = false;
      this.borrowedBy = userId;
      return true;
    }
    return false;
  }

  returnItem() {
    this.isAvailable = true;
    this.borrowedBy = null;
  }
}

module.exports = LibraryItem;
