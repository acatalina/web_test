// Menu

(function setMenu() {
  var header = document.querySelector('header');
  var hamButton = header.querySelector('.ham-button');
  var hamMenu = header.querySelector('.ham-menu');

  var menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;

    if (menuOpen) {
      return hamMenu.style.transform = 'translateX(0)';
    }

    hamMenu.style.transform = 'translateX(100%)';
  }

  hamButton.addEventListener('click', toggleMenu);
})();

// Form interaction

(function formHandler() {
  function whatSelect(e) {
    var value = e.target.value;

    if (value === 'contact') {
      which.classList.toggle('up');
      which.querySelector('select').value = 'removals';
      removals.remove();
      storage.remove();
      return courier.remove();
    }

    head.appendChild(which);
    main.insertBefore(removals, main.lastElementChild);
    which.classList.toggle('down');
    removals.classList.toggle('down');
  }

  function whichSelect(e) {
    var value = e.target.value;

    if (value === 'removals') {
      storage.remove();
      courier.remove();
      removals.classList.add('down');
      return main.insertBefore(removals, main.lastElementChild);
    }
    removals.classList.remove('down');
    removals.classList.add('up');

    if (value === 'storage') {
      removals.remove();
      courier.remove();
      storage.classList.add('down');
      return main.insertBefore(storage, main.lastElementChild);
    }
    storage.classList.remove('down');
    storage.classList.add('up');

    if (value === 'courier') {
      removals.remove();
      storage.remove();
      courier.classList.add('down');
      return main.insertBefore(courier, main.lastElementChild);
    }
    courier.classList.remove('down');
    courier.classList.add('up');
  }

  function upAndDown(e) {
    if (e.animationName === 'godown') {
      e.target.classList.remove('up');
      return e.target.classList.toggle('down');
    }

    e.target.classList.toggle('up');
    e.target.remove();
  }

  var form = document.querySelector('.form');
  var head = form.querySelector('.form-head');
  var what = form.querySelector('[value="what"]');
  var which = form.querySelector('[data-value="which"]');
  var main = form.querySelector('.form-main');
  var removals = form.querySelector('.form-removals');
  var storage = form.querySelector('.form-storage');
  var courier = form.querySelector('.form-courier');

  what.addEventListener('change', whatSelect);
  which.addEventListener('change', whichSelect);
  which.addEventListener('animationend', upAndDown);
  removals.addEventListener('animationend', upAndDown);
  storage.addEventListener('animationend', upAndDown);
  courier.addEventListener('animationend', upAndDown);

  if (what.value === 'quote') {
    switch (which.children[0].value) {
      case 'removals':
        storage.remove();
        courier.remove();
        break;
      case 'storage':
        removals.remove();
        courier.remove();
        break;
      case 'courier':
        removals.remove();
        storage.remove();
        break;
    }
  } else {
    which.remove();
    removals.remove();
    storage.remove();
    courier.remove();
  }
})();

// Smooth scroll

(function applySmoothScroll() {
  function scrollIt(destination, duration = 500) {
    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    var startTime = window.performance.now ? performance.now() : new Date().getTime();
    var offset = screen.width >= 768 ? 190 : 165;

    var main = document.getElementsByClassName('main-wrapper')[0];
    var start = main.scrollTop;
    var documentHeight = Math.max(main.scrollHeight, main.offsetHeight, main.clientHeight, main.scrollHeight, main.offsetHeight);
    var windowHeight = main.clientHeight;
    var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - offset;
    var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    function scroll() {
      var now = window.performance.now ? performance.now() : new Date().getTime();
      var time = Math.min(1, ((now - startTime) / duration));
      var timeFunction = easeInOutQuart(time);
      var scrollTo = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);

      main.scroll(start, scrollTo);

      if (main.scrollTop === destinationOffsetToScroll) return;

      requestAnimationFrame(scroll);
    }

    scroll();
  }

  function scrollToTop() {
    scrollIt(0, 500);
  }

  function scrollToTarget(target) {
    scrollIt(
      document.querySelector(target),
      500
    );
  }

  var quote = document.querySelector('#button-quote');
  var backToTop = document.querySelector('.back-to-top');

  quote.addEventListener('click', function() { scrollToTarget('form') });
  backToTop.addEventListener('click', scrollToTop);
})();
