import { getCategoryList, getQuizData } from "./WebServices.js";
import { loadQuiz } from "./QNAPage.js"

async function goToQuizPage() {
    mainConatainer.style.display = "none";
    alertContainer.style.display = "none";
    quizConatainer.style.display = "";
    let category = mainConatainer.querySelector(".category-select").value;
    let difficulty = mainConatainer.querySelector(".difficulty-select").value;
    if (category != "Select Category") {
        category = "categories=" + category
    } else {
        category = ""
    }
    if (category && difficulty != "Select Difficulty") {
        category = category + "&difficulty=" + difficulty
    } else if (difficulty != "Select Difficulty") {
        category = "difficulty=" + difficulty
    }
    await getQuizData(category).then((iResponse) => {
        loadQuiz(iResponse,quizConatainer)
    })

}

var categoryList = "";
var mainConatainer = document.querySelector(".home-container");
var quizConatainer = document.querySelector(".quiz-container");
var alertContainer = document.querySelector(".alert-warning");
var categoryBox = document.createElement("div")
categoryBox.classList.add("d-grid");
categoryBox.classList.add("gap-3");
categoryBox.innerHTML =
    `
<div class="p-2 bg-light border" >
<button class="btn btn-sm btn-info"> Category </button>                          
<select class="category-select form-select" name="selectedCategory" aria-label=".form-select-sm example">
<option selected disabled> Select Category </option>
</select>
</div>
<div class="p-2 bg-light border">
<button class="btn btn-sm btn-info"> Difficulty </button>  
<select class="difficulty-select form-select" aria-label=".form-select-sm example">
<option selected disabled> Select Difficulty </option>
<option value="easy"> Easy </option>
<option value="medium"> Medium </option>
<option value="hard"> Hard </option>
</select>

</div>
<div class="p-2 bg-light border">
<button class="btn btn-sm btn-primary start-button"> Start </button>  
</div>
`

categoryBox.querySelector(".start-button").addEventListener("click", goToQuizPage)
mainConatainer.appendChild(categoryBox)

if (categoryList === "") {
    await getCategoryList().then((data) => {
        //     console.log(data); // JSON data parsed by `data.json()` call
        var vList = "";
        Object.keys(data).forEach(element => {
            data[element].forEach(item => {
                vList = vList.concat(`<option value="` + item + `">` + item + `</options>`)
            })
        });
        categoryList = vList;
    });

    mainConatainer.querySelector(".category-select").innerHTML = mainConatainer.querySelector(".category-select").innerHTML.concat(categoryList)
}