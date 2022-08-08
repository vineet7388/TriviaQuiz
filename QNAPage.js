function loadQuiz(iQuestionList, iContainer){
    iContainer.innerHTML = "" ;
    let vBackButton = document.createElement("button");
    vBackButton.classList.add("back-button")
    vBackButton.innerHTML = "<- BACK";
    vBackButton.onclick = backButtonAction;
    iContainer.appendChild(vBackButton);
    iQuestionList.forEach((question)=>{
        var questionBox = document.createElement("div");
        questionBox.classList.add("question-box");
        questionBox.innerHTML = `<div class="home-container p-2 bg-light border">
        <h3 style="font-family: Brush Script MT;">`
            +question["question"]+
        `</h3>
        </div>`

        question.incorrectAnswers.push(question.correctAnswer)
        question.incorrectAnswers = getShuffledArr(question.incorrectAnswers)
        question.selectedAnswer = ""
        function setAnswer(iValue){
            question.selectedAnswer = iValue
        }
        let optionBox = getOptionBox( question.incorrectAnswers ,setAnswer)
        questionBox.appendChild(optionBox)
        iContainer.appendChild(questionBox)
    })
    let vSubmitButton = document.createElement("button");
    vSubmitButton.classList.add("btn-danger")
    vSubmitButton.innerHTML = "Submit";
    vSubmitButton.style.margin = "5px";
    vSubmitButton.onclick = SubmitAction;
    iContainer.appendChild(vSubmitButton);
    function SubmitAction(){
        var vScore = getScore(iQuestionList);
        showScore(vScore,iContainer)
    }
}

const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

function getOptionBox( iOptions , iSetAnswerCallBack){
    var vOptionBox = document.createElement("div")
    vOptionBox.classList.add("option-container");
    vOptionBox.classList.add("form-select");
    var vSelectBox = document.createElement("select");
    vSelectBox.style.maxWidth = "300px";
    var vList = "<option selected disabled > Select Answer </options>"
    iOptions.forEach(item => {
        vList = vList.concat(`<option value="` + item + `">` + item + `</options>`)
    })
    vSelectBox.innerHTML = vList;
    vSelectBox.onchange = function(evt){
        iSetAnswerCallBack(evt.target.value)
     };
    vOptionBox.appendChild(vSelectBox)
    return vOptionBox
}

function getScore(iQNAList){
    let vScore = 0;
    iQNAList.forEach((item)=>{
        //console.log(item.selectedAnswer)
        if(item.selectedAnswer === item.correctAnswer){
             vScore++;
        }
    })
    return vScore
}

function backButtonAction(){
    var mainConatainer = document.querySelector(".home-container");
    var quizConatainer = document.querySelector(".quiz-container");
    var alertContainer = document.querySelector(".alert-warning");
    mainConatainer.style.display = "";
    alertContainer.style.display = "";
    quizConatainer.style.display = "none";
}


function showScore(iScore,iContainer){
    iContainer.innerHTML = `<div> <h3>Your Score is:</h3> 
    <h2 class="score-value" style="display:inline"></h2>
    <h2 style="display:inline">/10</h2>
    <div>Next Trivia Quiz will start in 10 seconds</div>
    </div>`
    iContainer.querySelector(".score-value").innerHTML = iScore;
    setTimeout(backButtonAction, 10000)
}

export { loadQuiz }