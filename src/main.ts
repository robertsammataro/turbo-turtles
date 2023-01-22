import Phaser from 'phaser'

import TitleScreen from './TitleScreen'
import QuizScene from './QuizScene'
import levelScreen from './levelScreen'

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
	scene: [TitleScreen, levelScreen, QuizScene],
}

export default new Phaser.Game(config)
