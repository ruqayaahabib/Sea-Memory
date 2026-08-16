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


/*-------------------------------- Functions --------------------------------*/
function init (){
    computerSeq=[]
    playerSeq=[]
    score=0
    message = "Watch the sequance"
    gameOver = false
    playerTurn = false

    getComputerChoice()
    render()
    showSeq()
}
init()

function render(){
    updateMessage()
    updateScore()
}
function updateMessage(){
    messageEle.textContent = message 
}
function updateScore(){
    scoreEle.textContent = "Score" + score

}

function getComputerChoice(){

    const randomChoice = choice[Math.floor(Math.random() * choice.length)]

    computerSeq.push(randomChoice)
    // console.log("Computer seq:", computerSeq)

}


function showAnimal(animal){
    console.log("comp choice:", animal)

    const choiceEle = document.querySelector("#" + animal)
    choiceEle.style.transform = "scale(1.2)"

    setTimeout(function(){
        choiceEle.style.transform = "scale(1)"
    }, 400)
}


function showSeq() {
    playerTurn=false
    message = "Watch the sequence"
    render()
    
    for(let i=0; i< computerSeq.length; i++){
        setTimeout(()=> {showAnimal(computerSeq[i])}, 800 * i)
    }

    setTimeout(function(){
        message="Tour Turn"
        playerTurn=true
        render()

    }, 800 * computerSeq.length)
}


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


function checkAnswer() {
    const currentIndex = playerSeq.length -1
    if (playerSeq[currentIndex] === computerSeq[currentIndex]){
        console.log("correct")

        if(playerSeq.length === computerSeq.length){
            console.log("check")

            score = score + 2
            scoreEle.textContent = "score: " + score
            nextRound()
        }
    }
    else {
        console.log("Wrong")
        gameOver=true
        playerTurn=false
        message="Game Over"
        render()
    }
}

function nextRound(){
    playerSeq=[]
    playerTurn=false
    getComputerChoice()
    console.log("new round: ", computerSeq)

    setTimeout(function() {
        showSeq()
    }, 800)
}

/*----------------------------- Event Listeners -----------------------------*/
for (let oneAnimal of animalEle) {
    oneAnimal.addEventListener("click",handleClickChoice)
}