let greeting = document.getElementById('greeting');
const greetFadeStep = 0.06;
const greetFadeFactorMax = 0.1;
const greetFadeFrames = 30;
let message = document.getElementById('message');
const greetingWord = 'SGklMjBNaWxlbmE=';
const messageWords = [
  'WW91ciUyMHNtaWxlJTIwY2FuJTIwY2hhbmdlJTIwd29ybGRzLiUyMEFuZCUyMGl0JTIwc3VyZSUyMGNoYW5nZWQlMjBtaW5lLiUwQSUwQUhhcHB5JTIwYW5uaXZlcnNhcnklMkMlMjBsb3ZlIQ==',
  'JUQwJUEyJUQwJUIyJUQwJUJFJUQxJThGJUQxJTgyJUQwJUIwJTIwJUQxJTgzJUQxJTgxJUQwJUJDJUQwJUI4JUQwJUIyJUQwJUJBJUQwJUIwJTIwJUQwJUJDJUQwJUJFJUQwJUI2JUQwJUI1JTIwJUQwJUI0JUQwJUIwJTIwJUQwJUJGJUQxJTgwJUQwJUJFJUQwJUJDJUQwJUI1JUQwJUJEJUQwJUI4JTIwJUQxJTgxJUQwJUIyJUQwJUI1JUQxJTgyJUQwJUJFJUQwJUIyJUQwJUI1LiUyMCVEMCU5OCUyMCVEMCVCRSVEMCVCRiVEMSU4MCVEMCVCNSVEMCVCNCVEMCVCNSVEMCVCQiVEMCVCNSVEMCVCRCVEMCVCRSUyMCVEMCVCNSUyMCVEMCVCRiVEMSU4MCVEMCVCRSVEMCVCQyVEMCVCNSVEMCVCRCVEMCVCOCVEMCVCQiVEMCVCMCUyMCVEMSU4MSVEMCVCMiVEMCVCNSVEMSU4MiVEMCVCMCUyMCVEMCVCQyVEMCVCOC4lMEElMEElRDAlQTclRDAlQjUlRDElODElRDElODIlRDAlQjglRDElODIlRDAlQjAlMjAlRDAlQjMlRDAlQkUlRDAlQjQlRDAlQjglRDElODglRDAlQkQlRDAlQjglRDAlQkQlRDAlQjAlMkMlMjAlRDAlQkIlRDElOEUlRDAlQjElRDAlQkUlRDAlQjIlMjAlRDAlQkMlRDAlQkUlRDElOEYh',
  'JUQwJUEyJUQwJUIyJUQwJUJFJUQxJTk4JTIwJUQwJUJFJUQxJTgxJUQwJUJDJUQwJUI1JUQxJTg1JTIwJUQwJUJDJUQwJUJFJUQwJUI2JUQwJUI1JTIwJUQwJUI0JUQwJUIwJTIwJUQwJUJGJUQxJTgwJUQwJUJFJUQwJUJDJUQwJUI1JUQwJUJEJUQwJUI4JTIwJUQxJTgxJUQwJUIyJUQwJUI1JUQxJTgyJUQwJUJFJUQwJUIyJUQwJUI1LiUyMCVEMCU5OCUyMCVEMSU4MSVEMCVCMiVEMCVCMCVEMCVCQSVEMCVCMCVEMCVCQSVEMCVCRSUyMCVEMSU5OCVEMCVCNSUyMCVEMCVCRiVEMSU4MCVEMCVCRSVEMCVCQyVEMCVCNSVEMCVCRCVEMCVCOCVEMCVCRSUyMCVEMCVCQyVEMCVCRSVEMSU5OC4lMEElMEElRDAlQTElRDElODAlRDAlQjUlRDElOUIlRDAlQkQlRDAlQjAlMjAlRDAlQjMlRDAlQkUlRDAlQjQlRDAlQjglRDElODglRDElOUElRDAlQjglRDElODYlRDAlQjAlMkMlMjAlRDElOTklRDElODMlRDAlQjElRDAlQjAlRDAlQjIlRDAlQjgh'
];


let greetFadeIn = () => {
  setTimeout(() => {
    greeting.innerText = decodeURIComponent(atob(greetingWord));
    greeting.style.display = 'block';
    greeting.style.animationPlayState = 'running';

    setTimeout(() => {
      greetFadeOut();
    }, 2000);
  }, 500);
};

let greetFadeOut = () => {
  greeting.style.animationPlayState = 'paused';

  let defaultOpacity = parseFloat(getComputedStyle(greeting).opacity);

  let inc = greetFadeStep;
  let framePause = 1000 / greetFadeFrames;

  let fade = () => {
    if (parseFloat(getComputedStyle(greeting).opacity) <= defaultOpacity * greetFadeFactorMax) {
      clearInterval(fadeInterval);
      greeting.style.display = 'none';
      phase++;

      setTimeout(() => {
        messageShow();
      }, 500);

    } else {
      let currentOpacity = parseFloat(getComputedStyle(greeting).opacity);

      greeting.style.opacity = currentOpacity - inc;

    }
  }

  let fadeInterval = setInterval(fade, framePause);
};

let messageShow = () => {
  let word_i = 1;
  message.innerText = decodeURIComponent(atob(messageWords[0]));

  let pick = () => {
    const word = decodeURIComponent(atob(messageWords[word_i]));
    word_i++;
    word_i %= messageWords.length;
    return word;
  }

  let morphText = () => {
    const morphInterval = setInterval((() => {
      morpher(message.innerText, pick(), (t => {
        message.innerText = t;
      }));
      clearInterval(morphInterval);
      morphText();
    }), 8000);
  }

  message.parentElement.style.display = 'block';
  message.style.display = 'block';
  message.style.animationPlayState = 'running';

  morphText();
};

