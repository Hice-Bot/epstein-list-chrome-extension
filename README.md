# Epstein List Highlighter

A Chrome extension that identifies people named in the Epstein files on any webpage you visit. Matching names are highlighted with a red box and link directly to the corresponding section on the [Wikipedia article](https://en.wikipedia.org/wiki/List_of_people_named_in_the_Epstein_files).

## Install

1. Download or clone this repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select this folder
5. Browse any webpage — listed names will appear in a red box

## How It Works

The extension injects a content script on every page that:
- Scans all visible text for names from the list
- Wraps matches in a clickable red-bordered highlight
- Clicking a highlighted name opens the relevant Wikipedia section in a new tab
- Watches for dynamically loaded content (SPAs, infinite scroll)

## Names Tracked

The extension currently tracks **155 names** from the Epstein files, including Bill Clinton, Bill Gates, Prince Andrew, Ghislaine Maxwell, Donald Trump, Elon Musk, Mark Zuckerberg, and many more. See [`names.js`](names.js) for the full list.
