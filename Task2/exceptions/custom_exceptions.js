class ItemNotAvailableError extends Error {
  constructor(message = "Item is not available for borrowing") {
    super(message);
    this.name = "ItemNotAvailableError";
  }
}

class UserNotFoundError extends Error {
  constructor(message = "User not found in the system") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

class ItemNotFoundError extends Error {
  constructor(message = "Item not found in the system") {
    super(message);
    this.name = "ItemNotFoundError";
  }
}

class ReservationError extends Error {
  constructor(message = "Item cannot be reserved") {
    super(message);
    this.name = "ReservationError";
  }
}

module.exports = {
  ItemNotAvailableError,
  UserNotFoundError,
  ItemNotFoundError,
  ReservationError,
};
