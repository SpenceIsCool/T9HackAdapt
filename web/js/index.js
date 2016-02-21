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
		if (document.getElementById("q1a").checked || document.getElementById("q1b").checked || document.getElementById("q1c").checked || document.getElementById("q1d").checked){
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
				document.getElementById("correctIncorrect").innerHTML += "<li class=\"b\" id=\"f2\"><img src=\"./img/Correct.png\" alt=\"icon\" /></li>";
				if(totalCorrect >= 3){
					upDifficulty();
				}
				console.log("Total correct: " + totalCorrect + " Current Diff: " + currentLevel);
			}
			else{
				totalIncorrect += 1;
				document.getElementById("correctIncorrect").innerHTML += "<li class=\"b\" id=\"f2\"><img src=\"./img/Wrong.png\" alt=\"icon\" /></li>";
				if(totalIncorrect >= 3){
					downDifficulty();
				}
				console.log("Total incorrect: " + totalIncorrect+ " Current Diff: " + currentLevel);
			}
			$("input:radio").attr("checked", false);

			updateQuestion();
		}
		else{}
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
				if(easyIndex < 5)
					easyIndex += 1;
				else
					easyIndex = 0;
				break;
			case "M": 
				if(mediumIndex < 5)
					mediumIndex += 1;
				else
					mediumIndex = 0;
				break;
			case "H": 
				if(hardIndex < 5)
					hardIndex += 1;
				else
					hardIndex = 0;
				break;
		}
	}

	function upDifficulty(){
<<<<<<< HEAD
		totalCorrect = 0;
		totalIncorrect = 0;
		totalAnswered = 0;
		clearTrack();
=======
		
>>>>>>> f070edd606f5086ed68fe846abee0f25aae4a8f3
		switch(currentLevel){
			case "H": 
				if((totalIncorrect + totalCorrect) <= 5){

				}
				else{
					totalCorrect = 0;
					totalIncorrect = 0;
					document.getElementById("correctIncorrect").innerHTML = " ";
				}
				break;
			case "E": 
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("correctIncorrect").innerHTML = " ";
				currentLevel = "M";
				document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyMed.jpg\" alt=\"icon\" />";
				break;
			case "M": 
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("correctIncorrect").innerHTML = " ";
				currentLevel = "H";
				document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyHard.jpg\" alt=\"icon\" />";
				break;
			
		}
	}

	function downDifficulty(){
		switch(currentLevel){
			case "E": 
				if((totalIncorrect + totalCorrect)<= 5){

				}
				else{
					totalCorrect = 0;
					totalIncorrect = 0;
					document.getElementById("correctIncorrect").innerHTML = " ";
				}
				break;
			case "M":
				totalCorrect = 0;
				totalIncorrect = 0; 
				currentLevel = "E";
				document.getElementById("correctIncorrect").innerHTML = " ";
				document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyEasy.jpg\" alt=\"icon\" />";
				break;
			case "H": 
				currentLevel = "M";
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("correctIncorrect").innerHTML = " ";
				document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyMed.jpg\" alt=\"icon\" />";
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
			    "Question":" How do I compare if the variable x stores the value 1?",
			    "Answers":{
				    "CorrectAnswer": " x == 1 ", 
				    "Incorrect1": " x = 1", 
				    "Incorrect2": " int x == 1", 
				    "Incorrect3" : " 1 = x " 
				}
			    },

			    {
			    "QuestionID":"0002", 
			    "Question":" Easy question of all questions?",
			    "Answers":{
				    "CorrectAnswer": " BOOM! ", 
				    "Incorrect1": " b explode bomb", 
				    "Incorrect2": " Pick ME! ", 
				    "Incorrect3" : " Sonny " 
				}
			    },

			    {
			    "QuestionID":"0003", 
			    "Question":" In Python, what is the command to display hello world to the standard output?",
			    "Answers":{
				    "CorrectAnswer": " print \"hello world\"", 
				    "Incorrect1": " console.log \"hello world\"", 
				    "Incorrect2": " cout << \"hello world\"", 
				    "Incorrect3" : " disp (\"hello world\")" 
				}
			    },
			 	
			 	{
			    "QuestionID":"0004", 
			    "Question":" In Python, what is the NOT equals operator?",
			    "Answers":{
				    "CorrectAnswer": " !=", 
				    "Incorrect1": " ==", 
				    "Incorrect2": " ~= ", 
				    "Incorrect3" : " <> " 
				}
			    },

			    {
			    "QuestionID":"0005", 
			    "Question":" What is an end line comment in Python?",
			    "Answers":{
				    "CorrectAnswer": " # end line comment", 
				    "Incorrect1": " // end line comment", 
				    "Incorrect2": " % end line comment ", 
				    "Incorrect3" : " * end line comment " 
				}
			    }
			],

			"MediumBank":[

				{
			    "QuestionID":"1000", 
			    "Question":"Which of the following represents a conditional statement in python?",
			    "Answers":{
				     "CorrectAnswer": " if ( x == 3 )", 
				     "Incorrect1": " x = 2", 
				     "Incorrect2": " x == 2", 
				     "Incorrect3" : " print \"hello world\"" 
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
			    "Question":" How do you define a function in Python?",
			    "Answers":{
				    "CorrectAnswer": " def f_name () ", 
				    "Incorrect1": " function f_name ()", 
				    "Incorrect2": " void f_name () ", 
				    "Incorrect3" : " const f_name = funciton () " 
				}
			    },

			    {
			    "QuestionID":"1003", 
			    "Question":" How do you return a value or variable from a function in python?",
			    "Answers":{
				    "CorrectAnswer": " return x", 
				    "Incorrect1": " output = x", 
				    "Incorrect2": " sto x ", 
				    "Incorrect3" : " print ( x ) " 
				}
			    },

			    {
			    "QuestionID":"1004", 
			    "Question":" What are the first two numbers of the Fibonacci Sequence?",
			    "Answers":{
				    "CorrectAnswer": " 0, 1", 
				    "Incorrect1": " 1, 1", 
				    "Incorrect2": " A, B ", 
				    "Incorrect3" : " 0, 0 " 
				}
			    },

			    {
			    "QuestionID":"1005", 
			    "Question":" Which of the following checks if some number x is even?",
			    "Answers":{
				    "CorrectAnswer": " x % 2  == 0", 
				    "Incorrect1": " x % 2 == 1", 
				    "Incorrect2": " x / 2 == 0", 
				    "Incorrect3" : " x / 2 == 1 " 
				}
			    }
			],

			"HardBank":[

				{
			    "QuestionID":"2000", 
			    "Question":"Which of the following will display the value of x and a descriptive string to the standard output if x is an integer?",
			    "Answers":{
				     "CorrectAnswer": " print \"The value of x is: {}\".format(x) ", 
				     "Incorrect1": " print  \"The value of x is:\" + x ", 
				     "Incorrect2": " y = \"The value of x is: {}\".format(x)", 
				     "Incorrect3" : " y =  print  \"The value of x is:\" + xs" 
				 }
				 },

				{
			    "QuestionID":"2001", 
			    "Question":"Which of the follwing is a multi line comment in Python?",
			    "Answers":{
				     "CorrectAnswer": " \"\"\" multi line comment \"\"\"", 
				     "Incorrect1": " /* multi line comment */ ", 
				     "Incorrect2": " <!-- multi line comment -->", 
				     "Incorrect3" : " # multi line comment " 
				}
			    },

			    {
			    "QuestionID":"2002", 
			    "Question":" Which of the folowing returns 0?",
			    "Answers":{
				     "CorrectAnswer": " 0 if true else 1", 
				     "Incorrect1": " 1 if true else 0", 
				     "Incorrect2": " x = 0 ", 
				     "Incorrect3" : " if 0: 1 " 
				 }
			     },

			    {
			    "QuestionID":"2003", 
			    "Question":" What is required for recursion?",
			    "Answers":{
				    "CorrectAnswer": " named functions", 
				    "Incorrect1": " anonomous functions", 
				    "Incorrect2": " well defined variables names", 
				    "Incorrect3" : " lots of comments " 
				}
			    },

			    {
			    "QuestionID":"2004", 
			    "Question":" Suppose I have a list: \"myList\" and I'd like to itterate over its elliments. What is one way to accomplish this?",
			    "Answers":{
				    "CorrectAnswer": " for i in myList:", 
				    "Incorrect1": " for i in range myList:", 
				    "Incorrect2": " while myList: ", 
				    "Incorrect3" : " myList = x " 
				}
			    },

			    {
			    "QuestionID":"2005", 
			    "Question":" Which Python library stores the value of the natural number pi?",
			    "Answers":{
				    "CorrectAnswer": " math", 
				    "Incorrect1": " bakery", 
				    "Incorrect2": " pi ", 
				    "Incorrect3" : " numbers " 
				}
			    }
			]
		}
	}
		return temp;
	}
});
	

