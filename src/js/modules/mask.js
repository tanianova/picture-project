const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos); //поставить курсор в определенную позицию
        } else if (elem.createTextRange) { //ручной полифил для IE
            let range = elem.createTextRange(); //диапазон,который нужно выделить

            range.collapse(true); //определяет граничные точки диапазона
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7(___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''), //дефолтное значение
            value = this.value.replace(/\D/g, ''); //то,что ввел пользователь

        if (def.length >= value.length) {
            value = def;
        }
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
        });
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};

export default mask;