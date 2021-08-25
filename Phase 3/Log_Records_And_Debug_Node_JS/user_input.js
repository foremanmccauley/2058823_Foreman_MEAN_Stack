let obj = require("readline");
const fs = require('fs');
const path = './all_users.json';

var q1 = obj.createInterface({
    input:process.stdin,        
    output:process.stdout       
});

addUser();


function addUser() {
    q1.question("Enter your first name: ",(fName)=> {
        q1.question("Enter your last name: ",(lName)=> {
            q1.question("Enter your gender: ",(gender)=> {
                q1.question("Enter your email: ",(email)=> {
                    let currentDate = new Date();
                    // current date
                    let date = ("0" + currentDate.getDate()).slice(-2);

                    // current month
                    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);

                    // current year
                    let year = currentDate.getFullYear();

                    // current hours
                    let hours = currentDate.getHours();

                    // current minutes
                    let minutes = currentDate.getMinutes();

                    // current seconds
                    let seconds = currentDate.getSeconds();
                    let newUser = {
                        firstName: fName,
                        lastName: lName,
                        gender: gender,
                        email: email,
                        storingDate: month + " " + date + " " + year,
                        storingTime: hours + ":" + minutes + ":" + seconds
                    }
                    
                    

                    if (fs.existsSync(path)) {
                        fs.readFile('all_users.json', (err, data) => {
                            if (err) throw err;
                            let all_users = JSON.parse(data);
                            all_users.push(newUser);
                            let all_users_string = JSON.stringify(all_users);
                            fs.writeFileSync('all_users.json', all_users_string);
                        })
                    }
                    else {
                        let all_users = [];
                        all_users.push(newUser);
                        let all_users_string = JSON.stringify(all_users);
                        fs.writeFileSync('all_users.json', all_users_string);
                    }
                    
                    debugger;
                    console.log("First Name is: "+ fName);
                    debugger;
                    console.log("Last Name is: "+lName);
                    debugger;
                    console.log("Gender is: "+gender);
                    debugger;
                    console.log("Email is: "+email);

                    q1.close();
                })
            })
        })
    })
}