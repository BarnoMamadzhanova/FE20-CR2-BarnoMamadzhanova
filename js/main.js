
let importantTasks = [];

let tasksArr = [];
class Tasks {
    constructor(name, image, description, importance, deadline, number) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.importance = importance;
        this.deadline = deadline;
        this.number = number;
        tasksArr.push(this)
    }
}

const task1 = new Tasks("Groceries", "/images/groceries.jpg", "Buy products for the weekend", "0", "06.10.2023", "1");
const task2 = new Tasks("Application Form", "/images/document.jpg", "Fill the visa application form", "0", "07.10.2023", "2");
const task3 = new Tasks("Homework", "/images/homework.jpg", "To do my homework for Monday", "0", "07.10.2023", "3");
const task4 = new Tasks("Photo", "/images/photo.jpg", "Take a photo for a visa", "0", "08.10.2023", "4");
const task5 = new Tasks("Laundry", "/images/laundry.jpg", "Do the laundry", "0", "09.10.2023", "5");
const task6 = new Tasks("Cleaning", "/images/cleaning.jpg", "Do a general clean-up", "0", "10.10.2023", "6");
const task7 = new Tasks("Shopping", "/images/shopping.jpg", "Buy waterproofs for autumn", "0", "11.10.2023", "7");
const task8 = new Tasks("Termin", "/images/visa.jpg", "Submission of visa application documents", "0", "12.10.2023", "8");
const task9 = new Tasks("Leisure", "/images/pastry.jpg", "To go to the bakery for cheesecake", "0", "14.10.2023", "9");

function displayCards(cards){
  document.getElementById("task").innerHTML = "";
  cards.forEach((value) => {
    document.getElementById("task").innerHTML += `
        <div class="card-container my-4">
        <div class="card shadow">
            <div class="d-flex justify-content-between align-items-center">
                <div><button class="btn btn-info text-light my-2 ms-2">Task ${value.number}</button></div>
                <div class="my-2 me-2 d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-mark"><i class="bi bi-bookmark-fill"></i></button>
                <button type="button" class="btn btn-settings"><i class="bi bi-three-dots-vertical"></i></button>
                </div>
            </div>
             <img src="${value.image}" class="card-img-top" alt="${value.name}">
             <div class="card-body">
                <h5 class="card-title">${value.name}</h5>
                <p class="card-text">Description: ${value.description}</p>
             </div>
             <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-exclamation-triangle-fill"></i> Priority level: <button class="btn priority 
                ${getPrColor(value.importance)}"><span class="priority-level">${ value.importance}</span></button></button></li>
                <li class="list-group-item"><i class="bi bi-calendar-date-fill"></i> Deadline: 
                ${value.deadline}</li>
             </ul>
             <div class="card-body">
                <button class="btn btn-danger action-delete"><i class="bi bi-trash3-fill"></i> Delete</button>
                <button class="btn btn-success action-done"><i class="bi bi-check-circle-fill"></i> Done</button>
             </div>
        </div>
        </div>
        `;
  });

  let btnPriority = document.querySelectorAll(".priority");
  let btnDelete = document.querySelectorAll(".action-delete");
  let btnDone = document.querySelectorAll(".action-done");
  let btnMark = document.querySelectorAll(".btn-mark");
  let btnGo = document.querySelectorAll(".btn-settings");

  buttonListeners(btnPriority, btnDelete, btnDone, btnMark, btnGo);

}

displayCards(tasksArr);

function clickPriority(i) {
    if(tasksArr[i].importance >= 5) {
        return;
    }
    tasksArr[i].importance++;

    document.querySelectorAll('.priority-level')[i].innerText = tasksArr[i].importance;

    changeColor(i);

    if(tasksArr[i].importance == 4) {
       importantTasks.push(tasksArr[i]);
       updateBell();
    }

}


function changeColor(i) {
  document.querySelectorAll(".priority")[i].setAttribute("class", "btn priority " + getPrColor(tasksArr[i].importance));
}

function getPrColor(num) {
  const colors = {
    0: "btn-success",
    1: "btn-success",
    2: "btn-warning",
    3: "btn-warning",
    4: "btn-danger",    
    5: "btn-danger",
  };

  return colors[num];
}

function updateBell(){
    let bellNumber = importantTasks.length;
    document.getElementById('bell').setAttribute("class", `bi bi-${bellNumber}-circle-fill`);
}

let showPriorityOnly = false;
document.getElementById('bell').addEventListener("click", function(){
    if (!showPriorityOnly && importantTasks.length>0) {
        displayCards(importantTasks);
        showPriorityOnly = true;
    }
     else {
        displayCards(tasksArr);
        showPriorityOnly = false;
     }
});


function clickDone(i) {
    document.querySelectorAll('.card-container')[i].classList.add("done");
}

function clickDelete(i) {
    document.querySelectorAll('.card-container')[i].classList.add("delete");
    tasksArr.splice(i, 1);
}

document.getElementById('btnSort').addEventListener("click", function(){
    let newArr = tasksArr.sort((a, b) => b.importance - a.importance);
    displayCards(tasksArr);
})

function clickMark(i) {
    document.querySelectorAll('.btn-mark')[i].classList.add("mark");
}

function clickGo(i) {
    window.location.href = "https://support.google.com/accounts/answer/3118621?hl=en";
}


function buttonListeners(btnPriority, btnDelete, btnDone, btnMark, btnGo) {

  btnPriority.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      clickPriority(i);
    });
  });

  btnDelete.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      clickDelete(i);
    });
  });

  btnDone.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      clickDone(i);
    });
  });

  btnMark.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      clickMark(i);
    });
  });

  btnGo.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      clickGo(i);
    });
  });
}