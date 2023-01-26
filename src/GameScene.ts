import Phaser from 'phaser'
import level1Questions from './Quizzes/Level1QuizQuestions.json'

export default class GameScene extends Phaser.Scene {

    //Robby's Code
    /*private sampleQuiz = {

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


	}*/

    //const AI = ai.map((course: Course): Course => ({ ...course }));
    quiz1 = level1Questions.questions.map((something: any): any => ({ ...something}));

    private awardedPoints = 1000
	private totalPoints = 0
	private quizQuestionIndex = -1		//Defaults to -1, will be set to 0 once the quiz starts
	private currentQuestion = {			//Will be used to contain the current question
		question: '',
		predator: '',
		option1: '',
		option2: '',
		option3: '',
		option4: '',
		solution: 0
	}
	
	hintButton?: Phaser.GameObjects.Image
	hintBubble?: Phaser.GameObjects.Image
	answerBubble1?: Phaser.GameObjects.Image
	answerBubble3?: Phaser.GameObjects.Image
	answerBubble2?: Phaser.GameObjects.Image
	answerBubble4?: Phaser.GameObjects.Image
	correctBubble?: Phaser.GameObjects.Image
	nextButton?: Phaser.GameObjects.Image

    //don't need a quiz question button
    quizBubble?:Phaser.GameObjects.Image;
	
	quizTitle?: Phaser.GameObjects.Text
	closeButton?: Phaser.GameObjects.Image
	answer1?: Phaser.GameObjects.Text
	answer2?: Phaser.GameObjects.Text
	answer3?: Phaser.GameObjects.Text
	answer4?: Phaser.GameObjects.Text
	questionNumber?: Phaser.GameObjects.Text
	quizHealth?: Phaser.GameObjects.Text
	quizStartTime?: Date
	quizEndTime?: Date
    questionHint?: Phaser.GameObjects.Text

	selectedOption: string = ""
	currentEnemy?: Phaser.GameObjects.Image;

    //Abbey's Code: 
    background?: Phaser.GameObjects.Image;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platform?: Phaser.Physics.Arcade.StaticGroup;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private obstacles?: Phaser.Physics.Arcade.Group;
	currentHidingSpot?: Phaser.GameObjects.Image;
	beginAnimation?: boolean;
	currentKeyframe?: string;
	

    constructor() 
    {
	    super('GameScene')
	}

    preload() 
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('Gamebeach', 'assets/beach/beach.png');
        this.load.spritesheet('gameTurtle', 'assets/beach/turtle.png',{
			frameWidth:150, frameHeight: 150
		});
        this.load.image('platform', 'assets/platform.png');
        this.load.image('obstacleForNow', 'assets/beach/obstacleForNow.png')

        //Robby's code 
        this.load.image('answerBubble', 'assets/quiz/answer_bubble.png')
		this.load.image('exitArrow', 'assets/quiz/exit_arrow')
		this.load.image('hintButton', 'assets/quiz/hint.png')
		this.load.image('hintBubble', 'assets/quiz/hint_bubble.png')
		this.load.image('longBubble', 'assets/quiz/button_wide.png')
		this.load.image('correctAnswer', 'assets/quiz/answer_correct.png')
		this.load.image('next', 'assets/quiz/next.png')
		this.load.image('close', 'assets/quiz/close.png')
        this.load.image('quiz', 'assets/beach/quizBackground.png');

		this.load.image('placeholder', 'assets/quiz/placeholder.png')
		this.load.image('backdrop', 'assets/quiz/backdrop.png')

		this.load.image('bird', 'assets/enemies/bird.jpg')
		this.load.image('crab', 'assets/enemies/crab.jpg')
		this.load.image('mongoose', 'assets/enemies/mongoose.jpg')
		this.load.image('slug', 'assets/enemies/slug.jpg')

		this.load.image('eat', 'assets/hiding/eat.jpg')
		this.load.image('log', 'assets/hiding/log.jpg')
		this.load.image('sand', 'assets/hiding/sand.jpg')
		this.load.image('shell', 'assets/hiding/shell.jpg')
	}

    create()
    {

        //Abbey's Code: 
        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 580, 'platform').setScale(2).refreshBody();
        this.background = this.add.image(0, 0, 'Gamebeach').setOrigin(0,0).setScale(2);
        this.player = this.physics.add.sprite(50, 0, 'gameTurtle');
        this.physics.add.collider(this.player, this.platform);

        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player);
        
        this.obstacles = this.physics.add.group({
            key: 'obstacleForNow',
            repeat: 4,
            setXY: { x: 300, y: 0, stepX: 200}
        });

        this.physics.add.collider(this.obstacles, this.platform);

        this.physics.add.collider(this.player, this.obstacles, this.handleCollideObstacles, undefined,this );

        this.quizBubble = this.add.image(400, 300, 'quiz').setVisible(false).setScrollFactor(0);
        this.quizBubble.setInteractive();

        //Robby's Code: 
        this.quizStartTime = new Date()

		this.quizQuestionIndex = 0;
		this.currentQuestion = this.quiz1[this.quizQuestionIndex]

        
        //this.add.image(400, 62, 'backdrop')

        //Indicate what question the user is currently on

		
        /*this.add.image(125, 50, 'longBubble')
		this.add.image(300, 50, 'longBubble')*/

        this.questionNumber = this.add.text(58, 105, "Question " + String(this.quizQuestionIndex + 1), {
			font: '28px Georgia',
			color: '#000000'
		}).setVisible(false).setScrollFactor(0);  

		this.quizHealth = this.add.text(240, 108, `Health: ${this.totalPoints}`, {
			font: '24px Georgia',
			color: '#000000'
		}).setVisible(false).setScrollFactor(0);

		this.quizTitle = this.add.text(50, 150, this.currentQuestion.question, {
			font: 'bold 25px Georgia',
			color: '#e3d684',
			stroke: '#000',
			strokeThickness: 3
		}).setVisible(false).setScrollFactor(0);
        
        //Add the answer bubbles
		this.answerBubble1 = this.add.image(200, 290, 'answerBubble').setVisible(false).setScrollFactor(0);
		this.answerBubble2 = this.add.image(200, 385, 'answerBubble').setVisible(false).setScrollFactor(0);
		this.answerBubble3 = this.add.image(600, 290, 'answerBubble').setVisible(false).setScrollFactor(0);
		this.answerBubble4 = this.add.image(600, 385, 'answerBubble').setVisible(false).setScrollFactor(0);
		this.answerBubble1.setInteractive()
		this.answerBubble2.setInteractive()
		this.answerBubble3.setInteractive()
		this.answerBubble4.setInteractive()

        //Add the answers to display on screen
		this.answer1 = this.add.text(200, 283, this.currentQuestion.option1, {
			font: '32px Arial',
			color: '#000',
		}).setOrigin(0.5).setVisible(false).setScrollFactor(0);

		this.answer3 = this.add.text(605, 283, this.currentQuestion.option2, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5).setVisible(false).setScrollFactor(0);

		this.answer2 = this.add.text(200, 377, this.currentQuestion.option3, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5).setVisible(false).setScrollFactor(0);

		this.answer4 = this.add.text(605, 377, this.currentQuestion.option4, {
			font: '32px Arial',
			color: '#000'
		}).setOrigin(0.5).setVisible(false).setScrollFactor(0);

		this.hintButton = this.add.image(710, 135, 'hintButton').setVisible(false).setScrollFactor(0);
		this.hintButton.setInteractive()

        //Initialize hintBubble and hide it
		this.hintBubble = this.add.image(400, 350, 'hintBubble').setVisible(false).setScrollFactor(0)
		this.hintBubble.setInteractive()

		this.closeButton = this.add.image(550, 440, 'close').setVisible(false).setScrollFactor(0)
		this.closeButton.setInteractive()

		this.correctBubble = this.add.image(400, 350, 'correctAnswer').setVisible(false).setScrollFactor(0)
		this.correctBubble.setInteractive()

		this.nextButton = this.add.image(550, 440, 'next').setVisible(false).setScrollFactor(0)
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
				this.selectedOption = this.currentQuestion.option1
				this.postQuestionScene()
			} else {
				this.handleIncorrectAnswer()
			}
		})

		this.answerBubble2.on('pointerup', () => {
			if (this.currentQuestion.solution === 2) {
				this.selectedOption = this.currentQuestion.option1
				this.postQuestionScene()
			} else {
				this.handleIncorrectAnswer()
			}
		})

		this.answerBubble3.on('pointerup', () => {
			if (this.currentQuestion.solution === 3) {
				this.selectedOption = this.currentQuestion.option1
				this.postQuestionScene()
			} else {
				this.handleIncorrectAnswer()
			}
		})

		this.answerBubble4.on('pointerup', () => {
			if (this.currentQuestion.solution === 4) {
				this.selectedOption = this.currentQuestion.option1
				this.postQuestionScene()
			} else {
				this.handleIncorrectAnswer()
			}
		})
		
		this.nextButton.on('pointerup', () => {
			this.correctBubble?.setVisible(false)
			this.nextButton?.setVisible(false)

		})

		this.closeButton.on('pointerup', () => {

			this.closeButton?.setVisible(false)
			this.hintBubble?.setVisible(false)
			this.questionHint?.setVisible(false)

		})
        
    }

	private postQuestionScene() {

		//Hide the question dialogs!
		this.quizBubble?.setVisible(false)
        this.questionNumber?.setVisible(false);
        this.quizHealth?.setVisible(false);
        this.quizTitle?.setVisible(false);
        this.answerBubble1?.setVisible(false);
        this.answerBubble2?.setVisible(false);
        this.answerBubble3?.setVisible(false);
        this.answerBubble4?.setVisible(false);
        this.hintButton?.setVisible(false);
        this.questionHint?.setVisible(false);
        this.answer1?.setVisible(false);
        this.answer2?.setVisible(false);
        this.answer3?.setVisible(false);
        this.answer4?.setVisible(false);

		let hidingPlaceName = ""
		
		//Set what the turtle should turn into
		if(this.selectedOption === "Hide in Log") {
			hidingPlaceName = "log"
		} else if (this.selectedOption === "Hide in Sand") {
			hidingPlaceName = "sand"
		} else if (this.selectedOption === "Hide in Shell") {
			hidingPlaceName = "shell"
		} else if (this.selectedOption === "Eat it") {
			hidingPlaceName = "eat"
		} else {

		}

		

		

		if(this.player) {

			this.player.setVisible(false)
			this.currentHidingSpot = this.add.image(this.player.x, this.player.y, hidingPlaceName)
			
			//Set what keyframe to start at
			if(this.currentQuestion.predator === "bird") {
				this.currentEnemy = this.add.image(this.player.x - 450, 100, this.currentQuestion.predator)
				this.currentKeyframe = "birdPassover1"
			} else if (this.currentQuestion.predator === "mongoose") {
				this.currentEnemy = this.add.image(this.player.x - 450, 500, this.currentQuestion.predator)
				this.currentKeyframe = "mongoosePassover1"
			} else if (this.currentQuestion.predator === "crab") {
				this.currentEnemy = this.add.image(this.player.x - 450, 500, this.currentQuestion.predator)
				this.currentKeyframe = "crabPassover1"
			} else if (this.currentQuestion.predator === "slug") {
				this.currentEnemy = this.add.image(this.player.x + 450, this.player.y, this.currentQuestion.predator)
				this.currentKeyframe = "slugPassover1"
			}
			
			
			this.beginAnimation = true

		}
		
		

	}

	private advanceQuestions() {

		this.quizQuestionIndex++;

		if(this.quizQuestionIndex < this.quiz1.length) {
			this.currentQuestion = this.quiz1[this.quizQuestionIndex]
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


	}

    private handleCollideObstacles(player: Phaser.GameObjects.GameObject, obstacle: Phaser.GameObjects.GameObject){
        //console.log(this.cameras.main.worldView.x);
        const obstacle2 = obstacle as Phaser.Physics.Arcade.Image;
        obstacle2.disableBody(true, true);
        //this.physics.pause();
        //this.scene.start('QuizScene');
        if(!this.quizBubble?.visible){
            this.quizBubble?.setVisible(true)
            //this.closeButton?.setVisible(true)
            this.questionNumber?.setVisible(true);
            this.quizHealth?.setVisible(true);
            this.quizTitle?.setVisible(true);
            this.answerBubble1?.setVisible(true);
            this.answerBubble2?.setVisible(true);
            this.answerBubble3?.setVisible(true);
            this.answerBubble4?.setVisible(true);
            this.hintButton?.setVisible(true);
            //this.questionHint?.setVisible(true);
            this.answer1?.setVisible(true);
            this.answer2?.setVisible(true);
            this.answer3?.setVisible(true);
            this.answer4?.setVisible(true);

        }
    }

    handleCorrectAnswer() {
		this.correctBubble?.setVisible(true)
		this.nextButton?.setVisible(true)
		this.totalPoints += this.awardedPoints
		this.awardedPoints = 1000
		this.quizHealth?.setText(`Health: ${this.totalPoints}`)

        this.quizBubble?.setVisible(false)
        //this.closeButton?.setVisible(true)
        this.questionNumber?.setVisible(false);
        this.quizHealth?.setVisible(false);
        this.quizTitle?.setVisible(false);
        this.answerBubble1?.setVisible(false);
        this.answerBubble2?.setVisible(false);
        this.answerBubble3?.setVisible(false);
        this.answerBubble4?.setVisible(false);
        this.hintButton?.setVisible(false);
        this.questionHint?.setVisible(false);
        this.answer1?.setVisible(false);
        this.answer2?.setVisible(false);
        this.answer3?.setVisible(false);
        this.answer4?.setVisible(false);
		//this.player!.x += 56;

		

	}

	handleIncorrectAnswer() {
		this.hintBubble?.setVisible(true)
		this.closeButton?.setVisible(true)
		this.questionHint?.setVisible(true)
		if(this.awardedPoints > 100) {
			this.awardedPoints -= 100
		}
	}

	private resumeGameplay() {

		this.currentEnemy?.setVisible(false)
		this.currentHidingSpot?.setVisible(false)
		this.player?.setVisible(true)
		this.advanceQuestions()

	}

    update()
    {
        if(!this.cursors){
			return;
		}

		if(this.cursors?.left?.isDown){
			this.player?.setVelocityX(-160);
			this.player?.anims.play('left', true)
		}else if(this.cursors.right?.isDown){
			this.player?.setVelocityX(160);
			this.player?.anims.play('right', true)
		}else{
			this.player?.setVelocityX(0);
			this.player?.anims.play('turn');
		}

		if(this.cursors.up?.isDown && this.player?.body.touching.down){
			this.player.setVelocityY(-330);
		}
        
		//Handle the animations for the enemies
		if(this.currentEnemy && this.beginAnimation && this.player) {

			if(this.currentKeyframe === "birdPassover1") {

				if(this.currentEnemy.x < (this.player.x + 450)) {
					this.currentEnemy.setX(this.currentEnemy.x += 4)
				} else {
					console.log("done")
					this.currentKeyframe = "birdPassover2"
				}

			}

			if(this.currentKeyframe === "birdPassover2") {

				if(this.currentEnemy.x > this.player.x - 450) {
					this.currentEnemy.setX(this.currentEnemy.x -= 4)
				} else {
					this.beginAnimation = false
					this.resumeGameplay()
					console.log("done")
				}
			}

			if(this.currentKeyframe === "mongoosePassover1") {

				if(this.currentEnemy.x < (this.player.x + 450)) {
					this.currentEnemy.setX(this.currentEnemy.x += 4)
				} else {
					console.log("done")
					this.currentKeyframe = "mongoosePassover2"
				}

			}

			if(this.currentKeyframe === "mongoosePassover2") {

				if(this.currentEnemy.x > this.player.x - 450) {
					this.currentEnemy.setX(this.currentEnemy.x -= 4)
				} else {
					this.beginAnimation = false
					this.resumeGameplay()
					console.log("done")
				}
			}

			if(this.currentKeyframe === "crabPassover1") {

				if(this.currentEnemy.x < (this.player.x + 450)) {
					this.currentEnemy.setX(this.currentEnemy.x += 2)
				} else {
					console.log("done")
					this.beginAnimation = false
					this.resumeGameplay()
				}

			}

			if(this.currentKeyframe === "slugPassover1") {

				if(this.currentEnemy.x > (this.player.x)) {
					this.currentEnemy.setX(this.currentEnemy.x -= 1)
				} else {
					console.log("done")
					this.beginAnimation = false
					this.resumeGameplay()
				}

			}

		}

    }

}