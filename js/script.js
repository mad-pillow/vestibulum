//Go Up button
document.addEventListener('DOMContentLoaded', () => {
   const goUpBtn = document.createElement('div');
   goUpBtn.classList.add('go-up-btn');
   goUpBtn.innerHTML = '<p>GO<br>UP</p>';
   document.body.append(goUpBtn);
   window.addEventListener('scroll', controlGoUpBtn);

   function controlGoUpBtn() {
      if (window.scrollY > 300) {
         goUpBtn.classList.add('show-go-up-btn');
      } else {
         goUpBtn.classList.remove('show-go-up-btn');
      }
   }

   goUpBtn.addEventListener('click', ev => {
      const scrollOptions = {
         left: 0,
         top: 0,
         behavior: 'smooth',
      };

      window.scrollTo(scrollOptions);
   });
});

// Image from HTML to CSS
// TODO Make this code better
document.addEventListener('DOMContentLoaded', () => {
   function testWebP(cb) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         cb(webP.height == 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }

   testWebP(function (support) {
      const imagesHTML = document.getElementsByTagName('img');
      for (let i = 0; i < imagesHTML.length; i++) {
         if (imagesHTML[i].closest('div').matches('.imgtocss')) {
            const pathImg = imagesHTML[i].getAttribute('src');
            const pathWebp = imagesHTML[i].previousSibling.getAttribute('srcset');
            let path = pathImg;
            if (support) {
               path = pathWebp;
            }
            console.log(path);
            imagesHTML[i].parentElement.parentElement.style.backgroundImage = `url("${path}")`;
         }
      }
   });
});

document.addEventListener('DOMContentLoaded', () => {
   //* Prevent text selection
   document.addEventListener('selectstart', ev => {
      ev.preventDefault();
   });

   //* Slider of main screen
   const leftBtn = document.querySelector('.main-slider-container__left-btn');
   const rightBtn = document.querySelector('.main-slider-container__right-btn');
   const picturesContainer = document.querySelector('.main-slider-container__pictures-container');
   const sliderIndicator = document.querySelector('.main-slider-container__ind-item-train');
   let leftPosCounter = 0;
   let leftIndPosCounter = 0;
   rightBtn.addEventListener('click', sliderForward, true);

   function setPicturePos(picPos = 0, indPos = 0) {
      picturesContainer.style.left = picPos * 100 + '%';
      sliderIndicator.style.left = indPos + 'px';
   }

   function controlSliderBtns(counter) {
      switch (counter) {
         case -2:
            leftBtn.classList.remove('main-slider-container__faded-btn');
            rightBtn.classList.add('main-slider-container__faded-btn');
            leftBtn.addEventListener('click', slideBackward, true);
            rightBtn.removeEventListener('click', sliderForward, true);
            break;
         case 0:
            leftBtn.classList.add('main-slider-container__faded-btn');
            rightBtn.classList.remove('main-slider-container__faded-btn');
            rightBtn.addEventListener('click', sliderForward, true);
            leftBtn.removeEventListener('click', slideBackward, true);
            break;
         default:
            leftBtn.classList.remove('main-slider-container__faded-btn');
            rightBtn.classList.remove('main-slider-container__faded-btn');
            leftBtn.addEventListener('click', slideBackward, true);
            rightBtn.addEventListener('click', sliderForward, true);
      }
   }

   function sliderForward() {
      if (leftPosCounter != -2) {
         leftPosCounter -= 1;
         leftIndPosCounter += 70;
         setPicturePos(leftPosCounter, leftIndPosCounter);
      } else {
         leftPosCounter = 0;
         leftIndPosCounter = 0;
         setPicturePos();
      }
      controlSliderBtns(leftPosCounter);
   }

   function slideBackward() {
      if (leftPosCounter < 0) {
         leftPosCounter += 1;
         leftIndPosCounter -= 70;
         setPicturePos(leftPosCounter, leftIndPosCounter);
      }
      controlSliderBtns(leftPosCounter);
   }

   setPicturePos();
   setInterval(sliderForward, 7000);

   //* Sandwich menu control
   const sandwichBtn = document.querySelector('.header-block__sandwich');
   const sandwichPanel = document.querySelector('.header-block__menu-block');
   for (let i = 1; i <= 3; i++) {
      sandwichBtn.insertAdjacentHTML('beforeend', '<div></div>');
   }
   function triggerSandwichPanel() {
      if (sandwichPanel.classList.contains('header-block__menu-block--visible')) {
         sandwichPanel.classList.remove('header-block__menu-block--visible');
         document.body.style.overflow = 'unset';
      } else {
         sandwichPanel.classList.add('header-block__menu-block--visible');
         document.body.style.overflow = 'hidden';
      }
   }
   sandwichBtn.addEventListener('click', triggerSandwichPanel, true);

   //* Small slider for clients logos
   const logosContainer = document.querySelector('.clients-pictures-container__pictures');
   const positionIndicator = document.querySelector('.clients-navigation-container__position');
   const leftBtnSmallSlider = document.querySelector('.clients-navigation-container__left-button');
   const rightBtnSmallSlider = document.querySelector('.clients-navigation-container__right-button');
   const logos = document.querySelectorAll('.clients-pictures-container__item');
   const levelLine = document.querySelector('.clients-navigation-container__level');
   const logosNumber = logos.length;
   let logosPosCounter = 0;
   let naviDotPosCounter = 0;
   let logoMargin = parseInt(getComputedStyle(logos[logosNumber - 1]).getPropertyValue('margin-left'));
   rightBtnSmallSlider.addEventListener('click', sliderForwardSmall, true);

   function setLogoPos(logoPos = 0, dotPos = 0) {
      logosContainer.style.left = `calc(${logoPos * 100}% + ${logoPos * logoMargin}px)`;
      positionIndicator.style.left = dotPos + '%';
   }

   function controlSmallSliderBtns(counter) {
      switch (counter) {
         case -1 * logosNumber + 1:
            leftBtnSmallSlider.classList.remove('clients-navigation-container__faded-btn');
            rightBtnSmallSlider.classList.add('clients-navigation-container__faded-btn');
            leftBtnSmallSlider.addEventListener('click', sliderBackwardSmall, true);
            rightBtnSmallSlider.removeEventListener('click', sliderForwardSmall, true);
            break;
         case 0:
            leftBtnSmallSlider.classList.add('clients-navigation-container__faded-btn');
            rightBtnSmallSlider.classList.remove('clients-navigation-container__faded-btn');
            leftBtnSmallSlider.removeEventListener('click', sliderBackwardSmall, true);
            rightBtnSmallSlider.addEventListener('click', sliderForwardSmall, true);
            break;
         default:
            leftBtnSmallSlider.classList.remove('clients-navigation-container__faded-btn');
            rightBtnSmallSlider.classList.remove('clients-navigation-container__faded-btn');
            leftBtnSmallSlider.addEventListener('click', sliderBackwardSmall, true);
            rightBtnSmallSlider.addEventListener('click', sliderForwardSmall, true);
      }
   }

   function sliderForwardSmall() {
      if (logosPosCounter != -1 * logosNumber + 1) {
         logosPosCounter -= 1;
         naviDotPosCounter += 100 / (logosNumber - 1);
         setLogoPos(logosPosCounter, naviDotPosCounter);
      } else {
         logosPosCounter = 0;
         naviDotPosCounter = 0;
         setLogoPos();
      }
      controlSmallSliderBtns(logosPosCounter);
   }
   function sliderBackwardSmall() {
      if (logosPosCounter < 0) {
         logosPosCounter += 1;
         naviDotPosCounter -= 100 / (logosNumber - 1);
         setLogoPos(logosPosCounter, naviDotPosCounter);
      }
      controlSmallSliderBtns(logosPosCounter);
   }

   setLogoPos();
   setInterval(sliderForwardSmall, 3000);

   //* Load diagrams

   const diagramsBox = document.querySelector('.diagrams-block__diagrams-row');
   const diagrams = diagramsBox.querySelectorAll('.diagrams-block__diagram');
   const diagramValue = diagramsBox.querySelectorAll('span');

   function loadDiagram() {
      diagrams.forEach((diagram, i) => {
         const value = +diagramValue[i].getAttribute('data-value');
         diagram.style.transform = 'rotate(' + value * 1.8 + 'deg)';
         const diagramAnimationDuration = parseFloat(getComputedStyle(diagram).getPropertyValue('transition-duration')) * 100;
         const diagramAnimationStep = value / diagramAnimationDuration;
         let counter = 0;
         const av = setInterval(animateValue, 10);
         function animateValue() {
            counter += diagramAnimationStep;
            if (counter >= value) {
               clearInterval(av);
            }
            diagramValue[i].innerText = Math.round(counter);
         }
      });
   }

   function findDiagram() {
      if (diagramsBox.getBoundingClientRect().top - document.documentElement.clientHeight * 0.7 <= 0) {
         loadDiagram();
         window.removeEventListener('scroll', findDiagram);
      }
   }

   window.addEventListener('scroll', findDiagram);
});
