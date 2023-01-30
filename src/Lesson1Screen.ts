import Phaser from 'phaser'

export default class Lesson1Screen extends Phaser.Scene {


    slideImages: Phaser.GameObjects.Image[] = [];
    slideAudios?: Phaser.Sound.BaseSound[];
    

    background?:Phaser.GameObjects.Image
    completeButton?: Phaser.GameObjects.Image
    slideIndex = -1;
    nextBtn?: Phaser.GameObjects.Image;
    backBtn?: Phaser.GameObjects.Image;

    currSlide?:Phaser.GameObjects.Image;

    // music
    musicButton?: Phaser.GameObjects.Image
    musicOffButton?: Phaser.GameObjects.Image
    backgroundMusic?: Phaser.Sound.BaseSound
    isMute = false;

    constructor() 
    {
	    super('Lesson1Screen')
	}

    preload() 
    {
        this.load.image('beach', 'assets/lessons/beach.png');
        this.load.image('topBanner', 'assets/lessons/backdrop.png');
        this.load.image('teacherTurtle', 'assets/lessons/teacherTurtle.png');
        this.load.image('whiteboard', 'assets/lessons/whiteboard.png');
        this.load.image('skip', 'assets/lessons/button_wide.png');
        this.load.image('tutorial','assets/lesson1/tutorial.png');

        // load SoundButton 
        this.load.image('musicOn', 'assets/TitleScreen/musicOn.png');
        this.load.image('musicOff', 'assets/TitleScreen/circleslash.png');
        this.load.audio('music', 'assets/audio/BackgroudMusic.mp3');
	}

    create()
    {

        this.background = this.add.image(400, 300, 'beach');
        this.add.image(400, 62, 'topBanner');
        this.add.text(275, 50, 'Tutorial', {font: "bold 80px Arial", color: "white"});
        this.add.image(110, 450, 'teacherTurtle');
        this.add.image(500, 425, 'whiteboard');
        this.add.image(500,350, 'tutorial');

        this.completeButton = this.add.image(700, 565, 'skip');
        this.add.text(635, 550, 'Finish Tutorial', { font: "bold 20px Arial", color: "black"});
        this.completeButton.setInteractive();


        //on click change to game scene 
        this.completeButton.on('pointerup', () => {
            //this.scene.start('QuizScene');
            this.scene.start('GameScene');
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
    }

    update()
    {

    }

}