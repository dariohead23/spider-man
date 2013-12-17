ig.module(

	'game.entities.spiderman'

).requires(

	'impact.entity'

).defines( function() {

	EntitySpiderman = ig.Entity.extend( {

		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,

		size: { x: 40, y: 70 },
		offset: { x: 0, y: 0 },

		tracks: [ 20, 60, 100 ],
		currentTrack: 1,
		wallY: 0,
		wallI: 0,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.loadAnims();
		},

		loadAnims: function() {
			var all_sheet = new ig.AnimationSheet( 'media/animations/spiderman.png', this.size.x, this.size.y );
			this.anims.crawling = new ig.Animation( all_sheet, .15, [ 0, 1, 2, 1 ] );
		},

		check: function( other ) {
			var ox = other.pos.x + ( other.size.x / 2 );
			var oy = other.pos.y + ( other.size.y / 2 );
			var x = this.pos.x + ( this.size.x / 2 );
			var y = this.pos.y + ( this.size.y / 2 );
			var x2 = ( x - ox ) * ( x - ox );
			var y2 = ( y - oy ) * ( y - oy );
			var dist = Math.sqrt( x2 + y2 );

			if ( other.eName == "rock" ) {
				if ( dist < 40 ) {
					other.kill();
					console.log( 'ooops' );
				}
			} else {
				if ( dist < 50 ) {
					other.kill();
					console.log( 'ooops' );
				}
			}
		},

		update: function() {
			this._anim( 'crawling' );

			var goRight = ig.input.pressed( 'right' );
			var goLeft = ig.input.pressed( 'left' );

			if ( goLeft && this.currentTrack > 0 ) this.currentTrack--;
			if ( goRight && this.currentTrack < 2 ) this.currentTrack++;

			this._changeTrack();

			this.parent();
		},

		draw: function() {

			this.wallY += 2;
			if ( this.wallY >= 80 ) {
				this.wallY = 0;
				this.wallI++;
				if ( this.wallI > 30 ) this.wallI = 0;
			}
			var i1 = new ig.Image( 'media/animations/wxs1.png' );
			var i2 = new ig.Image( 'media/animations/wxs2.png' );
			var i3 = new ig.Image( 'media/animations/wxs3.png' );

			for ( var y = -1; y <= 5; y++ ) {
				for ( var x = 0; x <= 1; x++ ) {
					if ( ( this.wallI - y ) > 23 ) {
						i3.draw( 80 * x, ( 80 * y ) + this.wallY );
					} else if ( ( this.wallI - y ) > 18 ) {
						i2.draw( 80 * x, ( 80 * y ) + this.wallY );
					} else if ( ( this.wallI - y ) > 5 ) {
						i1.draw( 80 * x, ( 80 * y ) + this.wallY );
					} else {
						i3.draw( 80 * x, ( 80 * y ) + this.wallY );
					}
				}
			}

			this.parent();

		},

		_changeTrack: function() {
			var current_pos = this.pos.x;
			var target_pos = this.tracks[ this.currentTrack ];
			if ( Math.abs( current_pos - target_pos ) == 0 ) return;
			if ( current_pos > target_pos ) {
				this.pos.x -= 2;
			} else if ( current_pos < target_pos ) {
				this.pos.x += 2;
			}
		},

		_anim: function( anim ) {
			if ( this.currentAnimName != anim ) {
				this.currentAnim = this.anims[ anim ];
				this.currentAnimName = anim;
			}
		}

	} )

} )
