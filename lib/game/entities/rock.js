ig.module(

	'game.entities.rock'

).requires(

	'impact.entity'

).defines( function() {

	EntityRock = ig.Entity.extend( {

		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		size: { x: 40, y: 40 },
		offset: { x: 0, y: 0 },

		eName: 'rock',

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.loadAnims();
		},

		loadAnims: function() {
			var all_sheet = new ig.AnimationSheet( 'media/animations/rock.png', this.size.x, this.size.y );
			this.anims.idle = new ig.Animation( all_sheet, 1, [ 0 ] );
		},

		update: function() {
			this._anim( 'idle' );
			this.pos.y += 2;
			this.parent();
		},

		_anim: function( anim ) {
			if ( this.currentAnimName != anim ) {
				this.currentAnim = this.anims[ anim ];
				this.currentAnimName = anim;
			}
		}

	} )

} )
