import Crafty from 'craftyjs';
import Common from 'Common';
import Matter from 'matter-js';
import 'Component/TrackVelocity';

Crafty.c('Arrow', {
	init: function () {
		this
			.requires('2D, Canvas, Matter, Color, TrackVelocity')
			.matter({
				collisionFilter: {
					category: Common.CollisionGroups.GROUP_ARROW,
					mask: Common.CollisionGroups.GROUP_ALL & ~Common.CollisionGroups.GROUP_ARROW
				},
				frictionAir: 0.001,
				inertia: 10,
				inverseInertia: 0.1,
			})
			.color('red')
			.bind('EnterTarget', function (e) {
				this.color(e.color);
			})
			.bind('ActiveTarget', function (e) {
				if (this.color() == e.color) {
					this.unbind('ActiveTarget');
				}
				this.color(e.color);
			})
			.bind('ExitTarget', function (e) {
				this.color('red');
			})
			;
		;
	},
	arrow: function (e) {
		this.attr({
			x: e.startX, y: e.startY, w: 20, h: 8
		});

		const aspectRatioX = 0.003;
		const aspectRatioY = 0.003;

		Matter.Body.applyForce(this._body, this._body.position, { x: Math.cos(e.angle) * aspectRatioX, y: Math.sin(e.angle) * aspectRatioY });

		Crafty.viewport.follow(this, 0, 0);

		this.addComponent('AngleCorrection');

		this.bind('CollisionStart', function (e) {
        	if (e.target._body.isPermeable) {
        		return;
        	}

        	this.removeComponent('AngleCorrection');
		});

		return this;
	}
});