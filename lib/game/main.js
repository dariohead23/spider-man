ig.module( 
	'game.main' 
).requires(
	'impact.game',
	'impact.font',
	'game.entities.spiderman',
	'game.entities.rock',
	'game.entities.window',
	'game.levels.Spidy'
).defines( function() {
	SpidyGame = ig.Game.extend( {
		spawnCurrentFrame: 0,
		spawnNextFrame: 150,
		tracks: [ 20, 60, 100 ],
		font: new ig.Font( 'media/04b03.font.png' ),
		init: function() {
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			this.loadLevel( LevelSpidy );
		},
		update: function() {
			this.spawnCurrentFrame++;
			if ( this.spawnCurrentFrame == this.spawnNextFrame ) {
				if ( Math.random() < .5 ) {
					ig.game.spawnEntity( EntityRock, this.tracks[ Math.floor( ( Math.random() * 3 ) + 1 ) - 1 ], -40, {} );
				} else {
					ig.game.spawnEntity( EntityWindow, this.tracks[ Math.floor( ( Math.random() * 3 ) + 1 ) - 1 ], -40, {} );
				}
				this.spawnCurrentFrame = 0;
				this.spawnNextFrame = Math.floor( ( Math.random() * 100 ) + 40 );
			}
			this.parent();
		},
		draw: function() {
			this.parent();
		}
	} );
	ig.main( '#canvas', SpidyGame, 60, 160, 360, 1 );
} );
