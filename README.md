![Ordstjernen_img](https://github.com/Krydderbarn/Ordstjernen/assets/97196503/e810805a-8f79-4253-86d8-3b83ac2fcdc0)

Ordstjerne Solver is a script that solves todays puzzle from [VG Ordstjernen](https://www.vg.no/spill/ordstjernen). 

The script fetches todays puzzle from Ordstjernen, compares todays characters to [UiB Ordbok](https://ord.uib.no) which is the dictionary used by the puzzle.

## Installation
Install dependencies using:

``` sh
pip install -r requirements.txt
```

## TODO
* Input results into the page
  1. Find a way to extract Bearer token from existing login and use requests to send the result without hardcoding a token
  2. Autotype the result into the result box

* Present the result in a much cleaner fashion so it is possible to extract the content from the terminal
* GUI?
