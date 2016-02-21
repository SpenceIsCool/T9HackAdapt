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


	function newQuestionText(currQuestion){
		document.getElementById("thisnode").innerText = currQuestion.question;
		document.getElementById("thisnode2").innerText = currQuestion.answer1;
		document.getElementById("thisnode3").innerText = currQuestion.answer2;
		document.getElementById("thisnode4").innerText = currQuestion.answer3;
		document.getElementById("thisnode5").innerText = currQuestion.answer4;
	}
	newQuestionText(currentQuestion);

	$("#me").click(function(){
		var myForm = document.getElementById("myForm");
		var selectedRadio = myForm["question"]
		console.log(selectedRadio.value);
		var selectedAnswer;
		switch(selectedRadio.value){
			case 1: break;
			case 2: break;
			case 3: break;
			case 4: break;

		}
		/*
		if(document.getElementById("n2").checked){
			$("#n2").text()
			console.log(document.getElementById("n2").text())
		}
		if(document.getElementById("n3").checked){
			console.log("YAY3");
		}
		if(document.getElementById("n4").checked){
			console.log("YAY4");
		}
		if(document.getElementById("n5").checked){
			console.log("YAY5");
		}*/
	});

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
	

