import raf from 'raf';
import Promise from 'promise-polyfill';

let running = false;

const animateTitle = function(el) {
  return Promise.resolve();
};

const hideStuff = function(els) {
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
      .then(() => location.href = e.target.href);
  }
}, true);
