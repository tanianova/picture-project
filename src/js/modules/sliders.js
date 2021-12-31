const sliders = (slides, direction, prev, next) => {
    let slideIndex = 1, //текущий слайд
        paused = false;
    const items = document.querySelectorAll(slides);



    //отвечате за перемещение слайдера
    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;
        }
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';

        });
        items[slideIndex - 1].style.display = 'block';
    }
    showSlides(slideIndex);

    function changeSlide(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', () => {
            changeSlide(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');

        });
        nextBtn.addEventListener('click', () => {
            changeSlide(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch (e) {}

    //автопрокрутка
    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(function () {
                changeSlide(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function () {
                changeSlide(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }

    activateAnimation();

    //если мышка наведена на слайд-автопрокрутка отключается
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};
export default sliders;