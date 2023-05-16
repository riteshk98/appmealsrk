function loadFromLocalStorage(){
    if(localStorage.getItem('favorites') != null){
        let a = localStorage.getItem('favorites');
        const array = a.split(',');
        array.forEach(item => fetchMeal(item));
        const list = document.getElementById('list');
        list.innerHTML='';
    }
}


function fetchMeal(id){
    const url ="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    fetch(url+id)
    .then(function(resp){
        console.log(resp);
        return resp.json();
    }).then(function(data){
        console.log(data.meals[0]);
        addTaskToDom(data.meals[0]);
    }).catch(function(err){
        console.log(err);
    })
}

// toast
function showToast(msg) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = msg;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
function removeMeal(id){
    let a = localStorage.getItem('favorites');
    localStorage.clear();
    const array = a.split(',');
    const index = array.indexOf(id.toString());
    console.log(index);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('favorites',array);
    loadFromLocalStorage();
}

function addTaskToDom(meal){
    const list = document.getElementById('list');
    // list.innerHTML='';
    const li  = document.createElement('li');
    li.innerHTML = `
    <div class="row">
        <div class="image">
            <div class="photo" style="background-image: url(${meal.strMealThumb})">
            </div>
        </div>
        <div class="details">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="delete">
            <img src="./delete.png" alt="" id=${meal.idMeal} onclick="removeMeal(this.id)" srcset="" width="40" height="40">
        </div>

    </div>
    `;
    list.append(li);
}




loadFromLocalStorage();
