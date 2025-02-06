const questions = [
  {
    hint: "زبان نشانه‌گذاری که برای ساختاردهی صفحات وب استفاده می‌شود",
    answer: "HTML",
    score: 1,
  },
  {
    hint: "زبانی که برای استایل‌دهی به صفحات وب استفاده می‌شود",
    answer: "CSS",
    score: 0.75,
  },
  {
    hint: "زبانی که باعث زنده شدن صفحات وب می‌شود",
    answer: "JAVASCRIPT",
    score: 1.75,
  },
  {
    hint: "لایبرری محبوب جاوااسکریپت برای ساخت رابط کاربری",
    answer: "REACT",
    score: 1.5,
  },
  {
    hint: "ابزاری برای مدیریت و نسخه‌بندی کدها",
    answer: "GIT",
    score: 0.5,
  },
  {
    hint: "زبان برنامه‌نویسی تایپ‌محور که روی جاوااسکریپت ساخته شده است",
    answer: "TYPESCRIPT",
    score: 1.25,
  },
  {
    hint: "سیستمی که برای طراحی ریسپانسیو استفاده می‌شود",
    answer: "BOOTSTRAP",
    score: 1,
  },
  {
    hint: "فرمت محبوب برای تصاویر وکتوری در وب",
    answer: "SVG",
    score: 0.75,
  },
  {
    hint: "ابزاری برای بسته‌بندی ماژول‌های جاوااسکریپت",
    answer: "WEBPACK",
    score: 1,
  },
  {
    hint: "سرویسی برای میزبانی کد و همکاری تیمی",
    answer: "GITHUB",
    score: 0.5,
  },
];

const $ = document;

const inputsContainer = $.querySelector(".inputs");
const hint = $.querySelector(".hint-word");
const writtedText = $.querySelector(".user-writted");
const guessCounts = $.querySelector(".guess-count");
const score = $.querySelector(".score");
const toastElement = $.querySelector(".toast");
const procesasBar = $.querySelector(".process");
const modalScreen = $.querySelector(".modal-screen");
const modalCard = $.querySelector(".hint-word");
const modalContent = $.querySelector(".modal-content");
const submitBtn = $.querySelector(".continue");
const cancelBtn = $.querySelector("#cancel");
const tryAgainBtn = $.querySelector("#try-again");
const toastMessage = $.querySelector(".toast-message");
const modalIcon = $.querySelector(".modal-icon img");
const resetBtn = $.querySelector(".reset");

let inputElems;
let answerdText = "";
let disabledButton = false;
let currentInputIndex;
let currentIndex = 0;
let userScore = 0;
let chance = 3;
let mainQuestion = questions[currentIndex];

const showQuestion = () => {
  mainQuestion = questions[currentIndex];
  const wordLength = mainQuestion?.answer.length;
  hint.innerText = mainQuestion.hint;
  guessCounts.innerText = chance;
  createInput(wordLength);
};

const nextQuestion = () => {
  if (answerdText === mainQuestion.answer) {
    if (userScore === 9.5) {
      modalScreen.classList.remove("hidden");
      modalContent.innerText = "پشمام همه رو درست زدی که😧";
      modalIcon.setAttribute("src", "./public/image/success.png");
    }
    currentIndex++;
    userScore += mainQuestion.score;
    score.innerText = userScore;
    chance = 3;
    disabledButton = true;
    disabledButtonHandler();
    clearInputs();
    const wordTrueAnswer = [
      "نهههه خوشم اومد",
      "عالی بود",
      "تبارک االله",
      "بنازم",
      "درست زدی کههه",
      "باریکلا",
      "صد آفرین",
      "برو جلو خودشه",
      "ماشالله به هوشت",
    ];

    const randomNumber = Math.floor(Math.random() * 9);

    toastHandler(wordTrueAnswer[randomNumber], "success");
    answerdText = "";
  } else {
    chance--;
    const wordTrueAnswer = [
      "یه بار دیگه تلاش کن",
      "این دفعه حتما درست میزنی",
      "ای بابا",
      "جواب نادرست است",
    ];

    const randomNumber = Math.floor(Math.random() * 4);

    toastHandler(wordTrueAnswer[randomNumber], "error");
    showQuestion();
    clearInputs();
    answerdText = "";
    if (chance === 0) {
      modalScreen.classList.remove("hidden");
    }

  }
};

const createInput = (wordLength) => {
  inputsContainer.innerHTML = "";
  for (let i = 0; i < wordLength; i++) {
    inputsContainer.insertAdjacentHTML(
      "beforeend",
      `
          <input type="text" class="input letter"/>
        
      `
    );
  }
  inputElems = $.querySelectorAll(".input");
  inputElems.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
      const { key } = e;
      if (key === "Backspace") {
        backSpaceHandler(index);
      } else if (key !== "Enter") {
        nextInput(e, index);
      }
    });
  });
};

const nextInput = (e, index) => {
  const currentInput = e.target;
  if (currentInput.value.length >= 1) {
    inputElems[index + 1]?.focus();
    answerdText += currentInput.value.toUpperCase();
    writtedText.innerText += currentInput.value.toUpperCase();
  }
  if (e.target.value.length > 1) {
    currentInput.value = currentInput.value.slice(0, 1);
  }
};

const backSpaceHandler = (index) => {
  inputElems[index - 1]?.focus();
  answerdText = answerdText.slice(0, answerdText.length - 1);
  writtedText.innerText = answerdText;
};

const toastHandler = (text, status) => {
  toastElement.className = `toast ${status}`;
  toastMessage.innerText = text;
  toastProgress();
};

const disabledButtonHandler = () => {
  if (disabledButton) {
    submitBtn.classList.add("disabled");
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove("disabled");
    submitBtn.disabled = false;
  }
};

const toastProgress = () => {
  let progressCount = 0;
  const progressTimeLine = setInterval(() => {
    progressCount++;
    if (progressCount > 110) {
      disabledButton = false;
      procesasBar.style.width = `0px`;
      clearInterval(progressTimeLine);
      toastElement.classList.add("hidden");
      showQuestion();
      disabledButtonHandler();
    }
    procesasBar.style.width = `${progressCount}%`;
  }, 10);
};

const clearInputs = () => {
  inputElems.forEach((input) => {
    input.value = "";
  });
  writtedText.innerText = "";
};

const restartGame = () => {
  userScore = 0;
  chance = 3;
  currentIndex = 0;
  showQuestion();
  modalScreen.classList.add("hidden");
};

tryAgainBtn.addEventListener("click", restartGame);
window.addEventListener("load", showQuestion());
tryAgainBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", restartGame);
submitBtn.addEventListener("click", nextQuestion);
window.addEventListener("keyup", (e) => {
  const { key } = e;
  if (key === "Enter") {
    nextQuestion();
  }
});
const questions = [
  {
    hint: "زبان نشانه‌گذاری که برای ساختاردهی صفحات وب استفاده می‌شود",
    answer: "HTML",
    score: 1,
  },
  {
    hint: "زبانی که برای استایل‌دهی به صفحات وب استفاده می‌شود",
    answer: "CSS",
    score: 0.75,
  },
  {
    hint: "زبانی که باعث زنده شدن صفحات وب می‌شود",
    answer: "JAVASCRIPT",
    score: 1.75,
  },
  {
    hint: "لایبرری محبوب جاوااسکریپت برای ساخت رابط کاربری",
    answer: "REACT",
    score: 1.5,
  },
  {
    hint: "ابزاری برای مدیریت و نسخه‌بندی کدها",
    answer: "GIT",
    score: 0.5,
  },
  {
    hint: "زبان برنامه‌نویسی تایپ‌محور که روی جاوااسکریپت ساخته شده است",
    answer: "TYPESCRIPT",
    score: 1.25,
  },
  {
    hint: "سیستمی که برای طراحی ریسپانسیو استفاده می‌شود",
    answer: "BOOTSTRAP",
    score: 1,
  },
  {
    hint: "فرمت محبوب برای تصاویر وکتوری در وب",
    answer: "SVG",
    score: 0.75,
  },
  {
    hint: "ابزاری برای بسته‌بندی ماژول‌های جاوااسکریپت",
    answer: "WEBPACK",
    score: 1,
  },
  {
    hint: "سرویسی برای میزبانی کد و همکاری تیمی",
    answer: "GITHUB",
    score: 0.5,
  },
];

const $ = document;

const inputsContainer = $.querySelector(".inputs");
const hint = $.querySelector(".hint-word");
const writtedText = $.querySelector(".user-writted");
const guessCounts = $.querySelector(".guess-count");
const score = $.querySelector(".score");
const toastElement = $.querySelector(".toast");
const procesasBar = $.querySelector(".process");
const modalScreen = $.querySelector(".modal-screen");
const modalCard = $.querySelector(".hint-word");
const modalContent = $.querySelector(".modal-content");
const submitBtn = $.querySelector(".continue");
const cancelBtn = $.querySelector("#cancel");
const tryAgainBtn = $.querySelector("#try-again");
const toastMessage = $.querySelector(".toast-message");
const modalIcon = $.querySelector(".modal-icon img");
const resetBtn = $.querySelector(".reset");

let inputElems;
let answerdText = "";
let disabledButton = false;
let currentInputIndex;
let currentIndex = 0;
let userScore = 0;
let chance = 3;
let mainQuestion = questions[currentIndex];

const showQuestion = () => {
  mainQuestion = questions[currentIndex];
  const wordLength = mainQuestion?.answer.length;
  hint.innerText = mainQuestion.hint;
  guessCounts.innerText = chance;
  createInput(wordLength);
};

const nextQuestion = () => {
  if (answerdText === mainQuestion.answer) {
    if (userScore === 9.5) {
      modalScreen.classList.remove("hidden");
      modalContent.innerText = "پشمام همه رو درست زدی که😧";
      modalIcon.setAttribute("src", "./public/image/success.png");
    }
    currentIndex++;
    userScore += mainQuestion.score;
    score.innerText = userScore;
    chance = 3;
    disabledButton = true;
    disabledButtonHandler();
    clearInputs();
    const wordTrueAnswer = [
      "نهههه خوشم اومد",
      "عالی بود",
      "تبارک االله",
      "بنازم",
      "درست زدی کههه",
      "باریکلا",
      "صد آفرین",
      "برو جلو خودشه",
      "ماشالله به هوشت",
    ];

    const randomNumber = Math.floor(Math.random() * 9);

    toastHandler(wordTrueAnswer[randomNumber], "success");
    answerdText = "";
  } else {
    chance--;
    const wordTrueAnswer = [
      "یه بار دیگه تلاش کن",
      "این دفعه حتما درست میزنی",
      "ای بابا",
      "جواب نادرست است",
    ];

    const randomNumber = Math.floor(Math.random() * 4);

    toastHandler(wordTrueAnswer[randomNumber], "error");
    showQuestion();
    clearInputs();
    answerdText = "";
    if (chance === 0) {
      modalScreen.classList.remove("hidden");
    }

  }
};

const createInput = (wordLength) => {
  inputsContainer.innerHTML = "";
  for (let i = 0; i < wordLength; i++) {
    inputsContainer.insertAdjacentHTML(
      "beforeend",
      `
          <input type="text" class="input letter"/>
        
      `
    );
  }
  inputElems = $.querySelectorAll(".input");
  inputElems.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
      const { key } = e;
      if (key === "Backspace") {
        backSpaceHandler(index);
      } else if (key !== "Enter") {
        nextInput(e, index);
      }
    });
  });
};

const nextInput = (e, index) => {
  const currentInput = e.target;
  if (currentInput.value.length >= 1) {
    inputElems[index + 1]?.focus();
    answerdText += currentInput.value.toUpperCase();
    writtedText.innerText += currentInput.value.toUpperCase();
  }
  if (e.target.value.length > 1) {
    currentInput.value = currentInput.value.slice(0, 1);
  }
};

const backSpaceHandler = (index) => {
  inputElems[index - 1]?.focus();
  answerdText = answerdText.slice(0, answerdText.length - 1);
  writtedText.innerText = answerdText;
};

const toastHandler = (text, status) => {
  toastElement.className = `toast ${status}`;
  toastMessage.innerText = text;
  toastProgress();
};

const disabledButtonHandler = () => {
  if (disabledButton) {
    submitBtn.classList.add("disabled");
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove("disabled");
    submitBtn.disabled = false;
  }
};

const toastProgress = () => {
  let progressCount = 0;
  const progressTimeLine = setInterval(() => {
    progressCount++;
    if (progressCount > 110) {
      disabledButton = false;
      procesasBar.style.width = `0px`;
      clearInterval(progressTimeLine);
      toastElement.classList.add("hidden");
      showQuestion();
      disabledButtonHandler();
    }
    procesasBar.style.width = `${progressCount}%`;
  }, 10);
};

const clearInputs = () => {
  inputElems.forEach((input) => {
    input.value = "";
  });
  writtedText.innerText = "";
};

const restartGame = () => {
  userScore = 0;
  chance = 3;
  currentIndex = 0;
  showQuestion();
  modalScreen.classList.add("hidden");
};

tryAgainBtn.addEventListener("click", restartGame);
window.addEventListener("load", showQuestion());
tryAgainBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", restartGame);
submitBtn.addEventListener("click", nextQuestion);
window.addEventListener("keyup", (e) => {
  const { key } = e;
  if (key === "Enter") {
    nextQuestion();
  }
});
