const API_BASE = "http://localhost:5000/api/journal";

async function loadDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error fetching data");

    const labels = data.entries.map(e => new Date(e.date).toLocaleDateString());
    const values = data.entries.map(e =>
      e.mood === "Positive" ? 2 : e.mood === "Neutral" ? 1 : 0
    );

    const config = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Mood Trend',
          data: values,
          backgroundColor: values.map(v => v === 2 ? "green" : v === 1 ? "orange" : "red"),
          borderColor: '#444',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 2,
            ticks: {
              callback: value => ['Negative', 'Neutral', 'Positive'][value]
            }
          }
        }
      }
    };

    new Chart(document.getElementById('moodChart'), config);

  } catch (err) {
    alert(err.message);
  }
}

window.onload = () => {
  loadDashboard();
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};
