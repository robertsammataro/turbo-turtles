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
        //this.add.text(250, 200, '12345678910121314151617181920303132333435', { font: "bold 25px Arial", color: "black"});
        this.add.text(250, 200, 'Data Types are ways to label the things\nthat we use to tell the computer instructions', { font: " 25px Arial", color: "black"});
        //this.add.text(250, 225, 'There are many different types of data\ntypes we\'re going to learn about only a few today', { font: " 25px Arial", color: "black"});
        this.add.text(250, 255, 'Numbers, Strings, Booleans, Arrays', { font: "bold 25px Arial", color: "black"});
        this.add.text(250, 280, 'Numbers are just what you think they are!\n\tEx: 10', { font: " 25px Arial", color: "black"});
        this.add.text(250, 330, 'Strings are a collection of words/characters\n\tEx: a Name', { font: " 25px Arial", color: "black"});
        this.add.text(250, 380, 'Booleans can only be true or false\n\tEx: True or False: You have brown hair', { font: " 25px Arial", color: "black"});
        this.add.text(250, 430, 'Arrays are lists of the same data type.\n\tEx: A collection of pencils', { font: " 25px Arial", color: "black"});
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