//deklarowanie zmiennych
const gameContainer = document.getElementById("game-container");
const word = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const playAgainEasyLevelBtn = document.getElementById("play-button-level-easy");
const playAgainMediumLevelBtn = document.getElementById("play-button-level-medium");
const playAgainHardLevelBtn = document.getElementById("play-button-level-hard");
const popup = document.getElementById("popup");
const popupContainer = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const notificationWrongLetter = document.getElementById("notification-container-wrong-letter");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".body-part");

//deklarowanie tablicy z hasłami
const easyWords = ["kawa", "dom","kot","list","okno"];
const mediumWords = ["zestaw", "prawo", "kamień", "pudło", "sklep"];
const hardWords = ["kontrrewolucja", "epitafium", "syntezator", "aerodynamika", "dezintegracja"];
//tablice przechowujące poprawnie i niepoprawne litery
const correctLetters = [];
const wrongLetters = [];

//wybieranie poziomu trudności
let selectedWord

function displayWord() {
  
  word.innerHTML = `
  ${selectedWord.split("").map((letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
    )
    .join("")}
  `;
  console.log("coś")
  const innerWord = word.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    popupContainer.classList.remove("popupContainerOpacityNone");
    popupContainer.classList.add("popupContainerOpacityFull");
    //popup.style.opacity = "1";
    finalMessage.innerText = "Wygrałeś";
    popup.classList.remove("popup");
    popup.classList.add("popup-move");
    gameContainer.style.opacity = "0.6";
  }
}
function easyLetterAdd(){
  selectedWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  word.innerHTML = `
  ${selectedWord.split("").map((letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
    )
    .join("")}
  `;
}
function mediumLetterAdd(){
  selectedWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
  word.innerHTML = `
  ${selectedWord.split("").map((letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
    )
    .join("")}
  `;
}
function hardLetterAdd(){
  selectedWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  word.innerHTML = `
  ${selectedWord.split("").map((letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
    )
    .join("")}
  `;
}
function displayEasyWord() {
  
  easyLetterAdd();
  const innerWord = word.innerText.replace(/\n/g, "");
  //jeśli wygrano
  if (innerWord === selectedWord) {
    popupContainer.classList.remove("popupContainerOpacityNone");
    popupContainer.classList.add("popupContainerOpacityFull");
    //popup.style.opacity = "1";
    finalMessage.innerText = "Wygrałeś";
    popup.classList.remove("popup");
    popup.classList.add("popup-move");
    gameContainer.style.opacity = "0.6";
  }
}
function displayMediumWord() {
  
  mediumLetterAdd();
  const innerWord = word.innerText.replace(/\n/g, "");
  //jeśli wygrano
  if (innerWord === selectedWord) {
    popupContainer.classList.remove("popupContainerOpacityNone");
    popupContainer.classList.add("popupContainerOpacityFull");
    //popup.style.opacity = "1";
    finalMessage.innerText = "Wygrałeś";
    popup.classList.remove("popup");
    popup.classList.add("popup-move");
    gameContainer.style.opacity = "0.6";
  }
}
function displayHardWord() {
  
  hardLetterAdd();
  const innerWord = word.innerText.replace(/\n/g, "");
  //jeśli wygrano
  if (innerWord === selectedWord) {
    popupContainer.classList.remove("popupContainerOpacityNone");
    popupContainer.classList.add("popupContainerOpacityFull");
    //popup.style.opacity = "1";
    finalMessage.innerText = "Wygrałeś";
    popup.classList.remove("popup");
    popup.classList.add("popup-move");
    gameContainer.style.opacity = "0.6";
  }
}

//dodawanie błędnych liter
function updateWrongLetterE1() {
  wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Błędne litery:</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //jeśli przegrano

  if (wrongLetters.length === figureParts.length) {
    popupContainer.classList.remove("popupContainerOpacityNone");
    popupContainer.classList.add("popupContainerOpacityFull");
    finalMessage.innerText = "Przegrałeś!";
    popup.classList.remove("popup");
    popup.classList.add("popup-move");
    gameContainer.style.opacity = "0.6";
  }
}

//jeśli ponownie podano litere
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
//jeśli podano błędną litere
function showNotificationWrongLetter() {
  notificationWrongLetter.classList.add("show");

  setTimeout(() => {
    notificationWrongLetter.classList.remove("show");
  }, 2000);
}

//obsługa inputu
function inputFunction() {
  let letter = document.getElementById("myInput").value;
  console.log(letter);
  console.log(letter.toUpperCase().charCodeAt(0));
  if (letter.toUpperCase().charCodeAt(0) >= 65 && letter.toUpperCase().charCodeAt(0) <= 90 && letter.length == 1) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)){
        correctLetters.push(letter);
        displayWord();//levele
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterE1();
      } else {
        showNotification();
      }
    }
  } else {
    showNotificationWrongLetter();
  }
}
//Czyszczenie inputu
function inputClear() {
  document.getElementById("myInput").setAttribute("disabled", "");

  setTimeout(function inputValueClear() {
    document.getElementById("myInput").value = "";
    document.getElementById("myInput").removeAttribute("disabled", "");
    document.getElementById("myInput").focus();
  }, 700);
}

//zagraj ponownie
//playAgainBtn.addEventListener("click", () => {
  /*
  popup.classList.remove("popup-move");
  popup.classList.add("popup-move2");

  correctLetters.splice(0);
  wrongLetters.splice(0);


  setTimeout(function popupPlace() {
    gameContainer.style.opacity = "1";
    popup.classList.remove("popup-move2");
    popup.classList.add("popup");

    popupContainer.classList.remove("popupContainerOpacityFull");
    popupContainer.classList.add("popupContainerOpacityNone");
  }, 3380);

  updateWrongLetterE1();
  */
//});



//zagraj ponownie poziom łatwy

playAgainEasyLevelBtn.addEventListener("click", () =>{
  
  popup.classList.remove("popup-move");
  popup.classList.add("popup-move2");

  correctLetters.splice(0);
  wrongLetters.splice(0);

  displayEasyWord();

  setTimeout(function popupPlace() {
    gameContainer.style.opacity = "1";
    popup.classList.remove("popup-move2");
    popup.classList.add("popup");

    popupContainer.classList.remove("popupContainerOpacityFull");
    popupContainer.classList.add("popupContainerOpacityNone");
  }, 3380);

  updateWrongLetterE1();
});

//zagraj ponownie poziom średni

playAgainMediumLevelBtn.addEventListener("click", () =>{
  
  popup.classList.remove("popup-move");
  popup.classList.add("popup-move2");

  correctLetters.splice(0);
  wrongLetters.splice(0);

  displayMediumWord();

  setTimeout(function popupPlace() {
    gameContainer.style.opacity = "1";
    popup.classList.remove("popup-move2");
    popup.classList.add("popup");

    popupContainer.classList.remove("popupContainerOpacityFull");
    popupContainer.classList.add("popupContainerOpacityNone");
  }, 3380);

  updateWrongLetterE1();
});

//zagraj ponownie poziom trudny

playAgainHardLevelBtn.addEventListener("click", () =>{
  
  popup.classList.remove("popup-move");
  popup.classList.add("popup-move2");

  correctLetters.splice(0);
  wrongLetters.splice(0);

  displayHardWord();

  setTimeout(function popupPlace() {
    gameContainer.style.opacity = "1";
    popup.classList.remove("popup-move2");
    popup.classList.add("popup");

    popupContainer.classList.remove("popupContainerOpacityFull");
    popupContainer.classList.add("popupContainerOpacityNone");
  }, 3380);

  updateWrongLetterE1();
});




let x
function openGame(){
  console.log("otwarcie");
  document.getElementById("choseLevelContainer").style.display = "block";

}
function easyLevel(){
  displayEasyWord();
  document.getElementById("choseLevelContainer").style.display = "none";
  x = "easyLevel";
}
function mediumLevel(){
  mediumLetterAdd();
  document.getElementById("choseLevelContainer").style.display = "none";
  x = "mediumLevel";
}
function hardLevel(){
  hardLetterAdd();
  document.getElementById("choseLevelContainer").style.display = "none";
  x = "hardLevel";
}


openGame();


