(() => {
  const HIDDEN_CLASS = 'app-popover--hidden';
  const DANCE_IMAGES = [
    './conan-colbert.gif',
    './dance-for-beer.gif',
    './dance-off.gif',
    './dancing-in-public.gif',
    './do-the-kenneth.gif',
  ];

  const popover = document.querySelector('.app-popover');
  const image = popover.querySelector('.app-popover__image');
  const closeButton = document.querySelector('.app-popover__close');
  const openButton = document.querySelector('.button');

  const getRandomIndex = arr => Math.floor(Math.random() * arr.length);

  openButton.addEventListener('click', event => {
    image.src = DANCE_IMAGES[getRandomIndex(DANCE_IMAGES)];
    popover.classList.remove(HIDDEN_CLASS);
  });

  closeButton.addEventListener('click', event => {
    popover.classList.add(HIDDEN_CLASS);
  });
})();
