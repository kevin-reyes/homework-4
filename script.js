let index = 0;
let countDown = 75;
let score = 75;
let highScore = 0;
let quizTime;
let questions = [
  {
    title: "Who designed Javascript?",
    choices: ["Brendan Eich", "Some Barista", "Steve Jobs", "Michael Jordan"],
    answer: "Brendan Eich"
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "scripting", "js", "javascript"],
    answer: "script"
  },
  {
    title: "How does a FOR loop start?",
    choices: [
      "for (i = 0; i <= 5)",
      "for (i <= 5; i++)",
      "for i = 1 to 5",
      "for (i = 0; i <= 5; i++)"
    ],
    answer: "for (i = 0; i <= 5; i++)"
  },
  {
    title:
      "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onmouseclick", "onchange", "onmouseover"],
    answer: "onclick"
  },
  {
    title:
      "JavaScript is the same as Java.",
    choices: ["True", "False"],
    answer: "true"
  }
];

document.getElementById("start-button").addEventListener("click", event => {
  document.getElementById("start-quiz").classList.add("d-none");
  document.getElementById("quiz-questions").classList.remove("d-none");
  setTime();
  renderQuestions();
  quizTime = setInterval(setTime, 1000);
});

function renderQuestions() {
  let questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestionChoices();
  }
  quizOver();
}

function renderQuestionChoices() {
  let question = questions[index].choices;
  for (let option = 0; option < question.length; option++) {
    let questionOptionsDiv = document.getElementById("question-choices");
    let questionButtons = document.createElement("button");
    questionButtons.className =
      "btn btn-outline-primary btn-lg d-flex justify-content-around";
    questionButtons.innerHTML = question[option];

    questionButtons.setAttribute(
      "onclick",
      "checkAnswer(" + index + "," + option + ");"
    );
    questionOptionsDiv.append(questionButtons);
  }
  quizOver();
}

function clearQuestionDiv() {
  document.getElementById("question-choices").innerHTML = "";
  quizOver();
}

function checkAnswer(question, answer) {
  let correctAnswer = questions[question].answer;
  let userAnswer = questions[question].choices[answer];
  if (userAnswer == correctAnswer) {
    index = index + 1;
  }
  else {
    index = index + 1;
    countDown = countDown - 15;
    score = score - 15;

  }
  clearQuestionDiv();
  renderQuestions();
  quizOver();
}


function setTime() {
  document.getElementById("quiz-time").innerHTML = countDown + "sec left";
  countDown--;
  if (countDown == -1) {
    clearInterval(quizTime);
  }
  quizOver();
}

function quizOver() {
  if (index >= 4 || countDown <= 0) {
    document.getElementById("quiz-questions").classList.add("d-none");
    document.getElementById("all-done").classList.remove("d-none");
    document.getElementById("quiz-time").innerHTML = countDown + "sec left";
    document.getElementById("final-score").innerHTML = countDown;

    clearInterval(quizTime);
  }
}

document.getElementById("initials-button").addEventListener("click", saveScore);

function saveScore() {
  let userInitials = document.querySelector("#initial-input").value;
  let finalScore = countDown;
  let scoreObject = { initials: userInitials, score: finalScore };
  let highScores = localStorage.getItem("highScoreList");

  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
  } else {
    highScoreList = JSON.parse(highScores);
    highScoreList.push(scoreObject);
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  }
}
