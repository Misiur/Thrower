import Crafty from 'craftyjs';
import Matter from 'matter-js';

Crafty.c('AngleCorrection', {
	init: function () {
		this.requires('Matter');
		this.bind('EnterFrame', this.fixRotation);
	},
	remove: function (destroy) {
		this.unbind('EnterFrame', this.fixRotation);
	},
	fixRotation: function () {
		Matter.Body.setAngle(this._body, Math.atan2(this._body.velocity.y, this._body.velocity.x));
	}
});