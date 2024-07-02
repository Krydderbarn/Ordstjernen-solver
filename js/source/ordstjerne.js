const fetch = require('node-fetch');

async function fetchPuzzle() {
    const wordsUrl = 'https://www.vg.no/spill/ordstjernen';
    const response = await fetch(wordsUrl);
    const data = await response.json(); // Adjust this line based on the actual data structure
    const { puzzleId, char, charMain } = extractPuzzleData(data); // Implement extractPuzzleData based on data structure
    return { puzzleId, char, charMain };
}

async function fetchValidWords(charMain, char) {
    const ordbokUrl = 'https://ord.uib.no/bm/fil/boys.csv';
    const response = await fetch(ordbokUrl);
    const text = await response.text();
    const words = text.split('\n').flatMap(row => row.split('|'));
    const validWords = words.filter(word => 
        word.length > 3 && word.includes(charMain) && [...word].every(c => char.includes(c) || c === charMain)
    );
    return validWords;
}

async function queryPuzzleWord(puzzleId, word) {
    const apiUrl = `https://stokkom-api.k8s.vgnett.no/words/${puzzleId}`;
    const params = new URLSearchParams({ word });
    const response = await fetch(`${apiUrl}?${params}`);
    const data = await response.text(); // Adjust based on response structure
    console.log(data);
}

async function main() {
    const { puzzleId, char, charMain } = await fetchPuzzle();
    const validWords = await fetchValidWords(charMain, char);
    for (const word of validWords) {
        await queryPuzzleWord(puzzleId, word);
    }
}

main().catch(console.error);