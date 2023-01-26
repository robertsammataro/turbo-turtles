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
        this.load.image('nextBtn', 'assets/lesson1/next.png');
        this.load.image('backBtn', 'assets/lesson1/back.png');
        this.load.image('slide1', 'assets/lesson1/Slide1.png');
        this.load.image('slide2', 'assets/lesson1/Slide2.png');
        this.load.image('slide3', 'assets/lesson1/Slide3.png');
        this.load.image('slide4', 'assets/lesson1/Slide4.png');
        this.load.image('slide5', 'assets/lesson1/Slide5.png');
        this.load.image('slide6', 'assets/lesson1/Slide6.png');
        this.load.audio('slide1Audio', 'assets/lesson1/Lesson1Slide1Audio.m4a');
        this.load.audio('slide2Audio', 'assets/lesson1/Lesson1Slide2Audio.m4a');
        this.load.audio('slide3Audio', 'assets/lesson1/Lesson1Slide3Audio.m4a');
        this.load.audio('slide4Audio', 'assets/lesson1/Lesson1Slide4Audio.m4a');
        this.load.audio('slide5Audio', 'assets/lesson1/Lesson1Slide5Audio.m4a');
        this.load.audio('slide6Audio', 'assets/lesson1/Lesson1Slide6Audio.m4a');
	}

    create()
    {

        this.background = this.add.image(400, 300, 'beach');
        this.add.image(400, 62, 'topBanner');
        this.add.text(175, 40, 'Lesson 1: Data Types', { font: "bold 40px Arial", color: "white"});
        this.add.image(110, 450, 'teacherTurtle');
        this.add.image(500, 425, 'whiteboard');

        this.completeButton = this.add.image(700, 565, 'skip');
        this.add.text(645, 550, 'Finish Lesson', { font: "bold 20px Arial", color: "black"});
        this.completeButton.setInteractive();

        this.slideIndex = 0;

        let slide1Image = this.add.image(500, 330, 'slide1').setVisible(true);
        let slide2Image = this.add.image(500, 330, 'slide2').setVisible(false);
        let slide3Image = this.add.image(500, 330, 'slide3').setVisible(false);
        let slide4Image = this.add.image(500, 330, 'slide4').setVisible(false);
        let slide5Image = this.add.image(500, 330, 'slide5').setVisible(false);
        let slide6Image = this.add.image(500, 330, 'slide6').setVisible(false);

        /*let slide1Audio = this.sound.add('slide1Audio', {loop: false});
        let slide2Audio = this.sound.add('slide2Audio', {loop: false});
        let slide3Audio = this.sound.add('slide3Audio', {loop: false});
        let slide4Audio = this.sound.add('slide4Audio', {loop: false});
        let slide5Audio = this.sound.add('slide5Audio', {loop: false});
        let slide6Audio = this.sound.add('slide6Audio', {loop: false});*/

        let slideImageGroup = this.add.group();
        slideImageGroup.add(slide1Image);
        slideImageGroup.add(slide2Image);
        slideImageGroup.add(slide3Image);
        slideImageGroup.add(slide4Image);
        slideImageGroup.add(slide5Image);
        slideImageGroup.add(slide6Image);

        

        this.nextBtn = this.add.image(700, 470, 'nextBtn');
        this.nextBtn.setInteractive();

        this.backBtn = this.add.image(300, 470, 'backBtn').setVisible(false);
        this.backBtn.setInteractive();


        //on click change to game scene 
        this.completeButton.on('pointerup', () => {
            //this.scene.start('QuizScene');
            this.scene.start('GameScene');
        })


        this.nextBtn.on('pointerup', () => {
            console.log('tapped');
            this.slideIndex++;
            console.log(this.slideIndex);
            if(this.slideIndex == 1){
                slide1Image.setVisible(false);
                slide2Image.setVisible(true);
                this.backBtn?.setVisible(true);
    
            }else if(this.slideIndex == 2){
                slide2Image.setVisible(false);
                slide3Image.setVisible(true);
    
            }else if(this.slideIndex == 3){
                slide3Image.setVisible(false);
                slide4Image.setVisible(true);
    
            }else if(this.slideIndex == 4){
                slide4Image.setVisible(false);
                slide5Image.setVisible(true);
    
            }else if(this.slideIndex == 5){
                slide5Image.setVisible(false);
                slide6Image.setVisible(true);
                this.nextBtn?.setVisible(false);
                this.backBtn?.setVisible(true);
    
            }
        })

        this.backBtn.on('pointerup', () => {
            this.slideIndex--;
            if(this.slideIndex == 1){
                slide3Image.setVisible(false);
                slide2Image.setVisible(true);
    
            }else if(this.slideIndex == 2){
                slide4Image.setVisible(false);
                slide3Image.setVisible(true);
    
            }else if(this.slideIndex == 3){
                slide5Image.setVisible(false);
                slide4Image.setVisible(true);
    
            }else if(this.slideIndex == 4){
                slide6Image.setVisible(false);
                slide5Image.setVisible(true);
                this.nextBtn?.setVisible(true);
    
            }else if(this.slideIndex == 0){
                slide2Image.setVisible(false);
                slide1Image.setVisible(true);
                this.backBtn?.setVisible(false);
                this.nextBtn?.setVisible(true);

            }
        })

    }

    update()
    {

    }

}