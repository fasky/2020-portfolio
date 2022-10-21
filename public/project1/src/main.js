"use strict";

var app = app || {};

//hold constants, init everything
app.main = (function(){
    
    //music files
    const SOUND_PATH = Object.freeze({
        sound1: "src/media/New Adventure Theme.mp3",
        sound2: "src/media/Ashes to Ashes.mp3",
        sound3:  "src/media/Speed Of Life.mp3"
    });
    
    //number of samples to 
    const NUM_SAMPLES = 256;

    
    //init everything - webaudio,canvas,ui,audiovis init sets up its values and listeners
    function init(){
        app.utilities.setupWebaudio();
        app.utilities.setupCanvas();
        app.utilities.setupUI();
        app.audioVis.init();
        app.audioVis.update(); //start loop
    }
    
    //return some values so they can be used in other files
    return {
        init,
        get NUM_SAMPLES(){return NUM_SAMPLES},
        get SOUND_PATH(){return SOUND_PATH}
    }
})();