const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a useful skill for everyone.",
  "Practice makes perfect when it comes to typing.",
  "JavaScript powers the web in magical ways.",
  "Stay focused and keep learning new things."
];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let currentQuote = "";
let startTime = null;
let timer = null;
let timeLeft = 60;

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = currentQuote;
  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();
  startTime = null;
  timeLeft = 60;
  timerElement.textContent = timeLeft;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 100;

  if (timer) {
    clearInterval(timer);
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  inputElement.disabled = true;
  const typedText = inputElement.value;
  const elapsedTime = (60 - timeLeft) / 60;

  const wordCount = typedText.trim().split(/\s+/).length;
  const wpm = Math.round(wordCount / elapsedTime);

  let correctChars = 0;
  for (let i = 0; i < typedText.length && i < currentQuote.length; i++) {
    if (typedText[i] === currentQuote[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / typedText.length) * 100);

  wpmElement.textContent = isFinite(wpm) ? wpm : 0;
  accuracyElement.textContent = isFinite(accuracy) ? accuracy : 100;
}

inputElement.addEventListener("input", () => {
  if (!startTime) {
    startTime = new Date();
    startTimer();
  }

  const typedText = inputElement.value;
  const quoteSubstring = currentQuote.substring(0, typedText.length);

  if (typedText !== quoteSubstring) {
    inputElement.style.borderColor = "red";
  } else {
    inputElement.style.borderColor = "#00ffff55";
  }

  if (typedText === currentQuote) {
    clearInterval(timer);
    endTest();
  }
});

restartButton.addEventListener("click", loadQuote);

loadQuote();
