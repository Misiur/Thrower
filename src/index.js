import debuglib from 'debug';

window.log = debuglib('game:log');
window.error = debuglib('game:error');

import Crafty from 'craftyjs';
import Stats from 'stats.js';
import raf from 'raf';
import Common from 'Common';
import Matter from 'matter-js';
import 'crafty-matter';
import 'Component/Player';
import 'Component/AngleCorrection';
import 'Component/Control';
import 'Component/Line';
import 'Component/Bow';
import 'Component/Arrow';
import 'Component/Target';
import 'Component/Person';

debuglib.enable('game:*');

window.Game = {};

Game.settings = {
    width: 750,
    height: 300,
    areaSizeX: 0,
    areaSizeY: 0,
    debug: true
};

Crafty.init(Game.settings.width, Game.settings.height);

// Unless performance is terrible
// We'll stick with Canvas
// Crafty.webgl.init();

Crafty.Matter.init({
    debug: Game.settings.debug,
    gravity: {
        x: 0,
        y: 0.098
    },
    renderingMode: 'Canvas',
    bounds: {
        min: {
            x: -Game.settings.areaSizeX * Game.settings.width,
            y: -Game.settings.areaSizeY * Game.settings.height
        }, 
        max: {
            x: (Game.settings.areaSizeX + 1) * Game.settings.width,
            y: (Game.settings.areaSizeY + 1) * Game.settings.height
        } 
    }
});

log(Crafty.Matter.world.bounds);
Crafty.background('#a5e8ff');

let Bow = Crafty.e('Bow, Control');

Game.Bow = Bow;

Crafty.e('2D, Canvas, Matter, Color')
    .attr({
        x: Game.settings.width - 50, y: 0, w: 50, h: Game.settings.height, matter: {
            isStatic: true
        }
    })
    .color('#BADA55');
;

Crafty.e('2D, Canvas, Matter, Color')
    .attr({
        x: 0, y: Game.settings.height - 50, w: Game.settings.width, h: 50, matter: {
            isStatic: true
        }
    })
    .color('#BADA55');
;

let arrow = null;

Crafty.bind('ControlFinished', function (e) {
    if (arrow) {
        // arrow.destroy();
    }

    // const amount = 32;    
    // const offset = Math.PI / (amount * 2);
    // e.angle -= amount / 2 * offset;
    // for(let i = 0; i != amount; ++i) {
    //     e.angle += offset;
    //     Crafty.e('Arrow').arrow(e);
    // }
    Crafty.e('Arrow').arrow(e);
});

Crafty.e('Person').person({
    x: 300,
    y: 0
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