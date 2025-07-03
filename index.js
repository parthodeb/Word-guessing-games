const languages = [
  "javascript", "python", "java", "ruby", "typescript", "kotlin", "swift",
  "go", "rust", "php", "csharp", "dart", "scala", "perl"
];
const secretWord = languages[Math.floor(Math.random() * languages.length)];
let guessed = [];
let displayWord = Array(secretWord.length).fill("_");
let incorrectGuesses = 0;
let timer = 60;
let timerInterval = null;

function revealTwoLetters() {
  let indices = [];
  while (indices.length < 2) {
    let idx = Math.floor(Math.random() * secretWord.length);
    if (!indices.includes(idx)) indices.push(idx);
  }
  indices.forEach(idx => {
    displayWord[idx] = secretWord[idx];
    if (!guessed.includes(secretWord[idx])) {
      guessed.push(secretWord[idx]);
    }
  });
}
revealTwoLetters();

document.getElementById("hintText").innerHTML = "<strong>Hint:</strong> Guess the programming language!";
document.getElementById("wordDisplay").textContent = displayWord.join(" ");
document.getElementById("incorrectGuesses").textContent = "Incorrect guesses: 0";
document.getElementById("timer").textContent = "Time left: 60s";

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Time left: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      showMessage("Time's up! The word was: " + secretWord);
      document.getElementById("letterInput").disabled = true;
      document.getElementById("submitBtn").disabled = true;
    }
  }, 1000);
}
startTimer();

const guessForm = document.getElementById("guessForm");
const letterInput = document.getElementById("letterInput");

guessForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (timer <= 0) return;
  const input = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!/^[a-z]$/.test(input)) {
    showMessage("Enter a single letter A-Z");
    return;
  }

  if (guessed.includes(input)) {
    showMessage("You've already guessed that letter.");
    return;
  }

  guessed.push(input);
  updateGuessedLetters();

  let found = false;
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === input) {
      displayWord[i] = input;
      found = true;
    }
  }
  if (found) {
    updateDisplayWord();
    checkWin();
  } else {
    incorrectGuesses++;
    document.getElementById("incorrectGuesses").textContent = `Incorrect guesses: ${incorrectGuesses}`;
    showMessage("Incorrect guess");
  }
});

function updateDisplayWord() {
  document.getElementById("wordDisplay").textContent = displayWord.join(" ");
}

function updateGuessedLetters() {
  document.getElementById("guessedLetters").textContent =
    "Guessed: " + guessed.join(", ");
}

function showMessage(msg) {
  document.getElementById("statusMessage").textContent = msg;
}

function checkWin() {
  if (!displayWord.includes("_")) {
    showMessage("You guessed the word correctly!");
    document.getElementById("letterInput").disabled = true;
    document.getElementById("submitBtn").disabled = true;
    clearInterval(timerInterval);
  }
}