import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene {

    background?: Phaser.GameObjects.Image
    playnowButton?: Phaser.GameObjects.Image
    musicButton?: Phaser.GameObjects.Image
    musicOffButton?: Phaser.GameObjects.Image

    isMute = false;

    constructor() 
    {
	    super('TitleScreen')
	}

    preload() 
    {
        // load all images
        this.load.image('beach', 'assets/TitleScreen/beach.png');
        this.load.image('turtle', 'assets/TitleScreen/turtle.png');
        this.load.image('playnow', 'assets/TitleScreen/playnow.png');
        this.load.image('musicOn', 'assets/TitleScreen/musicOn.png');
        this.load.image('musicOff', 'assets/TitleScreen/musicOff.png');
        this.load.image('backdrop', 'assets/quiz/backdrop.png');

        //load background music
        this.load.audio('music', 'assets/audio/BackgroudMusic.mp3');
	}

    create()
    {
        // add and create all the images and texts
        this.background = this.add.image(400, 450, 'beach');
        this.add.image(400, 90, 'backdrop');
        this.add.text(100, 50, 'Turbo Turtles', { font: "bold 95px Arial", color: '#25851b' });
        this.add.image(125, 500, 'turtle');
        this.playnowButton = this.add.image(400, 530, 'playnow');
        this.add.text(315, 500, 'Play Now', { font: "bold 40px Arial", color: 'black'});
        this.playnowButton.setInteractive();

        // change to QuizScene on click
        this.playnowButton.on('pointerup', () => {
            this.scene.start('Lesson1Screen');

		})

        // play music at start of game
        this.sound.play('music');



        if (this.isMute == false)
        {
            this.musicButton = this.add.image(750, 30, 'musicOff');
            this.musicButton.scale = 0.09;
            this.musicButton.setInteractive();
        }
        else 
        {
            this.musicButton = this.add.image(750, 30, 'musicOn');
            this.musicButton.setInteractive();
        }



    }

    update()
    {
        // if (this.isMute == false)
        // {
        //     this.musicButton = this.add.image(750, 30, 'musicOff');
        //     this.musicButton.scale = 0.09;
        //     this.musicButton.setInteractive();

        //     this.musicButton.on('pointerup', () => {
        //         this.sound.stopAll();
        //         this.musicButton?.destroy();
        //         this.isMute = true;
        //         this.musicButton = this.add.image(750, 30, 'musicOn');
        //         this.musicButton.setInteractive();
        //     })
        // }
        // else
        // {
        //     this.musicButton = this.add.image(750, 30, 'musicOn');
        //     this.musicButton.setInteractive();

        //     this.musicButton.on('pointerup', () => {
        //         this.sound.play('music');
        //         this.musicButton?.destroy();
        //         this.isMute = false;
        //         this.musicButton = this.add.image(750, 30, 'musicOff');
        //         this.musicButton.scale = 0.09;
        //         this.musicButton.setInteractive();
        //     })
        // }



        // if (this.isMute == false)
        // {
        //     this.musicOffButton = this.add.image(750, 30, 'musicOff');
        //     this.musicOffButton.scale = 0.09;
        //     this.musicOffButton.setInteractive();

        //     this.musicOffButton.on('pointerup', () => {
        //         this.sound.stopAll();
        //         this.musicOffButton?.destroy();
        //         this.isMute = true;
        //     })
        // }
        // else
        // {
        //     this.musicButton = this.add.image(750, 30, 'musicOn');
        //     this.musicButton.setInteractive();

        //     this.musicButton.on('pointerup', () => {
        //         this.sound.play('music');
        //         this.musicButton?.destroy();
        //         this.isMute = false;
        //     })
        // }

        

        this.musicButton?.on('pointerup', () => {

            if (this.isMute == false)
            {
                this.sound.stopAll();
                this.musicButton?.destroy();
                this.isMute = true;
                this.musicButton = this.add.image(750, 30, 'musicOn');
                this.musicButton.setInteractive();
            }
            else
            {
                this.sound.play('music');
                this.musicButton?.destroy();
                this.isMute = false;
                this.musicButton = this.add.image(750, 30, 'musicOff');
                this.musicButton.scale = 0.09;
                this.musicButton.setInteractive();
            }
        })
    }
}
