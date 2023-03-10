import Phaser from 'phaser'
import level1Questions from './Quizzes/Level1QuizQuestions.json'

export default class GameScene extends Phaser.Scene {

	public static totalTime: number = 0

    quiz1 = level1Questions.questions.map((something: any): any => ({ ...something}));

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
	finishFlag?: Phaser.GameObjects.Image;

	selectedOption: string = ""
	currentEnemy?: Phaser.GameObjects.Image;
	currentHidingOption: string = ""

	dialogBox?: Phaser.GameObjects.Image;
	dialogBoxText?: Phaser.GameObjects.Text;
	dialogBoxClose?: Phaser.GameObjects.Image;

	pauseKeyboardControl?: boolean = false;
	healthBar?: Phaser.GameObjects.Image;
	healthBarText?: Phaser.GameObjects.Text;
	public static health: number = 100;

    //Abbey's Code: 
    background?: Phaser.GameObjects.Image;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platform?: Phaser.Physics.Arcade.StaticGroup;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private obstacles?: Phaser.Physics.Arcade.Group;
	currentHidingSpot?: Phaser.GameObjects.Image;
	beginAnimation?: boolean;
	currentKeyframe?: string;
	tutorial?: Phaser.GameObjects.Image;
	backgroundMusic?: Phaser.Sound.BaseSound;
	musicButton?: Phaser.GameObjects.Image;
	isMute?: boolean;
	musicOffButton?: Phaser.GameObjects.Image;
	
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
        this.load.image('obstacleForNow', 'assets/beach/event_icon.png')
		this.load.image('finishFlag', 'assets/beach/finish_flag.png')

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

		this.load.image('bird', 'assets/enemies/bird.png')
		this.load.image('crab', 'assets/enemies/crab.png')
		this.load.image('mongoose', 'assets/enemies/mongoose.png')
		this.load.image('slug', 'assets/enemies/slug.png')

		this.load.image('eat', 'assets/hiding/eat.png')
		this.load.image('log', 'assets/hiding/log.png')
		this.load.image('sand', 'assets/hiding/sand.png')
		this.load.image('shell', 'assets/hiding/turtle_shell.png')
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

		this.healthBar = this.add.image(90, 30, 'longBubble')
			.setScrollFactor(0)

		this.healthBarText = this.add.text(90, 25, `Health: ${GameScene.health}`, {
			font: 'bold 20px Georgia',
			color: '#000',
		})
			.setScrollFactor(0)
			.setOrigin(0.5)

		this.dialogBox = this.add.image(400, 90, 'backdrop')
			.setVisible(false)
			.setOrigin(0.5)
			.setScrollFactor(0)
			
		this.dialogBoxText = this.add.text(40, 40, "text not instantiated", {
			font: 'bold 25px Georgia',
			color: '#e3d684',
			stroke: '#000',
			strokeThickness: 3
		})
			.setScrollFactor(0)
			.setVisible(false)

		this.dialogBoxClose = this.add.image(700, 100, 'next')
			.setVisible(false)
			.setScrollFactor(0)
			.setInteractive()

		this.quizTitle = this.add.text(50, 150, this.currentQuestion.question, {
			font: 'bold 25px Georgia',
			color: '#e3d684',
			stroke: '#000',
			strokeThickness: 3
		})
			.setVisible(false)
			.setScrollFactor(0);
        
		this.finishFlag = this.add.image(1500, 400, 'finishFlag')
		//


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
		})
			.setOrigin(0.5)
			.setVisible(false)
			.setScrollFactor(0);

		this.answer3 = this.add.text(605, 283, this.currentQuestion.option2, {
			font: '32px Arial',
			color: '#000'
		})
			.setOrigin(0.5)
			.setVisible(false)
			.setScrollFactor(0);

		this.answer2 = this.add.text(200, 377, this.currentQuestion.option3, {
			font: '32px Arial',
			color: '#000'
		})
			.setOrigin(0.5)
			.setVisible(false)
			.setScrollFactor(0);

		this.answer4 = this.add.text(605, 377, this.currentQuestion.option4, {
			font: '32px Arial',
			color: '#000'
		})
			.setOrigin(0.5)
			.setVisible(false)
			.setScrollFactor(0);

		this.hintButton = this.add.image(725, 120, 'hintButton').setVisible(false).setScrollFactor(0);
		this.hintButton.setInteractive()

        //Initialize hintBubble and hide it
		this.hintBubble = this.add.image(400, 350,  'hintBubble').setVisible(false).setScrollFactor(0)
		this.hintBubble.setInteractive()

		this.tutorial = this.add.image(400,320, 'tutorial').setVisible(false).setScrollFactor(0);

		this.closeButton = this.add.image(640, 490, 'close').setVisible(false).setScrollFactor(0)
		this.closeButton.setInteractive()

		this.correctBubble = this.add.image(400, 350, 'correctAnswer').setVisible(false).setScrollFactor(0)
		this.correctBubble.setInteractive()

		this.nextButton = this.add.image(550, 440, 'next').setVisible(false).setScrollFactor(0)
		this.nextButton.setInteractive()


		this.dialogBoxClose.on('pointerup', () => {
			this.closeDialogBox()
		})

        //Controls what happens when the hint button is clicked 
		this.hintButton.on('pointerup', () => {
			if(!this.hintBubble?.visible) {
				this.hintBubble?.setVisible(true)
				this.closeButton?.setVisible(true)
				//this.questionHint?.setVisible(true)
				this.tutorial?.setVisible(true);
			}
		})


		//Controls what happens when an answer bubble is selected:
		this.answerBubble1.on('pointerup', () => {
			this.selectedOption = this.currentQuestion.option1
			this.postQuestionScene()
		})

		this.answerBubble2.on('pointerup', () => {
			this.selectedOption = this.currentQuestion.option2
			this.postQuestionScene()
		})

		this.answerBubble3.on('pointerup', () => {
			this.selectedOption = this.currentQuestion.option3
			this.postQuestionScene()
		})

		this.answerBubble4.on('pointerup', () => {
			this.selectedOption = this.currentQuestion.option4
			this.postQuestionScene()
		})
		
		this.nextButton.on('pointerup', () => {
			this.correctBubble?.setVisible(false)
			this.nextButton?.setVisible(false)

		})

		this.closeButton.on('pointerup', () => {

			this.closeButton?.setVisible(false)
			this.hintBubble?.setVisible(false)
			this.questionHint?.setVisible(false)
			this.tutorial?.setVisible(false);


		})

        


		// add music to game
        this.backgroundMusic = this.sound.add('music');

        // add music button on screen
        this.musicButton = this.add.image(750, 30, 'musicOn').setScrollFactor(0);
        this.musicButton.setInteractive();

        //mute and unmute sound on music button click
        this.musicButton?.on('pointerup', () => {

            if (this.isMute == false)
            {
                this.isMute = true;
                this.sound.stopAll();
                this.musicOffButton = this.add.image(750, 30, 'musicOff').setScrollFactor(0);
                this.musicOffButton.scale = 0.35;
            }
            else
            {
                this.isMute = false;
                this.backgroundMusic?.play();
                this.musicOffButton?.destroy();
            }
        })
    }

	private postQuestionScene() {

		//Hide the question dialogs!
		this.quizBubble?.setVisible(false)
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
		
		//Set what the turtle should turn into
		if(this.selectedOption === "Hide in Log") {
			this.currentHidingOption = "log"
		} else if (this.selectedOption === "Burrow") {
			this.currentHidingOption = "sand"
		} else if (this.selectedOption === "Hide in Shell") {
			this.currentHidingOption = "shell"
		} else if (this.selectedOption === "Eat it") {
			this.currentHidingOption = "eat"
		} else {
			console.log("ERROR")
		}

		if(this.player) {

			console.log(this.currentHidingOption)

			this.player.setVisible(false)
			this.pauseKeyboardControl = true
			this.currentHidingSpot = this.add.image(this.player.x, this.player.y, this.currentHidingOption)
			
			//Set what keyframe to start at
			if(this.currentQuestion.predator === "bird") {
				
				this.currentEnemy = this.add.image(this.player.x - 450, 250, this.currentQuestion.predator)
				this.currentKeyframe = "birdPassover1"
			
			} else if (this.currentQuestion.predator === "mongoose") {
				
				this.currentEnemy = this.add.image(this.player.x - 450, 500, this.currentQuestion.predator)
				this.currentKeyframe = "mongoosePassover1"
			
			} else if (this.currentQuestion.predator === "crab") {
				
				this.currentEnemy = this.add.image(this.player.x - 450, 500, this.currentQuestion.predator)
				this.currentKeyframe = "crabPassover1"
			
			} else if (this.currentQuestion.predator === "slug") {
				
				if(this.selectedOption === "Eat it") {
					this.currentEnemy = this.add.image(this.player.x + 450, this.player.y, this.currentQuestion.predator)
					this.currentKeyframe = "slugPassover1"
				}

				else {
					this.currentEnemy = this.add.image(this.player.x + 450, this.player.y, this.currentQuestion.predator)
					this.currentKeyframe = "slugPassover2"
				}
				
			}
			
			
			this.beginAnimation = true

		}
		
		

	}

	private advanceQuestions() {

		let newIndex: number = Math.floor((Math.random() * 4))
		this.currentQuestion = this.quiz1[newIndex]
		this.quizTitle?.setText(this.currentQuestion.question)
		this.answer1?.setText(this.currentQuestion.option1)
		this.answer2?.setText(this.currentQuestion.option2)
		this.answer3?.setText(this.currentQuestion.option3)
		this.answer4?.setText(this.currentQuestion.option4)

	}

    private handleCollideObstacles(player: Phaser.GameObjects.GameObject, obstacle: Phaser.GameObjects.GameObject){

		if(player){
			
		}

        const obstacle2 = obstacle as Phaser.Physics.Arcade.Image;
        obstacle2.disableBody(true, true);
        if(!this.quizBubble?.visible){

			this.pauseKeyboardControl = true

            this.quizBubble?.setVisible(true)
            this.quizTitle?.setVisible(true);
            this.answerBubble1?.setVisible(true);
            this.answerBubble2?.setVisible(true);
            this.answerBubble3?.setVisible(true);
            this.answerBubble4?.setVisible(true);
            this.hintButton?.setVisible(true);
            this.answer1?.setVisible(true);
            this.answer2?.setVisible(true);
            this.answer3?.setVisible(true);
            this.answer4?.setVisible(true);

        }
    }

    handleCorrectAnswer() {
		this.correctBubble?.setVisible(true)
		this.nextButton?.setVisible(true)

        this.quizBubble?.setVisible(false)
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

	}

	handleIncorrectAnswer() {
		this.hintBubble?.setVisible(true)
		this.closeButton?.setVisible(true)
		this.questionHint?.setVisible(true)
	}

	showDialogBox(text: string) {

		this.dialogBox?.setVisible(true)
		this.dialogBoxText?.setText(text).setVisible(true)
		this.dialogBoxClose?.setVisible(true)
		this.pauseKeyboardControl = true

	}

	closeDialogBox() {

		this.dialogBox?.setVisible(false)
		this.dialogBoxText?.setVisible(false)
		this.dialogBoxClose?.setVisible(false)
		this.pauseKeyboardControl = false

	}

	private resumeGameplay() {

		this.currentEnemy?.setVisible(false)
		this.currentHidingSpot?.setVisible(false)
		this.player?.setVisible(true)
		this.advanceQuestions()

	}

	setHealth(newHealth: number) {
		GameScene.health = newHealth
		this.healthBarText?.setText(`Health: ${GameScene.health}`)

		if(GameScene.health <= 0) {
			this.scene.start("loseScreen")
			this.setHealth(100);
		}
	}

    update()
    {

		if(this.player!.x >= 1500) {

			this.quizEndTime = new Date()
			GameScene.totalTime = ((this.quizEndTime!.getTime() - this.quizStartTime!.getTime()) / 1000.)
			this.setHealth(100);
			this.scene.start("winScreen")
		}
		
        if(!this.cursors){
			return;
		}
		
		if(this.cursors?.left?.isDown && !this.pauseKeyboardControl){
			this.player?.setVelocityX(-160);
		}else if(this.cursors.right?.isDown && !this.pauseKeyboardControl){
			this.player?.setVelocityX(160);
		}else{
			this.player?.setVelocityX(0);
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
					this.currentEnemy.setFlipX(true)
					this.currentKeyframe = "birdPassover2"
				}

			}

			if(this.currentKeyframe === "birdPassover2") {

				if(this.currentEnemy.x > this.player.x - 450) {
					this.currentEnemy.setX(this.currentEnemy.x -= 4)
				} else {
					this.beginAnimation = false
					this.resumeGameplay()
					this.currentEnemy.setFlipX(false)

					if(this.selectedOption === "Hide in Log") {
						this.showDialogBox("Phew, that was close!")
					} else {
						this.showDialogBox("Ouch, that hurt!")
						this.setHealth(GameScene.health - 30);
					}

					
				}
			}

			if(this.currentKeyframe === "mongoosePassover1") {

				if(this.currentEnemy.x < (this.player.x + 450)) {
					this.currentEnemy.setX(this.currentEnemy.x += 4)
				} else {
					console.log("done")
					this.currentEnemy.setFlipX(true)
					this.currentKeyframe = "mongoosePassover2"
				}

			}

			if(this.currentKeyframe === "mongoosePassover2") {

				if(this.currentEnemy.x > this.player.x - 450) {
					this.currentEnemy.setX(this.currentEnemy.x -= 4)
				} else {
					this.beginAnimation = false
					this.currentEnemy.setFlipX(false)
					this.resumeGameplay()
					if(this.selectedOption === "Hide in Shell") {
						this.showDialogBox("Phew, that was close!")
					} else {
						this.showDialogBox("Ouch, that hurt!")
						this.setHealth(GameScene.health - 30);
					}
				}
			}

			if(this.currentKeyframe === "crabPassover1") {

				if(this.currentEnemy.x < (this.player.x + 450)) {
					this.currentEnemy.setX(this.currentEnemy.x += 2)
				} else {
					console.log("done")
					this.beginAnimation = false
					this.resumeGameplay()
					if(this.selectedOption === "Burrow") {
						this.showDialogBox("Phew, that was close!")
					} else {
						this.showDialogBox("Ouch, that hurt!")
						this.setHealth(GameScene.health - 30);
					}
				}

			}

			if(this.currentKeyframe === "slugPassover1") {

				if(this.currentEnemy.x > (this.player.x)) {
					this.currentEnemy.setX(this.currentEnemy.x -= 1)
				} else {
					console.log("done")
					this.beginAnimation = false
					this.resumeGameplay()
					if(this.selectedOption === "Eat it") {
						this.showDialogBox("Mmmm, Yummy!")
					} else {
						this.showDialogBox("Ooooh I should've eaten that!")
						this.setHealth(GameScene.health - 30);
					}
				}

			}

			if(this.currentKeyframe === "slugPassover2") {

				if(this.currentEnemy.x > this.player.x - 450) {
					this.currentEnemy.setX(this.currentEnemy.x -= 1)
				} else {
					console.log("done")
					this.beginAnimation = false
					this.resumeGameplay()
					if(this.selectedOption === "Eat it") {
						this.showDialogBox("Mmmm, Yummy!")
					} else {
						this.showDialogBox("Ooooh I should've eaten that!")
						this.setHealth(GameScene.health - 30);
					}
				}

			}

		}

    }

}