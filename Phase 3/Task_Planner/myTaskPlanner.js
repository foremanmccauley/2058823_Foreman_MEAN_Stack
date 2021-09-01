let http = require("http");
const fs = require('fs');
let url = require("url");
const path = './all_tasks.json';

let indexPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Task Planner</h2>
    <form action="addTask">
        <label>Employee ID</label>
        <input type="text" name="eID"/><br/>
        <label>Task ID</label>
        <input type="text" name="taskID"/><br/>
        <label>Task</label>
        <input type="text" name="taskName"/><br/>
        <label>Deadline</label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task"/>
       <input type="reset" value="Reset"/> <br/>
    </form>
    <br>
    <br>
    <form action="deleteTask">
        <label>Task ID</label>
        <input type="text" name="deleteid"/><br/>
        <input type="submit" value="Delete Task"/>
    </form>
    <br>
    <br>
    <form action="displayTasks">
        <input type="submit" value="List All Tasks"/>
    </form>
    <br>
    <br>
</body>
</html> 
`


let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.pathname == "/addTask"){
            let newTask = urlInfo.query;
            if (fs.existsSync(path)) {
                fs.readFile(path, (err, data) => {
                    if (err) throw err;
                    let all_tasks = JSON.parse(data);
                    all_tasks.push(newTask);
                    let all_tasks_string = JSON.stringify(all_tasks);
                    fs.writeFileSync('all_tasks.json', all_tasks_string);
                })
            }
            else {
                let all_tasks = [];
                all_tasks.push(newTask);
                let all_tasks_string = JSON.stringify(all_tasks);
                fs.writeFileSync('all_tasks.json', all_tasks_string);
            }
            response.write(indexPage);
        }
        else if(urlInfo.pathname == "/deleteTask"){
            if (fs.existsSync(path)) {
                fs.readFile(path, (err, data) => {
                    if (err) throw err;
                    let all_tasks = JSON.parse(data);
                    let taskToDelete = urlInfo.query;
                    for (let i = 0; i < all_tasks.length; i++) {
                        if (all_tasks[i].taskID == taskToDelete.deleteid) {
                            all_tasks.splice(i, 1);
                            let all_tasks_string = JSON.stringify(all_tasks);
                            fs.writeFileSync('all_tasks.json', all_tasks_string);
                        }                    
                    }
                })

                response.write(indexPage);
            }
        }
        else if(urlInfo.pathname == "/displayTasks"){
            let startTable = `
                <table border=1>
                <tr>
                    <th>Employee ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
                `

            let taskTable = "";

            let endTable = "<table>";

            let myFile = JSON.parse(fs.readFileSync(path).toString());

            myFile.forEach(element => {
                taskTable += "<tr><td>" + element.eID + "</td><td>" + element.taskID + "</td><td>" + element.taskName + "</td><td>" + element.deadline + "</td></tr>";
            });

            response.write(indexPage + startTable + taskTable + endTable);
        }
        else {
            response.write(indexPage);  
        }
    }
    
    response.end();

})

server.listen(9090,()=>console.log("Server running on port number 9090"))