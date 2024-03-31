// alert("hello");
var memoryButton2 = [];
var memoryButton = [];
document.querySelector("#level-title").textContent = "Press A Key to Start";
document.addEventListener("keypress", startGame);

function startGame() {
  // alert("start");
  setTimeout(()=>{
    memoryButton = [];
    memoryButton2 = [];
    document.querySelector("#level-title").textContent = "Level 1";
    document.removeEventListener("keypress", startGame);
    let buttonId = randomButtom();
    let button = document.querySelector("#" + buttonId);
    makeAnimation(button);
    memoryButton.push(button);
    let btnAll = document.querySelectorAll(".btn");
    for (let index = 0; index < btnAll.length; index++) {
      let element = btnAll[index];
      element.addEventListener("click", clickHandle);
    }
  },200)

}
function continueGame() {
  // alert("continue");
  document.querySelector("#level-title").textContent = "Level " + (memoryButton.length+1);
  memoryButton2 = [];
  setTimeout(() => {
    let buttonId = randomButtom();
    let button = document.querySelector("#" + buttonId);
    makeAnimation(button);
    memoryButton.push(button);
  }, 1000);
}
function endGame() {
  //   alert("endGame");
  gameOver();
  let btnAll = document.querySelectorAll(".btn");
  for (let index = 0; index < btnAll.length; index++) {
    let element = btnAll[index];
    element.removeEventListener("click", clickHandle);
  }
  document.querySelector("#level-title").textContent = "Game Over,Press Any Key to Restart";
  document.addEventListener("keypress", startGame);
  //   testClick(memoryButton, memoryButton2);
}
function randomButtom() {
  var a = Math.round(Math.random() * 3);
  let buttonId = ["green", "red", "yellow", "blue"];
  return buttonId[a];
}
function makeAnimation(button) {
  button.classList.add("pressed");
  var audio = new Audio("./sounds/" + button.getAttribute("id") + ".mp3");
  audio.play();
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100 );
}
function gameOver() {
  document.querySelector("body").classList.add("game-over");
  audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  setTimeout(() => {
    document.querySelector("body").classList.remove("game-over");
  }, 100);
}
function clickHandle() {
  makeAnimation(this);
  memoryButton2.push(this);
  let checkResult = testClick(memoryButton, memoryButton2);
  //   alert(checkResult);
  if (checkResult === true && memoryButton.length === memoryButton2.length) {
    continueGame();
  } else if (checkResult === false) {
    endGame();
  }
}
function testClick(memoryButton, memoryButton2) {
  if (memoryButton.length >= memoryButton2.length) {
    for (let index = 0; index < memoryButton2.length; index++) {
      let element1 = memoryButton[index];
      let element2 = memoryButton2[index];
      if (element1 === element2) {
      } else {
        return false;
      }
    }
  }

  return true;
}
