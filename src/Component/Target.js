import Crafty from 'craftyjs';
import Matter from 'matter-js';
import Common from '../Common';

Crafty.c('Target', {
	init: function () {
		
		this
			.requires('Matter, Color')
		    .attr({ x: 340, y: 190, w: 80, h: 100, 
			    	matter: {
				        isStatic: true,
				        isPermeable: true
			    	} 
			})
		    .color('#ACDC55')
	    ;

		Matter.Events.on(Crafty.Matter.engine, 'collisionStart', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
                	let target = pair.bodyA !== this._body ? pair.bodyA : pair.bodyB;
                	target.entity.trigger('EnterTarget');
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
	}
});