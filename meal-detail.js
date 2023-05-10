const getUrlParams = url=>{
    const paramsData = url.match(/([^?=&]+)(=([^&]*))/g) || [];
    return paramsData.reduce(
        (a,v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf("=") + 1)), a), {})

}

const id = getUrlParams(window.location.href).id;


function fetchMeal(id){
    const url ="https:www.themealdb.com/api/json/v1/1/lookup.php?i=";
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

function addToFav(mealId){
    console.log(id);
    let a = [];
    if(localStorage.getItem('favorites') != null && localStorage.getItem('favorites').includes(id)){
        console.log("Already Added");
        showToast("Already Added");
        return;
    }
    if(localStorage.getItem('favorites') != null){
        a.push(localStorage.getItem('favorites') );
    }
    
    
    
    a.push(id);
    localStorage.clear();
    localStorage.setItem('favorites',a);
    showToast("Added to favorites..");
}

function addTaskToDom(meal){
    const ins = document.getElementById('instructions');
    ins.innerHTML='';
    const p  = document.createElement('p');
    p.innerHTML = `${meal.strInstructions}`;
    ins.append(p);

    const fav = document.getElementsByClassName('fav-button');
    fav[0].setAttribute('id', meal.idMeal);

    const image = document.getElementById('image');
    image.innerHTML='';
    const img = document.createElement('img');
    img.setAttribute('src', meal.strMealThumb);
    image.append(img);


    const ingredients = document.getElementById('ingredients');
    ingredients.innerHTML='';
    const list = document.createElement('ul');
    list.innerHTML = `<li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>etc.</li>`;

    const play = document.createElement('div');
    play.className="play-container"
    play.innerHTML = `<a href='${meal.strYoutube}'class='playBut'>
                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
                <svg version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px" y="0px" width="213.7px" height="213.7px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
                    xml:space="preserve">       
                <polygon class='triangle' id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                    73.5,62.5 148.5,105.8 73.5,149.1 "/>
                <circle class='circle' id="XMLID_17_" fill="none"  stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"/>
                </svg>   
                Watch Video     
                </a>`;

    ingredients.append(list);
    ingredients.append(play);

    document.getElementById('title').innerText = meal.strMeal;
    
    



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

fetchMeal(id);
