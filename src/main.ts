import Phaser from 'phaser'

import TitleScreen from './TitleScreen'
import QuizScene from './QuizScene'
import Lesson1Screen from './Lesson1Screen'
import GameScene from './GameScene'
import loseScreen from './loseScreen'
import winScreen from './winScreen'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
	scene: [TitleScreen, Lesson1Screen, QuizScene, loseScreen, winScreen, GameScene],
}

export default new Phaser.Game(config)
