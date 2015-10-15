import Crafty from 'craftyjs';

Crafty.c('Bow', {
	init: function () {
        this.bind('ControlFinished', this.controlFinished);
	},
	controlFinished: function (e) {
		this.removeComponent('Line');
	}
});