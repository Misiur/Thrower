import Crafty from 'craftyjs';

Crafty.c('TrackVelocity', {
	init: function () {
		this.previousVelocity = { x: 0, y: 0 };
		this.requires('Matter');
		this.bind('EnterFrame', function () {
			this.previousVelocity.x = this._body.velocity.x;
			this.previousVelocity.y = this._body.velocity.y;
		});
	}
});