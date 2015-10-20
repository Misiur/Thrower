import Crafty from 'craftyjs';

const Player = Crafty.c('Player', {
	init: function () {
		this.requires('2D, Canvas, Matter, Color')
		  .attr({x: 10, y: 10, w: 30, h: 30})
		  .color('#ACDC55');
	}
})