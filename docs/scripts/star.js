let star = document.getElementById('star');
const starDefaultSize = star.parentElement.getBoundingClientRect();
const starPopFactor = 1.06;
const starPopFactorMax = 1.6;
const starPopFrames = 30;
const starMoveFactors = [0.01, 0.02];
let starMoveInterval = null;
let targetPos = {};
let guide = document.getElementById('guide');


let guideWords = [
  'Click on the star to continue',
  'Click the star again!',
  'OK, one last time!'
];
guide.innerText = guideWords[0];

let starMove = (inc) => {
  let currentPos = star.parentElement.getBoundingClientRect();

  let d_x = targetPos.x - (currentPos.left + currentPos.width / 2);
  let d_y = targetPos.y - (currentPos.top + currentPos.height / 2);
  let d_target = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));

  if (d_target < inc) {
    
    targetPos = starNewTarget();

  } else {
    // Proportion:
    // inc / d_target == move_x / d_x

    incStep = {
      x: inc * d_x / d_target,
      y: inc * d_y / d_target
    };

    star.parentElement.style.transform = 'none';
    star.parentElement.style.left = (currentPos.left + incStep.x) + 'px';
    star.parentElement.style.top = (currentPos.top + incStep.y) + 'px';
  }
};

let starMoveStop = (starMoveInterval) => {
  if (starMoveInterval != null) {
    clearInterval(starMoveInterval);
    starMoveInterval = null;
  }
};

let starPop = (handleOffset, handlerAfter) => {
  star.style.animationPlayState = 'paused';

  let defaultStyle = star.parentElement.getBoundingClientRect();

  let inc = starPopFactor;
  let framePause = 1000 / starPopFrames;

  let pop = () => {
    let currentStyle = star.parentElement.getBoundingClientRect();

    if (currentStyle.width >= defaultStyle.width * starPopFactorMax) {
      clearInterval(popInterval);
      
      star.style.display = 'none';
      star.style.width = defaultStyle.width + 'px';
      if (handleOffset) {
        star.parentElement.style.left = defaultStyle.left + 'px';
        star.parentElement.style.top = defaultStyle.top + 'px';
      }
      star.style.animationPlayState = 'running';

      handlerAfter();

    } else {
      star.style.width = currentStyle.width * inc + 'px';

      if (handleOffset) {
        let cur_p = star.parentElement.getBoundingClientRect();
        star.parentElement.style.left = cur_p.left - cur_p.width * (inc - 1) / 2 + 'px';
        star.parentElement.style.top = cur_p.top - cur_p.height * (inc - 1) / 2 + 'px';
      }
    }
  }

  let popInterval = setInterval(pop, framePause);
};

let starNewPosition = () => {
  // get dimensions of the environment
  let w = document.body.clientWidth;
  let h = document.body.clientHeight;
  let minMarginPart = 0.1;

  // set margins
  let xMargin = starDefaultSize.width * starPopFactor;
  if (xMargin < minMarginPart * w) xMargin = minMarginPart * w;
  let yMargin = starDefaultSize.height * starPopFactor;
  if (yMargin < minMarginPart * h) yMargin = minMarginPart * h;

  // place somewhere within the margins
  let star_pos = {
    x: Math.random() * (w - xMargin * 2) + xMargin,
    y: Math.random() * (h - yMargin * 2) + yMargin
  };

  star.style.display = 'block';
  star.parentElement.style.transform = 'none';
  star.parentElement.style.left = star_pos.x + 'px';
  star.parentElement.style.top = star_pos.y + 'px';

  return null;
};

// set coordinates to move to, based on the target element
let starNewTarget = () => {
  let w = document.body.clientWidth;
  let h = document.body.clientHeight;
  let targetPos = {
    x: Math.random() * (0.8 * w) + 0.1 * w,
    y: Math.random() * (0.8 * h) + 0.1 * h
  };

  return targetPos;
};

let starHandleClick = (_) => {

  let w = document.body.clientWidth;
  let h = document.body.clientHeight;

  switch (phase) {
    case 1:
      guide.style.display = 'none';
      starPop(false, () => {
        setTimeout(() => {
          starNewPosition();
          targetPos = starNewTarget();
          guide.innerText = guideWords[1];
          guide.style.display = 'block';
          starMoveInterval = setInterval(() => {
            starMove(Math.ceil(starMoveFactors[0] * Math.min(w, h)));
          }, 33);
          phase++;

        }, 500);
      });
      break;
    case 2:
      guide.style.display = 'none';
      starPop(true, () => {
        setTimeout(() => {
          starMoveStop(starMoveInterval);
          starNewPosition();
          targetPos = starNewTarget();
          guide.innerText = guideWords[2];
          guide.style.display = 'block';
          starMoveInterval = setInterval(() => {
            starMove(Math.ceil(starMoveFactors[1] * Math.min(w, h)));
          }, 33);
          phase++;

        }, 500);
      });
      break;
    default:
      guide.style.display = 'none';
      starPop(true, () => {
        setTimeout(() => {
          starMoveStop(starMoveInterval);
          star.parentElement.removeEventListener('click', starHandleClick);
          phase++;

          greetFadeIn();

        }, 500);
      });
  }
};
