import Crafty from 'craftyjs';
import Common from 'Common';
import Matter from 'matter-js';

Crafty.c('Arrow', {
	init: function () {
		this.requires('Matter, Color');
		
		this.matter = {
			collisionFilter: {
				category: Common.CollisionGroups.GROUP_ARROW,
				mask: Common.CollisionGroups.GROUP_DEFAULT
			}
		};

		this.color('red');
	},
	arrow: function (e) {
		this.attr({
			x: e.startX, y: e.startY, w: 20, h: 10
		});

		log(this._body.collisionFilter);
		// this._body.collisionFilter = { groupId };
		const aspectRatioX = 0.01;
		const aspectRatioY = 0.005;

		Matter.Body.applyForce(this._body, this._body.position, { x: Math.cos(e.angle) * aspectRatioX, y: Math.sin(e.angle) * aspectRatioY });

		Crafty.viewport.follow(this, 0, 0);

		this.bind('EnterFrame', this.fixRotation);

		Matter.Events.on(Crafty.Matter.engine, 'collisionStart', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
                	// Matter.Body.setStatic(this._body, true);
					this.unbind('EnterFrame', this.fixRotation);
                }
            }
		}.bind(this));

		return this;
	},
	fixRotation: function (e) {
		Matter.Body.setAngle(this._body, Math.atan2(this._body.velocity.y, this._body.velocity.x));
	}
});