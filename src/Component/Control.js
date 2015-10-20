import Crafty from 'craftyjs';

Crafty.c('Control', {
	started: false,
	init: function () {
		this.requires('Mouse');
		this.enableCapture();
	},
	enableCapture: function () {
		Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', this.attachMoveHandler);
		Crafty.addEvent(this, Crafty.stage.elem, 'mouseup', this.detachMoveHandler);
	},
	disableCapture: function () {
		Crafty.removeEvent(this, Crafty.stage.elem, 'mousedown', this.attachMoveHandler);
		Crafty.removeEvent(this, Crafty.stage.elem, 'mouseup', this.detachMoveHandler);
	},
	attachMoveHandler: function (e) {
		if (this.started) {
			return this;
		}

		this.started = true;

		this.startX = this.endX = this.x = e.realX;
		this.startY = this.endY = this.y = e.realY;
		this.w = this.h = 0;

		Crafty.addEvent(this, Crafty.stage.elem, 'mousemove', this.moveHandler);
	},
	setDimensions: function (x, y) {
		this.endX = x;
		this.endY = y;

		const bboxBuffer = 2;

		this.x = Math.max(0, Math.min(this.startX, this.endX) - bboxBuffer);
		this.y = Math.max(0, Math.min(this.startY, this.endY) - bboxBuffer);

		this.w = (this.endX >= this.startX ? this.endX - this.startX : this.startX - this.endX) + bboxBuffer * 2; 
		this.h = (this.endY >= this.startY ? this.endY - this.startY : this.startY - this.endY) + bboxBuffer * 2;
	
		this.distance = Crafty.math.distance(this.startX, this.startY, this.endX, this.endY);
	},
	detachMoveHandler: function (e) {
		this.setDimensions(e.realX, e.realY);
		this.started = false;

		Crafty.removeEvent(this, Crafty.stage.elem, 'mousemove', this.moveHandler);
		Crafty.trigger('ControlFinished', {
			distance: this.distance,
			startX: this.startX,
			startY: this.startY,
			endX: this.endX,
			endY: this.endY,
			angle: Math.atan2(this.endY - this.startY, this.endX - this.startX)
		});
	},
	moveHandler: function (e) {
		this.setDimensions(e.realX, e.realY);
	}
});