const LibraryItem = require("./library_item");

class DVD extends LibraryItem {
  constructor(itemId, title, author, duration, genre) {
    super(itemId, title, author);
    this.reservedBy = null;
    this.isReserved = false;
    this.duration = duration;
    this.genre = genre;
    this.itemType = "DVD";
  }

  displayInfo() {
    const status = this.isAvailable
      ? "Available"
      : `Borrowed by User ${this.borrowedBy}`;
    const reservation = this.isReserved
      ? `, Reserved by User ${this.reservedBy}`
      : "";
    return `DVD: '${this.title}' directed by ${this.author} | Duration: ${this.duration} min | Genre: ${this.genre} | Status: ${status}${reservation}`;
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

module.exports = DVD;
