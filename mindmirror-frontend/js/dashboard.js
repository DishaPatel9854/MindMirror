const moodData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Mood Trend',
    data: [2, 1, 0, 1, 2], // 0: Negative, 1: Neutral, 2: Positive
    backgroundColor: ['red', 'orange', 'green', 'orange', 'green'],
    borderColor: '#444',
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: moodData,
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

// Dark mode handler
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};
