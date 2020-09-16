var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var directions = [ 'up', 'down','left','right'];
var grammar = '#JSGF V1.0; grammar directions; public <direction> = ' + directions.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  var direction = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + direction + '.';
  moveBlock(direction)
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that direction(up,down,right,left).";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'), 
        x = 10,
        y = 10, 
        width = 30, 
        height = 30; 

	
function drawRect(x,y,wid,hei) {
    ctx.fillStyle = '#666'; 
    ctx.fillRect(x, y, wid, hei); 
}

drawRect(x,y,width,height); 

function moveBlock(direction) {
  
  if(direction === 'right' && x<=340){ 
      x = x+30; 
  }
  else if(direction === 'left' && x>15){
      x = x-30; 
  }
  else if(direction === 'up' && y>15) {
      y = y-30; 
  }
  else if(direction === 'down' && y<=340){
      y = y+30; 
  }
  
  ctx.clearRect(0,0, 400, 400);

  drawRect(x,y,width,height);
}
