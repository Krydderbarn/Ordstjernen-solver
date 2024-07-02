// Assuming you have multiple button elements with a specific class
async function fetchPuzzle() {
    const buttons = document.querySelectorAll('button[class^="App_wordTile__"]');
    let letters = [];
    buttons.forEach(button => {
        letters.push(button.textContent); // Correctly add the button text to the array
    });
    let letterMain = buttons[3].textContent; // Assuming you want the text of the fourth button

    // Return both values as an object for clarity
    return { letters, letterMain };
}

async function fetchValidWords(letters, letterMain) {
    const ordbokUrl = 'https://ord.uib.no/bm/fil/boys.csv';
    const response = await fetch(ordbokUrl); // Await the fetch call
    const text = await response.text(); // Await the text conversion
    const words = text.split('\n').flatMap(row => row.split('|'));
    const validWords = words.filter(word => 
        word.length > 3 && word.includes(letterMain) && [...word].every(c => letters.includes(c) || c === letterMain)
    );
    // Remove duplicates by converting the array to a Set, then back to an array
    const uniqueValidWords = [...new Set(validWords)];
    return uniqueValidWords;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate key press events to type the word into the input box
async function simulateKeyPress(word) {
    for (let i = 0; i < word.length; i++) {
        let keyValue = word[i];
        var event = new KeyboardEvent('keydown', {
            key: keyValue,
            keyCode: keyValue.charCodeAt(0), // Optional: for compatibility with any code that uses keyCode
            which: keyValue.charCodeAt(0), // Optional: for compatibility with any code that uses which
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
            metaKey: false,
            bubbles: true, // Make sure the event bubbles up to be caught by listeners
            cancelable: true // Allow the event to be cancelable
        });

        // Dispatch the event on the document
        document.dispatchEvent(event);
        await delay(25);
    }
        // Simulate pressing the "Enter" key after the word has been "typed"
        var enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13, // KeyCode for Enter key
            which: 13, // KeyCode for Enter key
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
            metaKey: false,
            bubbles: true,
            cancelable: true
        });
    
        document.dispatchEvent(enterEvent);
        await delay(25);
}

async function main() {
    try {
        const { letters, letterMain } = await fetchPuzzle();
        const validWords = await fetchValidWords(letters, letterMain);
        for (const word of validWords) {
            await simulateKeyPress(word);
            await delay(25);
        }
        

    } catch (error) {
        console.error(error);
    }
    
}

main();