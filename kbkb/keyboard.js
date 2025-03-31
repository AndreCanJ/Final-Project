let keys = [];
let keyWidth = 40;
let keyHeight = 30;
let keySpacing = 6;
let layouts = [
  [
    '1234567890',
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ],
  [
    '1234567890',
    'AZERTYUIOP',
    'QSDFGHJKLM',
    'WXCVBN'
  ]
];
let selectedLayoutIndex = 0;

let pressedKey = '';
let sentenceChars = [];
let capsLock = false;

document.documentElement.style.setProperty('--bg', '#f4f4f4');
document.documentElement.style.setProperty('--text', '#000');
document.documentElement.style.setProperty('--key', '#fff');
document.documentElement.style.setProperty('--key-active', '#ffa');

function setup() {
  createCanvas(700, 350);

  let themeSelect = createSelect();
  themeSelect.position(280, 10);
  themeSelect.option('Light');
  themeSelect.option('Dark');
  themeSelect.option('High Contrast');
  themeSelect.changed(() => {
    const theme = themeSelect.value();
    if (theme === 'Light') {
      document.documentElement.style.setProperty('--bg', '#f4f4f4');
      document.documentElement.style.setProperty('--text', '#000');
      document.documentElement.style.setProperty('--key', '#fff');
      document.documentElement.style.setProperty('--key-active', '#ffa');
    } else if (theme === 'Dark') {
      document.documentElement.style.setProperty('--bg', '#1e1e1e');
      document.documentElement.style.setProperty('--text', '#eee');
      document.documentElement.style.setProperty('--key', '#333');
      document.documentElement.style.setProperty('--key-active', '#555');
    } else if (theme === 'High Contrast') {
      document.documentElement.style.setProperty('--bg', '#000');
      document.documentElement.style.setProperty('--text', '#fff');
      document.documentElement.style.setProperty('--key', '#000');
      document.documentElement.style.setProperty('--key-active', '#0f0');
    }
  });

  textAlign(CENTER, CENTER);
  textSize(20);

  let layoutSelect = createSelect();
  layoutSelect.position(20, 10);
  layoutSelect.option('QWERTY', 0);
  layoutSelect.option('AZERTY', 1);
  layoutSelect.changed(() => {
    selectedLayoutIndex = int(layoutSelect.value());
  });

  let outputBox = createInput('');
  outputBox.position(CENTER, 100);
  outputBox.size(660);
  outputBox.attribute('readonly', true);
  outputBox.id('outputBox');
}

function draw() {
  background(getComputedStyle(document.documentElement).getPropertyValue('--bg'));
  let textColor = getComputedStyle(document.documentElement).getPropertyValue('--text');
  fill(textColor);

  textSize(24);
  textAlign(LEFT, CENTER);
  // text(sentenceChars.join(''), 20, 20);
  textAlign(CENTER, CENTER);
  drawKeyboard();
  select('#outputBox').value(sentenceChars.join(''));
}

function drawKeyboard() {
  let offsetY = 60;
  let rows = layouts[selectedLayoutIndex];
  for (let r = 0; r < rows.length; r++) {
    let row = rows[r];
    let offsetX = (width - row.length * (keyWidth + keySpacing)) / 2;
    for (let i = 0; i < row.length; i++) {
      let key = capsLock ? row[i].toUpperCase() : row[i].toLowerCase();
      let x = offsetX + i * (keyWidth + keySpacing);
      let y = offsetY + r * (keyHeight + keySpacing);
      drawKey(x, y, keyWidth, keyHeight, key, pressedKey === key);
    }
  }

  let extraRowY = offsetY + 4 * (keyHeight + keySpacing);

  let spaceWidth = 300;
  let sideWidth = 80;
  let capsX = (width - spaceWidth) / 2 - sideWidth - keySpacing;
  let deleteX = (width + spaceWidth) / 2 + keySpacing;
  let capsY = extraRowY;
  let spaceX = (width - spaceWidth) / 2;
  let spaceY = capsY;

  drawKey(capsX, capsY, sideWidth, keyHeight, 'Caps', pressedKey === 'Caps Lock' || capsLock);
  drawKey(spaceX, spaceY, spaceWidth, keyHeight, 'Space', pressedKey === 'Space');
  drawKey(deleteX, capsY, sideWidth, keyHeight, 'Delete', pressedKey === 'Delete');

  // Speech Key
  let speakWidth = 80;
  let speakX = (width - speakWidth) / 2;
  let speakY = extraRowY + keyHeight + keySpacing;
  drawKey(speakX, speakY, speakWidth, keyHeight, 'Speak', pressedKey === 'Speak');
}

function drawKey(x, y, w, h, label, active) {
  stroke(100);
  fill(getComputedStyle(document.documentElement).getPropertyValue(active ? '--key-active' : '--key'));

  rect(x, y, w, h, 6);
  fill(getComputedStyle(document.documentElement).getPropertyValue('--text')); noStroke();
  textSize(20);
  text(label, x + w / 2, y + h / 2);
}

function keyPressed() {
  if (key === 'Backspace') {
    pressedKey = 'Delete';
    if (sentenceChars.length > 0) sentenceChars.pop();
  } else if (key === ' ') {
    pressedKey = 'Space';
    sentenceChars.push(' ');
  } else if (key === 'CapsLock') {
    capsLock = !capsLock;
    pressedKey = 'Caps Lock';

  } else if (/^[a-zA-Z0-9]$/.test(key)) {
    const char = capsLock ? key.toUpperCase() : key.toLowerCase();
    pressedKey = capsLock ? key.toUpperCase() : key.toLowerCase();
    sentenceChars.push(char);
  } else {
    pressedKey = '';
  }
}

function mousePressed() {
  let offsetY = 60;
  let rows = layouts[selectedLayoutIndex];
  for (let r = 0; r < rows.length; r++) {
    let row = rows[r];
    let offsetX = (width - row.length * (keyWidth + keySpacing)) / 2;
    for (let i = 0; i < row.length; i++) {
      let key = capsLock ? row[i].toUpperCase() : row[i].toLowerCase(); let x = offsetX + i * (keyWidth + keySpacing);
      let y = offsetY + r * (keyHeight + keySpacing);
      if (mouseX > x && mouseX < x + keyWidth && mouseY > y && mouseY < y + keyHeight) {
        if (key !== 'Back') {
          pressedKey = key;
          sentenceChars.push(capsLock ? key : key.toLowerCase());
        }
        return;
      }
    }
  }

  let sideWidth = 80;
  let extraRowY = offsetY + 4 * (keyHeight + keySpacing);
  let spaceWidth = 300;


  let capsY = extraRowY;
  let capsX = (width - spaceWidth) / 2 - sideWidth - keySpacing;

  let spaceX = (width - spaceWidth) / 2;
  let spaceY = capsY;
  
  let backspaceX = (width + spaceWidth) / 2 + keySpacing;

  let speakWidth = 80;
  let speakX = (width - speakWidth) / 2;
  let speakY = extraRowY + keyHeight + keySpacing;

  // Caps Lock
  if (mouseX > capsX && mouseX < capsX + 80 && mouseY > capsY && mouseY < capsY + keyHeight) {
    capsLock = !capsLock;
    pressedKey = 'Caps Lock';
    return;
  }

  // Backspace
  if (mouseX > backspaceX && mouseX < backspaceX + 80 && mouseY > capsY && mouseY < capsY + keyHeight) {
    pressedKey = 'Delete';
    sentenceChars.pop();
    return;
  }

  // Spacebar

  if (mouseX > spaceX && mouseX < spaceX + spaceWidth && mouseY > spaceY && mouseY < spaceY + keyHeight) {
    pressedKey = 'Space';
    sentenceChars.push(' ');
    return;
  }

  // Speak Button
  if (mouseX > speakX && mouseX < speakX + speakWidth && mouseY > speakY && mouseY < speakY + keyHeight) {
    pressedKey = 'Speak';
    startSpeechRecognition();
    return;
  }
}

function startSpeechRecognition() {
  console.log('Starting speech recognition...');
  if (!('webkitSpeechRecognition' in window)) {
    alert('Speech recognition not supported in this browser.');
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    for (let char of transcript) {
      sentenceChars.push(char);
    }
    pressedKey = '';
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.start();
}