function add(ele, itemValue: number) {

    //Creating new entry

    let itemName = ele.id;

    let newEntry = {itemName: itemName, itemValue: itemValue};

    let oldEntries = JSON.parse(localStorage.getItem("entries"));

    if (oldEntries == null) {
        oldEntries = [];
    }

    oldEntries.push(newEntry);

    localStorage.setItem("entries", JSON.stringify(oldEntries));
    
}

function display_current_cards() {
    var divContent = "";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Pencil</h3></div><img src='https://i.imgur.com/fb9QCRU.jpg' class='card-img'><div class='card-body'><p>Price: $1</p><a href='#/' id='Pencil' onclick = 'add(this, 1)' class='btn btn-primary'>Add to cart</a></div></div></div>";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Apple</h3></div><img src='https://i.imgur.com/CGuDGFN.jpg' class='card-img'><div class='card-body'><p>Price: $2</p><a href='#/' id='Apple' onclick = 'add(this, 2)' class='btn btn-primary'>Add to cart</a></div></div></div>";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Purse</h3></div><img src='https://i.imgur.com/UOflqbq.jpg' class='card-img'><div class='card-body'><p>Price: $25</p><a href='#/' id='Purse' onclick = 'add(this, 25)' class='btn btn-primary'>Add to cart</a></div></div></div>";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Ketchup</h3></div><img src='https://i.imgur.com/ZdrG63W.jpg' class='card-img'><div class='card-body'><p>Price: $3</p><a href='#/' id='Ketchup' onclick = 'add(this, 3)' class='btn btn-primary'>Add to cart</a></div></div></div>";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Milk</h3></div><img src='https://i.imgur.com/qXBZflY.jpg' class='card-img'><div class='card-body'><p>Price: $4</p><a href='#/' id='Milk' onclick = 'add(this, 4)' class='btn btn-primary'>Add to cart</a></div></div></div>";
    divContent += "<div class='col-md-4'><div class='card text-center'><div class='card-title'><h3>Pasta</h3></div><img src='https://i.imgur.com/mty06pL.jpg' class='card-img'><div class='card-body'><p>Price: $5</p><a href='#/' id='Pasta' onclick = 'add(this, 5)' class='btn btn-primary'>Add to cart</a></div></div></div>";

    document.getElementById("card_area").innerHTML=divContent;
}

function display_table() {
    let entryObj = localStorage.getItem("entries");
    let entryJson = JSON.parse(entryObj);
    var tableContent="";
    var startTable ="<table border=1 style='margin-left: auto; margin-right: auto;'><tr><th>Item Name</th><th>Item Price</th></tr>";
    let totalValue = 0;

    for (let i = 0; i < entryJson.length; i++) {
        tableContent +="<tr><td>"+entryJson[i].itemName+"</td><td>"+entryJson[i].itemValue+"</td></tr>"
        totalValue += parseInt(entryJson[i].itemValue,10);
    }
    var endTable="</table><br/>";

    var afterTable="<h3 style='text-align:center;'> Total Price: $";

    var afterTableEnd = "</h3>";

    tableContent = startTable+tableContent+endTable+afterTable+totalValue+afterTableEnd;

    document.getElementById("table_area").innerHTML=tableContent;
}