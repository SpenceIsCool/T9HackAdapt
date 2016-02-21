$(document).ready(function(){

	//Users current state
	var totalCorrect = 0;
	var totalIncorrect = 0;
	var currentLevel = "M"
	//Pull data from JSON 
	var questions = getJSONInput();
	
	//Set the current question
	var currentQuestion = new Question(questions.QuestionBank[0].Question, questions.QuestionBank[0].Answers.CorrectAnswer, 
		questions.QuestionBank[0].Answers.Incorrect1, questions.QuestionBank[0].Answers.Incorrect2, questions.QuestionBank[0].Answers.Incorrect3);
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

	$("#me").click(function(){
		var myForm = document.getElementById("myForm");
		var selectedRadio = myForm["question"]
		//console.log(selectedRadio.value);
		var selectedAnswer;
		//console.log(document.getElementById("thisnode2").textContent)
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
			console.log("Total incorrect: " + totalIncorrect);
		}
	});

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
		var temp = {"QuestionBank":[

	    {
	    "QuestionID":"000", 
	    "Difficulty":"Medium", 
	    "Question":"In Python, what is the command to display hello world to the standard output?",
	    "Answers":{
		     "CorrectAnswer": "print \"hello world\"", 
		     "Incorrect1": "console.log \"hello world\"", 
		     "Incorrect2": "cout << \"hello world\"", 
		     "Incorrect3" : "disp (\"hello world\")" 
		 }
	     },

	    {
	    "QuestionID":"001", 
	    "Difficulty":"Easy", 
	    "Question":"How do I store the value 1 to the variable x in python?",
	    "Answers":{
		     "CorrectAnswer": "x = 1", 
		     "Incorrect1": "x == 1", 
		     "Incorrect2": "int x == 1", 
		     "Incorrect3" : " 1 = x " 
		 }
		 },

		 {
	    "QuestionID":"002", 
	    "Difficulty":"Hard", 
	    "Question":"which of the following will display the value of x and a descriptive string to the standard output if x is a string?",
	    "Answers":{
		     "CorrectAnswer": "print \"The value of x is: {}\".format(x) ", 
		     "Incorrect1": "print  \"The value of x is:\" + x ", 
		     "Incorrect2": "y = \"The value of x is: {}\".format(x)", 
		     "Incorrect3" : " y =  print  \"The value of x is:\" + xs" 
		 }
		 },
		]}

	return temp;
	}
});
	

