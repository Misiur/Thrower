import Crafty from 'craftyjs';

Crafty.c('Hittable', {
	init: function () {
		this.requires('Matter');
	}
});