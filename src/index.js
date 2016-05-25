import raf from 'raf';
import Promise from 'promise-polyfill';

let running = false;

const transformProp = (() => {
  const el = document.createElement('div');
  if(el.style.transform == null) {
    const vendors = ['Webkit', 'Moz', 'ms'];
    for(const vendor in vendors) {
      if(el.style[ vendors[vendor] + 'Transform' ] !== undefined) {
        return vendors[vendor] + 'Transform';
      }
    }
  }

  return 'transform';
})();

const animateTo = (from, to) => {
  const fromSize = parseFloat(window.getComputedStyle(from).fontSize),
        toSize  = parseFloat(window.getComputedStyle(to).fontSize);

  let scale = fromSize / toSize,
      x = from.offsetLeft - to.offsetLeft,
      y = from.offsetTop - to.offsetTop - 1;

  to.style[transformProp] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

  const n = 20;

  const scaleStep = (1.0 - scale) / n,
        xStep     = x / n,
        yStep     = y / n;

  return new Promise((resolve) => {
    (function morph() {
      scale = Math.min(scale + scaleStep, 1.0);
      x     = Math.max(x - xStep, 0);
      y     = Math.max(y - yStep, 0);

      to.style[transformProp] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

      if (scale === 1.0 && x === 0 && y === 0) {
        resolve();
      }
      else {
        raf(morph);
      }
    })();
  });
};

const animateTitle = (el) => {
  const titleElement = document.querySelector('.header-title');

  titleElement.innerHTML = el.innerHTML;
  el.style.opacity = 0;
  titleElement.parentNode.style.opacity = 1;
  titleElement.parentNode.querySelector('.header-description').style.opacity = 0;

  return animateTo(el, titleElement);
};

const hideStuff = (els) => {
  const promises = els.map((el) => {
    return new Promise((resolve) => {
      el.style.opacity = 1;

      (function fade() {
        el.style.opacity -= 0.05;

        if (el.style.opacity > 0) {
          raf(fade);
        }
        else {
          resolve();
        }
      })();
    });
  });

  return Promise.all(promises);
};

const findEverythingElse = function(el) {
  const rv = [];

  while (!el.classList.contains('container')) {
    const current = el;
    el = el.parentNode;

    Array.prototype.forEach.call(el.children, (child) => {
      if (child !== current) {
        rv.push(child);
      }
    });
  }

  return Promise.resolve(
    Array.prototype.slice.apply(rv)
  );
};


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('article-link')) {
    e.preventDefault();

    if (running) {
      return;
    }

    running = true;

    findEverythingElse(e.target)
      .then(hideStuff)
      .then(() => animateTitle(e.target))
      .then(() => {
        location.href = e.target.href;
      })
  }
}, true);

// Fix to force FF reload.
window.onunload = () => {};
