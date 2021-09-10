let express = require("express");

let mongoose = require("mongoose");

let url = "mongodb://localhost:27017/courses";
mongoose.pluralize(null);           

mongoose.connect(url).then(res=>console.log("Connected to database...")).catch(err=>console.log(err));

let db = mongoose.connection;
let courseSchema = mongoose.Schema({
    _id:String,
    name:String,
    description:String,
    amount:String
});

let courseModel = mongoose.model("course",courseSchema);

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

app.get("/add_course.html",(req,res)=> {
    res.sendFile(__dirname+"\\add_course.html");
})

app.get("/update_course.html",(req,res)=> {
    res.sendFile(__dirname+"\\update_course.html");
})

app.get("/delete_course.html",(req,res)=> {
    res.sendFile(__dirname+"\\delete_course.html");
})

app.get("/fetch_course.html",(req,res)=> {
    beginContent="<h1 style='text-align: center;'>Fetch Course</h1><a href='/'> (Click here to return)</a><br><br><table border='1' style='margin-left: auto; margin-right: auto;'><tr><th>Course ID</th><th>Course Name</th><th>Course Description</th><th>Course Amount</th></tr>";
    endContent="</table>";
    tableContent = "";
    courseModel.find({},(err,doc)=> {
        if(!err){
                doc.forEach(rec=> {
                    tableContent += "<tr><td>"+rec._id+"</td><td>"+rec.name+"</td><td>"+rec.description+"</td><td>"+rec.amount+"</td></tr>";
                })
                res.send(beginContent+tableContent+endContent);
        }else {
            console.log(err);
        }
    })
})

app.post("/add_course.html",(req,res)=> {
    let data = req.body;
    let newCourse = new courseModel({_id:data.cid, name:data.cname, description: data.cdes, amount: data.camount});
    courseModel.insertMany(newCourse,(err,result)=> {
        if(!err){
            console.log(result)
        } else {
            console.log(err);
        } 
    })
    res.sendFile(__dirname+"\\add_course.html");
})

app.post("/update_course.html",(req,res)=> {
    let data = req.body;
    courseModel.updateOne({_id:data.cid},{$set:{amount:data.camount}},(err,result)=> {
        if(!err){
            if(result.modifiedCount>0 || result.matchedCount>0){
                    console.log("Course updated successfully...")
            }else {
                    console.log("Course didn't update...");
            }
        }else {
            console.log(err);
        }
    })
    res.sendFile(__dirname+"\\update_course.html");
})

app.post("/delete_course.html",(req,res)=> {
    let data = req.body;
    courseModel.deleteMany({_id:data.cid},(err,result)=> {
        if(!err){
            if(result.deletedCount > 0){
                    console.log("Course deleted successfully...")
            }else {
                    console.log("Course was not removed...");
            }
        }else {
            console.log(err);
        }
    })
    res.sendFile(__dirname+"\\delete_course.html");
})

app.listen(9090,()=>console.log("Server running on port 9090..."));