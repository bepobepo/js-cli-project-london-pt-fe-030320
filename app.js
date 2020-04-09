const API = require("./lib/API");
const readlineSync = require("readline-sync");

function addQuote(characters) {
    const quote = readlineSync.question("got a quote? tell me!  ");
    Characterlist(characters);
    const index = readlineSync.question("who says it? choose a number ");
    if ((index < characters.length) && (index > 0)) {
        const tag = readlineSync.question("please add a tag to the quote  ");
        const character = characters[index - 1];
        const quotes = characters[index - 1].quotes;
        // add the quote
        quotes.push({ "text": `${quote}`, "tags": [`${tag}`], "id": `${quotes.length + 1}` });
        console.log(characters[index - 1].quotes);

        // update the quote in the API
        API.update("characters", character);
        return index;
    } else {
        console.log(`i'm sorry this is all wrong, please choose a supported number from the list`);
        addQuote(characters);
    }
}

function Characterlist(charecters) {
    let index = 1;
    charecters.forEach(element => {
        console.log(`${index}. ${element.title}`);
        index++;
    })
};

function chooseCharacter(characters) {
    let Nindex = 1;
    characters.forEach(element => {
        console.log(`${Nindex}. ${element.title}`);
        Nindex++;
    });

    const selected = readlineSync.question("which one would you like to see quotes from?");

    const character = API.read("characters", selected);
    const quotes = character.quotes;
    console.log(character);
    console.log(`you selected ${character.title}`);
    if (quotes.length < 1) {
        console.log("sorry, no quotes for this one.")
    } else {
        console.log(`they have the following registered quotes:`);
        console.log("                                      ")
        for (let index = 0; index < quotes.length; index++) {
            const quote = quotes[index];
            console.log(`"${index + 1 }. ${quote.text}" with the tags *${quote.tags}*`);
            console.log("--------------------------------")
        }
    }
    return character;

}

function removeQuote(character, quoteID) {
    const removed = character.quotes.splice(quoteID - 1, 1);
    console.log(`the quote:`);
    console.log(`${removed.text}`);
    console.log(`has been removed`);
    console.log(character)
    return character;
}



function mainMenu() {
    console.log("----------------");
    console.log("---- R&M quotes----");
    console.log("-------------------");
    console.log("1. choose  character");
    console.log("2. add quote");
    console.log("3. remove a quote");
    console.log("----------------");

    const choice = readlineSync.question("Please choose an option ");

    if (choice === "1") {
        console.log("-----------------");
        console.log("- We have these characters-");
        console.log("-----------------");

        // get all characters
        const characters = API.read("characters");
        chooseCharacter(characters);

        // return to main menu
        mainMenu();

    } else if (choice === "2") {
        console.log("-----------------");
        console.log("- add a quote-");
        console.log("-----------------");

        const characters = API.read("characters");
        const index = addQuote(characters);
        // Input quote details


        const updated = API.read("characters", index - 1);

        console.log(updated[index - 1]);

        console.log("----------------------------");
        console.log("Thanks for adding a quote");
        console.log("----------------------------");

        // return to main manu
        mainMenu();

    } else if (choice === "3") {
        const characters = API.read("characters");
        console.log("-------------")
        console.log("remove a quote")
        console.log("-------------")
        const character = chooseCharacter(characters);
        selection = readlineSync.question("which quote would you like to remove?")
        UpdatedCharacter = removeQuote(character, selection);
        API.update("characters", UpdatedCharacter);
        API.read("characters", )
        mainMenu();

    } else {
        console.log("nope, wrong option, sorry");
        mainMenu();
    }
}

mainMenu();