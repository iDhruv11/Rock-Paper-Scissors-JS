const inputBox = document.querySelector('.input');
const compTurn = ['rock', 'paper', 'scissor'];
const result = document.querySelector('.result');
const status = document.querySelector('.status');
const counter = document.querySelector('.counter');
const reset = document.querySelector('.reset');
const auto = document.querySelector('.autoplay');
let win = 0;
let lose = 0;
let tie = 0;
let compInput;
let isAutoplaying = false;
let intervalId;

function updateStatus(value){
    result.style.display = 'block';
    status.style.display = 'flex';
    status.children[0].children[1].setAttribute('width', '40px');
    status.children[2].children[1].setAttribute('width', '40px');
    if(value == 'scissor'){
        status.children[0].children[1].setAttribute('width', '30px')
    }
    if(compInput == 'scissor'){
        status.children[2].children[1].setAttribute('width', '30px')
    }
    counter.innerText = `Win: ${win}, Lose: ${lose}, Tie: ${tie}`;       
    status.children[0].children[1].setAttribute('src', `src/${value}.png`);
    status.children[2].children[1].setAttribute('src', `src/${compInput}.png`);
}
function getCompTurn(e){
    compInput = compTurn[Math.floor(Math.random()*3)]
    if(e.currentTarget.id == 'rock' && compInput == 'scissor' || e.currentTarget.id == 'scissor' && compInput == 'paper' || e.currentTarget.id == 'paper' && compInput == 'rock'){

        result.innerText = `Your ${e.currentTarget.id} beats ${compInput}. You Win!`;
        win++;
        updateStatus(e.currentTarget.id);

    }else if(e.currentTarget.id == 'scissor' && compInput == 'rock' || e.currentTarget.id == 'paper' && compInput == 'scissor' || e.currentTarget.id == 'rock' && compInput == 'paper'){

        result.innerText = `Your ${e.currentTarget.id} got beaten up by  ${compInput}. You Lose!`
        lose++;
        updateStatus(e.currentTarget.id);
        
    }else{
        
        result.innerText = `Your ${e.currentTarget.id} got matched by  ${compInput}. It's A Tie!`
        tie++;
        updateStatus(e.currentTarget.id);

    }
        
}
function restart(){
    clearInterval(intervalId)
    win = lose = tie = 0;
    counter.innerText = `Win: ${win}, Lose: ${lose}, Tie: ${tie}`;
    result.style.display = 'none';
    status.style.display = 'none';
}
function autoplay(){
   if(isAutoplaying == false){
        isAutoplaying = true;
        intervalId = setInterval(() => {
        
        let userInput = compTurn[Math.floor(Math.random()*3)];
        compInput = compTurn[Math.floor(Math.random()*3)];

        if(userInput == 'rock' && compInput == 'scissor' || userInput == 'scissor' && compInput == 'paper' || userInput == 'paper' && compInput == 'rock'){
            win++;
            result.innerText = `Robot1 wins!`;
            updateStatus(userInput);
            status.children[0].children[1].setAttribute('src', `src/${userInput}.png`);
            status.children[2].children[1].setAttribute('src', `src/${compInput}.png`);
        }
        else if(userInput == 'scissor' && compInput == 'rock' || userInput == 'paper' && compInput == 'scissor' || userInput == 'rock' && compInput == 'paper'){
            lose++;
            result.innerText = `Robot2 wins!`;
            updateStatus(userInput);
            status.children[0].children[1].setAttribute('src', `src/${userInput}.png`);
            status.children[2].children[1].setAttribute('src', `src/${compInput}.png`);

        }
        else{
            tie++;
            result.innerText = `It's a Tie!`;
            updateStatus(userInput);
            status.children[0].children[1].setAttribute('src', `src/${userInput}.png`);
            status.children[2].children[1].setAttribute('src', `src/${compInput}.png`);
        }
        }, 1000);
            
    } 
    else if(isAutoplaying == true){
        clearInterval(intervalId)
        isAutoplaying = false;
    }
}
inputBox.childNodes.forEach(input=>{
    input.addEventListener('click', getCompTurn);
})
reset.addEventListener('click', restart);
auto.addEventListener('click', ()=>{
    autoplay();
    win = lose = tie = 0;
    counter.innerText = `Win: ${win}, Lose: ${lose}, Tie: ${tie}`;
});

