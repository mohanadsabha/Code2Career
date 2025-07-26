const readline = require("readline");
const Library = require("./models/library");
const {
  ItemNotAvailableError,
  UserNotFoundError,
  ItemNotFoundError,
  ReservationError,
} = require("./exceptions/custom_exceptions");

/**
 * I used chatgpt in this file only (I didn't have knowledge of taking CLI user input)
 */

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function to get user input
function getUserInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function displayMenu() {
  console.log("\n" + "=".repeat(40));
  console.log("    Welcome to the Library System");
  console.log("=".repeat(40));
  console.log("1. View all available items");
  console.log("2. Search item by title or type");
  console.log("3. Register as a new user");
  console.log("4. Borrow an item");
  console.log("5. Reserve an item");
  console.log("6. Return an item");
  console.log("7. Exit and Save");
  console.log("=".repeat(40));
}

async function getUserChoice() {
  try {
    const input = await getUserInput("Please select an option (1-7): ");
    const choice = parseInt(input);

    if (isNaN(choice) || choice < 1 || choice > 7) {
      console.log("Please enter a number between 1 and 7.");
      return null;
    }
    return choice;
  } catch (error) {
    console.log("Please enter a valid number.");
    return null;
  }
}

async function getUserId() {
  try {
    const input = await getUserInput("Enter your User ID: ");
    const userId = parseInt(input);

    if (isNaN(userId)) {
      console.log("Please enter a valid User ID (number).");
      return null;
    }
    return userId;
  } catch (error) {
    console.log("Please enter a valid User ID (number).");
    return null;
  }
}

async function getItemId() {
  try {
    const input = await getUserInput("Enter the Item ID: ");
    const itemId = parseInt(input);

    if (isNaN(itemId)) {
      console.log("Please enter a valid Item ID (number).");
      return null;
    }
    return itemId;
  } catch (error) {
    console.log("Please enter a valid Item ID (number).");
    return null;
  }
}

async function main() {
  const library = new Library();
  await library.loadData();

  while (true) {
    try {
      displayMenu();
      const choice = await getUserChoice();

      if (choice === null) {
        continue;
      }

      // View all items
      if (choice === 1) {
        library.viewAllItems();
      }

      // Search items
      else if (choice === 2) {
        const keyword = await getUserInput(
          "Enter search keyword (title, type, or author): "
        );
        const trimmedKeyword = keyword.trim();

        if (trimmedKeyword) {
          library.searchItems(trimmedKeyword);
        } else {
          console.log("Please enter a search keyword.");
        }
      }

      // Register new user
      else if (choice === 3) {
        const name = await getUserInput("Enter your name: ");
        const email = await getUserInput("Enter your email: ");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (trimmedName && trimmedEmail) {
          try {
            const userId = library.registerUser(trimmedName, trimmedEmail);
          } catch (error) {
            console.log(`Error registering user: ${error.message}`);
          }
        } else {
          console.log("Please provide both name and email.");
        }
      }

      // Borrow item
      else if (choice === 4) {
        const userId = await getUserId();
        if (userId === null) {
          continue;
        }

        const itemId = await getItemId();
        if (itemId === null) {
          continue;
        }

        try {
          library.borrowItem(userId, itemId);
        } catch (error) {
          if (
            error instanceof UserNotFoundError ||
            error instanceof ItemNotFoundError ||
            error instanceof ItemNotAvailableError
          ) {
            console.log(`Error: ${error.message}`);
          } else {
            console.log(`Unexpected error: ${error.message}`);
          }
        }
      }

      // Reserve item
      else if (choice === 5) {
        const userId = await getUserId();
        if (userId === null) {
          continue;
        }

        const itemId = await getItemId();
        if (itemId === null) {
          continue;
        }

        try {
          library.reserveItem(userId, itemId);
        } catch (error) {
          if (
            error instanceof UserNotFoundError ||
            error instanceof ItemNotFoundError ||
            error instanceof ReservationError
          ) {
            console.log(`Error: ${error.message}`);
          } else {
            console.log(`Unexpected error: ${error.message}`);
          }
        }
      }

      // Return item
      else if (choice === 6) {
        const userId = await getUserId();
        if (userId === null) {
          continue;
        }

        const itemId = await getItemId();
        if (itemId === null) {
          continue;
        }

        try {
          library.returnItem(userId, itemId);
        } catch (error) {
          if (
            error instanceof UserNotFoundError ||
            error instanceof ItemNotFoundError
          ) {
            console.log(`Error: ${error.message}`);
          } else {
            console.log(`Unexpected error: ${error.message}`);
          }
        }
      }

      // Exit and save
      else if (choice === 7) {
        try {
          await library.saveData();
          console.log("Thank you for using the Library System!");
          break;
        } catch (error) {
          console.log(`Error saving data: ${error.message}`);
          console.log("Exiting anyway...");
          break;
        }
      }
    } catch (error) {
      console.log(`Unexpected error in main loop: ${error.message}`);
      console.log("Please try again.");
    }
  }

  rl.close();
}

main().catch((error) => {
  console.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
