function updateWordCount() {
  const text = document.getElementById("entry").value;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const chars = text.length;

  document.getElementById("wordCount").innerText = `Words: ${words}`;
  document.getElementById("charCount").innerText = `Characters: ${chars}`;
}

function submitEntry() {
  const entry = document.getElementById("entry").value.trim();
  if (!entry) {
    alert("Please write something before saving.");
    return;
  }

  // Dummy sentiment detection
  let mood = "Neutral";
  if (entry.includes("happy")) mood = "Positive";
  else if (entry.includes("sad")) mood = "Negative";

  document.getElementById("sentimentResult").innerText = `Detected Mood: ${mood}`;
  alert("Entry saved!");

  document.getElementById("entry").value = "";
  updateWordCount();
}

// Theme and date
window.onload = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
  });
  document.getElementById("todayDate").innerText = `🗓️ ${dateStr}`;
  updateWordCount();

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

window.onload = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
  });
  document.getElementById("todayDate").innerText = `🗓️ ${dateStr}`;
  updateWordCount();

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};
