const fs = require("fs").promises;
const Book = require("./book");
const Magazine = require("./magazine");
const DVD = require("./dvd");
const User = require("./user");
const {
  ItemNotAvailableError,
  UserNotFoundError,
  ItemNotFoundError,
  ReservationError,
} = require("../exceptions/custom_exceptions");

class Library {
  constructor() {
    this.items = {}; // Object to store items by ID
    this.users = {}; // Object to store users by ID
    this.nextUserId = 1;
    this.nextItemId = 1;
  }

  async loadData() {
    try {
      // Load items
      try {
        const itemsData = await fs.readFile("items.json", "utf8");
        const itemsArray = JSON.parse(itemsData);

        for (const itemData of itemsArray) {
          const item = this._createItemFromData(itemData);
          this.items[item.itemId] = item;
          if (item.itemId >= this.nextItemId) {
            this.nextItemId = item.itemId + 1;
          }
        }
        console.log("Items loaded successfully!");
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("items.json not found. Starting with empty library.");
          this._createSampleItems();
        } else {
          console.log("Error reading items.json. Starting with sample data.");
          this._createSampleItems();
        }
      }

      // Load users
      try {
        const usersData = await fs.readFile("users.json", "utf8");
        const usersArray = JSON.parse(usersData);

        for (const userData of usersArray) {
          const user = new User(userData.userId, userData.name, userData.email);
          user.borrowedItems = userData.borrowedItems || [];
          this.users[user.userId] = user;
          if (user.userId >= this.nextUserId) {
            this.nextUserId = user.userId + 1;
          }
        }
        console.log("Users loaded successfully!");
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log(
            "users.json not found. Starting with empty user database."
          );
        } else {
          console.log(
            "Error reading users.json. Starting with empty user database."
          );
        }
      }
    } catch (error) {
      console.log(`Unexpected error loading data: ${error}`);
    }
  }

  _createSampleItems() {
    const sampleItems = [
      new Book(1, "Python Programming", "Mohanad Moh", "978-0123456789", 300),
      new Book(2, "Data Structures", "Ahmad Ali", "978-9876543210", 450),
      new Magazine(3, "Tech Today", "Tech Publications", 42, "2024-12-01"),
      new DVD(
        4,
        "Programming Basics",
        "Educational Company",
        120,
        "Educational"
      ),
      new DVD(5, "Linear Algebra", "Majed Majed", 136, "Sci-Fi"),
    ];

    for (const item of sampleItems) {
      this.items[item.itemId] = item;
    }
    this.nextItemId = 6;
    console.log("Sample items created!");
  }

  _createItemFromData(itemData) {
    const itemType = itemData.itemType;
    let item;

    switch (itemType) {
      case "Book":
        item = new Book(
          itemData.itemId,
          itemData.title,
          itemData.author,
          itemData.isbn,
          itemData.pages
        );
        break;
      case "Magazine":
        item = new Magazine(
          itemData.itemId,
          itemData.title,
          itemData.author,
          itemData.issueNumber,
          itemData.publicationDate
        );
        break;
      case "DVD":
        item = new DVD(
          itemData.itemId,
          itemData.title,
          itemData.author,
          itemData.duration,
          itemData.genre
        );
        break;
      default:
        throw new Error(`Unknown item type: ${itemType}`);
    }

    // Set availability and borrowing info
    item.isAvailable =
      itemData.isAvailable !== undefined ? itemData.isAvailable : true;
    item.borrowedBy = itemData.borrowedBy || null;

    // Set reservation info for reservable items
    if (typeof item.reserve === "function") {
      item.isReserved = itemData.isReserved || false;
      item.reservedBy = itemData.reservedBy || null;
    }

    return item;
  }

  async saveData() {
    try {
      // Save items
      const itemsData = [];
      for (const item of Object.values(this.items)) {
        const itemDict = {
          itemId: item.itemId,
          title: item.title,
          author: item.author,
          itemType: item.itemType,
          isAvailable: item.isAvailable,
          borrowedBy: item.borrowedBy,
        };

        // Add specific attributes based on item type
        if (item instanceof Book) {
          Object.assign(itemDict, {
            isbn: item.isbn,
            pages: item.pages,
            isReserved: item.isReserved,
            reservedBy: item.reservedBy,
          });
        } else if (item instanceof Magazine) {
          Object.assign(itemDict, {
            issueNumber: item.issueNumber,
            publicationDate: item.publicationDate,
          });
        } else if (item instanceof DVD) {
          Object.assign(itemDict, {
            duration: item.duration,
            genre: item.genre,
            isReserved: item.isReserved,
            reservedBy: item.reservedBy,
          });
        }

        itemsData.push(itemDict);
      }

      await fs.writeFile("items.json", JSON.stringify(itemsData, null, 2));

      // Save users
      const usersData = [];
      for (const user of Object.values(this.users)) {
        const userDict = {
          userId: user.userId,
          name: user.name,
          email: user.email,
          borrowedItems: user.borrowedItems,
        };
        usersData.push(userDict);
      }

      await fs.writeFile("users.json", JSON.stringify(usersData, null, 2));

      console.log("Data saved successfully!");
    } catch (error) {
      console.log(`Error saving data: ${error}`);
    }
  }

  viewAllItems() {
    if (Object.keys(this.items).length === 0) {
      console.log("No items in the library.");
      return;
    }

    console.log("\n=== ALL LIBRARY ITEMS ===");
    for (const item of Object.values(this.items)) {
      console.log(`ID ${item.itemId}: ${item.displayInfo()}`);
    }
  }

  searchItems(keyword) {
    keyword = keyword.toLowerCase();
    const matchingItems = [];

    for (const item of Object.values(this.items)) {
      if (
        item.title.toLowerCase().includes(keyword) ||
        item.itemType.toLowerCase().includes(keyword) ||
        item.author.toLowerCase().includes(keyword)
      ) {
        matchingItems.push(item);
      }
    }

    if (matchingItems.length > 0) {
      console.log(`\n=== SEARCH RESULTS FOR '${keyword}' ===`);
      for (const item of matchingItems) {
        console.log(`ID ${item.itemId}: ${item.displayInfo()}`);
      }
    } else {
      console.log(`No items found matching '${keyword}'`);
    }
  }

  registerUser(name, email) {
    const userId = this.nextUserId;
    const user = new User(userId, name, email);
    this.users[userId] = user;
    this.nextUserId += 1;
    console.log(`User registered successfully! Your User ID is: ${userId}`);
    return userId;
  }

  borrowItem(userId, itemId) {
    // Check if user exists
    if (!(userId in this.users)) {
      throw new UserNotFoundError(`User ID ${userId} not found`);
    }

    // Check if item exists
    if (!(itemId in this.items)) {
      throw new ItemNotFoundError(`Item ID ${itemId} not found`);
    }

    const item = this.items[itemId];
    const user = this.users[userId];

    // Check if item is available
    if (!item.checkAvailability()) {
      throw new ItemNotAvailableError(`Item '${item.title}' is not available`);
    }

    // Borrow the item
    if (item.borrow(userId)) {
      user.addBorrowedItem(itemId);
      console.log(`Successfully borrowed '${item.title}'!`);
    } else {
      throw new ItemNotAvailableError("Failed to borrow item");
    }
  }

  reserveItem(userId, itemId) {
    // Check if user exists
    if (!(userId in this.users)) {
      throw new UserNotFoundError(`User ID ${userId} not found`);
    }

    // Check if item exists
    if (!(itemId in this.items)) {
      throw new ItemNotFoundError(`Item ID ${itemId} not found`);
    }

    const item = this.items[itemId];

    // Check if already reserved
    if (item.isReserved) {
      throw new ReservationError(`Item '${item.title}' is already reserved`);
    }

    // Reserve the item
    if (item.reserve(userId)) {
      console.log(`Successfully reserved '${item.title}'!`);
    } else {
      throw new ReservationError("Failed to reserve item");
    }
  }

  returnItem(userId, itemId) {
    // Check if user exists
    if (!(userId in this.users)) {
      throw new UserNotFoundError(`User ID ${userId} not found`);
    }

    // Check if item exists
    if (!(itemId in this.items)) {
      throw new ItemNotFoundError(`Item ID ${itemId} not found`);
    }

    const item = this.items[itemId];
    const user = this.users[userId];

    // Check if user actually borrowed this item
    if (!user.borrowedItems.includes(itemId)) {
      throw new ItemNotFoundError("You haven't borrowed this item");
    }

    // Return the item
    item.returnItem();
    user.removeBorrowedItem(itemId);
    console.log(`Successfully returned '${item.title}'!`);
  }
}

module.exports = Library;
