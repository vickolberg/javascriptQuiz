const questions = [
    {
        question: "Which is the right place to insert Javascript?",
        answers: [
            { text: "css", correct: false},
            { text: "either html head or body", correct: true},
            { text: "main section", correct: false},
            { text: "it will automatically insert", correct: false},
        ]
    },
    {
        question: "How do you define a function in Javascript?",
        answers: [
            { text: "function sampleFunction()", correct: true},
            { text: "sampleFunction()", correct: false},
            { text: "def sampleFunction()", correct: false},
            { text: "func SampleFunction()", correct: false},
        ]
    },
    {
        question: "What key word is used to declare a variable in Javascript?",
        answers: [
            { text: "var", correct: false},
            { text: "const", correct: false},
            { text: "let", correct: false},
            { text: "all of the above", correct: true},
        ]
    },
    {
        question: "Which method is used to add new elements to the end of an array?",
        answers: [
            { text: "pop()", correct: false},
            { text: "shift()", correct: false},
            { text: "push()", correct: true},
            { text: "unshift()", correct: false},
        ]
    },    
    {
        question: "What does the === operator do in Javascript?",
        answers: [
            { text: "checks for equality, ignoring type", correct: false},
            { text: "checks for equality, including type", correct: true},
            { text: "checks for inequality, including type", correct: false},
            { text: "Checks for inequality, ignoring type", correct: false},
        ]
    },
    {
        question: "What is the purpose of the addEventListener() method in JavaScript?",
        answers: [
            { text: "to remove an event listener from an element", correct: false},
            { text: "to add an event listener to an element", correct: true},
            { text: "to check if an event listener is attached to an element", correct: false},
            { text: "to prevent the default behavior of an event", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
} );

startQuiz();