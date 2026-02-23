const courses = [
  { id: 1, title: "Mathematics Mastery", level: "Grade 9-12", price: 49 },
  { id: 2, title: "English Communication", level: "All Levels", price: 39 },
  { id: 3, title: "Science Explorer", level: "Grade 6-10", price: 45 },
  { id: 4, title: "Coding Fundamentals", level: "Beginner", price: 59 }
];

const questions = [
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], ans: 1 },
  { q: "What is 15 × 3?", options: ["35", "45", "30"], ans: 1 },
  { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language"], ans: 0 },
  { q: "Water freezes at?", options: ["0°C", "100°C", "-10°C"], ans: 0 },
  { q: "Synonym of 'Rapid' is?", options: ["Slow", "Fast", "Soft"], ans: 1 }
];

const state = {
  enrolled: [],
  scores: []
};

const courseGrid = document.getElementById("courseGrid");
const enrolledList = document.getElementById("enrolledList");
const scoreList = document.getElementById("scoreList");
const enrolledCount = document.getElementById("enrolledCount");
const avgScore = document.getElementById("avgScore");
const examArea = document.getElementById("examArea");
const submitExam = document.getElementById("submitExam");
const examResult = document.getElementById("examResult");
const timerEl = document.getElementById("timer");

function renderCourses() {
  courseGrid.innerHTML = courses
    .map(
      (course) => `
      <article class="course-card">
        <h4>${course.title}</h4>
        <p>${course.level}</p>
        <p><strong>$${course.price}</strong></p>
        <button class="btn" data-course-id="${course.id}">Enroll</button>
      </article>
    `
    )
    .join("");

  courseGrid.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.courseId);
      const course = courses.find((item) => item.id === id);
      if (!state.enrolled.includes(course.title)) {
        state.enrolled.push(course.title);
        updateDashboard();
      }
    });
  });
}

function renderExam() {
  examArea.innerHTML = questions
    .map(
      (item, index) => `
      <div class="question">
        <p><strong>Q${index + 1}.</strong> ${item.q}</p>
        ${item.options
          .map(
            (opt, i) => `
            <label>
              <input type="radio" name="q${index}" value="${i}" /> ${opt}
            </label><br />
          `
          )
          .join("")}
      </div>
    `
    )
    .join("");
}

function gradeExam() {
  let score = 0;
  questions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === item.ans) {
      score += 1;
    }
  });

  const percent = Math.round((score / questions.length) * 100);
  state.scores.push(percent);
  examResult.textContent = `You scored ${percent}% (${score}/${questions.length})`;
  updateDashboard();
}

function updateDashboard() {
  enrolledCount.textContent = state.enrolled.length;

  enrolledList.innerHTML = state.enrolled.length
    ? state.enrolled.map((course) => `<li>${course}</li>`).join("")
    : "<li>No courses enrolled yet.</li>";

  scoreList.innerHTML = state.scores.length
    ? state.scores.map((score, idx) => `<li>Attempt ${idx + 1}: ${score}%</li>`).join("")
    : "<li>No exam submitted yet.</li>";

  const average = state.scores.length
    ? Math.round(state.scores.reduce((a, b) => a + b, 0) / state.scores.length)
    : 0;

  avgScore.textContent = `${average}%`;
}

function startTimer(duration = 180) {
  let timeLeft = duration;
  const timer = setInterval(() => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitExam.disabled = true;
      examResult.textContent = "Time is up! Auto-submit now.";
      gradeExam();
    }

    timeLeft -= 1;
  }, 1000);
}

document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
});

submitExam.addEventListener("click", gradeExam);

renderCourses();
renderExam();
updateDashboard();
startTimer();
