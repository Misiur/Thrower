import Crafty from 'craftyjs';

Crafty.c('Line', {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    angle: 0,
    distance: 0,
    ready: true,
    init: function () {
        this.requires('2D, Canvas');
        this.bind('Draw', this._drawMe);
        this.ready = true;
    },
    remove: function (del) {
        this.unbind('Draw', this._drawMe);
        this.trigger('Invalidate');
    },
    _drawMe: function (e) {
        const ctx = e.ctx;
        const x = Math.min(this.startX, this.endX);
        const y = Math.min(this.startY, this.endY);
        const w = Math.abs(this.endX - this.startX);
        const h = Math.abs(this.endY - this.startY);
        const buffer = 20;

        this.x = x - buffer;
        this.y = y - buffer;
        this.w = w + buffer * 2; 
        this.h = h + buffer * 2;

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.startX, this.startY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.endX, this.endY, 10, 0, Math.PI * 2);
        ctx.fill();
    }
});