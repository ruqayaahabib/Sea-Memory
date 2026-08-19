console.log("Sea Memory Game")

/*-------------------------------- Constants --------------------------------*/
const choice = ["turtle","fish","octopus","jellyfish"]

/*-------------------------------- Variables --------------------------------*/
let computerSeq = []
let playerSeq = []
let score = 0
let message = null
let gameOver = null
let playerTurn= null 

/*------------------------ Cached Element References ------------------------*/

const animalEle = document.querySelectorAll(".animal")
const messageEle = document.querySelector("#message")
const scoreEle = document.querySelector("#score")

console.log("Animal buttons:", animalEle)
console.log("Message:", messageEle)
console.log("Score:", scoreEle)

const menuEle = document.querySelector(".main-menu")
const startBtnEle = document.querySelector("#start-button")

console.log("Main Menu:" , menuEle)
console.log("Start Button: ", startBtnEle)


const gameOverPopupEle = document.querySelector("#gameOver-popup")
const finalScoreEle = document.querySelector("#final-score")
const restartBtnEle = document.querySelector("#restart-button")
const mainMenuBtnEle = document.querySelector("#mainMenu-button")

console.log("Game Over Popup:", gameOverPopupEle)
console.log("Final Score:", finalScoreEle)
console.log("Restart Button:", restartBtnEle)
console.log("Main Menu Button:", mainMenuBtnEle)

/*-------------------------------- Functions --------------------------------*/
// This function is used to reset all values
function init (){
    computerSeq=[]
    playerSeq=[]
    score=0
    message = "Watch the sequence"
    gameOver = false
    playerTurn = false

    render()
}
init()

// This function is used to update the game screen 
function render(){
    updateMessage()
    updateScore()
}
// This function is to show the current message 
function updateMessage(){
    messageEle.textContent = message 
}
// This function is used to show the current score 
function updateScore(){
    scoreEle.textContent = score

}
// This function is used to add random choices to the computer sequance 
function getComputerChoice(){
    const randomChoice = choice[Math.floor(Math.random() * choice.length)]
    computerSeq.push(randomChoice)
}

// This function is used to higlight one animal for short time 
function showAnimal(animal){
    console.log("comp choice:", animal)

    const choiceEle = document.querySelector("#" + animal)
    choiceEle.style.transform = "scale(1.4)"

    setTimeout(function(){
        choiceEle.style.transform = "scale(1)"
    }, 400)
}

// This function is used to show the computer sequence to the player 
function showSeq() {
    playerTurn=false
    message = "Watch the sequence"
    render()
    
    for(let i=0; i< computerSeq.length; i++){
        setTimeout(()=> {showAnimal(computerSeq[i])}, 800 * i)
    }

    setTimeout(function(){
        message="Your Turn"
        playerTurn=true
        render()

    }, 800 * computerSeq.length)
}

// This function is used to get the player choice 
function handleClickChoice(event) {
    if (gameOver || playerTurn === false){
        return
    }

    const playerChoice = event.target.id 
    showAnimal(playerChoice)
    playerSeq.push(playerChoice)
    console.log("Player choice: ", playerSeq)

    checkAnswer()
}

// This function is used to check the player answer 
function checkAnswer() {
    const currentIndex = playerSeq.length -1
    if (playerSeq[currentIndex] === computerSeq[currentIndex]){
        console.log("correct")

        if(playerSeq.length === computerSeq.length){
            console.log("check")

            score = score + 2
            scoreEle.textContent = score
            nextRound()
        }
    }
    else {
        console.log("Wrong")
        showGameOver()
    }
}
// This function is for starting a new round 
function nextRound(){
    playerSeq=[]
    playerTurn=false
    getComputerChoice()
    console.log("new round: ", computerSeq)

    setTimeout(function() {
        showSeq()
    }, 800)
}
// This function is used to hide the main menu
function startGame(){
    console.log("Game Started")
    menuEle.style.display="none"

    getComputerChoice()
    showSeq()

}


function showGameOver(){
    gameOver = true
    playerTurn = false
    message = "Game Over"

    finalScoreEle.textContent = score
    gameOverPopupEle.style.display = "flex"
    render()
}

function restartGame(){
    gameOverPopupEle.style.display = "none"
    init()
    getComputerChoice()
    showSeq()
}
function backToMainMenu(){
    gameOverPopupEle.style.display = "none"
    menuEle.style.display = "flex"
    init()
}

/*----------------------------- Event Listeners -----------------------------*/
for (let oneAnimal of animalEle) {
    oneAnimal.addEventListener("click",handleClickChoice)
}

startBtnEle.addEventListener("click", startGame)


restartBtnEle.addEventListener("click", restartGame)
mainMenuBtnEle.addEventListener("click", backToMainMenu)