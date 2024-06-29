import requests
import bs4
import json
import io
import csv

# Gets HTML content from ordstjernen
def fetchPuzzle():
    words_url = "https://www.vg.no/spill/ordstjernen"
    response = requests.get(words_url)
    print(f"Ordstjernen: status code: {response.status_code}")

    # Parses the HTML content and returns Puzzle ID and Characters
    soup = bs4.BeautifulSoup(response.content, 'html.parser')
    script = soup.find("script", id="__NEXT_DATA__")
    data = json.loads(script.string)
    puzzle = data['props']['pageProps']['puzzle']

    first_four_keyvalues = list(puzzle.items())[:4]
    first_four_keyvalues.append(list(puzzle.items())[6])

    puzzle_id = first_four_keyvalues[0][1]
    char = (first_four_keyvalues[2][1])
    char_main = char[1]

    print(f"""
    Puzzle ID: {puzzle_id}
    Chars: {char}
    Main Char: {char_main}""")

    return puzzle_id, char, char_main

def fetchValidWords(char_main, char):
    # Gets CSV content from ord.uib.no
    ordbbok_url = "https://ord.uib.no/bm/fil/boys.csv"
    print(f"Getting CSV from: {ordbbok_url}")

    ordbok_response = requests.get(ordbbok_url)
    ordbok = io.StringIO(ordbok_response.text)

    valid_words = []
    reader = csv.reader(ordbok, delimiter='|')

    print("Filtering valid words...")
    # Filter out valid words to be used in the puzzle
    for row in reader:
        # Iterate over each column in the row
        for word in row:
            # Check if the word contains char_main
            if len(word) > 3:
                if char_main in word:
                    if all(c in char or c == char_main for c in word):
                        if word not in valid_words:
                            valid_words.append(word)

    print(f"Antall gyldige ord: {len(valid_words)}")
    return valid_words


def queryPuzzleWord(puzzle_id, word):
    api_url = f"https://stokkom-api.k8s.vgnett.no/words/{puzzle_id}"

    params = {
        "word": f"{word}"
    }

    response = requests.get(api_url, params=params)
    print(f"Word: {word}, Status: {response.status_code}, Response: {response.text}")


def main():
    puzzle_id, char, char_main = fetchPuzzle()
    valid_words = fetchValidWords(char_main, char)

    for word in valid_words:
        queryPuzzleWord(puzzle_id, word)

main()