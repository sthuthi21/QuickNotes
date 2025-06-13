const token = localStorage.getItem("token");
const formMsg = document.getElementById("formMsg");
const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");
const logoutBtn = document.getElementById("logoutBtn");

if (!token) {
  window.location.href = "login.html"; // not logged in
}

// Fetch existing notes
async function loadNotes() {
  notesContainer.innerHTML = "";
  try {
    const res = await fetch("http://localhost:5000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      data.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <button onclick="deleteNote('${note._id}')">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
      });
    } else {
      formMsg.textContent = data.message || "Failed to load notes.";
    }
  } catch (err) {
    console.error(err);
    formMsg.textContent = "Error loading notes.";
  }
}

// Add note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (res.ok) {
      formMsg.style.color = "green";
      formMsg.textContent = "Note added!";
      noteForm.reset();
      loadNotes(); // reload notes
    } else {
      formMsg.style.color = "red";
      formMsg.textContent = data.message || "Failed to add note.";
    }
  } catch (err) {
    console.error(err);
    formMsg.textContent = "Error adding note.";
  }
});

// Delete note
async function deleteNote(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      loadNotes(); // refresh
    } else {
      formMsg.textContent = data.message || "Delete failed";
    }
  } catch (err) {
    console.error(err);
    formMsg.textContent = "Error deleting note.";
  }
}

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Initial load
loadNotes();
