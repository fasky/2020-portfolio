"use strict";
var app = app || {};

app.utilities = (function(){

    //elements on the page
    let audioElement,canvasElement;
    let playButton;

    //our canvas drawing context
    let drawCtx;

    //our WebAudio context
    let audioCtx;

    //nodes that are part of our WebAudio audio routing graph
    let sourceNode, analyserNode, gainNode, biquadFilter;
    
    
    //make a color - with alpha
    function makeColor(red, green, blue, alpha){
        var color='rgba('+red+','+green+','+blue+', '+alpha+')';
        return color;
    }

    //set up webaudio - create and connect nodes
    function setupWebaudio(){
        // 1 - The || is because WebAudio has not been standardized across browsers yet
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        audioElement = document.querySelector("audio");

        audioElement.src = app.main.SOUND_PATH.sound3;
        sourceNode = audioCtx.createMediaElementSource(audioElement);
        analyserNode = audioCtx.createAnalyser();

        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = app.main.NUM_SAMPLES;

        biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.type = "highshelf";
        biquadFilter.frequency.setValueAtTime(1000,audioCtx.currentTime);
        biquadFilter.gain.setValueAtTime(10,audioCtx.currentTime);

        sourceNode.connect(biquadFilter);
        biquadFilter.connect(analyserNode);

        // 5 - create a gain (volume) node
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 1;

        // 6 - connect the nodes - we now have an audio graph
        //sourceNode.connect(analyserNode);
        analyserNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    }

    //grab canvas elements
    function setupCanvas(){
        canvasElement = document.querySelector('canvas');
        drawCtx = canvasElement.getContext("2d");
    }

    //hook up some events
    function setupUI(){
        
        //play button set up
        playButton = document.querySelector("#playButton");
        playButton.onclick = e => {

            //check if context is in suspended state (autoplay policy)
            if (audioCtx.state == "suspended") {
                audioCtx.resume();
            }

            //if not playing, start
            if (e.target.dataset.playing == "no") {
                audioElement.play();
                e.target.dataset.playing = "yes";
            // if track is playing pause it
            } else if (e.target.dataset.playing == "yes") {
                audioElement.pause();
                e.target.dataset.playing = "no";
            }

        };

        //change speed of playback
        document.querySelector("#mySpeed").oninput = function(e){
            audioElement.playbackRate = e.target.value/100;
        };
        
        //change volume
        let volumeSlider = document.querySelector("#volumeSlider");
        volumeSlider.oninput = e => {
            gainNode.gain.value = e.target.value;
            //volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
        };
        volumeSlider.dispatchEvent(new InputEvent("input"));

        //change gain on biquadFilter
        document.querySelector("#gain").oninput = e => {
            biquadFilter.frequency.setValueAtTime(e.target.value,audioCtx.currentTime);
        };
        
        //For secondary sliders
        //change speed of playback
        document.querySelector("#mySpeedHide").oninput = function(e){
            audioElement.playbackRate = e.target.value/100;
        };
        
        //change volume
        volumeSlider = document.querySelector("#volumeSliderHide");
        volumeSlider.oninput = e => {
            gainNode.gain.value = e.target.value;
            //volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
        };
        volumeSlider.dispatchEvent(new InputEvent("input"));

        //change gain on biquadFilter
        document.querySelector("#gainHide").oninput = e => {
            biquadFilter.frequency.setValueAtTime(e.target.value,audioCtx.currentTime);
        };

        
        //track select - change tracks
        document.querySelector("#trackSelect").onchange = e =>{
            audioElement.src = e.target.value;
            // pause the current track if it is playing
            playButton.dispatchEvent(new MouseEvent("click"));
            
            //show new playtime left
            playButton.innerHTML = "Play";
        };


        // if track ends
        audioElement.onended =  _ => {
            playButton.dataset.playing = "no";
        };

        //fullscreen hookup
        document.querySelector("#fsButton").onclick = _ =>{
            requestFullscreen(canvasElement);
        };
    }

    //request fullscreen with fullscreen button ^
    function requestFullscreen(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullscreen) {
          element.mozRequestFullscreen();
        } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        }
        // .. and do nothing if the method is not supported
    };
    
    //return functions and things I may need
    return{
        makeColor,
        setupWebaudio,
        setupCanvas,
        setupUI,
        get drawCtx(){return drawCtx},
        get analyserNode(){return analyserNode},
        get canvasElement(){return canvasElement},
        get audioElement(){return audioElement}
    };

})();