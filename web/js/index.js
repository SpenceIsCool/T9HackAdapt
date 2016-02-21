$(document).ready(function(){

	//Users current state
	var totalCorrect = 0;
	var totalIncorrect = 0;
	var currentLevel = "M"
	var easyIndex = 0;
	var mediumIndex = 0;
	var hardIndex = 0;
	var endSummary = [];

	//Pull data from JSON 
	var questions = getJSONInput();
	
	//Set the current question
	var currentQuestion = new Question(questions.QuestionBank.MediumBank[0].Question, questions.QuestionBank.MediumBank[0].Answers.CorrectAnswer, 
		questions.QuestionBank.MediumBank[0].Answers.Incorrect1, questions.QuestionBank.MediumBank[0].Answers.Incorrect2, questions.QuestionBank.MediumBank[0].Answers.Incorrect3, questions.QuestionBank.MediumBank[0].Feedback);
	var CorrectAnswer = currentQuestion.answer1;

	function newQuestionText(currQuestion){
		document.getElementById("thisnode").innerText = currQuestion.question;
		var rand2 = Math.floor(Math.random()*100%4);
		switch(rand2){
			case 0: 
				$("#thisnode2").text(currQuestion.answer1);
				$("#thisnode3").text(currQuestion.answer2);
				$("#thisnode4").text(currQuestion.answer3);
				$("#thisnode5").text(currQuestion.answer4);
				break;
			case 1: 
				$("#thisnode2").text(currQuestion.answer4);
				$("#thisnode3").text(currQuestion.answer2);
				$("#thisnode4").text(currQuestion.answer1);
				$("#thisnode5").text(currQuestion.answer3);
				break;
			case 2: 
				$("#thisnode2").text(currQuestion.answer3);
				$("#thisnode3").text(currQuestion.answer1);
				$("#thisnode4").text(currQuestion.answer4);
				$("#thisnode5").text(currQuestion.answer2);
				break;
			case 3: 
				$("#thisnode2").text(currQuestion.answer3);
				$("#thisnode3").text(currQuestion.answer2);
				$("#thisnode4").text(currQuestion.answer4);
				$("#thisnode5").text(currQuestion.answer1);
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

				$("input:radio").attr("checked", false);

				updateQuestion();
			}
			else{
				document.getElementById("me").innerHTML = " ";
				document.getElementById("thisnode").innerHTML = " ";
				document.getElementById("myForm").innerHTML = "<div class=\" endSolnWell\"><div class = \"endSolnQ\">"+currentQuestion.question + "</div><br /><span class = \"endSolnQ\"> You answered: </span>"+ selectedAnswer+"<br /><span class = \"endSolnQ\"> The correct answer is:</span> "+currentQuestion.answer1 + "<br /><br/><div class = \"endSolnQ\"> Please also note that: </div>" + currentQuestion.feedback + "</div><br/><br/>";
				document.getElementById("corrections").innerHTML = "<div class=\"submit\" id = \"continue\"> <input type=\"image\" src=\"./img/continue.png\" name=\"saveForm\" class=\"btSubmit\" id=\"btsub\"  /></div>";
				endSummary.push("<div class=\" endSolnWell\"><div class = \"endSolnQ\">"+currentQuestion.question + "</div><br /><span class = \"endSolnQ\"> You answered: </span>"+ selectedAnswer+"<br /><span class = \"endSolnQ\"> The correct answer is:</span> "+currentQuestion.answer1 + "<br /><br/><div class = \"endSolnQ\"> Please also note that: </div>" + currentQuestion.feedback + "</div><br/><br/>");
			}
		}
		else{}
	});

	$("#corrections").click(function(){
		console.log("clicking???")
		document.getElementById("corrections").innerHTML = " ";
		document.getElementById("myForm").innerHTML = "	<input type=\"radio\" name=\"question\" value=\"1\" id=\"q1a\"><label id=\"thisnode2\"></label><br/><input type=\"radio\" name=\"question\" value=\"2\" id=\"q1b\"><label id=\"thisnode3\"></label><br/><input type=\"radio\" name=\"question\" value=\"3\" id=\"q1c\"><label id=\"thisnode4\"></label><br/><input type=\"radio\" name=\"question\" value=\"4\" id=\"q1d\"><label id=\"thisnode5\"></label><br/>";
		document.getElementById("me").innerHTML = "<input type=\"image\" src=\"./img/submit.png\" name=\"saveForm\" class=\"btSubmit\" id=\"btsub\"  />";
				totalIncorrect += 1;
				document.getElementById("correctIncorrect").innerHTML += "<li class=\"b\" id=\"f2\"><img src=\"./img/Wrong.png\" alt=\"icon\" /></li>";
				if(totalIncorrect >= 3){
					downDifficulty();
				}
				console.log("Total incorrect: " + totalIncorrect+ " Current Diff: " + currentLevel);
				$("input:radio").attr("checked", false);

			updateQuestion();

	});
	
	function updateQuestion(){
		switch(currentLevel){
			case "E": 
				currentQuestion = new Question(questions.QuestionBank.EasyBank[easyIndex].Question, questions.QuestionBank.EasyBank[easyIndex].Answers.CorrectAnswer,
					questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect1,questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect2, questions.QuestionBank.EasyBank[easyIndex].Answers.Incorrect3,questions.QuestionBank.EasyBank[easyIndex].Feedback)
				break;
			case "M": 
				currentQuestion = new Question(questions.QuestionBank.MediumBank[mediumIndex].Question, questions.QuestionBank.MediumBank[mediumIndex].Answers.CorrectAnswer,
					questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect1,questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect2, questions.QuestionBank.MediumBank[mediumIndex].Answers.Incorrect3,questions.QuestionBank.MediumBank[mediumIndex].Feedback)
				break;
			case "H": 
				currentQuestion = new Question(questions.QuestionBank.HardBank[hardIndex].Question, questions.QuestionBank.HardBank[hardIndex].Answers.CorrectAnswer,
					questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect1,questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect2, questions.QuestionBank.HardBank[hardIndex].Answers.Incorrect3, questions.QuestionBank.HardBank[hardIndex].Feedback)
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
		

		switch(currentLevel){
			case "H": 
				if((totalIncorrect + totalCorrect) <= 5){

				}
				else{
					dispSummary()
					document.getElementById("correctIncorrect").innerHTML = " ";
				}
				break;
			case "E": 
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("med").innerText = "Medium";
				document.getElementById("easy").innerText = " ";
				document.getElementById("correctIncorrect").innerHTML = " ";
				currentLevel = "M";
				// document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyMed.jpg\" alt=\"icon\" />";
				break;
			case "M": 
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("med").innerText = " "
				document.getElementById("hard").innerText = "Hard"
				document.getElementById("correctIncorrect").innerHTML = " ";
				currentLevel = "H";
				// document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyHard.jpg\" alt=\"icon\" />";
				break;
			
		}
	}

	function downDifficulty(){
		switch(currentLevel){
			case "E": 
				if((totalIncorrect + totalCorrect)<= 5){

				}
				else{
					dispSummary();
					document.getElementById("correctIncorrect").innerHTML = " ";
				}
				break;
			case "M":
				totalCorrect = 0;
				totalIncorrect = 0; 
				currentLevel = "E";
				document.getElementById("med").innerText = " "
				document.getElementById("easy").innerText = "Easy"
				document.getElementById("correctIncorrect").innerHTML = " ";
				// document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyEasy.jpg\" alt=\"icon\" />";
				break;
			case "H": 
				currentLevel = "M";
				totalCorrect = 0;
				totalIncorrect = 0;
				document.getElementById("hard").innerText = " "
				document.getElementById("med").innerText = "Easy"
				document.getElementById("correctIncorrect").innerHTML = " ";
				// document.getElementById("difficultyImage").innerHTML = "<img src=\"./img/DifficultyMed.jpg\" alt=\"icon\" />";
				break;
		}
	}

	function dispSummary(){
		document.getElementById("endSummary").innerHTML = ""
		for (var i = 0 ; i < endSummary.length; i++)
			document.getElementById("endSummary").innerHTML += endSummary[i]
		if (endSummary.length == 0) document.getElementById("endSummary").innerHTML += 	"<img src=\"./img/Logo2.png\" alt=\"logo, congrats you won!\" />";
		document.getElementById("endSummary").innerHTML += "<div class=\"submit\" id = \"continue\"> <input type=\"image\" src=\"./img/restart.png\" name=\"saveForm\" class=\"btSubmit\" id=\"btsub\"  /></div>";
	}


	//Constructor for Questions
	function Question (question, ans1, ans2, ans3, ans4, feedback) {
		this.question = question;
		this.answer1 = ans1;
		this.answer2 = ans2;
		this.answer3 = ans3;
		this.answer4 = ans4;
		this.feedback = feedback;
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
				}, 
				"Feedback": " A single '=' is used for assignment"
				},

				{
			    "QuestionID":"0001", 
			    "Question":" How do I compare if the variable x stores the value 1?",
			    "Answers":{
				    "CorrectAnswer": " x == 1 ", 
				    "Incorrect1": " x = 1", 
				    "Incorrect2": " int x == 1", 
				    "Incorrect3" : " 1 = x " 
				},
				"Feedback": " The '==' is used for comparison of elements."
			    },

			    {
			    "QuestionID":"0002", 
			    "Question":" Which of the folowing is a string?",
			    "Answers":{
				    "CorrectAnswer": " '1.00' ", 
				    "Incorrect1": " 0 ", 
				    "Incorrect2": " 1.00 ", 
				    "Incorrect3" : " True " 
				},
				"Feedback": " There are many ways to create strings in python. Common ways are the use of '' or \"\"."
			    },

			    {
			    "QuestionID":"0003", 
			    "Question":" In Python, what is the command to display hello world to the standard output?",
			    "Answers":{
				    "CorrectAnswer": " print \"hello world\"", 
				    "Incorrect1": " console.log \"hello world\"", 
				    "Incorrect2": " cout << \"hello world\"", 
				    "Incorrect3" : " system.out.println (\"hello world\")" 
				},
				"Feedback": " print is used to display to the standard output stream."
			    },
			 	
			 	{
			    "QuestionID":"0004", 
			    "Question":" In Python, what is the NOT equals operator?",
			    "Answers":{
				    "CorrectAnswer": " !=", 
				    "Incorrect1": " ==", 
				    "Incorrect2": " ~= ", 
				    "Incorrect3" : " <> " 
				},
				"Feedback": " In python: '!', prononced \"bang\", is used to preform NOT."
			    },

			    {
			    "QuestionID":"0005", 
			    "Question":" What is an end line comment in Python?",
			    "Answers":{
				    "CorrectAnswer": " # end line comment", 
				    "Incorrect1": " // end line comment", 
				    "Incorrect2": " % end line comment ", 
				    "Incorrect3" : " * end line comment " 
				},
				"Feedback": " In python: '#', often called 'sharp', is used to create comments."
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
				},
				"Feedback": " 'if' is used to define conditions in Python."
			    },

			    {
			    "QuestionID":"1001", 
			    "Question":" For x = 0, which of the following displays -1 to the standard output?",
			    "Answers":{
				     "CorrectAnswer": " print x -=1 ", 
				     "Incorrect1": " x = x - 1", 
				     "Incorrect2": " print '0-1'", 
				     "Incorrect3" : " -1 " 
				 },
				"Feedback": " the '-=' operator can be googled upon."
			     },

			    {
			    "QuestionID":"1002", 
			    "Question":" How do you define a function in Python?",
			    "Answers":{
				    "CorrectAnswer": " def f_name () ", 
				    "Incorrect1": " function f_name ()", 
				    "Incorrect2": " void f_name () ", 
				    "Incorrect3" : " const f_name = funciton () " 
				},
				"Feedback": " The key term 'def' is used in function declarations in Python."
			    },

			    {
			    "QuestionID":"1003", 
			    "Question":" How do you return a value or variable from a function in python?",
			    "Answers":{
				    "CorrectAnswer": " return x", 
				    "Incorrect1": " output = x", 
				    "Incorrect2": " x ", 
				    "Incorrect3" : " print ( x ) " 
				},
				"Feedback": " The key term 'return' is used to return a funciton's value in Python."
			    },

			    {
			    "QuestionID":"1004", 
			    "Question":" What are the first two numbers of the Fibonacci Sequence?",
			    "Answers":{
				    "CorrectAnswer": " 0, 1", 
				    "Incorrect1": " 1, 1", 
				    "Incorrect2": " A, B ", 
				    "Incorrect3" : " 0, 0 " 
				},
				"Feedback": " The Fibonacci Sequence has 2 base casses. fib(0) = 0, fib(1) = 1."
			    },

			    {
			    "QuestionID":"1005", 
			    "Question":" Which of the following checks if some number x is even?",
			    "Answers":{
				    "CorrectAnswer": " x % 2  == 0", 
				    "Incorrect1": " x % 2 == 1", 
				    "Incorrect2": " x / 2 == 0", 
				    "Incorrect3" : " x / 2 == 1 " 
				},
				"Feedback": " The modulus opererator '%' is used to find the remainder of division."
			    }
			],

			"HardBank":[

				{
			    "QuestionID":"2000", 
			    "Question":"In python 2.7, which of the following will concatinate a string with an integer?",
			    "Answers":{
				     "CorrectAnswer": " print \"The value of x is: {}\".format(x) ", 
				     "Incorrect1": " print  \"The value of x is:\" + x ", 
				     "Incorrect2": " y = \"The value of x is: {}\".format(x)", 
				     "Incorrect3" : " y =  print  \"The value of x is:\" + xs" 
				 },
				"Feedback": " 'string'.format(_) can be used to insert values into a string see documentation online."
				 },

				{
			    "QuestionID":"2001", 
			    "Question":"Which of the follwing is a multi line comment in Python?",
			    "Answers":{
				     "CorrectAnswer": " \"\"\" multi line comment \"\"\"", 
				     "Incorrect1": " /* multi line comment */ ", 
				     "Incorrect2": " <!-- multi line comment -->", 
				     "Incorrect3" : " # multi line comment " 
				},
				"Feedback": " 3 \" are used to produce multiline and inline comments in Python."
			    },

			    {
			    "QuestionID":"2002", 
			    "Question":" Which of the folowing returns 0?",
			    "Answers":{
				     "CorrectAnswer": " 0 if true else 1", 
				     "Incorrect1": " 1 if true else 0", 
				     "Incorrect2": " x = 0 ", 
				     "Incorrect3" : " if 0: 1 " 
				 },
				"Feedback": " <isTrue> if <condition> else <isFalse> is the format for the terinary operator in Python."
			     },

			    {
			    "QuestionID":"2003", 
			    "Question":" What is required for recursion?",
			    "Answers":{
				    "CorrectAnswer": " named functions", 
				    "Incorrect1": " anonomous functions", 
				    "Incorrect2": " well defined variables names", 
				    "Incorrect3" : " lots of comments " 
				},
				"Feedback": " Named functions - at some level - are required to impliment recursion in Python."
			    },

			    {
			    "QuestionID":"2004", 
			    "Question":" Suppose I have a list: \"myList\" and I'd like to itterate over its elements. What is one way to accomplish this?",
			    "Answers":{
				    "CorrectAnswer": " for i in myList:", 
				    "Incorrect1": " for i in range myList:", 
				    "Incorrect2": " while myList: ", 
				    "Incorrect3" : " myList = x " 
				},
				"Feedback": " Here: i will represent the ith element of myList at each pass through our for loop."
			    },

			    {
			    "QuestionID":"2005", 
			    "Question":" What sort of language is Python?",
			    "Answers":{
				    "CorrectAnswer": " Scripting", 
				    "Incorrect1": " Compiled", 
				    "Incorrect2": " Strictly Functional ", 
				    "Incorrect3" : " Strictly Imperative" 
				},
				"Feedback": " Python is a Scripting language."
			    }
			]
		}
	}
		return temp;
	}
});
	

