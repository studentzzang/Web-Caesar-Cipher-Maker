
// **** Encryption Process **** //
let date = new Date();
let millisec = date.getMilliseconds();

let rotor1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
let rotor2 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split('');
let rotor3 = "OJDKSIRUXBLHWTMCQGZNPYFVAE".split('');

let planeText = "";
let encryptionText; 

//input english only
function englishOnly(e){
    e.value = e.value.replace(/[^A-Za-z\s]/g, '');
}

//input text
function getText(){
    planeText = document.getElementById("input-text").value;
    upperCase(planeText);
}

//text to upperCase
function upperCase(str){
    planeText = str.toUpperCase();
    let planeTextArr = planeText.slice();

    encryption(planeTextArr);
}

//upper text to ascii
function encryption(textArr){

    let encryptArray = makeIndexArray(textArr);
    encryptArray = rotorText(encryptArray, rotor2);

    encryptArray = makeIndexArray(encryptArray);
    encryptArray = rotorText(encryptArray, rotor3);

    encryptionText = encryptArray.join('');
}

// make random index array
function makeIndexArray(str){

    let output = [];

    for(let text of str) {

        if(text === ' ') {
            output.push(' ');
        }

        else {
            let index = (text.charCodeAt() - 'A'.charCodeAt() + millisec) % rotor1.length;
            output.push(index);
        }
        
    }
    return output;
}

// rotor words by rotorIndex
function rotorText(indexArr, rt){
    let output = [];
    
    for (let i of indexArr){
        if(i === ' '){
            output.push(' ');
        }
        else{
            let word = rt[i];
            output.push(word);
        }
        
    }
    return output;
}

document.addEventListener("keypress", function(e){
    let keyCode = e.keyCode;

    let isAlphabetKey = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);

    if(isAlphabetKey){

        keyboardAnimationOn(keyCode);

    } else if(keyCode === 32){ //space bar
        keyboardAnimationOn(32);
    }

});
document.addEventListener("keyup", function(e){
    let keyCode = e.keyCode;

    let isAlphabetKey = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);

    if(isAlphabetKey){

        keyboardAnimationOff(keyCode);

    } else if(keyCode === 32){
        keyboardAnimationOff(32);
    }

});

// *** decryption table change ***
function decrypCode(){

    let viewCode = makeIndexArray(rotor1);
    viewCode = rotorText(viewCode, rotor2);
    viewCode = makeIndexArray(viewCode);
    viewCode = rotorText(viewCode, rotor3);

    var viewCodeArr = [] // A-Z and its Descryption char

    for(var i=0; i < rotor1.length; i++){
        viewCodeArr.push([viewCode[i], rotor1[i]]) 
    }
    
    viewCodeArr.sort();

    // td에 들어갈 해독 코드 일차원배열로 나누기
    var td_decrypChar = []
    for (var i of viewCodeArr){
        td_decrypChar.push(i[1])
    }
    
    const tables = document.querySelectorAll(".decryp-code");
    const table1 = [...tables[0].children, ...tables[1].children]; //childNodes라 하면 text 도 딸려옴!
    const table2 = [...tables[2].children, ...tables[3].children]; //children이라 해야 태그만.

    changeTable(table1, td_decrypChar);
    changeTable(table2, td_decrypChar);
}

function changeTable(tableElements, code){

    //insert table into A-Z
    let index = 0;

    for(let element of tableElements){

        element.innerHTML = code[index];

        index++;
    }
}

decrypCode();


// *** Keyboard Animation *** //

function keyboardAnimationOn(keyCode){

    let id = "key-"+String.fromCharCode(keyCode).toUpperCase();

    if(keyCode === 32){
        
        id = "key-"+"SPACEBAR";
    }

    let sprite = document.getElementById(id);
    
    sprite.style.backgroundPositionX = "50%";

}

function keyboardAnimationOff(keyCode){

    let id = "key-"+ String.fromCharCode(keyCode).toUpperCase();

    if(keyCode === 32){
        
        id = "key-"+"SPACEBAR";
    }

    let sprite = document.getElementById(id);

    sprite.style.backgroundPositionX = "0%";

}

// **** view code button **** //
let viewCodeScreen = document.getElementById('view-code-container');
let viewCodeBtn = document.getElementById('view-code-button');
let viewCodeCloseBtn = document.getElementById('view-code-close');

viewCodeBtn.addEventListener("click",function(){
    viewCodeScreen.style.display = 'block';
    showMask();
});

viewCodeCloseBtn.addEventListener("click", function(){
    viewCodeScreen.style.display = 'none';
    closeMask();
});

// ****** encryption screen 

let encryptionHtml = document.getElementById('encryption');
let encrypScreen = document.getElementById('encryp-container');
let sentBtn = document.getElementById('send-btn');
let encrypCloseBtn = document.getElementById('encryp-close-btn');
let isNotNull;

// open input screen
sentBtn.addEventListener('click', function(){
    isNotNull = document.getElementById('input-text').value !== ''; //input null check

    if(isNotNull){
        encryptionHtml.innerHTML = encryptionText;
        encrypScreen.style.display = 'block';
        showMask();
        showInstallBtn();
    }
});

//close
encrypCloseBtn.addEventListener('click', function(){
    
    encrypScreen.style.display = 'none';
    closeMask();
    closeInstallBtn();
})

//mask display set
let mask = document.querySelector('.mask');
function showMask(){
    mask.style.display ='block';
}

function closeMask(){
    mask.style.display = 'none';
}

// install btn display set
let installBtn = document.querySelector("#install-btn");
function showInstallBtn(){
    installBtn.style.display ='block';
}
function closeInstallBtn(){
    installBtn.style.display ='none';
}

// install encryption image

installBtn.addEventListener("click", function(){
    html2canvas(encrypScreen).then(canvas => {
        saveImg(canvas.toDataURL('image/jpg'), 'image.jpg');
    });
});

const saveImg = (uri, filename) => {
    let link = document.createElement('a');

    document.body.appendChild(link);

    link.href = uri;
    link.download = filename;
    link.click();

    document.body.removeChild(link);
  };



