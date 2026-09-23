const STORAGE_KEY = "my-notes-app";

let notes = [];
let selectedNoteId = null;

// Grab elements from the HTML
const newNoteButton = document.querySelector(".topbar-actions button");
const deleteButton = document.querySelectorAll(".editor-actions button")[1];
const pinButton = document.querySelectorAll(".editor-actions button")[0];
const searchInput = document.getElementById("search-notes");
const noteList = document.querySelector(".note-list");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (savedNotes) {
    notes = JSON.parse(savedNotes).map((note) => ({
      ...note,
      pinned: Boolean(note.pinned)
    }));
  } else {
    notes = [];
  }

  if (notes.length === 0) {
    createNewNote();
  }

  selectedNoteId = notes[0].id;
  renderNotes();
  loadSelectedNote();
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function createNewNote() {
  const newNote = {
    id: Date.now().toString(),
    title: "Untitled note",
    body: "",
    pinned: false
  };

  notes.unshift(newNote);
  selectedNoteId = newNote.id;
  saveNotes();
  renderNotes();
  loadSelectedNote();
}

function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();

  const sortedNotes = [...notes].sort((a, b) => {
    return Number(b.pinned) - Number(a.pinned);
  });

  const visibleNotes = sortedNotes.filter((note) => {
    const title = (note.title || "").toLowerCase();
    const body = (note.body || "").toLowerCase();

    return title.includes(query) || body.includes(query);
  });

  noteList.innerHTML = "";

  visibleNotes.forEach((note) => {
    const listItem = document.createElement("li");

    const noteButton = document.createElement("button");
    noteButton.type = "button";
    noteButton.textContent = note.title || "Untitled note";

    if (note.id === selectedNoteId) {
      noteButton.style.fontWeight = "bold";
    }

    noteButton.addEventListener("click", () => {
      selectedNoteId = note.id;
      renderNotes();
      loadSelectedNote();
    });

    listItem.appendChild(noteButton);
    noteList.appendChild(listItem);
  });

  updatePinButton();
}

function loadSelectedNote() {
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    titleInput.value = "";
    bodyInput.value = "";
    return;
  }

  titleInput.value = selectedNote.title;
  bodyInput.value = selectedNote.body;
}

function updatePinButton() {
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    pinButton.textContent = "Pin";
    return;
  }

  pinButton.textContent = selectedNote.pinned ? "Unpin" : "Pin";
}

function updateSelectedNote() {
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    return;
  }

  selectedNote.title = titleInput.value || "Untitled note";
  selectedNote.body = bodyInput.value;

  saveNotes();
  renderNotes();
}

function deleteSelectedNote() {
  if (!selectedNoteId) {
    return;
  }

  notes = notes.filter((note) => note.id !== selectedNoteId);

  if (notes.length === 0) {
    createNewNote();
    return;
  }

  selectedNoteId = notes[0].id;
  saveNotes();
  renderNotes();
  loadSelectedNote();
}

function togglePinSelectedNote() {
  if (!selectedNoteId) {
    return;
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    return;
  }

  selectedNote.pinned = !selectedNote.pinned;

  saveNotes();
  renderNotes();
  loadSelectedNote();
}

// Event listeners
newNoteButton.addEventListener("click", () => {
  createNewNote();
});

titleInput.addEventListener("input", () => {
  updateSelectedNote();
});

bodyInput.addEventListener("input", () => {
  updateSelectedNote();
});

deleteButton.addEventListener("click", () => {
  deleteSelectedNote();
});

pinButton.addEventListener("click", () => {
  togglePinSelectedNote();
});

searchInput.addEventListener("input", () => {
  renderNotes();
});

loadNotes();