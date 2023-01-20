import Phaser, { Game } from 'phaser'

export default class QuizScene extends Phaser.Scene {

	//This is simply for testing purposes, but has the same structure that will be used in the final product.
	private sampleQuiz = {

		title: "Sample Quiz",
		description: "Short one-sentence description",
		lesson_slides: ["sample_file_path_1", "sample_file_path_2"],
		questions:[{
			question: "This is the first question",
			hint: "This is the provided hint",
			option1: "Q1 O1",
			option2: "Q1 O2",
			option3: "Q1 O3",
			option4: "Q1 O4",
			solution: 1
		}, {
			question: "This is the second question",
			hint: "This is the provided hint",
			option1: "Q2 O1",
			option2: "Q2 O2",
			option3: "Q2 O3",
			option4: "Q2 O4",
			solution: 1
		}, {
			question: "This is the third question",
			hint: "This is the provided hint",
			option1: "Q3 O1",
			option2: "Q3 O2",
			option3: "Q3 O3",
			option4: "Q3 O4",
			solution: 1
		}]


	}

	//Define the text fields that will need to be rendered for the quiz
	private awardedPoints = 1000
	private totalPoints = 0
	private quizQuestionIndex = -1		//Defaults to -1, will be set to 0 once the quiz starts
	private currentQuestion = {			//Will be used to contain the current question
		question: '',
		hint: '',
		option1: '',
		option2: '',
		option3: '',
		option4: '',
		solution: 0
	}
	
	hintButton?: Phaser.GameObjects.Image
	hintBubble?: Phaser.GameObjects.Image
	background?: Phaser.GameObjects.Image
	answerBubble1?: Phaser.GameObjects.Image
	answerBubble3?: Phaser.GameObjects.Image
	answerBubble2?: Phaser.GameObjects.Image
	answerBubble4?: Phaser.GameObjects.Image
	correctBubble?: Phaser.GameObjects.Image
	nextButton?: Phaser.GameObjects.Image
	
	quizTitle?: Phaser.GameObjects.Text
	closeButton?: Phaser.GameObjects.Image
	answer1?: Phaser.GameObjects.Text
	answer2?: Phaser.GameObjects.Text
	answer3?: Phaser.GameObjects.Text
	answer4?: Phaser.GameObjects.Text
	questionNumber?: Phaser.GameObjects.Text
	quizScore?: Phaser.GameObjects.Text
	quizStartTime?: Date
	quizEndTime?: Date

	constructor() {
		super('hello-world')
	}

	preload() {

		this.load.image('sky', 'assets/sky.png');

		this.load.image('answerBubble', 'assets/quiz/answer_bubble.png')
		this.load.image('exitArrow', 'assets/quiz/exit_arrow')
		this.load.image('hintButton', 'assets/quiz/hint.png')
		this.load.image('hintBubble', 'assets/quiz/hint_bubble.png')
		this.load.image('correctAnswer', 'assets/quiz/answer_correct.png')
		this.load.image('next', 'assets/quiz/next.png')
		this.load.image('close', 'assets/quiz/close.png')

		this.load.image('placeholder', 'assets/quiz/placeholder.png')
		this.load.image('backdrop', 'assets/quiz/backdrop.png')

	}

	create() {


		this.quizStartTime = new Date()

		this.quizQuestionIndex = 0;
		this.currentQuestion = this.sampleQuiz.questions[this.quizQuestionIndex]

		this.background = this.add.image(400, 300, 'sky');

		this.add.image(400, 500, 'placeholder')
		this.add.image(400, 62, 'backdrop')

		//Indicate what question the user is currently on
		this.questionNumber = this.add.text(40, 15, "Question " + String(this.quizQuestionIndex + 1), {
			font: '20px Arial',
			color: '#000'
		}) 

		//Add the answer bubbles
		this.answerBubble1 = this.add.image(200, 200, 'answerBubble')
		this.answerBubble2 = this.add.image(200, 325, 'answerBubble')
		this.answerBubble3 = this.add.image(600, 200, 'answerBubble')
		this.answerBubble4 = this.add.image(600, 325, 'answerBubble')
		this.answerBubble1.setInteractive()
		this.answerBubble2.setInteractive()
		this.answerBubble3.setInteractive()
		this.answerBubble4.setInteractive()

		//Add the answers to display on screen
		this.answer1 = this.add.text(110, 185, this.currentQuestion.option1, {
			font: '32px Arial',
			color: '#000'
		}) 

		this.answer2 = this.add.text(510, 185, this.currentQuestion.option2, {
			font: '32px Arial',
			color: '#000'
		}) 

		this.answer3 = this.add.text(110, 310, this.currentQuestion.option3, {
			font: '32px Arial',
			color: '#000'
		}) 

		this.answer4 = this.add.text(510, 310, this.currentQuestion.option4, {
			font: '32px Arial',
			color: '#000'
		}) 

		//Initialize hintBubble and hide it
		this.hintBubble = this.add.image(400, 300, 'hintBubble').setVisible(false)

		this.hintButton = this.add.image(750, 50, 'hintButton')
		this.hintButton.setInteractive()
		this.closeButton = this.add.image(500, 375, 'close').setVisible(false)
		this.closeButton.setInteractive()

		this.correctBubble = this.add.image(400, 300, 'correctAnswer').setVisible(false)
		this.nextButton = this.add.image(500, 375, 'next').setVisible(false)
		this.nextButton.setInteractive()

		//Controls what happens when the hint button is clicked 
		this.hintButton.on('pointerup', () => {

			if(!this.hintBubble?.visible) {
				this.hintBubble?.setVisible(true)
				this.closeButton?.setVisible(true)
			}

		})


		//Controls what happens when an answer bubble is selected:
		this.answerBubble1.on('pointerup', () => {

			if (this.currentQuestion.solution === 1) {
				this.handleCorrectAnswer()
			} else {
				this.handleIncorrectAnswer()
			}

		})

		this.answerBubble2.on('pointerup', () => {

			if (this.currentQuestion.solution === 2) {
				this.handleCorrectAnswer()
			} else {
				this.handleIncorrectAnswer()
			}

		})

		this.answerBubble3.on('pointerup', () => {

			if (this.currentQuestion.solution === 3) {
				this.handleCorrectAnswer()
			} else {
				this.handleIncorrectAnswer()
			}

		})

		this.answerBubble4.on('pointerup', () => {

			if (this.currentQuestion.solution === 4) {
				this.handleCorrectAnswer()
			} else {
				this.handleIncorrectAnswer()
			}

		})
		
		this.nextButton.on('pointerup', () => {

			this.correctBubble?.setVisible(false)
			this.nextButton?.setVisible(false)

			this.quizQuestionIndex++;

			if(this.quizQuestionIndex < this.sampleQuiz.questions.length) {

				this.currentQuestion = this.sampleQuiz.questions[this.quizQuestionIndex]
				this.quizTitle?.setText(this.currentQuestion.question)
				this.answer1?.setText(this.currentQuestion.option1)
				this.answer2?.setText(this.currentQuestion.option2)
				this.answer3?.setText(this.currentQuestion.option3)
				this.answer4?.setText(this.currentQuestion.option4)
				this.questionNumber?.setText("Question " + String(this.quizQuestionIndex + 1))

			} else {

				this.quizEndTime = new Date()

				//Print out how long the puzzle took to solve
				console.log((this.quizEndTime!.getTime() - this.quizStartTime!.getTime()) / 1000. + " seconds")

				///////////////////////////////////////////////////////////////
				///															///
				///			This is where the quiz engine exits				///
				///															///
				///////////////////////////////////////////////////////////////

			}

		})

		this.closeButton.on('pointerup', () => {

			this.closeButton?.setVisible(false)
			this.hintBubble?.setVisible(false)

		})

		this.quizTitle = this.add.text(40, 40, this.currentQuestion.question, {
			font: '32px Arial',
			color: '#000'
		}) 

		

		this.quizScore = this.add.text(400, 15, `Score: ${this.totalPoints}`, {
			font: '20px Arial',
			color: '#000'
		})

	}

	handleCorrectAnswer() {

		this.correctBubble?.setVisible(true)
		this.nextButton?.setVisible(true)
		this.totalPoints += this.awardedPoints
		this.awardedPoints = 1000
		this.quizScore?.setText(`Score: ${this.totalPoints}`)

	}

	handleIncorrectAnswer() {

		this.hintBubble?.setVisible(true)
		this.closeButton?.setVisible(true)
		
		if(this.awardedPoints > 100) {
			this.awardedPoints -= 100
		}

	}

	update() {

	}
}