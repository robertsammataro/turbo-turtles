import Phaser from 'phaser'
//import Phaser, { Game } from 'phaser'

export default class levelScreen extends Phaser.Scene {

    background?: Phaser.GameObjects.Image
    datatypeButton?: Phaser.GameObjects.Image
    indicesButton?: Phaser.GameObjects.Image
    conditionalsButton?: Phaser.GameObjects.Image

    constructor() 
    {
	    super({ key: 'levelScreen' })
	}

    preload() 
    {
        // load all images
        this.load.image('beach', 'assets/beach/beach.png');
        this.load.image('turtle', 'assets/TitleScreen/turtle.png');
        this.load.image('turtle2', 'assets/TitleScreen/turtle2.png');
        this.load.image('playnow', 'assets/TitleScreen/playnow.png');

	}

    create()
    {
        this.background = this.add.image(400, 300, 'beach');
        this.add.text(100, 50, 'Turbo Turtles', { font: "bold 95px Arial", color: '#964B00' });
        //this.add.image(400, 250, 'playnow');
        //this.add.image(400, 350, 'playnow');
        this.datatypeButton = this.add.image(400, 250, 'playnow');
        this.add.text(300, 225, 'Data Types', { font: "bold 40px Arial", color: 'black'});
        this.indicesButton = this.add.image(400, 350, 'playnow');
        this.add.text(335, 325, 'Indices', { font: "bold 40px Arial", color: 'black'});
        this.conditionalsButton = this.add.image(400, 450, 'playnow');
        this.add.text(290, 425, 'Conditionals', { font: "bold 40px Arial", color: 'black'});
        this.datatypeButton.setInteractive();
        this.indicesButton.setInteractive();
        this.conditionalsButton.setInteractive();

        this.add.text(120, 150, 'Click the level that you want to play!', { font: "bold 32px Arial", color: 'black'});
        // change to QuizScene on click
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
    }

    update()
    {

    }

}