/* Framer Motion (Motion.dev) animations for the #skills section */
(function () {
  var MOTION_CDN = 'https://cdn.jsdelivr.net/npm/motion@11.15.0/+esm';
  var motionApiPromise = null;
  var activeCleanups = [];
  var hasAnimatedIn = false;

  function prefersCalm() {
    if (document.body && document.body.classList.contains('calm')) return true;
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function clearCleanups() {
    while (activeCleanups.length) {
      var fn = activeCleanups.pop();
      try {
        if (typeof fn === 'function') fn();
      } catch (e) {}
    }
  }

  function loadMotion() {
    if (motionApiPromise) return motionApiPromise;
    try {
      motionApiPromise = import(MOTION_CDN).catch(function () {
        return null;
      });
    } catch (e) {
      motionApiPromise = Promise.resolve(null);
    }
    return motionApiPromise;
  }

  function showImmediately(cards, groups) {
    groups.forEach(function (g) {
      g.style.opacity = '1';
      g.style.transform = 'none';
    });
    cards.forEach(function (c) {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
  }

  function runFallbackAnimation(cards, groups) {
    if (typeof IntersectionObserver !== 'function' || typeof Element.prototype.animate !== 'function') {
      showImmediately(cards, groups);
      return;
    }
    var section = document.getElementById('skills');
    if (!section) return;

    if (!hasAnimatedIn) {
      cards.forEach(function (c) {
        c.style.opacity = '0';
      });
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.disconnect();
          hasAnimatedIn = true;
          cards.forEach(function (c, idx) {
            c.animate(
              [
                { opacity: 0, transform: 'translateY(24px) scale(0.86) rotate(-3deg)' },
                { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' }
              ],
              {
                duration: 480,
                delay: Math.min(idx * 35, 600),
                easing: 'cubic-bezier(0.22, 1.4, 0.36, 1)',
                fill: 'forwards'
              }
            );
            c.style.opacity = '1';
          });
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(section);
    activeCleanups.push(function () {
      obs.disconnect();
    });
  }

  function bindMotion(motion) {
    var section = document.getElementById('skills');
    var grid = document.getElementById('sk');
    if (!section || !grid) return;

    var groups = Array.prototype.slice.call(grid.querySelectorAll('.skg'));
    var headers = Array.prototype.slice.call(grid.querySelectorAll('.skg h4'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.sk'));
    if (!cards.length) return;

    clearCleanups();

    if (prefersCalm()) {
      showImmediately(cards, groups);
      return;
    }

    if (!motion || typeof motion.animate !== 'function') {
      runFallbackAnimation(cards, groups);
      return;
    }

    var animate = motion.animate;
    var stagger = motion.stagger;
    var inView = motion.inView;
    var hover = motion.hover;
    var press = motion.press;

    section.classList.add('skills-motion-ready');

    if (!hasAnimatedIn) {
      groups.forEach(function (g) {
        g.style.opacity = '0';
      });
      cards.forEach(function (c) {
        c.style.opacity = '0';
      });

      var stopInView = inView(
        section,
        function () {
          hasAnimatedIn = true;

          animate(
            groups,
            { opacity: [0, 1], y: [26, 0] },
            {
              duration: 0.5,
              delay: stagger(0.08),
              ease: [0.22, 1, 0.36, 1]
            }
          );

          if (headers.length) {
            animate(
              headers,
              { opacity: [0, 1], x: [-20, 0] },
              {
                type: 'spring',
                stiffness: 280,
                damping: 22,
                delay: stagger(0.08)
              }
            );
          }

          animate(
            cards,
            { opacity: [0, 1], y: [28, 0], scale: [0.82, 1], rotate: [-4, 0] },
            {
              type: 'spring',
              stiffness: 320,
              damping: 21,
              delay: stagger(0.035, { startDelay: 0.08 })
            }
          );

          var icons = grid.querySelectorAll('.sk i, .sk svg');
          if (icons.length) {
            animate(
              icons,
              { scale: [0.65, 1] },
              {
                type: 'spring',
                stiffness: 380,
                damping: 18,
                delay: stagger(0.035, { startDelay: 0.14 })
              }
            );
          }
        },
        { amount: 0.12 }
      );
      if (typeof stopInView === 'function') activeCleanups.push(stopInView);
    } else {
      showImmediately(cards, groups);
    }

    if (typeof hover === 'function') {
      var stopHover = hover(cards, function (el) {
        if (prefersCalm()) return;
        animate(
          el,
          { scale: 1.07, y: -6, rotate: -2 },
          { type: 'spring', stiffness: 420, damping: 18 }
        );
        var icon = el.querySelector('i, svg');
        if (icon) {
          animate(icon, { scale: 1.15, rotate: 6 }, { type: 'spring', stiffness: 420, damping: 16 });
        }
        return function () {
          animate(
            el,
            { scale: 1, y: 0, rotate: 0 },
            { type: 'spring', stiffness: 360, damping: 22 }
          );
          if (icon) {
            animate(icon, { scale: 1, rotate: 0 }, { type: 'spring', stiffness: 360, damping: 20 });
          }
        };
      });
      if (typeof stopHover === 'function') activeCleanups.push(stopHover);
    }

    if (typeof press === 'function') {
      var stopPress = press(cards, function (el) {
        if (prefersCalm()) return;
        animate(
          el,
          { scale: 0.93, y: 0 },
          { type: 'spring', stiffness: 520, damping: 24 }
        );
        return function () {
          animate(
            el,
            { scale: 1.03, y: -2 },
            { type: 'spring', stiffness: 400, damping: 20 }
          );
        };
      });
      if (typeof stopPress === 'function') activeCleanups.push(stopPress);
    }

    var dialog = document.getElementById('skillDialog');
    if (dialog && !dialog.dataset.motionBound) {
      dialog.dataset.motionBound = '1';
      grid.addEventListener('click', function (e) {
        if (prefersCalm()) return;
        if (!e.target.closest('.skill-details-trigger')) return;
        requestAnimationFrame(function () {
          if (dialog.open) {
            animate(
              dialog,
              { opacity: [0, 1], scale: [0.88, 1], y: [18, 0] },
              { type: 'spring', stiffness: 360, damping: 24 }
            );
          }
        });
      });
    }
  }

  function initSkillsMotion() {
    loadMotion().then(function (motion) {
      bindMotion(motion);
    });
  }

  window.initSkillsMotion = initSkillsMotion;

  var skEl = document.getElementById('sk');
  if (skEl && typeof MutationObserver === 'function') {
    var timer = 0;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(initSkillsMotion, 40);
    }).observe(skEl, { childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsMotion, { once: true });
  } else {
    initSkillsMotion();
  }
})();
