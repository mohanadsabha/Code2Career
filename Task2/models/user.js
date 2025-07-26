class User {
  constructor(userId, name, email) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.borrowedItems = [];
  }

  addBorrowedItem(itemId) {
    if (!this.borrowedItems.includes(itemId)) {
      this.borrowedItems.push(itemId);
    }
  }

  removeBorrowedItem(itemId) {
    const index = this.borrowedItems.indexOf(itemId);
    if (index > -1) {
      this.borrowedItems.splice(index, 1);
    }
  }

  displayInfo() {
    const borrowedCount = this.borrowedItems.length;
    return `User ID: ${this.userId} | Name: ${this.name} | Email: ${this.email} | Borrowed Items: ${borrowedCount}`;
  }
}

module.exports = User;
