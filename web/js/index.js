$(document).ready(function(){

	//Users current state
	var totalCorrect = 0;
	var totalIncorrect = 0;
	var currentLevel = "M"
	var easyIndex = 0;
	var mediumIndex = 0;
	var hardIndex = 0;

	//Pull data from JSON 
	var questions = getJSONInput();
	
	//Set the current question
	var currentQuestion = new Question(questions.QuestionBank.MediumBank[0].Question, questions.QuestionBank.MediumBank[0].Answers.CorrectAnswer, 
		questions.QuestionBank.MediumBank[0].Answers.Incorrect1, questions.QuestionBank.MediumBank[0].Answers.Incorrect2, questions.QuestionBank.MediumBank[0].Answers.Incorrect3);
	var CorrectAnswer = currentQuestion.answer1;

	function newQuestionText(currQuestion){
		document.getElementById("thisnode").innerText = currQuestion.question;
		var rand2 = Math.floor(Math.random()*100%4);
		switch(rand2){
			case 0: 
				document.getElementById("thisnode2").innerText = currQuestion.answer1;
				document.getElementById("thisnode3").innerText = currQuestion.answer2;
				document.getElementById("thisnode4").innerText = currQuestion.answer3;
				document.getElementById("thisnode5").innerText = currQuestion.answer4;
				break;
			case 1: 
				document.getElementById("thisnode2").innerText = currQuestion.answer4;
				document.getElementById("thisnode3").innerText = currQuestion.answer2;
				document.getElementById("thisnode4").innerText = currQuestion.answer1;
				document.getElementById("thisnode5").innerText = currQuestion.answer3;
				break;
			case 2: 
				document.getElementById("thisnode2").innerText = currQuestion.answer3;
				document.getElementById("thisnode3").innerText = currQuestion.answer1;
				document.getElementById("thisnode4").innerText = currQuestion.answer4;
				document.getElementById("thisnode5").innerText = currQuestion.answer2;
				break;
			case 3: 
				document.getElementById("thisnode2").innerText = currQuestion.answer3;
				document.getElementById("thisnode3").innerText = currQuestion.answer2;
				document.getElementById("thisnode4").innerText = currQuestion.answer4;
				document.getElementById("thisnode5").innerText = currQuestion.answer1;
				break;
		}
	}
	newQuestionText(currentQuestion);

	//when submit is clicked
	$("#me").click(function(){
		var myForm = document.getElementById("myForm");
		var selectedRadio = myForm["question"]
		var selectedAnswer;
		//increment question index to pull appropriate q from bank
		incrementIndex();

		switch(Number(selectedRadio.value)){
			case 1: selectedAnswer = document.getElementById("thisnode2").textContent;
				break;
			case 2: selectedAnswer = document.getElementById("thisnode3").textContent;
				break;
			case 3: selectedAnswer = document.getElementById("thisnode4").textContent;
				break;
			case 4: selectedAnswer = document.getElementById("thisnode5").textContent;
				break;

		}
		if(selectedAnswer == currentQuestion.answer1){
			totalCorrect += 1;
			if(totalCorrect >= 3){
				upDifficulty();
			}
			console.log("Total correct: " + totalCorrect + " Current Diff: " + currentLevel);
		}
		else{
			totalIncorrect += 1;
			if(totalIncorrect >= 3){
				downDifficulty();
			}
			console.log("Total incorrect: " + totalIncorrect+ " Current Diff: " + currentLevel);
		}

		updateQuestion();
	});
	
	function updateQuestion(){
		switch(currentLevel){
			case "E": 
				currentQuestion = new Question(questions.QuestionBank.EasyBank[easyIndex].Question, questions.QuestionBank.EasyBank[easyIndex].Answers.CorrectAnswer,
					questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect1,questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect2, questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect3)
				break;
			case "M": 
				currentQuestion = new Question(questions.QuestionBank.MediumBank[mediumIndex].Question, questions.QuestionBank.MediumBank[mediumIndex].Answers.CorrectAnswer,
					questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect1,questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect2, questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect3)
				break;
			case "H": 
				currentQuestion = new Question(questions.QuestionBank.HardBank[hardIndex].Question, questions.QuestionBank.HardBank[hardIndex].Answers.CorrectAnswer,
					questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect1,questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect2, questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect3)
				break;
		}
		newQuestionText(currentQuestion);
	}

	function incrementIndex(){
		switch(currentLevel){
			case "E": 
				if(easyIndex < 2)
					easyIndex += 1;
				else
					easyIndex = 0;
				break;
			case "M": 
				if(mediumIndex < 2)
					mediumIndex += 1;
				else
					mediumIndex = 0;
				break;
			case "H": 
				if(hardIndex < 2)
					hardIndex += 1;
				else
					hardIndex = 0;
				break;
		}
	}

	function upDifficulty(){
		totalCorrect = 0;
		totalIncorrect = 0;
		switch(currentLevel){
			case "E": 
				currentLevel = "M";
				break;
			case "M": 
				currentLevel = "H";
				break;
			case "H": 
				break;
		}
	}

	function downDifficulty(){
		totalCorrect = 0;
		totalIncorrect = 0;
		switch(currentLevel){
			case "E": 
				break;
			case "M": 
				currentLevel = "E";
				break;
			case "H": 
				currentLevel = "M";
				break;
		}
	}

	//Constructor for Questions
	function Question (question, ans1, ans2, ans3, ans4) {
		this.question = question;
		this.answer1 = ans1;
		this.answer2 = ans2;
		this.answer3 = ans3;
		this.answer4 = ans4;
	}

	function getJSONInput(){
		var temp = 	{"QuestionBank":{

			"EasyBank":[

			    {
			    "QuestionID":"0000", 
			    "Question":" How do I store the value 1 to the variable x in python?",
			    "Answers":{
				    "CorrectAnswer": " x = 1", 
				    "Incorrect1": " x == 1", 
				    "Incorrect2": " int x == 1", 
				    "Incorrect3" : " 1 = x " 
				}
				},

				{
			    "QuestionID":"0001", 
			    "Question":" YOU know....?",
			    "Answers":{
				    "CorrectAnswer": " Frodo", 
				    "Incorrect1": " Odyseus", 
				    "Incorrect2": " motion ", 
				    "Incorrect3" : " c++ " 
				}
			    },

			    {
			    "QuestionID":"0002", 
			    "Question":" Easy question of all questions?",
			    "Answers":{
				    "CorrectAnswer": " BOOM!", 
				    "Incorrect1": " b explode bomb", 
				    "Incorrect2": " Pick ME! ", 
				    "Incorrect3" : " Sonny " 
				}
			    }

			    {
			    "QuestionID":"0003", 
			    "Question":" Easy question 003?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }
			 	
			 	{
			    "QuestionID":"0004", 
			    "Question":" Easy question 004?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }

			    {
			    "QuestionID":"0005", 
			    "Question":" Easy question 005?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }
			],

			"MediumBank":[

				{
			    "QuestionID":"1000", 
			    "Question":" In Python, what is the command to display hello world to the standard output?",
			    "Answers":{
				    "CorrectAnswer": " print \"hello world\"", 
				    "Incorrect1": " console.log \"hello world\"", 
				    "Incorrect2": " cout << \"hello world\"", 
				    "Incorrect3" : " disp (\"hello world\")" 
				}
			    },

			    {
			    "QuestionID":"1001", 
			    "Question":" Which of the folowing returns 0?",
			    "Answers":{
				     "CorrectAnswer": " 0 if true else 1", 
				     "Incorrect1": " 1 if true else 0", 
				     "Incorrect2": " x = 0 ", 
				     "Incorrect3" : " if 0: 1 " 
				 }
			     },

			    {
			    "QuestionID":"1002", 
			    "Question":" Medium question of all questions?",
			    "Answers":{
				    "CorrectAnswer": " 42", 
				    "Incorrect1": " i can haz cheesburger", 
				    "Incorrect2": " F = ma ", 
				    "Incorrect3" : " Newtons 3rd law of motion " 
				}
			    }

			    {
			    "QuestionID":"1003", 
			    "Question":" Medium question 003?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }

			    {
			    "QuestionID":"1004", 
			    "Question":" Medium question 004?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }

			    {
			    "QuestionID":"1005", 
			    "Question":" Medium question 005?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }
			],

			"HardBank":[

				{
			    "QuestionID":"2000", 
			    "Question":"which of the following will display the value of x and a descriptive string to the standard output if x is a string?",
			    "Answers":{
				     "CorrectAnswer": " print \"The value of x is: {}\".format(x) ", 
				     "Incorrect1": " print  \"The value of x is:\" + x ", 
				     "Incorrect2": " y = \"The value of x is: {}\".format(x)", 
				     "Incorrect3" : " y =  print  \"The value of x is:\" + xs" 
				 }
				 },

				{
			    "QuestionID":"2001", 
			    "Question":"Which of the following represents a conditional statement in python?",
			    "Answers":{
				     "CorrectAnswer": " if ( x == 3 )", 
				     "Incorrect1": " x = 2", 
				     "Incorrect2": " x == 2", 
				     "Incorrect3" : " print \"hello world\"" 
				}
			    },

			    {
			    "QuestionID":"2002", 
			    "Question":"Hard question of all questions?",
			    "Answers":{
				    "CorrectAnswer": " Cake!", 
				    "Incorrect1": " Cher", 
				    "Incorrect2": " PV = nRT ", 
				    "Incorrect3" : " PA = LU factorization " 
				}
			    }

			    {
			    "QuestionID":"2003", 
			    "Question":" Hard question 003?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }

			    {
			    "QuestionID":"2004", 
			    "Question":" Hard question 004?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }

			    {
			    "QuestionID":"2005", 
			    "Question":" Hard question 005?",
			    "Answers":{
				    "CorrectAnswer": " this thingy!", 
				    "Incorrect1": " no", 
				    "Incorrect2": " no ", 
				    "Incorrect3" : " no " 
				}
			    }
			]
		}
	}
		return temp;
	}
});
	

