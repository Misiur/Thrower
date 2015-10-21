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

		Matter.Events.on(Crafty.Matter.engine, 'collisionStart', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
                	let target = pair.bodyA !== this._body ? pair.bodyA : pair.bodyB;
                	target.entity.trigger('EnterTarget', { color: this._hitColor });
                }
            }
		}.bind(this));

		Matter.Events.on(Crafty.Matter.engine, 'collisionEnd', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
                	let target = pair.bodyA !== this._body ? pair.bodyA : pair.bodyB;
                	target.entity.trigger('ExitTarget');
                }
            }
		}.bind(this));

		Object.defineProperty(this, 'hitColor', {
			get: function () {
				return this._hitColor;
			},
			set: function (value) {
				this._hitColor = value;
				this.color(value, 0.3);
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