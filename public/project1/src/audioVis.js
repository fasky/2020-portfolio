"use strict";
var app = app || {};

app.audioVis = (function(){
    
    //audio data for displaying
    let audioData;
    let waveFormData;

    //effects options bools
    let invert, tintRed, noise, sepia, lines, circles, rectangles, curves, rainbool;
    let dataType; //type of data to use - switch
    
    //timer - progress countdown
    let duration, currentTime;
    
    //update visuals
    function update() { 

        duration = app.utilities.audioElement.duration;
        currentTime = app.utilities.audioElement.currentTime;
        
        let timeLeft = Math.round(duration - currentTime);
        
        //play button - what to display
        let playButton = document.querySelector("#playButton");
        //if playing, show time left
        if (playButton.dataset.playing == "yes") 
        {
            playButton.innerHTML = timeLeft + "s";
        }
        
        //set up data arrays
        audioData = new Uint8Array(app.main.NUM_SAMPLES/2); 
        waveFormData = new Uint8Array(app.main.NUM_SAMPLES/2);
        
        requestAnimationFrame(update);

        //check width and height to keep canvas in window and looking correct
        app.utilities.drawCtx.canvas.width = window.innerWidth;
        if(window.innerHeight > 1070){
            app.utilities.drawCtx.canvas.height = window.innerHeight - 50;
        }
        else if(window.innerHeight > 850){
            app.utilities.drawCtx.canvas.height = window.innerHeight/1.07 - 50;  
        }
        else if(window.innerHeight < 500){
            app.utilities.drawCtx.canvas.height = window.innerHeight/1.2 - 50;  
        }
        else{
            app.utilities.drawCtx.canvas.height = window.innerHeight/1.1 - 50;  
        }

        //populate the audioData with the frequency data
        app.utilities.analyserNode.getByteFrequencyData(audioData);
        app.utilities.analyserNode.getByteTimeDomainData(waveFormData);
        
        //clear canvas
        app.utilities.drawCtx.clearRect(0,0,app.utilities.drawCtx.canvas.width,app.utilities.drawCtx.canvas.height); 
        
        //set bar dimensions and spacing
        var barWidth = app.utilities.drawCtx.canvas.width/app.main.NUM_SAMPLES;
        var barSpacing = app.utilities.drawCtx.canvas.width/app.main.NUM_SAMPLES;
        var barHeight = app.utilities.drawCtx.canvas.height/10;
        var topSpacing = app.utilities.drawCtx.canvas.height - 256 - barHeight - 20;

        //make purple
        let grad = app.utilities.drawCtx.createLinearGradient(0,0,app.utilities.drawCtx.canvas.width,app.utilities.drawCtx.canvas.height);
        grad.addColorStop(0,"#ffa3f0");
        grad.addColorStop(1,"#8300f4");

        //make rainbow gradient for option
        let rainbow = app.utilities.drawCtx.createLinearGradient(0,0,app.utilities.drawCtx.canvas.width,app.utilities.drawCtx.canvas.height);
        rainbow.addColorStop(0,"#ff4646");
        rainbow.addColorStop(0.2,"#f3ff68");
        rainbow.addColorStop(0.4,"#55ff55");
        rainbow.addColorStop(0.6,"#6ee9ff");
        rainbow.addColorStop(0.8,"#8c6aff");
        rainbow.addColorStop(1,"#ff5dec");

        //check type of data to display
        let radio = document.querySelector("#radioStuff").elements["optionsRadios"];
        for(i=0;i<radio.length;i++){
            if (radio[i].checked)
            {
                //set dataType to selected option
                dataType = radio[i].value;
            }
        }

        //use dataType to determine how to draw audio - D.R.Y? Look similar but different enough
        switch(dataType){
                
            //both waveform and freq
            case "bothForms":
                //freq
                for(var i=0; i<audioData.length; i++) { 

                    //lines
                    if(lines){
                        //if ranbow
                        if(rainbool){
                            app.utilities.drawCtx.strokeStyle = rainbow;        
                        }
                        //otherwise gray
                        else{
                            app.utilities.drawCtx.strokeStyle='rgba(255, 255, 255, 0.15)'; 
                        }
                        app.utilities.drawCtx.lineWidth = barWidth/3;

                        //draw lines across middle of screen
                        
                        //original - left to right instead of symmetrical lines across screen
                        //app.utilities.drawCtx.beginPath();
                        //app.utilities.drawCtx.moveTo(4 + i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 - audioData[i]);
                        //app.utilities.drawCtx.lineTo(4 + i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 + audioData[i]);
                        //app.utilities.drawCtx.closePath();
                        //app.utilities.drawCtx.stroke();
                        
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo(4 + i * (barWidth/3 + barSpacing) + app.utilities.drawCtx.canvas.width/2,app.utilities.drawCtx.canvas.height/2 - audioData[i]);
                        app.utilities.drawCtx.lineTo(4 + i * (barWidth/3 + barSpacing)+ app.utilities.drawCtx.canvas.width/2,app.utilities.drawCtx.canvas.height/2 + audioData[i]);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();
                        
                        //draw symmetrical - other side
                        if(i != 0){
                            app.utilities.drawCtx.beginPath();
                            app.utilities.drawCtx.moveTo(4 - i * (barWidth/3 + barSpacing) + app.utilities.drawCtx.canvas.width/2,app.utilities.drawCtx.canvas.height/2 - audioData[i]);
                            app.utilities.drawCtx.lineTo(4 - i * (barWidth/3 + barSpacing) + app.utilities.drawCtx.canvas.width/2,app.utilities.drawCtx.canvas.height/2 + audioData[i]);
                            app.utilities.drawCtx.closePath();
                            app.utilities.drawCtx.stroke();
                        }

                    }

                    //circles
                    if(circles){
                        //percent for circles
                        let percent = audioData[i] / 255;
                        app.utilities.drawCtx.strokeStyle= app.utilities.makeColor(255,94,255,.10-percent/10.0);
                        app.utilities.drawCtx.lineWidth = barWidth;
                        let circleRadius = percent* 210;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.arc(app.utilities.canvasElement.width/2,app.utilities.canvasElement.height/2,circleRadius*1.5,0,2*Math.PI,false);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();
                    }

                }
                
                //waveform
                for(var i=0; i<waveFormData.length; i++) { 

                    //curves
                    if(curves){
                        
                        //bezier
                        app.utilities.drawCtx.strokeStyle = grad;
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo((barWidth + barSpacing) * (i),waveFormData[i]);
                        app.utilities.drawCtx.bezierCurveTo((barWidth + barSpacing) * (i), waveFormData[i], (barWidth + barSpacing) * (i + 1), waveFormData[i + 1], (barWidth + barSpacing) * (i + 1), waveFormData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();

                        //cubic
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo((barWidth + barSpacing) * (i),app.utilities.drawCtx.canvas.height - 256 + waveFormData[i]);
                        app.utilities.drawCtx.quadraticCurveTo((barWidth + barSpacing) * (i), app.utilities.drawCtx.canvas.height - 256 + waveFormData[i], (barWidth + barSpacing) * (i + 1), app.utilities.drawCtx.canvas.height - 256 + waveFormData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();
                    }

                    //rectangles
                    if(rectangles){
                        app.utilities.drawCtx.fillStyle = grad;
                        app.utilities.drawCtx.fillRect(i * (barWidth + barSpacing),app.utilities.canvasElement.height/2 + waveFormData[i] - 128,barWidth,barHeight/5); 
                    }
                }
                break;

            //Waveform only
            case "waveform":
                for(var i=0; i<waveFormData.length; i++) { 

                    //lines
                    if(lines){
                        if(rainbool){
                            app.utilities.drawCtx.strokeStyle = rainbow;        
                        }
                        else{
                            app.utilities.drawCtx.strokeStyle='rgba(255, 255, 255, 0.15)'; 
                        }         
                        app.utilities.drawCtx.lineWidth = barWidth;

                        //draw lines across middle of screen
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo(4+i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 - waveFormData[i] +128);
                        app.utilities.drawCtx.lineTo(4+i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 + waveFormData[i] -128);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();
                    }

                    //circles
                    if(circles){
                        //percent for circles
                        let percent = waveFormData[i] / 255;
                        app.utilities.drawCtx.strokeStyle= app.utilities.makeColor(255,94,255,.10-percent/10.0);
                        let circleRadius = percent* 210;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.arc(app.utilities.canvasElement.width/2,app.utilities.canvasElement.height/2,circleRadius*1.5,0,2*Math.PI,false);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();   
                    }
                    
                    //curves
                    if(curves){
                        
                        //bezier
                        app.utilities.drawCtx.strokeStyle = grad;
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo((barWidth + barSpacing) * (i),waveFormData[i]);
                        app.utilities.drawCtx.bezierCurveTo((barWidth + barSpacing) * (i), waveFormData[i], (barWidth + barSpacing) * (i + 1), waveFormData[i + 1], (barWidth + barSpacing) * (i + 1), waveFormData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();

                        //cubic
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo((barWidth + barSpacing) * (i),app.utilities.drawCtx.canvas.height - 256 + waveFormData[i]);
                        app.utilities.drawCtx.quadraticCurveTo((barWidth + barSpacing) * (i), app.utilities.drawCtx.canvas.height - 256 + waveFormData[i], (barWidth + barSpacing) * (i + 1), app.utilities.drawCtx.canvas.height - 256 +waveFormData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();
                    }

                    //rectangles
                    if(rectangles){
                        app.utilities.drawCtx.fillStyle = grad;
                        app.utilities.drawCtx.fillRect(i * (barWidth + barSpacing),app.utilities.canvasElement.height/2 + waveFormData[i] - 128,barWidth,barHeight/5); 
                    }
                }

                break;

            //frequency only
            case "frequency":
                for(var i=0; i<audioData.length; i++) { 
                    
                    //set fillstyle to gradient and percent for circles
                    app.utilities.drawCtx.fillStyle = grad;
                    let percent = audioData[i] / 255;

                    //lines
                    if(lines){
                        if(rainbool){
                            app.utilities.drawCtx.strokeStyle = rainbow;        
                        }
                        else{
                            app.utilities.drawCtx.strokeStyle='rgba(255, 255, 255, 0.15)'; 
                        }          
                        app.utilities.drawCtx.lineWidth = barWidth;
                        
                        //draw lines across middle of screen
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo(4+i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 - audioData[i]);
                        app.utilities.drawCtx.lineTo(4+i * (barWidth + barSpacing),app.utilities.drawCtx.canvas.height/2 + audioData[i]);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();
                    }

                    //circles
                    if(circles){
                        //circles
                        app.utilities.drawCtx.strokeStyle= app.utilities.makeColor(255,94,255,.10-percent/10.0);
                        let circleRadius = percent* 210;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.arc(app.utilities.canvasElement.width/2,app.utilities.canvasElement.height/2,circleRadius*1.5,0,2*Math.PI,false);
                        app.utilities.drawCtx.closePath();
                        app.utilities.drawCtx.stroke();   
                    }

                    //curves
                    if(curves){
                        
                        //bezier
                        app.utilities.drawCtx.strokeStyle = grad;
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo(app.utilities.canvasElement.width -(barWidth + barSpacing) * (i),audioData[i]);
                        app.utilities.drawCtx.bezierCurveTo(app.utilities.canvasElement.width -(barWidth + barSpacing) * (i), audioData[i], app.utilities.canvasElement.width -(barWidth + barSpacing) * (i + 1),audioData[i + 1], app.utilities.canvasElement.width -(barWidth + barSpacing) * (i + 1), audioData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();

                        //cubic
                        app.utilities.drawCtx.lineWidth = 3;
                        app.utilities.drawCtx.beginPath();
                        app.utilities.drawCtx.moveTo(app.utilities.canvasElement.width -(barWidth + barSpacing) * (i),app.utilities.canvasElement.height - audioData[i]);
                        app.utilities.drawCtx.quadraticCurveTo(app.utilities.canvasElement.width -(barWidth + barSpacing) * (i), app.utilities.canvasElement.height -audioData[i], app.utilities.canvasElement.width -(barWidth + barSpacing) * (i + 1), app.utilities.canvasElement.height -audioData[i+1]);
                        app.utilities.drawCtx.stroke();
                        app.utilities.drawCtx.closePath();
                    }

                    //rectangles
                    if(rectangles){
                        app.utilities.drawCtx.fillStyle = grad;
                        app.utilities.drawCtx.fillRect(app.utilities.canvasElement.width -i * (barWidth + barSpacing),audioData[i],barWidth,barHeight/5); 
                        app.utilities.drawCtx.fillRect(app.utilities.canvasElement.width -i * (barWidth + barSpacing),app.utilities.canvasElement.height - audioData[i] - barHeight/5,barWidth,barHeight/5); 
                    }
                }
                break;
            
            //default
            default: //nothing
                break;
        }

        //manipulate pixels
        manipulatePixels(app.utilities.drawCtx);

    } 

    //manipulate pixels  - image effects
    function manipulatePixels(ctx){
        
        //get image data from canvas
        let imageData = ctx.getImageData(0,0,app.utilities.canvasElement.width,app.utilities.canvasElement.height);

        let data = imageData.data;
        let length = data.length;
        let width = imageData.width;

        //go through each pixel
        for(let i = 0; i < length; i+=4){
            
            //tint red
            if(tintRed){
                data[i] = (data[i] + 100);
            }
            
            //invert colors
            if(invert){
                let red= data[i], green = data[i+1], blue = data[i+2];
                data[i] = 255 - red;
                data[i+1] = 255 - green;
                data[i+2] = 255 - blue;
            }
            
            //add noise
            if(noise && Math.random() < .04){
                data[i] = data[i+1] = data[i+2] = 128;

                //data[i] = data[i+1] = data[i+2] = 255 //white
                //data[i] = data[i+1] = data[i+2] = 0 //black
                //see on black areas
                data[i+3] = 255;
            }
            
            //make whole thing sepia
            if(sepia){
                let red= data[i], green = data[i+1], blue = data[i+2];
                data[i] = (red * .393) + (green * .769) + (blue * .189);
                data[i + 1] = (red * .349) + (green * .686) + (blue * .168);
                data[i + 2] = (red * .272) + (green * .534) + (blue * .131);
            }
        }

        //show changes
        ctx.putImageData(imageData,0,0);
    }
    
    //init values - set up events
    function init(){
        invert = false;
        tintRed = false;
        noise = false; 
        sepia = false;
        lines = true;
        circles = false;
        rectangles = true;
        curves = true;
        rainbool = false;
        
        //effects functions events
        document.querySelector("#invert").onchange = function(e){
            invert = !invert;
        };
        document.querySelector("#tintRed").onchange = function(e){
            tintRed = !tintRed;
        };
        document.querySelector("#sepia").onchange = function(e){
            sepia = !sepia;
        };
        document.querySelector("#noise").onchange = function(e){
            noise = !noise;
        };
        document.querySelector("#rainbo").onchange = function(e){
           rainbool = !rainbool;
        };
        
        //toggle shapes
        document.querySelector("#circles").onchange = function(e){
            circles = !circles;
        };
        document.querySelector("#curves").onchange = function(e){
            curves = !curves;
        };
        document.querySelector("#lines").onchange = function(e){
            lines = !lines;
        };
        document.querySelector("#rectangles").onchange = function(e){
            rectangles = !rectangles;
        };
    }
    
    //let init and update be called
    return{
        init,
        update
    }
    
})();