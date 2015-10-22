import Crafty from 'craftyjs';
import Matter from 'matter-js';
import Common from '../Common';

Crafty.c('Target', {
	_hitColor: 'black',
	init: function () {
		this
			.requires('2D, Canvas, Matter, Color')
	    	.matter({
		        isStatic: true,
		        isPermeable: true
			})
		    .color(this._hitColor, 0.1)
	    ;

		this.bind('CollisionStart', function (e) {
        	e.target.trigger('EnterTarget', { color: this._hitColor });
		});

		this.bind('CollisionEnd', function (e) {
        	e.target.trigger('ExitTarget');
		});

		Object.defineProperty(this, 'hitColor', {
			get: function () {
				return this._hitColor;
			},
			set: function (value) {
				this._hitColor = value;
				this.color(value, 0.1);
			}
		})
	},
	target: function (config) {
		if (typeof config === 'undefined') {
			return this;
		}

		this.hitColor = config.hitColor || this.hitColor;
	
		return this;
	}
});