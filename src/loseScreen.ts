import Phaser from 'phaser'
//import Phaser, { Game } from 'phaser'

export default class loseScreen extends Phaser.Scene {

    background?: Phaser.GameObjects.Image
    datatypeButton?: Phaser.GameObjects.Image
    indicesButton?: Phaser.GameObjects.Image
    conditionalsButton?: Phaser.GameObjects.Image
    restartButton?: Phaser.GameObjects.Image
    menuButton?: Phaser.GameObjects.Image

    // music
    musicButton?: Phaser.GameObjects.Image
    musicOffButton?: Phaser.GameObjects.Image
    backgroundMusic?: Phaser.Sound.BaseSound
    isMute = false;

    constructor() 
    {
	    super({ key: 'loseScreen' })
	}


    preload() 
    {
        // load all images
        this.load.image('beach', 'assets/beach/beach.png');
        this.load.image('turt', 'assets/turtle1_1_13.png');
        //this.load.image('turtle2', 'assets/TitleScreen/turtle2.png');
        this.load.image('playnow', 'assets/TitleScreen/playnow.png');
        this.load.image('star', 'assets/st3.png');
        this.load.image('ocean', 'assets/ocean.png');
        this.load.image('playnow2', 'assets/playnow2.png');

        // load SoundButton 
        this.load.image('musicOn', 'assets/TitleScreen/musicOn.png');
        this.load.image('musicOff', 'assets/TitleScreen/circleslash.png');
        this.load.audio('music', 'assets/audio/BackgroudMusic.mp3');
	}

    create()
    {
        this.background = this.add.image(400, 300, 'ocean');
        this.add.image(140,350,'turt')
        //this.add.image(275,470,'turt')

        this.add.image(610,350,'turt')
        //this.add.image(700,370,'turt')

        
        this.add.text(220, 70, 'Oh no!', { font: "bold 95px Arial", color: '#964B00' });
        //this.add.image(400, 350, 'playnow');

        this.add.text(220, 170, 'You ran out of health!', { font: "bold 32px Arial", color: 'black'});
        this.add.text(80, 200, 'You need to use your Conditional Statements ', { font: "bold 32px Arial", color: 'black'});
        this.add.text(150, 230, 'correctly to avoid the danger on land!', { font: "bold 32px Arial", color: 'black'});

        this.add.text(220, 270, 'Total Stars Awarded:', { font: "bold 32px Arial", color: 'white'});


        this.add.image(275,350,'star')
		this.add.image(375,350,'star').setTint(0)
		this.add.image(475,350,'star').setTint(0)

        this.restartButton =  this.add.image(290, 450, 'playnow2');
        this.add.text(245, 435, 'Try again!', { font: "bold 24px Arial", color: 'black'});
        this.restartButton.setInteractive();

        this.restartButton.on('pointerup', () => {
            this.scene.start("GameScene");
		})


        this.menuButton = this.add.image(465, 450, 'playnow2')
        this.add.text(435, 435, 'Menu', { font: "bold 24px Arial", color: 'black'});
        this.menuButton.setInteractive();
        this.menuButton.on('pointerup', () => {
            this.sound.stopAll();
            this.scene.start("TitleScreen");
		})


        // add music to game
        this.backgroundMusic = this.sound.add('music');

        // add music button on screen
        this.musicButton = this.add.image(750, 30, 'musicOn');
        this.musicButton.setInteractive();

        //mute and unmute sound on music button click
        this.musicButton?.on('pointerup', () => {

            if (this.isMute == false)
            {
                this.isMute = true;
                this.sound.stopAll();
                this.musicOffButton = this.add.image(750, 30, 'musicOff');
                this.musicOffButton.scale = 0.35;
            }
            else
            {
                this.isMute = false;
                this.backgroundMusic?.play();
                this.musicOffButton?.destroy();
            }
        })

        //this.add.image(500, 550, 'playnow2')
        //this.add.text(500, 435, this.awardedPoints, { font: "bold 24px Arial", color: 'black'});


        

        // STAR SYSTEM
        /*
        if (this.timerCount < 10){
			this.add.image(300,400,'star')
			this.add.image(400,400,'star')
			this.add.image(500,400,'star')
		}
		else if ((this.timerCount > 10) && (this.timerCount < 20)){
			this.add.image(300,400,'star')
			this.add.image(400,400,'star')
			this.add.image(500,400,'star').setTint(0)
		}
		else{
			this.add.image(300,400,'star')
			this.add.image(400,400,'star').setTint(0)
			this.add.image(500,400,'star').setTint(0)
		}
        */
        /*
        this.datatypeButton = this.add.image(400, 250, 'playnow');
        this.add.text(300, 225, 'Data Types', { font: "bold 40px Arial", color: 'black'});
        this.indicesButton = this.add.image(400, 350, 'playnow');
        this.add.text(335, 325, 'Indices', { font: "bold 40px Arial", color: 'black'});
        this.conditionalsButton = this.add.image(400, 450, 'playnow');
        this.add.text(290, 425, 'Conditionals', { font: "bold 40px Arial", color: 'black'});
        this.datatypeButton.setInteractive();
        this.indicesButton.setInteractive();
        this.conditionalsButton.setInteractive();
        */
        //this.add.text(120, 150, 'Click the level that you want to play!', { font: "bold 32px Arial", color: 'black'});
        // change to QuizScene on click
        /*
        this.datatypeButton.on('pointerup', () => {
            this.scene.start("Lesson1Screen");
            //this.scene.start('QuizScene');
		})
        this.indicesButton.on('pointerup', () => {
            this.scene.start("Lesson2Screen");
            //this.scene.start('QuizScene');
		})
        this.conditionalsButton.on('pointerup', () => {
            this.scene.start("Lesson3Screen");
            //this.scene.start('QuizScene');
		})
        */
    }

    update()
    {

    }

}