function add() {
    var clientName = document.getElementById("client").value;
    var projectName = document.getElementById("project").value;
    var budget = document.getElementById("budget").value;
    console.log(clientName); 
    console.log(projectName);
    console.log(budget);

    let newEntry = {client:clientName, project:projectName, budget: budget};

    var oldEntries = JSON.parse(localStorage.getItem("entries"));

    if (oldEntries == null) {
        oldEntries = [];
    }

    oldEntries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(oldEntries));
    
    var allEntries = JSON.parse(localStorage.getItem("entries"));
    console.log(allEntries);
}

function displayData() {
    let entryObj = localStorage.getItem("entries");
    let entryJson = JSON.parse(entryObj);
    var tableContent="";
    var startTable ="<table border=1 style='margin-left: auto; margin-right: auto;'><tr><th>Client</th><th>Project</th><th>Budget</th></tr>";
    

    var totalValue = 0;
    for (let i = 0; i < entryJson.length; i++) {
        tableContent +="<tr><td>"+entryJson[i].client+"</td><td>"+entryJson[i].project+"</td><td>"+"$"+entryJson[i].budget+"</td></tr>"
        totalValue += parseInt(entryJson[i].budget,10);
    }
    var endTable="</table><br/>";

    var afterTable="<h3 style='text-align:center;'> Total Budget: $";

    var afterTableEnd = "</h3>"

    tableContent = startTable+tableContent+endTable+afterTable+totalValue+afterTableEnd;

    document.getElementById("table_area").innerHTML=tableContent;
}