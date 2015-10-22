import Matter from 'matter-js';
import Crafty from 'craftyjs';
import 'Component/Hittable';
import 'Component/TrackVelocity';

Crafty.c('Person', {
	x: 0,
	y: 0,
	composite: null,
	init: function () {
		let person = Matter.Composite.create({
			label: 'Person'
		});

		let leftLeg = Crafty.e('Hittable, TrackVelocity, 2D, Canvas, Matter, Color')
		    .attr({
		        x: this.x, y: Game.settings.height - 70, w: 20, h: 20, label: 'leftLeg'
		    })
		    .color('blue');
		;

		Matter.Composite.add(person, leftLeg._body);

		let rightLeg = Crafty.e('Hittable, TrackVelocity, 2D, Canvas, Matter, Color')
		    .attr({
		        x: this.x + 30, y: Game.settings.height - 70, w: 20, h: 20, label: 'rightLeg'
		    })
		    .color('blue');
		;
		Matter.Composite.add(person, rightLeg._body);

		let body = Crafty.e('Hittable, TrackVelocity, 2D, Canvas, Matter, Color')
		    .attr({
		        x: this.x + 10, y: Game.settings.height - 140, w: 30, h: 30, label: 'body',
		    	matter: {
	        		// isStatic: true
	        	}
		    })
		    .color('blue');
		;

		Matter.Composite.add(person, body._body);

		let head = Crafty.e('Hittable, TrackVelocity, 2D, Canvas, Matter, Color')
		    .attr({
		        x: this.x + 15, y: Game.settings.height - 150, w: 20, h: 20, label: 'head',
	        	matter: {
	        		// isStatic: true
	        	}
		    })
		    .color('blue');
		;

		Matter.Composite.add(person, head._body);

		// let leftArm = Crafty.e('2D, Canvas, Matter, Color')
		//     .attr({
		//         x: this.x - 15, y: Game.settings.height - 150, w: 10, h: 10
		//     })
		//     .color('blue');
		// ;

		// Matter.Composite.add(person, leftArm._body);
		// let rightArm = Crafty.e('2D, Canvas, Matter, Color')
		//     .attr({
		//         x: this.x + 45, y: Game.settings.height - 150, w: 10, h: 10
		//     })
		//     .color('blue');
		// ;
		// Matter.Composite.add(person, rightArm._body);

		// Matter.Composite.add(person, Matter.Constraint.create ({
		//     bodyA: leftLeg._body,
		//     bodyB: body._body,
		//     stiffness: 0.5
		// }));

		// Matter.Composite.add(person, Matter.Constraint.create ({
		//     bodyA: rightLeg._body,
		//     bodyB: body._body,
		//     stiffness: 0.5
		// }));

		// Matter.Composite.add(person, Matter.Constraint.create ({
		//     bodyA: leftArm._body,
		//     bodyB: body._body
		// }));
		// Matter.Composite.add(person, Matter.Constraint.create ({
		//     bodyA: rightArm._body,
		//     bodyB: body._body
		// }));
		Matter.Composite.add(person, Matter.Constraint.create ({
		    bodyA: head._body,
		    pointA: { x: -10, y: 10 },
		    bodyB: body._body,
		    pointB: { x: -15, y: -15 },
			stiffness: 0.1
		}));

		Matter.Composite.add(person, Matter.Constraint.create ({
		    bodyA: head._body,
		    pointA: { x: 10, y: 10 },
		    bodyB: body._body,
		    pointB: { x: 15, y: -15 },
			stiffness: 0.1
		}));

		Matter.Composite.add(person, Matter.Constraint.create ({
		    bodyA: head._body,
		    pointA: { x: -10, y: 10 },
		    bodyB: body._body,
		    pointB: { x: 15, y: -15 },
			stiffness: 0.1
		}));

		Matter.Composite.add(person, Matter.Constraint.create ({
		    bodyA: head._body,
		    pointA: { x: 10, y: 10 },
		    bodyB: body._body,
		    pointB: { x: -15, y: -15 },
			stiffness: 0.1
		}));

		Matter.World.add(Crafty.Matter.world, person);

		Crafty('Hittable')
			.bind('CollisionStart', function (e) {
				if (!e.target.has('Arrow')) {
					return;
				}

				let arrow = e.target;
				let target = this;

				var arrowMomentum = Matter.Vector.mult(arrow.previousVelocity, arrow._body.mass);
				var targetMomentum = Matter.Vector.mult(this.previousVelocity, this._body.mass);
				var relativeMomentum = Matter.Vector.sub(arrowMomentum, targetMomentum);

				const threshold = 1;

				let timeout;
				const magnitude = Matter.Vector.magnitude(relativeMomentum);
				if(magnitude > threshold) {
					target.color('red');
					clearTimeout(timeout);
					timeout = setTimeout(function () {
						target.color('blue');
					}, 50);
				}
			})
			;
	
		this.composite = person;
	},
	person: function (config) {
		this.x = config.x || this.x;
		this.y = config.y || this.y;

		Matter.Composite.translate(this.composite, { x: this.x, y: this.y }); 
	}
})