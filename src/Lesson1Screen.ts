import Phaser from 'phaser'

export default class Lesson1Screen extends Phaser.Scene {

    background?:Phaser.GameObjects.Image
    skipButton?: Phaser.GameObjects.Image

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
	}

    create()
    {
        this.background = this.add.image(400, 300, 'beach');
        this.add.image(400, 62, 'topBanner');
        this.add.text(175, 40, 'Lesson 1: Data Types', { font: "bold 40px Arial", color: "white"});
        this.add.image(110, 450, 'teacherTurtle');
        this.add.image(500, 425, 'whiteboard');
        //35 characters long left --> right
        //11 up to down  
        this.add.text(250, 200, 'TESTING', { font: "bold 25px Arial", color: "black"});
        this.skipButton = this.add.image(700, 565, 'skip');
        this.add.text(645, 550, 'Skip Lesson', { font: "bold 20px Arial", color: "black"});
        this.skipButton.setInteractive();

        //on click change to game scene 
        this.skipButton.on('pointerup', () => {
            this.scene.start('QuizScene');
        })

    }

    update()
    {

    }

}