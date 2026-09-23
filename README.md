# My Notes

A lightweight personal notes web application built with HTML, CSS, and JavaScript for a college assignment. The app provides a clean, modern interface for creating, editing, searching, pinning, and deleting notes. Notes are stored in the browser using localStorage, so they remain available after refreshing the page.

## Features

- Create new notes
- Open and select notes from the sidebar
- Edit note titles and body text
- Delete the current note
- Search notes by title or body text
- Pin important notes to keep them at the top of the list
- Automatically save notes in localStorage
- Responsive layout for smaller screens

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser localStorage

## Installation

1. Download or clone this project to your local machine.
2. Open the project folder in your code editor.
3. Open `index.html` directly in a browser, or serve the folder locally with a simple web server.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. Click **New Note** to create a new note.
2. Select a note from the left sidebar.
3. Edit the note title and body in the main editor area.
4. Your changes are saved automatically.
5. Use the search box to filter notes by title or body content.
6. Click **Pin** to keep important notes at the top of the list.
7. Click **Delete** to remove the currently selected note.

## LocalStorage

This application stores notes in the browser using localStorage. That means notes remain saved even after the page is refreshed or reopened, as long as the same browser and device are used.

## Project Structure

```text
Modern-Technologies-Assignment-3/
├── index.html
├── styles.css
├── app.js
├── README.md
├── REFLECTION.md
└── images/
    ├── app-final.png
    └── Copilot interaction screenshots
```

## Screenshot

![My Notes application](images/app-final.png)

## Notes

This project is a front-end web application with no backend or database. I built it to practice using HTML, CSS, JavaScript, localStorage, and GitHub Copilot while creating a working notes application.