import Crafty from 'craftyjs';

Crafty.c('Line', {
    init: function () {
        this.requires('2D, Canvas, SolidHitBox');
        this.bind('Draw', this._draw_me);
        this.ready = true;
    },
    _draw_me: function (e) {
        let ctx = e.ctx;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        const startX = this.startX - this.x;
        const startY = this.startY - this.y;
        const endX = this.w;
        const endY = this.h;

        // log(startX, startY, endX, endY);
        this.collision([startX, startY], [endX, endY]);
    }
});