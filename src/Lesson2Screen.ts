import Phaser from 'phaser'

export default class Lesson2Screen extends Phaser.Scene {

    background?:Phaser.GameObjects.Image
    completeButton?: Phaser.GameObjects.Image

    // music
    musicButton?: Phaser.GameObjects.Image
    musicOffButton?: Phaser.GameObjects.Image
    backgroundMusic?: Phaser.Sound.BaseSound
    isMute = false;

    constructor() 
    {
	    super('Lesson2Screen')
	}

    preload() 
    {
        this.load.image('beach', 'assets/lessons/beach.png');
        this.load.image('topBanner', 'assets/lessons/backdrop.png');
        this.load.image('teacherTurtle', 'assets/lessons/teacherTurtle.png');
        this.load.image('whiteboard', 'assets/lessons/whiteboard.png');
        this.load.image('skip', 'assets/lessons/button_wide.png');

        // load SoundButton 
        this.load.image('musicOn', 'assets/TitleScreen/musicOn.png');
        this.load.image('musicOff', 'assets/TitleScreen/circleslash.png');
        this.load.audio('music', 'assets/audio/BackgroudMusic.mp3');
	}

    create()
    {
        this.background = this.add.image(400, 300, 'beach');
        this.add.image(400, 62, 'topBanner');
        this.add.text(175, 40, 'Lesson 2: Indices', { font: "bold 40px Arial", color: "white"});
        this.add.image(110, 450, 'teacherTurtle');
        this.add.image(500, 425, 'whiteboard');
            //35 characters long left --> right
        //11 up to down  
        //this.add.text(250, 200, '12345678912345678912345678902134567', { font: "bold 25px Arial", color: "black"});
        this.add.text(250, 200, '**Insert picture here**', { font: "25px Arial", color: "black"});
        this.add.text(250, 265, 'Start at 0 to count the dots in the\npicture How many did you get?\nYou should have gotten 3!\nComputers start counting at 0 instead of 1', { font: "25px Arial", color: "black"});

        this.add.text(250, 380, 'Examples', { font: "bold 25px Arial", color: "black"});
        this.add.text(250, 405, 'dots[0] is red\ndots[1] is yellow\ndots[2] is green\ndots[3] is blue', { font: "25px Arial", color: "black"});
        this.completeButton = this.add.image(700, 565, 'skip');
        this.add.text(645, 550, 'Complete', { font: "bold 20px Arial", color: "black"});
        this.completeButton.setInteractive();

        //on click change to game scene 
        this.completeButton.on('pointerup', () => {
            this.scene.start('QuizScene');
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