import { Component, OnInit } from '@angular/core';
import questions from './exam_questions.json';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questionForm:FormGroup;
  constructor(public form:FormBuilder) {    
      this.questionForm=form.group({});
   }
  

   ngOnInit(): void {
    this.questionList.forEach(q=> {
        this.questionForm?.addControl(q.question,this.form.control(""));
                                
    })
  }

  questionList:{question:string, answer1:string, answer2:string, answer3:string, answer4:string, correctAns:string}[] = questions;
  score: string = "";

  submit(): void {
    let correctAnswers = 0;
    let questionAnswers = this.questionForm.value;
    let i = 0;

    for (var question in questionAnswers) {
      if (questionAnswers[question] == this.questionList[i].correctAns) {
        let elem: HTMLElement = document.getElementById(question)!;
        elem.setAttribute("src","https://i.imgur.com/6cY1Lc2.png");
        correctAnswers += 1;
      }
      else {
        let elem: HTMLElement = document.getElementById(question)!;
        elem.setAttribute("src","https://i.imgur.com/JR8Bnfy.png");
        elem.setAttribute("width", "18px");
        elem.setAttribute("height", "auto");
      }
      i++; 
    }

    if (correctAnswers > 6) {
      this.score = "You got " + correctAnswers + " out of " + this.questionList.length + " correct! Result: Passed ";
      alert("You got " + correctAnswers + " out of " + this.questionList.length + " correct! Result: Passed");
    }
    else {
      this.score = "You got " + correctAnswers + " out of " + this.questionList.length + " correct! Result: Failed ";
      alert("You got " + correctAnswers + " out of " + this.questionList.length + " correct! Result: Failed");
    }
    

  }

}
