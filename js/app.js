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

    console.log("Computer seq:", computerSeq)

}

getComputerChoice()
getComputerChoice()
getComputerChoice()

function showSeq() {
    for (let animal of computerSeq) {
        console.log("Showing animal:", animal)
    }
}
showSeq()

function handleClickChoice(event) {
    const playerChoice = event.target.id 
    playerSeq.push(playerChoice)
    console.log("Player choice: ", playerSeq)
}


/*----------------------------- Event Listeners -----------------------------*/
for (let oneAnimal of animalEle) {
    oneAnimal.addEventListener("click",handleClickChoice)
}