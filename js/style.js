let buttons = document.querySelectorAll("#btn");
let resetButton = document.querySelector("#reset-btn");
let newBtn = document.getElementById("new-btn");
let msg = document.getElementById('msg');
let msgContainer = document.getElementById("msg-ctd");
let card = document.getElementById('card');



let turnO = true;
let count = 0;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableButtons();
    msgContainer.classList.add("hide");
    card.style.display = 'inline';
    resetButton.style.display = 'inline';

}
buttons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        if(turnO){
            btn.innerHTML="X";
            turnO=false;
            } else {
            btn.innerHTML="O";
            turnO=true;
        };
        btn.disabled=true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
});

const gameDraw = () =>{
    disablebuttons();
    msg.textContent="It's a Draw!";
    msgContainer.classList.remove("hide");
    card.style.display = 'none';
    resetButton.style.display = 'none';
}

const disablebuttons = ()=>{
    for(let button of buttons){
        button.disabled = true;
    }
}
const enableButtons = ()=>{
    for(let button of buttons){
        button.disabled = false;
        button.innerText= "";
    }
}

const showWinner = (winner)=>{
    msg.innerText=`Winner is : ${winner} Player`;
    msgContainer.classList.remove("hide");
    disablebuttons();
    card.style.display = 'none';
    resetButton.style.display = 'none'; 
}
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = buttons[pattern[0]].innerText;
        let pos2val = buttons[pattern[1]].innerText;
        let pos3val = buttons[pattern[2]].innerText;

        console.log("Checking:", pos1val, pos2val, pos3val);

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner found:", pos1val);
                showWinner(pos1val);
                return true;
            }
        }
    }
}
newBtn.addEventListener('click',resetGame);
resetButton.addEventListener('click',resetGame);