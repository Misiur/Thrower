import Crafty from 'craftyjs';
import Common from 'Common';
import Matter from 'matter-js';

Crafty.c('Arrow', {
	init: function () {
		this
			.requires('2D, Canvas, Matter, Color')
			.matter({
				collisionFilter: {
					category: Common.CollisionGroups.GROUP_ARROW,
					mask: Common.CollisionGroups.GROUP_ALL & ~Common.CollisionGroups.GROUP_ARROW
				},
				frictionAir: 0.001
			})
			.color('red')
			.bind('EnterTarget', function (e) {
				this.color(e.color);
			})
			// .bind('ExitTarget', function (e) {
			// 	this.color('red');
			// })
			;
		;
	},
	arrow: function (e) {
		this.attr({
			x: e.startX, y: e.startY, w: 10, h: 2
		});

		const aspectRatioX = 0.0003;
		const aspectRatioY = 0.0003;

		Matter.Body.applyForce(this._body, this._body.position, { x: Math.cos(e.angle) * aspectRatioX, y: Math.sin(e.angle) * aspectRatioY });

		// Crafty.viewport.follow(this, 0, 0);

		this.addComponent('AngleCorrection');

		Matter.Events.on(Crafty.Matter.engine, 'collisionStart', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
                	if (pair.bodyA.isPermeable || pair.bodyB.isPermeable) {
                		continue;
                	}
                	// Matter.Body.setStatic(this._body, true);
                	this.removeComponent('AngleCorrection');
                }
            }
		}.bind(this));

		return this;
	}
});