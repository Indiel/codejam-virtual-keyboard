let mapKeys = new Map([
    ['Backquote', ['ё', 'Ё', '`', '~', false]],
    ['Digit1', ['1', '!', '1', '!', false]],
    ['Digit2', ['2', '"', '2', '@', false]],
    ['Digit3', ['3', '№', '3', '#', false]],
    ['Digit4', ['4', ';', '4', '$', false]],
    ['Digit5', ['5', '%', '5', '%', false]],
    ['Digit6', ['6', ':', '6', '^', false]],
    ['Digit7', ['7', '?', '7', '&', false]],
    ['Digit8', ['8', '*', '8', '*', false]],
    ['Digit9', ['9', '(', '9', '(', false]],
    ['Digit0', ['0', ')', '0', ')', false]],
    ['Minus', ['-', '_', '-', '_', false]],
    ['Equal', ['=', '+', '=', '+', false]],
    ['Backspace', ['Backspace', 'backspace']],
    ['Tab', ['Tab', 'tab']],
    ['KeyQ', ['й', 'Й', 'q', 'Q', false]],
    ['KeyW', ['ц', 'Ц', 'w', 'W', false]],
    ['KeyE', ['у', 'У', 'e', 'E', false]],
    ['KeyR', ['к', 'К', 'r', 'R', false]],
    ['KeyT', ['е', 'Е', 't', 'T', false]],
    ['KeyY', ['н', 'Н', 'y', 'Y', false]],
    ['KeyU', ['г', 'Г', 'u', 'U', false]],
    ['KeyI', ['ш', 'Ш', 'i', 'I', false]],
    ['KeyO', ['щ', 'Щ', 'o', 'O', false]],
    ['KeyP', ['з', 'З', 'p', 'P', false]],
    ['BracketLeft', ['х', 'Х', '[', '{', false]],
    ['BracketRight', ['ъ', 'Ъ', ']', '}', false]],
    ['Backslash', ['\\', '/', '\\', '|', false]],
    ['Delete', ['Delete', 'delete']],
    ['CapsLock', ['CapsLock', 'capslock']],
    ['KeyA', ['ф', 'Ф', 'a', 'A', false]],
    ['KeyS', ['ы', 'Ы', 's', 'S', false]],
    ['KeyD', ['в', 'В', 'd', 'D', false]],
    ['KeyF', ['а', 'А', 'f', 'F', false]],
    ['KeyG', ['п', 'П', 'g', 'G', false]],
    ['KeyH', ['р', 'Р', 'h', 'H', false]],
    ['KeyJ', ['о', 'О', 'j', 'J', false]],
    ['KeyK', ['л', 'Л', 'k', 'K', false]],
    ['KeyL', ['д', 'Д', 'l', 'L', false]],
    ['Semicolon', ['ж', 'Ж', ';', ':', false]],
    ['Quote', ['э', 'Э', '\'', '"', false]],
    ['Enter', ['Enter', 'enter']],
    ['ShiftLeft', ['ShiftLeft', 'shift']],
    ['KeyZ', ['я', 'Я', 'z', 'Z', false]],
    ['KeyX', ['ч', 'Ч', 'x', 'X', false]],
    ['KeyC', ['с', 'С', 'c', 'C', false]],
    ['KeyV', ['м', 'М', 'v', 'V', false]],
    ['KeyB', ['и', 'И', 'b', 'B', false]],
    ['KeyN', ['т', 'Т', 'n', 'N', false]],
    ['KeyM', ['ь', 'Ь', 'm', 'M', false]],
    ['Comma', ['б', 'Б', ',', '<', false]],
    ['Period', ['ю', 'Ю', '.', '>', false]],
    ['Slash', ['.', ',', '/', '?', false]],
    ['ArrowUp', ['▲', 'arrow']],
    ['ShiftRight', ['ShiftRight', 'shift']],
    ['ControlLeft', ['Ctrl', 'ctrl']],
    ['MetaLeft', ['Win', 'win']],
    ['AltLeft', ['Alt', 'alt']],
    ['Space', ['Space', 'space']],
    ['AltRight', ['Alt', 'alt']],
    ['ArrowLeft', ['◄', 'arrow']],
    ['ArrowDown', ['▼', 'arrow']],
    ['ArrowRight', ['►', 'arrow']],
    ['ControlRight', ['Ctrl', 'ctrl']]
]);
let arrKeys = Array.from(mapKeys.keys());
let keyboardRows = [[0, 14], [14, 29], [29, 42], [42, 55], [55, 64]];

let wrapper = document.createElement('div');
wrapper.className = 'wrapper';

let textarea = document.createElement('textarea');
textarea.className = 'textarea';

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';



let lang;
if (sessionStorage.getItem('lang')) {
    lang = sessionStorage.getItem('lang');
} else {
    lang = 'ru';
    sessionStorage.setItem('lang', lang);
}

function fillKeyboard (arr) {
    let fragment = new DocumentFragment();

    for (let i = 0; i < arr.length; i++) {
        let row = document.createElement('div');
        row.className = 'row';

        row.append(fillRow(arr[i]));
        fragment.append(row);
    }

    return fragment;
}

function fillRow (length) {
    let fragment = new DocumentFragment();
    let current;

    for (let i = length[0]; i < length[1]; i++) {
        current = mapKeys.get(arrKeys[i]);

        let key = document.createElement('button');
        key.className = 'key';
        if (current[current.length - 1]) {
            key.classList.add(current[current.length - 1]);
        }
        key.dataset.key = arrKeys[i];

        let text = document.createElement('span');
        if (key.classList.length < 2) {
            if (lang === 'ru') {
                text.textContent = current[0];
            } else {
                text.textContent = current[2];
            }
        } else {
            text.textContent = current[0];
        }

        key.append(text);
        fragment.append(key);
    }

    return fragment;
}

let fragment = new DocumentFragment();

keyboard.append(fillKeyboard(keyboardRows));
wrapper.append(textarea);
wrapper.append(keyboard);
fragment.append(wrapper);

document.body.appendChild(fragment);



function animate(elem) {
    elem.classList.add('active');
    elem.addEventListener('animationend', function() {
        this.classList.remove('active');
    });
}

let caps = false;
let shift = false;
let keys = Array.from(keyboard.querySelectorAll('.key'));

function changeCase(bool, iActive, i) {
    if (bool) {
        keys.forEach(elem => {
            if (elem.classList.length < 2) {
                elem.textContent = mapKeys.get(elem.dataset.key)[iActive];
            }
        });
    } else {
        keys.forEach(elem => {
            if (elem.classList.length < 2) {
                elem.textContent = mapKeys.get(elem.dataset.key)[i];
            }
        });
    }
}

function write(target) {
    if (target) {
        let iActive = 1;
        let i = 0;
        if (lang === 'en') {
            iActive = 3;
            i = 2;
        }

        switch (target.dataset.key) {
            case 'CapsLock':
                target.classList.toggle('active');
                caps = target.classList.contains('active');
                changeCase(caps, iActive, i);
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                if (caps) {
                    i = [iActive, iActive = i][0];
                }

                if (shift === target || shift === false) {
                    target.classList.toggle('active');
                    if (target.classList.contains('active')) {
                        shift = target;
                    } else {
                        shift = false;
                    }
                }
                changeCase(shift, iActive, i);
                break;
            case 'AltLeft':
            case 'AltRight':
                if (shift) {
                    if (lang === 'ru') {
                        lang = 'en';
                        sessionStorage.setItem('lang', lang);
                        iActive = 3;
                        i = 2;
                    } else {
                        lang = 'ru';
                        sessionStorage.setItem('lang', lang);
                        iActive = 1;
                        i = 0;
                    }

                    if (!caps) {
                        i = [iActive, iActive = i][0];
                    }
                    
                    changeCase(shift, iActive, i);
                    shift.classList.remove('active');
                    shift = false;
                }
                animate(target);
                break;
            case 'Delete':
                let text = textarea.textContent.slice(textarea.selectionStart + 1, textarea.textContent.length);
                textarea.textContent = textarea.textContent.slice(0, textarea.selectionStart) + text;
                animate(target);
                break;
            case 'Backspace':
                textarea.textContent = textarea.textContent.slice(0, -1);
                animate(target);
                break;
            case 'Enter':
                textarea.textContent += '\n';
                animate(target);
                break;
            case 'Tab':
                textarea.textContent += '\t';
                animate(target);
                break;
            case 'Space':
                textarea.textContent += ' ';
                animate(target);
                break;
            default:
                if (target.classList.length < 2) {
                    textarea.textContent += target.textContent;
                    if (shift) {
                        if (!caps) {
                            i = [iActive, iActive = i][0];
                        }
                        
                        changeCase(shift, iActive, i);
                        shift.classList.remove('active');
                        shift = false;
                    }
                }
                animate(target);
                break;
        }
    }
    
}

function mouseDown(evt) {
    textarea.focus();
    let key = evt.target.closest('.key');
    textarea.selectionStart = textarea.value.length;
    write(key);

    if (key && (key.dataset.key !== 'CapsLock' && key.dataset.key !== 'ShiftLeft' && key.dataset.key !== 'ShiftRight')) {
        document.addEventListener('mouseup', function() {
            key.classList.remove('active');
        });
    }
}

keyboard.addEventListener('mousedown', mouseDown);



function keyDown(evt) {
    for (let i = 0; i < keys.length; i++) {
        if (evt.code === keys[i].dataset.key) {
            evt.preventDefault();
            textarea.focus();

            write(keys[i]);
            textarea.selectionStart = textarea.value.length;
            
            if (keys[i] && (keys[i].dataset.key !== 'CapsLock' && keys[i].dataset.key !== 'ShiftLeft' && keys[i].dataset.key !== 'ShiftRight')) {
                document.addEventListener('keyup', function() {
                    keys[i].classList.remove('active');
                });
            }

            return;
        }
    }
}

document.addEventListener('keydown', keyDown);