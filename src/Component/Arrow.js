import Crafty from 'craftyjs';

Crafty.c('Arrow', {
	init: function () {
		this.requires('Matter, Color');
		this.color('red');
	},
	arrow: function (e) {
		this.attr({
			x: e.startX, y: e.startY, w: 10, h: 1
		});

		// this._body.collisionFilter = { groupId };
		Matter.Body.applyForce(this._body, this._body.position, {x: Math.cos(e.angle) * 0.0005, y: Math.sin(e.angle) * 0.0001});

		Crafty.viewport.follow(this, 0, 0);

		this.bind('EnterFrame', this.fixRotation);

		Matter.Events.on(this._body, 'collisionStart', function (e) {
			log(e);
		});

		Matter.Events.on(Crafty.Matter.engine, 'collisionStart', function (e) {
            let pairs = e.pairs;

            // change object colours to show those starting a collision
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if (pair.bodyA === this._body || pair.bodyB === this._body) {
					log(e);
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