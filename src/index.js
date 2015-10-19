import debuglib from 'debug';

window.log = debuglib('game:log');
window.error = debuglib('game:error');

import Crafty from 'craftyjs';
import Stats from 'stats.js';
import raf from 'raf';
import Common from 'Common';
import 'crafty-matter';
import 'Component/Player';
import 'Component/Control';
import 'Component/Line';
import 'Component/Bow';
import 'Component/Arrow';

debuglib.enable('game:*');

window.Game = {};

Game.settings = {
    width: 750,
    height: 300,
    areaSize: 8
};

Crafty.init(Game.settings.width, Game.settings.height);

Crafty.Matter.init({
    debug: true,
    gravity: {
        x: 0,
        y: 0.098
    },
    bounds: { 
        min: { x: -Game.settings.width * Game.settings.areaSize / 2, y: 0 }, 
        max: { x: Game.settings.width * Game.settings.areaSize / 2, y: Game.settings.height } 
    }
});

Crafty.background('#a5e8ff');

let Bow = Crafty.e('Bow');

Crafty.e('Matter, Color')
    .attr({ x: 0, y: 290, w: 600, h: 10, matter: {
        isStatic: true
    } })
    .color('#BADA55');

Crafty.e('Matter, Color')
    .attr({ x: 10, y: 10, w: 10, h: 10, matter: {
        collisionFilter: {
            category: Common.CollisionGroups.GROUP_ARROW,
            mask: Common.CollisionGroups.GROUP_DEFAULT
        }
    } })
    .color('#BADA55');

Crafty.e('Matter, Color')
    .attr({ x: 10, y: 30, w: 10, h: 10, matter: {
        collisionFilter: {
            category: Common.CollisionGroups.GROUP_ARROW,
            mask: Common.CollisionGroups.GROUP_DEFAULT
        }
    } })
    .color('#BADA55');

Bow.addComponent('Line').addComponent('Control').addComponent('Ground');

Game.Bow = Bow;

Crafty.e('Matter, Color')
    .attr({ x: 400, y: 0, w: 20, h: 300, rotation: 45, matter: {
        isStatic: true
    } })
    .color('#BADA55');


Crafty.e('Matter, Color')
    .attr({ x: 420, y: 100, w: 20, h: 300, matter: {
        isStatic: true
    } })
    .color('#BADA55');

let arrow = null;

Crafty.bind('ControlFinished', function (e) {
    if (arrow) {
        // arrow.destroy();
    }
    
    arrow = Crafty.e('Arrow, SolidHitBox').arrow(e);
});

var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

raf(function update() {

    stats.begin();

    // monitored code goes here

    stats.end();

    raf( update );
})