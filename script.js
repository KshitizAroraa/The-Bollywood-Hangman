//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


//Options value for buttons
let options = {
  Movies: [
    "Dangal",
    "Haider",
    "Barfi",
    "Lagaan",
    "Piku",
    "Padmaavat",
    "Dhamaal",
    "Chhichhore",
    "Raaz",
    "Stree",
    "Andhadhun",
    "Khiladi",
    "Sultan",
    "Animal",
    "Dabangg",
    "Race",
    "Rockstar",
    "Wanted",
    "Baghban",
    "Dhoom",
    "Singham",
    "Kahaani",
    "Murder",
    "Jannat",
    "Pathaan",
    "Dunki",
    "Fighter",
    "Kesari",
    "Ludo",
    "Shershah",
    "Mimi",
    "Bhuj",
    "Jersey",
    "Atrangi",
  ],
  Songs: [
    "Dilbar",
    "Ghungroo",
    "Galliyan",
    "Bekhayali",
    "Malang",
    "Raabta",
    "Zehnaseeb",
    "Dheere",
    "Khamoshiyan",
    "Shayad",
    "Subhanallah",
    "Soch",
  ],
  Celebrities: [
    "Aishwarya",
    "Salman",
    "Deepika",
    "Ranbir",
    "Priyanka",
    "Shahrukh",
    "Kareena",
    "Akshay",
    "Anushka",
    "Hrithik",
    "Ranveer",
    "Alia",
    "Varun",
    "Katrina",
    "Rajinikanth",
    "Kangana",
    "Ayushmann",
    "Madhuri",
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display Options Button
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //diasble all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //diable all  letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word generetor
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //if option matches button then its shown
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //Initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerHTML = "";

  let optionArray = options[optionValue];
  //choose word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containuing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

//Initial Function (called when page loads/user presser new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //initially erase all contents and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Number to ASCII
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // });

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;

            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class="win-msg">You Win!!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              // bolck all buttons
              blocker();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class="lose-msg">You Lose !!!</h2><p>The Word Was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};
//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};
//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};
//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
