import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    background?: Phaser.GameObjects.Image;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platform?: Phaser.Physics.Arcade.StaticGroup;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private obstacles?: Phaser.Physics.Arcade.Group;

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
        this.load.image('obstacleForNow', 'assets/beach/obstacleForNow.png')
	}

    create()
    {

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

    }

    private handleCollideObstacles(player: Phaser.GameObjects.GameObject, obstacle: Phaser.GameObjects.GameObject){
        this.physics.pause();
        //this.scene.start('QuizScene');
    }

    update()
    {
        if(!this.cursors){
			return;
		}

		if(this.cursors?.left?.isDown){
			this.player?.setVelocityX(-160);
			this.player?.anims.play('left', true)
		}else if(this.cursors.right?.isDown){
			this.player?.setVelocityX(160);
			this.player?.anims.play('right', true)
		}else{
			this.player?.setVelocityX(0);
			this.player?.anims.play('turn');
		}

		if(this.cursors.up?.isDown && this.player?.body.touching.down){
			this.player.setVelocityY(-330);
		}
        

    }

}