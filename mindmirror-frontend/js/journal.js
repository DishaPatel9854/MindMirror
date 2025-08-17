const API_BASE = "http://localhost:5000/api/journal";

async function submitEntry() {
  const entry = document.getElementById("entry").value.trim();
  if (!entry) {
    alert("Please write something before saving.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: entry }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error saving entry");

    document.getElementById("sentimentResult").innerText = `Detected Mood: ${data.mood}`;
    alert("Entry saved!");
    document.getElementById("entry").value = "";
    updateWordCount();
  } catch (err) {
    alert(err.message);
  }
}
