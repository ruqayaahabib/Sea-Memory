console.log("Sea Memory Game")

/*-------------------------------- Constants --------------------------------*/
const choice = ["turtle","fish","octopus","jellyfish"]

/*-------------------------------- Variables --------------------------------*/
let computerSeq = []
let playerSeq = []
let score = 0

/*------------------------ Cached Element References ------------------------*/

const animalEle = document.querySelectorAll(".animal")
const messageEle = document.querySelector("#message")
const scoreEle = document.querySelector("#score")

console.log("Animal buttons:", animalEle)
console.log("Message:", messageEle)
console.log("Score:", scoreEle)


/*-------------------------------- Functions --------------------------------*/

function getComputerChoice(){
    const randomChoice = choice[Math.floor(Math.random() * choice.length)]

    computerSeq.push(randomChoice)

    // console.log("Computer seq:", computerSeq)

}

getComputerChoice()

function showSeq() {
    messageEle.textContent = "Watch the sequence"
    for (let animal of computerSeq) {
        console.log("comp choice:", animal)
    }
    messageEle.textContent = "Your turn"

}
showSeq()

function handleClickChoice(event) {
    const playerChoice = event.target.id 
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
            scoreEle.textContent = "score:" + score
            nextRound()
        }
    }
    else {
        console.log("Wrong")
        messageEle.textContent = "Game Over"
    }
}

function nextRound(){
    playerSeq=[]
    getComputerChoice()
    console.log("new round: ", computerSeq)
}

/*----------------------------- Event Listeners -----------------------------*/
for (let oneAnimal of animalEle) {
    oneAnimal.addEventListener("click",handleClickChoice)
}