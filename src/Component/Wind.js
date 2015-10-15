import Crafty from 'craftyjs';

const Wind = Crafty.c('Wind', {
	init: function () {
		this
			.requires('2D')
			.bind("EnterFrame", function(eventData) {
				this.x = this.x + 10 * (eventData.dt / 1000);
			});
	}
})

export { Wind as default };