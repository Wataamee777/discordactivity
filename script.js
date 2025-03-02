let targetTextElement = document.getElementById('targetText');
let userInputElement = document.getElementById('userInput');
let messageElement = document.getElementById('message');
let timerElement = document.getElementById('timer');
let mistakesElement = document.getElementById('mistakes');
let startButton = document.getElementById('startButton');

let targetText = "タイピングゲームを楽しんでください";
let startTime, timerInterval;
let mistakes = 0;

function startGame() {
  startButton.disabled = true;
  userInputElement.disabled = false;
  userInputElement.value = "";
  mistakes = 0;
  mistakesElement.textContent = mistakes;
  messageElement.textContent = "";

  targetTextElement.textContent = `タイプするテキスト: ${targetText}`;
  
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);

  userInputElement.focus();
}

function updateTimer() {
  let elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerElement.textContent = elapsed;
}

userInputElement.addEventListener('input', () => {
  let typedText = userInputElement.value;

  if (typedText === targetText) {
    clearInterval(timerInterval);
    messageElement.textContent = `おめでとう！完了しました！タイム: ${timerElement.textContent}秒 誤字数: ${mistakes}`;
    startButton.disabled = false;
    userInputElement.disabled = true;
  } else {
    mistakes = calculateMistakes(typedText);
    mistakesElement.textContent = mistakes;
  }
});

function calculateMistakes(typedText) {
  let mistakesCount = 0;
  let targetLength = targetText.length;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== targetText[i]) {
      mistakesCount++;
    }
  }

  // If the typed text is shorter than the target, count the remaining characters as mistakes
  if (typedText.length < targetLength) {
    mistakesCount += targetLength - typedText.length;
  }

  return mistakesCount;
}

startButton.addEventListener('click', startGame);
