const msgEle = document.getElementById('msg');

const randNum = getRandommNum();

// console.log(randNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recog = new window.SpeechRecognition();

recog.start();

function userSpeak(e) { //get user speak
    const msg = e.results[0][0].transcript;

    writeMsg(msg);
    checkNum(msg);
}

function writeMsg(msg) { // Writes what user said 
    msgEle.innerHTML = `
    <div> You guessed: </div>
    <span class="box">${msg}</span>
    `
}

function checkNum(msg) { //Check the num against user input

    const num = +msg;  // + unary op converts a variable to number
    if (Number.isNaN(num)) {
        msgEle.innerHTML += `<div> <span style="color:red;font-weight:bold">Not a valid Number!!</span></div>`;
        return;
    }

    if (num > 100 || num < 1) {
        msgEle.innerHTML += `<div> <span style="color:red;font-weight:bold">Number must be between 1-100</span></div>`
        return;
    }

    if (num === randNum) {
        document.body.innerHTML = `<h2> <span style="color:lightgreen;font-weight:bold;font-size:30px">Congrats! You guessed the correct number!! <br> <br>
        It was ${num}</span></h2>
        <button class="play-again" id="play-again"> Play Again </button>`;
    } else if (num > randNum) {
        msgEle.innerHTML += '<div>Go Lower!</div>';
    }
    else {
        msgEle.innerHTML += '<div>Go Higher!</div>';
    }
}

function getRandommNum() {
    return Math.floor(Math.random() * 100) + 1;
}
recog.addEventListener('result', userSpeak);

recog.addEventListener('end', () => recog.start()); // start again after SR Service ends

document.body.addEventListener('click', (e) => { //Add Play Again button functionality
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})
