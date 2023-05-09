// const tasks = [];
// const addTaskInput = document.getElementById('add');
// const taskCounter = document.getElementById('tasks-counter');
// const taskList = document.getElementById('list');

// function renderList(){
//     taskList.innerHTML='';
//     for(let i=0;i<tasks.length;i++){
//         addTaskToDom(tasks[i]);
//     }
// }
// function addTaskToDom(task){
//     const li  = document.createElement('li');
//     li.innerHTML = `<li>
//                         <input type="checkbox" id="${task.id}" >
//                         <label for="${task.id}">${task.text}</label>
//                 </li>`;

//     taskList.append(li);
// }

// function markTaskAsComplete(taskId){

// }
// function showNotification(text){
//     alert(text);
// }

// function toggleTask(taskId){
//     const task = tasks.filter(function(task) {
//         return task.id === taskId;
//     });
//     if(task.length > 0){
//         const currentTask = task[0];
//     }
//     currentTask.done != currentTask.done;
//     renderList();
//     showNotification("Task Toggled");
//     return;
// }

// function deleteTask(taskId){
//     const newTasks = tasks.filter(function(task){
//         return task.id !== taskId;
//     })
//     tasks = newTasks;
//     renderList();
//     showNotification("Task deleted");
// }

// function addTask(task){
//     if(task){
//         tasks.push(task);
//         renderList();
//         showNotification("Added Successfully");
//         return;
//     }
//     showNotification("Cannot be added");

// }

// function handleInputKeypress(e){
//     console.log('regi');
//     if(e.key === 'Enter'){
//          const text = e.target.value;
//         if(!text){
//             showNotification('Text cannot be empty');
//             return;
//         }

//         const task = {
//             id:Date.now.toString(),
//             text,
//             done:false
//         }
//         e.target.value = '';
//         addTask(task);
//     }
// }

// addTaskInput.addEventListener('keyup', handleInputKeypress);

let meals = [];
function fetchMeals(text){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
    .then(function(resp){
        // console.log(resp.json());
        return resp.json();
    }).then(function(data){
        meals = data.meals;
        renderList();
    }).catch(function(err){
        console.log(err);
        noMealFound();
    })
}

function noMealFound(){
    showToast("No Meal Found");
}

const mealList = document.getElementById('list');
function renderList(){
    console.log(meals);
    mealList.innerHTML='';
    for(let i=0;i<meals.length;i++){
        addTaskToDom(meals[i]);
    }
}
function addTaskToDom(meal){
    let favs =localStorage.getItem('favorites');
    const li  = document.createElement('div');
    li.className="card";
    li.innerHTML = `
                        <div class="image" id=${meal.idMeal}>
                        <img src="${meal.strMealThumb}" width="100%">
                        </div>
                        <div class="text" id =${meal.idMeal}>
                        <div class="fab" id =${meal.idMeal}><img src=${favs!= null && favs.includes(meal.idMeal) ? "./heart-fill.png": "./heart.png"}></div>
                        <p>${meal.strArea} </p>
                        <h3>${meal.strMeal} </h3>
                        </div>
                    `;

    mealList.append(li);
}



// fetchMeals();


//handle input
const addTaskInput = document.getElementById('search');
addTaskInput.addEventListener('keyup', handleInputKeypress);

function handleInputKeypress(e){
    const text = e.target.value;
    fetchMeals(text.toLowerCase());
}

//event delegtion

document.addEventListener('click', handleClickListner);

function handleClickListner(e){
    const target = e.target;
    // console.log(target);
    // console.log(target.parentElement.id);

    if(target.id === 'favorites'){
        window.location = 'favorites.html';
    }
    if(target.className === 'fab' || target.parentElement.className === 'fab'){
        addToFav(target.parentElement.id);
        // console.log(target.parentElement.id);
    }
    else if(target.parentElement.className ==='text' || target.parentElement.className ==='image'){
        //go to meal detail
        window.location = 'meal-detail.html?id=' + target.parentElement.id;
    }
}

function addToFav(mealId){
    console.log(mealId);
    let a = [];
    if(localStorage.getItem('favorites') != null && localStorage.getItem('favorites').includes(mealId)){
        console.log("Already Added");
        showToast("Already Added");
        return;
    }
    if(localStorage.getItem('favorites') != null){
        a.push(localStorage.getItem('favorites') );
    }
    a.push(mealId);
    localStorage.clear();
    localStorage.setItem('favorites',a);
    showToast("Added to favorites..");
    renderList();
}

function showToast(msg) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = msg;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
