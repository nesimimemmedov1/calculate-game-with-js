let app = document.getElementById("game-app");
let rules = document.getElementById("rules");
let falseAnswer = document.getElementById("false");
let trueAnswer = document.getElementById("true");
let result = document.getElementById("result");
let falseCount = 0;
let trueCount = 0;
let queCount = 0;
let timeValue = 15;
let counter;
let luckCount = document.getElementById("count");
let input = document.getElementById("input");
let checkBtn = document.getElementById("btn");
let numFirst = document.getElementById("first-result");
let numSecond = document.getElementById("second-result");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let selectedCalc = document.getElementById("selectedCalc");
let timeCount = document.getElementById("time-left");
let startBtn = document.getElementById("start");
let queText = document.getElementById("que-count");
let score = document.getElementById("score");
let restart = document.getElementById("restart");
let start = document.getElementById("start")
document.getElementById("first-result").innerHTML = numFirst;
document.getElementById("second-result").innerHTML = numSecond;

function startGame() {
    start.addEventListener("click", function () {
        startTimer(timeValue);
        rules.classList.add("hide");
        app.classList.add("show");
    });
}

function RandomNumber(min, max) {
    let number = Math.floor(Math.random() * (max - min)) + min;
    return number;
}

function newQuestion() {
    let operation = ["+", "-", "*", "/"];
    selectedCalc.textContent = operation[RandomNumber(0, 4)]
    numFirst.innerText = RandomNumber(1, 10)
    numSecond.innerText = RandomNumber(1, 10)
    if (selectedCalc.textContent == "/") {
        while (true) {
            numSecond.textContent = RandomNumber(1, 10);
            if (numFirst.textContent % numSecond.textContent == 0) {
                break;
            };
        }
    }
    if (selectedCalc.textContent == "-") {
        while (true) {
            numSecond.textContent = RandomNumber(1, 10);
            if (numFirst.textContent - numSecond.textContent == 0) {
                break;
            };
        }
    }
}
newQuestion();

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        time--
        document.getElementById("time-left").innerHTML = time;
        if (time == 0) {
            clearInterval(counter);
            falseCount += 1;
            falseAnswer.innerHTML = falseCount;
            newQuestion();
        }
    }
}

function game() {
    checkBtn.addEventListener("click", function () {
        let answer, firstValue, secondValue;
        firstValue = Number(numFirst.textContent);
        secondValue = Number(numSecond.textContent);
        switch (selectedCalc.textContent) {
            case '+':
                answer = firstValue + secondValue;
                break;
            case '-':
                answer = firstValue - secondValue;
                break;
            case '*':
                answer = firstValue * secondValue;

                break;
            case '/':
                answer = firstValue / secondValue;
                break;
            default:
                break;
        }
        let sum = +trueCount + falseCount;
        queCount += 1;
        queText.innerHTML = queCount;
        input.style.border = "1px solid #72b6ff";
        if (input.value == answer) {
            clearInterval(counter);
            startTimer(timeValue);
            newQuestion();
            trueCount += 1;
            trueAnswer.innerHTML = trueCount;
        } else if (input.value == "") {
            input.style.border = "1px solid #ff7272"
            queCount = 0;
            queText.innerHTML = queCount;
        } else {
            newQuestion();
            falseCount += 1;
            falseAnswer.innerHTML = falseCount;
            console.log("buna beraber deyil");
            clearInterval(counter);
            startTimer(timeValue);
        }
        if (sum >= 4) {
            input.disabled = true;
            checkBtn.disabled = true;
            setInterval(function () {
                app.classList.add("hide");
                app.classList.remove("show");
                result.classList.add("show");
            }, 300)
            console.log("oyun bittdi");
            clearInterval(counter);
        }
        showResult(sum);
    })
    startGame();
}
game();

function showResult(sum) {
    if (trueCount > 3) {
        score.innerHTML = `Təbriklər 🎉, 5 sual üzərindən ${trueCount} aldınız.`;
    } else if (trueCount > 2) {
        score.innerHTML = `Gözəl 😎, 5 üzərindən ${trueCount} aldınız.`;
    } else {
        score.innerHTML = `Təəsüf ki 😐, 5 üzərindən ${trueCount} aldınız.`;
    }
}

restart.addEventListener("click", function () {
    location.reload();
    console.log("dasd");
});