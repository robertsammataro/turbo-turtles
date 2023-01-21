import Phaser from 'phaser'

import TitleScreen from './TitleScreen'
import QuizScene from './QuizScene'
import Lesson1Screen from './Lesson1Screen'
import Lesson2Screen from './Lesson2Screen'
import Lesson3Screen from './Lesson3Screen'

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
	scene: [TitleScreen, Lesson1Screen, QuizScene, Lesson2Screen, Lesson3Screen],
}

export default new Phaser.Game(config)
