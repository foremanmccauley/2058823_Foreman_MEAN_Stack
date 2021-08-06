function add() {
    var title = document.getElementById("title").value;
    var article = document.getElementById("article").value;
    var image = document.getElementById("image").value;
    console.log(title); 
    console.log(article);
    console.log(image);

    let newEntry = {title: title, article: article, image: image};

    var oldEntries = JSON.parse(localStorage.getItem("entries"));

    if (oldEntries == null) {
        oldEntries = [];
    }

    oldEntries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(oldEntries));
    
    var allEntries = JSON.parse(localStorage.getItem("entries"));
    console.log(allEntries);

    let entryObj = localStorage.getItem("entries");
    let entryJson = JSON.parse(entryObj);

    var divContent="";
    var totalCards = 0;
    
    for (let i = 0; i < entryJson.length; i++) {
        divContent +="<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>"+entryJson[i].title+"</h3></div><div class='scrollable'><img src="+entryJson[i].image+" class='card-img'><div class='card-body'><p>"+entryJson[i].article+"</p></div></div></div></div>";
    }

    document.getElementById("card_area").innerHTML=divContent;
}

function display_current_cards() {
    let entryObj = localStorage.getItem("entries");
    let entryJson = JSON.parse(entryObj);

    var divContent="";
    var totalCards = 0;
    
    for (let i = 0; i < entryJson.length; i++) {
        divContent +="<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>"+entryJson[i].title+"</h3></div><div class='scrollable'><img src="+entryJson[i].image+" class='card-img'><div class='card-body'><p>"+entryJson[i].article+"</p></div></div></div></div>";
    }

    document.getElementById("card_area").innerHTML=divContent;
}