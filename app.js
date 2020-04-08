const API = require("./lib/API");
const readlineSync = require("readline-sync");

function displayCharacters(characters) {
    for (let character of characters) {
        console.log(`${character.id} . ${character.title}`)
    }
}

function mainMenu() {
    console.log("----------------");
    console.log("---- R&M quotes----");
    console.log("-------------------");
    console.log("1. choose by character");
    console.log("2. choose by tag");
    console.log("----------------");

    const choice = readlineSync.question("Please choose an option ");

    if (choice === "1") {
        console.log("-----------------");
        console.log("- We have these characters-");
        console.log("-----------------");

        // get all books
        const characters = API.read("characters");
        displayCharacters(characters);

        // return to main menu
        mainMenu();
    } else if (choice === "2") {
        console.log("-----------------");
        console.log("- add a quote-");
        console.log("-----------------");

        const characters = API.read("characters");
        displayBooksSummary(characters);
        displayBookDetails(book);

        // Input review details
        const rating = readlineSync.question("What is your rating? ");
        const content = readlineSync.question("Please write your review ");

        // add the new review to the book reviews
        book.reviews.push({
            rating: rating,
            content: content
        });

        // update the book in the API
        API.update("books", book);

        console.log("----------------------------");
        console.log("Thanks for leaving a review!");
        console.log("----------------------------");

        // return to main manu
        mainMenu();
    } else {
        console.log("Sorry we didn't recognise that choice!");
        mainMenu();
    }
}

mainMenu();