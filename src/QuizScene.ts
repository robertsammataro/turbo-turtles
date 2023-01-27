export default class QuizScene extends Phaser.Scene {

	//This is simply for testing purposes, but has the same structure that will be used in the final product.
	private sampleQuiz = {

		title: "Sample Quiz",
		description: "Short one-sentence description",
		lesson_slides: ["sample_file_path_1", "sample_file_path_2"],
		questions:[{
			question: "This is the first question",
			hint: "This is the provided hint",
			option1: "Answer",
			option2: "Not the answer",
			option3: "Not the answer",
			option4: "Not the answer",
			solution: 1
		}, {
			question: "This is the second question",
			hint: "This is the provided hint",
			option1: "Answer",
			option2: "Not the answer",
			option3: "Not the answer",
			option4: "Not the answer",
			solution: 1
		}, {
			question: "This is the third question",
			hint: "This is the provided hint",
			option1: "Answer",
			option2: "Not the answer",
			option3: "Not the answer",
			option4: "Not the answer",
			solution: 1
		}]


	}

	//Define the text fields that will need to be rendered for the quiz
	private awardedPoints = 1000;
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

	//this is all just testing
	private player?: Phaser.Physics.Arcade.Sprite;
	private platform?: Phaser.Physics.Arcade.StaticGroup;
	questionHint?: Phaser.GameObjects.Text

	constructor() {
		super({ key: 'QuizScene' })
	}

	preload() {

		this.load.image('sky', 'assets/sky.png');

		this.load.spritesheet('turtle', 'assets/beach/GreenSeaTurtle.png',{
			frameWidth:70, frameHeight: 70
		});
		this.load.image('Gamebeach', 'assets/beach/beach.png');
		this.load.image('platform', 'assets/platform.png');


		this.load.image('answerBubble', 'assets/quiz/answer_bubble.png')
		this.load.image('exitArrow', 'assets/quiz/exit_arrow')
		this.load.image('hintButton', 'assets/quiz/hint.png')
		this.load.image('hintBubble', 'assets/quiz/hint_bubble.png')
		this.load.image('longBubble', 'assets/quiz/button_wide.png')
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
		this.add.image(400, 62, 'backdrop')

		this.platform = this.physics.add.staticGroup();
		this.platform.create(400, 580, 'platform').setScale(2).refreshBody();
		this.add.image(400, 500, 'Gamebeach');
		this.player = this.physics.add.sprite(0, 450, 'turtle');
		this.physics.add.collider(this.player, this.platform);
		this.player.setCollideWorldBounds(true);


		//Indicate what question the user is currently on
		this.questionNumber = this.add.text(40, 15, "Question " + String(this.quizQuestionIndex + 1), {
			font: '20px Arial',
			color: '#000'
		}) 

		this.add.image(400, 90, 'backdrop')

		this.add.image(125, 50, 'longBubble')
		this.add.image(300, 50, 'longBubble')

		//Indicate what question the user is currently on
		this.questionNumber = this.add.text(58, 30, "Question " + String(this.quizQuestionIndex + 1), {
			font: '28px Georgia',
			color: '#000000'
		}) 

		this.quizScore = this.add.text(235, 33, `Score: ${this.totalPoints}`, {
			font: '24px Georgia',
			color: '#000000'
		})

		this.quizTitle = this.add.text(50, 75, this.currentQuestion.question, {
			font: 'bold 32px Georgia',
			color: '#e3d684',
			stroke: '#000',
			strokeThickness: 3
		}) 

		//Add the answer bubbles
		this.answerBubble1 = this.add.image(200, 240, 'answerBubble')
		this.answerBubble2 = this.add.image(200, 335, 'answerBubble')
		this.answerBubble3 = this.add.image(600, 240, 'answerBubble')
		this.answerBubble4 = this.add.image(600, 335, 'answerBubble')
		this.answerBubble1.setInteractive()
		this.answerBubble2.setInteractive()
		this.answerBubble3.setInteractive()
		this.answerBubble4.setInteractive()

		//Add the answers to display on screen
		this.answer1 = this.add.text(200, 233, this.currentQuestion.option1, {
			font: '32px Arial',
			color: '#000',
		}).setOrigin(0.5)

		this.answer2 = this.add.text(605, 233, this.currentQuestion.option2, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5)

		this.answer3 = this.add.text(200, 327, this.currentQuestion.option3, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5)

		this.answer4 = this.add.text(605, 327, this.currentQuestion.option4, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5)

		this.hintButton = this.add.image(710, 85, 'hintButton')
		this.hintButton.setInteractive()

		//Initialize hintBubble and hide it
		this.hintBubble = this.add.image(400, 300, 'hintBubble').setVisible(false)
		this.hintBubble.setInteractive()

		this.questionHint = this.add.text(400, 250, this.currentQuestion.hint, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5)
		this.questionHint.setVisible(false)

		this.closeButton = this.add.image(550, 390, 'close').setVisible(false)
		this.closeButton.setInteractive()

		this.correctBubble = this.add.image(400, 300, 'correctAnswer').setVisible(false)
		this.correctBubble.setInteractive()

		this.nextButton = this.add.image(550, 390, 'next').setVisible(false)
		this.nextButton.setInteractive()

		//Controls what happens when the hint button is clicked 
		this.hintButton.on('pointerup', () => {

			if(!this.hintBubble?.visible) {
				this.hintBubble?.setVisible(true)
				this.closeButton?.setVisible(true)
				this.questionHint?.setVisible(true)
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
			this.questionHint?.setVisible(false)

		})

	}

	handleCorrectAnswer() {

		this.correctBubble?.setVisible(true)
		this.nextButton?.setVisible(true)
		this.totalPoints += this.awardedPoints
		this.awardedPoints = 1000
		this.quizScore?.setText(`Score: ${this.totalPoints}`)

		this.player!.x += 56;

	}

	handleIncorrectAnswer() {

		this.hintBubble?.setVisible(true)
		this.closeButton?.setVisible(true)
		this.questionHint?.setVisible(true)

		if(this.awardedPoints > 100) {
			this.awardedPoints -= 100
		}

	}

	update() {

	}
}