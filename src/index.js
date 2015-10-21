import debuglib from 'debug';

window.log = debuglib('game:log');
window.error = debuglib('game:error');

import Crafty from 'craftyjs';
import Stats from 'stats.js';
import raf from 'raf';
import Common from 'Common';
import 'crafty-matter';
import 'Component/Player';
import 'Component/AngleCorrection';
import 'Component/Control';
import 'Component/Line';
import 'Component/Bow';
import 'Component/Arrow';
import 'Component/Target';

debuglib.enable('game:*');

window.Game = {};

Game.settings = {
    width: 750,
    height: 300,
    areaSize: 3
};

Crafty.init(Game.settings.width, Game.settings.height);

// Unless performance is terrible
// We'll stick with canvas
// Crafty.webgl.init();

Crafty.Matter.init({
    // debug: true,
    gravity: {
        x: 0,
        y: 0.098
    },
    renderingMode: 'Canvas',
    bounds: {
        min: { x: -Game.settings.width * Game.settings.areaSize / 2, y: 0 }, 
        max: { x: Game.settings.width * Game.settings.areaSize / 2, y: Game.settings.height } 
    }
});

Crafty.background('#a5e8ff');

let Bow = Crafty.e('Bow');

Bow.addComponent('Control');

Game.Bow = Bow;

Game.targets = [];

for (let i = 0; i != 15; ++i) {
    for (let j = 0; j != 6; ++j) {
        Game.targets.push(
            Crafty.e('Target').attr({
                x: i * 50, y: j * 50, w: 50, h: 50
            })
            .target({
                hitColor: '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
            })
        );
    }
}

let arrow = null;

Crafty.bind('ControlFinished', function (e) {
    if (arrow) {
        // arrow.destroy();
    }
    
    arrow = Crafty.e('Arrow').arrow(e);
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