let screen=document.getElementById("screen");
let textStr=document.getElementById("screen").value;
let pressedCAPS=false, pressedShift=false, calledKeybord=false, pressedSound=false;
let buttons = document.getElementsByClassName("button");
let letters = document.getElementsByClassName("letter");
let numbers = document.getElementsByClassName("number");
let chars = document.getElementsByClassName("char");
let showKeybord=document.getElementById("call-keybord");
var audio = new Audio();

let language=document.getElementsByClassName("language")[0].textContent;

const lettersRu = [
    "й", "ц", "у", "к", "е","н", "г", "ш", "щ","з",
    "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "я", "ч",  "с", "м", "и", "т", "ь",
];

const charsRu = [
   "б", "ю", "ж", "э", "х", "ъ",
];

const charsEn = [
    ",",".", "-", "+", "=", "/",
];

const lettersEn = [
    "q", "w", "e", "r", "t", "y","u", "i", "o", "p", "a",
    "s","d", "f","g","h", "j", "k", "l", "z", "x", "c", "v","b", "n", "m",
];

const numbersNormal = [
    "1","2", "3","4","5", "6","7","8", "9","0",
];

const numbersShifted = [
   "!", "\"","#", ";", "%", ":", "?","*", "(", ")",
];

showKeybord.addEventListener('click', callKeybord);
  for (let i = 0, len = buttons.length; i < len; i++) {
    buttons[i].addEventListener("click", function(event) {
      handleInput(event.target.innerHTML);
     
    }, false);
  }
  
 
  
  
  function callKeybord(e){
     
      if(!calledKeybord){
          document.getElementsByClassName("wrap")[0].setAttribute("style","display: block;");
          calledKeybord=true;
      }
      else{ 
          document.getElementsByClassName("wrap")[0].setAttribute("style","display: none;");
          calledKeybord=false;
      }
    
  }

  function handleInput(input) {
    
    textStr=document.getElementById("screen").value;
    switch(type(input)) {
      case "letter":
          if(pressedSound){
              if(language=document.getElementsByClassName("language")[0].textContent==="en")
                audio.src="eng.mp3";
              else audio.src="rus.mp3";
            audio.autoplay=true;
          }
        
        handleLetter(input);
        break;
      case "↲":
        if(pressedSound){
            audio.src="enter.mp3";
            audio.autoplay=true;
        }
        handleNewLine();
        break;
      case "⌫":
        if(pressedSound){
            audio.src="backspace.mp3";
            audio.autoplay=true;
        }
        handleBcksp();
        break;
      case "shift":
        if(pressedSound){
            audio.src="shift.mp3";
            audio.autoplay=true;
        }
        handleShift();
        break;
      case "space":
        if(pressedSound){
            if(language=document.getElementsByClassName("language")[0].textContent==="en")
                audio.src="eng.mp3";
              else audio.src="rus.mp3";
            audio.autoplay=true;
        }
        handleSpace();
        break;
      case "⇧":
        if(pressedSound){
            audio.src="caps.mp3";
            audio.autoplay=true;
        }
        handleCAPS();
        break;
      case "character":
        if(pressedSound){
            if(language=document.getElementsByClassName("language")[0].textContent==="en")
                audio.src="eng.mp3";
              else audio.src="rus.mp3";
            audio.autoplay=true;
        }
        handleCharacter(input);
        break;
      case "en":
        if(pressedSound){
            audio.src="rus.mp3";
            audio.autoplay=true;
        }
        handleEn();
        break;
      case "ru":
        if(pressedSound){
            audio.src="eng.mp3";
            audio.autoplay=true;
        }
        handleRu();
        break;
      case "⟵":
        if(pressedSound){
            if(language=document.getElementsByClassName("language")[0].textContent==="en")
                audio.src="eng.mp3";
              else audio.src="rus.mp3";
            audio.autoplay=true;
        }
          handleLeft();
          break;
      case "⟶":
        if(pressedSound){
            if(language=document.getElementsByClassName("language")[0].textContent==="en")
                audio.src="eng.mp3";
              else audio.src="rus.mp3";
            audio.autoplay=true;
        }
          handleRight();
          break;
      case "🔈":{
          handleSound();
          break;
      }
    }
    
  }

  function type(input) {
    
    if (input === "⇧" || input === "space" || input==="⌫" || 
    input==="↲" || input==="shift" || input==="en" || input==="ru" || input==="⟵" || input==="⟶" || input=="🔈") {
        return input;
    }
    else if (input.search(/[A-Za-zА-Яа-я0-9.,?!:;]/) !== -1){
      return "letter";
    } 
    else {
      return "character";
    }
}

function display(result) {
    document.getElementsByClassName("use-keyboard-input")[0].innerHTML = result;    
}

function handleLetter(input) {
    let str=input;
    if(pressedCAPS){
        if(!pressedShift)str=str.toUpperCase();
        else {
            str=str.toLowerCase();
        }
        setRange(input);

    }
    else{
        if(!pressedShift)str=str.toLowerCase();
        else {
            str=str.toUpperCase();
        }
        setRange(input);

    } 
    if(pressedShift)handleShift();
}

function handleCharacter(input){
    setRange(input);

    if(pressedShift)handleShift();
}

function handleNewLine() {
    setRange("\n");

}

function handleSpace() {
    setRange(" ");

}

function handleBcksp() {
    let sStart, sEnd;
    sStart=screen.selectionStart;
    sEnd=screen.selectionEnd;
    let newStr="";
    newStr+=textStr.slice(0,screen.selectionStart-1);
    newStr+=textStr.slice(screen.selectionEnd);
    textStr=newStr;
    
    screen.value="";
    screen.value=textStr;

    screen.setRangeText("", sStart-1, sEnd-1, "end");
    textStr=screen.value;
    screen.focus();
    display(textStr);
}

function handleCAPS() {
    if(!pressedCAPS){
        pressedCAPS=true;
        limeStyle("capslock");

        upperCase();
        
    }
    else{
        pressedCAPS=false;
        lightgreenStyle("capslock");
    
        lowerCase();
    } 
}

function handleShift() {
    if(!pressedShift){
        pressedShift=true;
        limeStyle("shift");

        if(!pressedCAPS){
            upperCase();
        }
        else{
            lowerCase();
        }
        

        for(let i=0;i<numbers.length;i++){
            numbers[i].textContent = numbersShifted[i];
        }
    }
    else{
        pressedShift=false;
        lightgreenStyle("shift");
    
        if(!pressedCAPS){
            lowerCase();
        }
        else{
            upperCase();
        }
        
        for(let i=0;i<numbers.length;i++){
            numbers[i].textContent = numbersNormal[i];
        }
    } 
}

function handleEn(){
    for(let i=0;i<letters.length;i++){
        letters[i].textContent = lettersRu[i];
    }

    for(let i=0;i<chars.length;i++){
        chars[i].textContent = charsRu[i];
    }

    document.getElementsByClassName("language")[0].textContent="ru";
}

function handleRu(){
    
    for(let i=0;i<letters.length;i++){
        letters[i].textContent = lettersEn[i];
    }

    for(let i=0;i<chars.length;i++){
        chars[i].textContent = charsEn[i];
    }

    document.getElementsByClassName("language")[0].textContent="en";
}

function handleLeft(){
    screen.setRangeText("", screen.selectionStart-1, screen.selectionEnd-1, "end");
    textStr=screen.value;
    screen.focus();
}

function handleRight(){
    screen.setRangeText("", screen.selectionStart+1, screen.selectionEnd+1, "end");
    textStr=screen.value;
    screen.focus();
}

function handleSound(){
    if(!pressedSound){
        pressedSound=true;
        limeStyle("sound");
    }
    else{
        pressedSound=false;
        lightgreenStyle("sound");
    } 
}


function upperCase(){
    for (let i = 0, len = letters.length; i < len; i++){
        letters[i].innerHTML=letters[i].textContent.toUpperCase();
    }
    if(document.getElementsByClassName("language")[0].textContent==="ru"){
        for (let i = 0, len = chars.length; i < len; i++){
            chars[i].innerHTML=chars[i].textContent.toUpperCase(); 
        }    
    }
}

function lowerCase(){
    for (let i = 0, len = letters.length; i < len; i++){
        letters[i].innerHTML=letters[i].textContent.toLowerCase();
    }
    if(document.getElementsByClassName("language")[0].textContent==="ru"){
        for (let i = 0, len = chars.length; i < len; i++){
            chars[i].innerHTML=chars[i].textContent.toLowerCase(); 
        }    
    }
}

function lightgreenStyle(id){
    document.getElementById(id).setAttribute
    ("style","background-color:  lightgreen;");
}

function limeStyle(id){
    document.getElementById(id).setAttribute
    ("style","background-color: lime;");
}

function setRange(character){
    screen.setRangeText(character, screen.selectionStart, screen.selectionEnd, "end");
    textStr=screen.value;
    screen.focus();

    display(textStr);
}