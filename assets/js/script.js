


// Section to start quiz by calling initial Functions

var startButton = document.getElementById("startQuiz");

startButton.addEventListener("click", startCountdown);
startButton.addEventListener("click", questionIndex);
startButton.addEventListener("click",hideButton,true);
function hideButton() {
  document.getElementById('startQuiz').style.display = 'block'; 
  this.style.display = 'none'
}  



// Section for timer Variables and Functions

var countdown = document.querySelector(".documentClock");
var timeRemaining = 13;

function startCountdown() {
  var countdownInterval = setInterval(function() {
    timeRemaining--;
    countdown.textContent = timeRemaining + " seconds left";
    
    if(timeRemaining <= 0) {
      clearInterval(countdownInterval);
      countdown.textContent = "Quiz Over";
      enterScore();
    }

  }, 1000);
}



// Section for an Object with the quiz questions and Array of choices

var questions = [
  {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: 2
  },
  {
      title: "The condition in an if / else statement is enclosed within what type of symbol.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: 2
  },
  {
      title: "Arrays in Javascript can be used to store which data type.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: 3
  },
  {
      title: "String values must be enclosed within what type of symbol when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parenthesis"],
      answer: 2
  },
  {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal / bash", "for loops", "console.log"],
      answer: 3
  },

];



// Section for quiz question Variables and Functions

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector(".currentTime");
var secondsLeft = 50;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");


var timeDeduction = 10;
var questionsDiv = document.querySelector(".displayQuestions");
var instructions = document.querySelector(".introLanguage");

function questionIndex() {
 instructions.textContent = ""; 
 questionsDiv.textContent = "";
 ulCreate.textContent = "";

  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].title;
      var userChoices = questions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");

      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

      } else {
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = "Incorrect. The correct answer is:  " + questions[questionIndex].answer;
      }
  }

  questionIndex++;
  if (questionIndex >= questions.length) {
      allDone();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}



// Section for initials/score entry Variables and Functions

function enterScore() {
  instructions.textContent = ""; 
  questionsDiv.textContent = "";
  currentTime.textContent = "";

  var createH1 = document.createElement("h3");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  questionsDiv.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;

      questionsDiv.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.setAttribute("maxlength", 3);
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials == "") {
          window.alert("No value entered!");
      } 
      else {
          var finalScore = {
              initials: initials,
              score: timeRemaining
          }
          console.log(finalScore);
          var allScores = localStorage.getItem("allScores");
          
            if (allScores === null) {
              allScores = [];
            } 
            else {
              allScores = JSON.parse(allScores);
            }

          allScores.push(finalScore);
          var newScore = JSON.stringify(allScores);
          localStorage.setItem("allScores", newScore);

          highScores();
      }
  });

}



// Section for the high scores Variables and Functions

var displayScores = document.querySelector(".highScores");

function highScores() {
  displayScores.textContent = "Temporary Placeholder"; 
}



// Section reset the page and start over

function startOver() {
  location.reload() 
}


