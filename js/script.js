const hasla = [
    { haslo: 'MĄDRY POLAK PO SZKODZIE', long: 23, category: 'KATEGORIA: PRZYSŁOWIA POLSKIE' },
    { haslo: 'BEZ PRACY NIE MA KOŁACZY', long: 24, category: 'KATEGORIA: PRZYSŁOWIA POLSKIE' },
    { haslo: 'JAK KUBA BOGU TAK BÓG KUBIE', long: 27, category: 'KATEGORIA: PRZYSŁOWIA POLSKIE' },
    { haslo: 'KAŻDY KIJ MA DWA KOŃCE', long: 22, category: 'KATEGORIA: PRZYSŁOWIA POLSKIE' },
    { haslo: 'DZIECI I RYBY GŁOSU NIE MAJĄ', long: 28, category: 'KATEGORIA: PRZYSŁOWIA POLSKIE' },
    { haslo: 'ŻÓŁĆ', long: 4, category: 'KATEGORIA: KOLOR' },
    { haslo: 'WARSZAWA', long: 8, category: 'KATEGORIA: MIEJSCOWOŚĆ' },
];

let suffledPass, currentPass; 
let HASLO = "";
let pudlo = 0;
let points = 0;

const passwordBoard = document.getElementById('plansza');
const abcBoard = document.getElementById('alfabet');
const hangMan = document.getElementById('szubienica');
const categoryBox = document.getElementById('category');

let yes = new Audio(); yes.src = 'audio/yes.wav';
let no = new Audio();  no.src = 'audio/no.wav';

function addPoint() {
    points++;
    document.getElementById('points').innerHTML = `PUNKTY:${points}`;
}

function WriteNextPassword() {
    HASLO = "";
    for(let i=0; i<suffledPass[currentPass].long; i++) {   
        if(suffledPass[currentPass].haslo.charAt(i) === " ") HASLO = HASLO + " ";
        else HASLO = HASLO + "_";
    }
    writePassword();
}

(function passwordSuffle() {
    suffledPass = hasla.sort(() => Math.random() - .5);
    currentPass = 0;

    WriteNextPassword();
})();

function writePassword() {
    categoryBox.innerHTML = suffledPass[currentPass].category;
    passwordBoard.innerHTML = HASLO;
}

const letter = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];//34

function hang() {
    let picture = `img/s${pudlo}.jpg`;
    hangMan.innerHTML = `<img src="${picture}" alt="" />`;
}

function writeLetter() {
    let inside_div = "";

    for(let i=0; i<letter.length; i++) {
        let element = `lit${i}`;
        inside_div = inside_div + `<div class="litera" onclick="check('${i}')" id="${element}">${letter[i]}</div>`;
        if((i+1) % 7 === 0) inside_div = inside_div + '<div style="clear: both;"></div>'
    }

    abcBoard.innerHTML = inside_div;
}
window.onload = writeLetter;

String.prototype.setChar = function(miejsce, znak) {
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function check(nr) {
    let hit = false;
    const element = document.getElementById(`lit${nr}`);

    for(let i=0; i<suffledPass[currentPass].long; i++) {
        if(suffledPass[currentPass].haslo.charAt(i) === letter[nr]) {
            HASLO = HASLO.setChar(i, letter[nr]);
             hit = true;
        }
    }

    if(hit) {
        element.classList.add('correct');
        element.setAttribute('onclick',';');
        
        yes.play();
        writePassword();
    } else {
        element.classList.add('wrong');
        element.setAttribute('onclick',';');
        pudlo++;

        no.play();
        hang();
    }

    checkCorrect();
}

function newPassword() {
    addPoint();
    if(currentPass == hasla.length - 1) {
        abcBoard.innerHTML = `Koniec haseł <br />Zdobyłeś/aś ${points} punktów<br /><span class="reset" onclick="location.reload()">OD NOWA</span></span>`;
    } else {
        abcBoard.innerHTML = `Tak jest! Podano prawidłowe hasło: ${suffledPass[currentPass].haslo}<br /><br /><span class="reset" onclick="writeLetter(), WriteNextPassword(), hang()">NSTĘPNE HASLO</span></span>`;
        currentPass++;
        pudlo = 0;

        // WriteNextPassword();
    }
}

function checkCorrect() {
    if(HASLO === suffledPass[currentPass].haslo) newPassword();
    else if(pudlo>=10) abcBoard.innerHTML = `Podano nie prawidłowe hasło :(<br />Zdobyłeś/aś ${points} punkty<br /><br /><span class="reset" onclick="location.reload()">OD NOWA</span>`;
}
// console.log(suffledPass);