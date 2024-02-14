// Funktion zum Speichern von Daten
function saveData(data) {
  localStorage.setItem("todoData", JSON.stringify(data));
}

// Funktion zum Laden von Daten
function loadData() {
  const data = localStorage.getItem("todoData");
  return data ? JSON.parse(data) : { todos: [], notes: {} }; // Standardwerte für leere Daten setzen
}

// Elemente abrufen
const todoListContainer = document.getElementById("todo-list");
const notizenContainer = document.querySelector(".notizen");

// Array für die Notizen erstellen
let notes = {};

// Funktion zum Hinzufügen eines neuen To-Do-Elements
function addTodoElement(text) {
  const newListItem = document.createElement("li");
  newListItem.textContent = text;

  // Listenelement löschen button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.addEventListener("click", function () {
    newListItem.remove();
    saveData({
      todos: Array.from(todoListContainer.children).map(
        (child) => child.textContent
      ),
      notes: notes,
    }); // Aktualisierte Daten speichern
  });

  // Neues Listenelement zur Liste hinzufügen
  newListItem.appendChild(deleteButton);

  // Klickereignis zum Anzeigen der Notizen für das entsprechende Element
  newListItem.addEventListener("click", function () {
    showNotes(text); // Notizen anzeigen
  });

  todoListContainer.appendChild(newListItem);
}

// Funktion zum Anzeigen der Notizen für ein bestimmtes Element
function showNotes(text) {
  const noteContent = notes[text] || ""; // Notizen abrufen oder leeren String verwenden
  notizenContainer.innerHTML = ""; // Notizen-Bereich leeren
  const noteInput = document.createElement("textarea");
  noteInput.value = noteContent; // Notizen im Textfeld anzeigen

  // Stil für das Textfeld setzen
  noteInput.style.width = "75%"; // Vollständige Breite von .right-side
  noteInput.style.height = "50vh"; // Vollständige Höhe von .right-side
  noteInput.style.backgroundColor = "lightgrey"; // Hintergrundfarbe festlegen
  noteInput.style.border = "1px solid #fff"; // Rahmen festlegen
  noteInput.style.boxSizing = "border-box"; // Box-Sizing festlegen
  noteInput.style.resize = "none"; // Textarea-Größenänderung deaktivieren

  notizenContainer.appendChild(noteInput);

  // Änderungsereignis für das Notizen-Textfeld
  noteInput.addEventListener("input", function () {
    updateNotes(text, this.value); // Notizen für das ausgewählte Element aktualisieren
  });
}

// Funktion zum Erstellen der Notizen
function updateNotes(text, note) {
  notes[text] = note; // Notizen aktualisieren oder hinzufügen
  saveData({
    todos: Array.from(todoListContainer.children).map(
      (child) => child.textContent
    ),
    notes: notes,
  }); // Aktualisierte Daten speichern
}

// Klickereignis für den Create-Button
document.getElementById("createButton").addEventListener("click", function () {
  const textField = document.getElementById("text-field");
  const text = textField.value.trim(); // Eingegebenen Text abrufen und führende/abschließende Leerzeichen entfernen
  if (text) {
    addTodoElement(text); // Neues To-Do-Element hinzufügen
    textField.value = ""; // Eingabefeld leeren
    updateNotes(text, ""); // Leere Notizen für das neue Element erstellen
  }
});

// Daten laden, wenn die Seite geladen ist
window.addEventListener("load", () => {
  const savedData = loadData();
  if (savedData && savedData.todos) {
    savedData.todos.forEach((item) => {
      addTodoElement(item);
    });
    notes = savedData.notes; // Laden Sie die gespeicherten Notizen
  }
});

//NORMALE VERSION
