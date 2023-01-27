import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene {

    background?: Phaser.GameObjects.Image
    playnowButton?: Phaser.GameObjects.Image

    constructor() 
    {
	    super('TitleScreen')
	}

    preload() 
    {
        // load all images
        this.load.image('beach', 'assets/TitleScreen/beach.png');
        this.load.image('turtle', 'assets/TitleScreen/turtle.png');
        this.load.image('turtle2', 'assets/TitleScreen/turtle2.png');
        this.load.image('playnow', 'assets/TitleScreen/playnow.png');
	}

    create()
    {
        this.background = this.add.image(400, 300, 'beach');
        this.add.text(100, 50, 'Turbo Turtles', { font: "bold 95px Arial", color: '#964B00' });
        this.add.image(350, 360, 'turtle');
        this.add.image(120, 380, 'turtle2');
        this.playnowButton = this.add.image(400, 530, 'playnow');
        this.add.text(315, 500, 'Play Now', { font: "bold 40px Arial", color: 'black'});
        this.playnowButton.setInteractive();

        // change to QuizScene on click
        this.playnowButton.on('pointerup', () => {

            this.scene.start('Lesson1Screen');

		})
    }

    update()
    {

    }

}
