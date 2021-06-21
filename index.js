var doubleCountTracker = 0;
var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneStartingScore = 0;
var playerTwoStartingScore = 0;
var activePlayerScore = 0;
var inRound = false;
var rollResult = {};
var aPlayerIsEligibleToWin = false;
disableAllButtons();
$("rollButton1").disabled = false;
setClickHandler();

function resetGame() {
  doubleCountTracker = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneStartingScore = 0;
  playerTwoStartingScore = 0;
  activePlayerScore = 0;
  inRound = false;
  rollResult = {};
  aPlayerIsEligibleToWin = false;
  disableAllButtons();
  $("rollButton1").disabled = false;
  $("playerOneScore").innerHTML = "0";
  $("playerTwoScore").innerHTML = "0";
}

function rollZeeDice(id) {
  rollResult = getDiceValues();
  $("dice1").src = "img/dice" + String(rollResult.diceOne) + ".png";
  $("dice2").src = "img/dice" + String(rollResult.diceTwo) + ".png";
  if (id === "playerOneScore") {
    $("stayButton1").disabled = false;
    if (!inRound) {
      playerOneStartingScore ? (playerOneScore = playerOneStartingScore) : null;
      inRound = true;
    }
    playerOneScore += rollResult.isDouble
      ? rollResult.total * 2
      : rollResult.total;
    $(id).innerHTML = playerOneScore;
    activePlayerScore = playerOneScore;
    rollResult.isDouble
      ? ($("stayButton1").disabled = true)
      : ($("stayButton1").disabled = false);
  } else {
    $("stayButton2").disabled = false;
    if (!inRound) {
      playerTwoStartingScore ? (playerTwoScore = playerTwoStartingScore) : null;
      inRound = true;
    }
    playerTwoScore += rollResult.isDouble
      ? rollResult.total * 2
      : rollResult.total;
    $(id).innerHTML = playerTwoScore;
    activePlayerScore = playerTwoScore;
    rollResult.isDouble
      ? ($("stayButton2").disabled = true)
      : ($("stayButton2").disabled = false);
  }

  if (rollResult.isDouble) {
    doubleCountTracker++;
    if (doubleCountTracker === 3) {
      playerRolledThreeDoublesInARow(id);
    }
    if (rollResult.diceOne === 1 && rollResult.diceTwo === 1) {
      playerRolledSnakeEyes(id);
    }
  } else {
    doubleCountTracker = 0;
    if (rollResult.total === 7) {
      playerRolledSeven(id);
    }
  }
  if (activePlayerScore === 100) {
    playerLandedOn100(id);
  }
}

function playerRolledThreeDoublesInARow(id) {
  $(id).innerHTML = "Three Doubles In A Row! Back to Zero!";
  backToZero(id);
}

function playerRolledSnakeEyes(id) {
  $(id).innerHTML = "Snake Eyes! Back to Zero!";
  backToZero(id);
}

function playerLandedOn100(id) {
  $(id).innerHTML = "Landed On 100! Back to Zero!";
  backToZero(id);
}

function playerRolledSeven(id) {
  $(id).innerHTML = "Rolled 7. Back to your previous score!";
  backToZero(id, true);
}

function backToZero(id, didRollSeven) {
  inRound = false;
  if (didRollSeven) {
    if (id === "playerOneScore") {
      playerOneScore = playerOneStartingScore;
      disableAllButtons();
      $("rollButton2").disabled = false;
      if (checkForWinner()) {
        return;
      }
      setTimeout(() => {
        $(id).innerHTML = playerOneStartingScore;
      }, 2000);
      return;
    } else {
      playerTwoScore = playerTwoStartingScore;
      disableAllButtons();
      $("rollButton1").disabled = false;
      if (checkForWinner()) {
        return;
      }
      setTimeout(() => {
        $(id).innerHTML = playerTwoStartingScore;
      }, 2000);
      return;
    }
  }
  if (id === "playerOneScore") {
    playerOneScore = 0;
    playerOneStartingScore = 0;
    disableAllButtons();
    $("rollButton2").disabled = false;
  } else {
    playerTwoScore = 0;
    playerTwoStartingScore = 0;
    disableAllButtons();
    $("rollButton1").disabled = false;
  }
  if (checkForWinner()) {
    return;
  }
  setTimeout(() => {
    $(id).innerHTML = "0";
  }, 2000);
}

function getDiceValues() {
  const diceOneValue = Math.floor(Math.random() * 6) + 1;
  const diceTwoValue = Math.floor(Math.random() * 6) + 1;
  const isDouble = diceOneValue === diceTwoValue ? true : false;
  const diceValues = {
    diceOne: diceOneValue,
    diceTwo: diceTwoValue,
    isDouble: isDouble,
    total: diceOneValue + diceTwoValue,
  };
  return diceValues;
}

function checkForWinner() {
  if (aPlayerIsEligibleToWin) {
    if (playerOneScore > playerTwoScore) {
      $("playerOneScore").innerHTML = "Player 1 Wins!!";
      $("playerTwoScore").innerHTML = "You Lost.";
      disableAllButtons();
      return true;
    }
    if (playerTwoScore > playerOneScore) {
      $("playerTwoScore").innerHTML = "Player 2 Wins!!";
      $("playerOneScore").innerHTML = "You Lost.";
      disableAllButtons();
      return true;
    }
    return false90;
  }
}

function disableAllButtons() {
  $("rollButton1").disabled = true;
  $("stayButton1").disabled = true;
  $("rollButton2").disabled = true;
  $("stayButton2").disabled = true;
}

function stay(playerNum) {
  if (playerNum === 1) {
    playerOneStartingScore = playerOneScore;
    disableAllButtons();
    $("rollButton2").disabled = false;
  }
  if (playerNum === 2) {
    playerTwoStartingScore = playerTwoScore;
    disableAllButtons();
    $("rollButton1").disabled = false;
  }
  inRound = false;
  if (activePlayerScore > 100) {
    aPlayerIsEligibleToWin = true;
  }
}
function setClickHandler() {
  console.log($("dice1").addEventListener("onclick"));
}
function $(id) {
  return document.getElementById(id);
}
