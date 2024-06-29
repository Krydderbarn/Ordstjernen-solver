Ordstjerne Solver is a script that solves todays puzzle from [VG Ordstjernen](https://www.vg.no/spill/ordstjernen)

## Installering
Install dependencies using:

``` sh
pip install -r requirements.txt
```

## Function
The script fetches todays puzzle from Ordstjernen, compares todays characters to https://ord.uib.no which is the dictionary used by the puzzle.
A CSV file is extraced from the site https://ord.uib.no/bm/fil/boys.csv which is then compared to the letters to find every valid word.
The words are then sent to the Ordstjernen puzzle as GET requests
