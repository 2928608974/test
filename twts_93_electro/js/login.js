const nav = document.getElementsByClassName('nav');
const forms = document.getElementsByClassName('forms')[0];
const form = document.getElementsByClassName('form');
const mobile = document.getElementsByClassName('mobile');
const sendBtn = document.getElementsByClassName('send-btn')[0];
const loginBtn = document.getElementsByClassName('login-btn');
const authCode = document.getElementsByClassName('auth-code')[0];
const password = document.getElementsByClassName('password')[0];
const mobileError = document.getElementsByClassName('mobile-error');
const authCodeError = document.getElementsByClassName('auth-code-error')[0];
const passwordError = document.getElementsByClassName('password-error')[0];

const mobileReg = new RegExp('^1[3-9][0-9]{9}$', 'g');
let tryed = false;
let countDownValue = 60;

nav[0].addEventListener('click', () => {
    toggleTab(0);
});
nav[1].addEventListener('click', () => {
    toggleTab(1);
});
mobile[0].addEventListener('keyup', () => {
    checkSendValid();
    checkLoginValid(0);
    if (tryed) {
        checkMobileValid(0);
    }
});
mobile[1].addEventListener('keyup', () => {
    checkLoginValid(1);
    if (tryed) {
        checkMobileValid(1);
    }
});
authCode.addEventListener('keyup', () => {
    checkSendValid();
    checkLoginValid(0);
    if (tryed) {
        checkAuthCodeValid();
    }
});
password.addEventListener('keyup', () => {
    checkLoginValid(1);
    if (tryed) {
        checkPasswordValid();
    }
});
sendBtn.addEventListener('click', () => {
    if (mobile[0].value.match(mobileReg)) {
        countDown();
    }
});
loginBtn[0].addEventListener('click', () => {
    tryed = true;
    alert(`手机号：${mobile[0].value}\n验证码：${authCode.value}`);
});
loginBtn[1].addEventListener('click', () => {
    tryed = true;
    alert(`手机号：${mobile[1].value}\n密码：${password.value}`);
});

function toggleTab (i) {
    const j = i === 1 ? 0 : 1;

    removeClass(nav[j], 'active');
    removeClass(form[j], 'active');
    removeClass(forms, `top-radius-${j}`);

    addClass(nav[i], 'active');
    addClass(form[i], 'active');
    addClass(forms, `top-radius-${i}`);
}

function checkSendValid () {
    let btn = true;
    if (mobile[0].value.match(mobileReg)) {
        btn = false;
    }
    sendBtn.disabled = btn;
}

function checkLoginValid (i) {
    let btn = true;
    if (mobile[i].value.match(mobileReg)) {
        if ((i === 0 && authCode.value) || (i === 1 && password.value)) {
            btn = false;
        }
    }
    loginBtn[i].disabled = btn;
}

function checkMobileValid (i) {
    if (mobile[i].value.match(mobileReg)) {
        removeClass(mobileError[i], 'shown');
    } else if (!mobileError[i].className.match(/ shown/g)) {
        addClass(mobileError[i], 'shown');
    }
}

function checkAuthCodeValid () {
    if (authCode.value) {
        removeClass(authCodeError, 'shown');
    } else if (!authCodeError.className.match(/ shown/g)) {
        addClass(authCodeError, 'shown');
    }
}

function checkPasswordValid () {
    if (password.value) {
        removeClass(passwordError, 'shown');
    } else if (!passwordError.className.match(/ shown/g)) {
        addClass(passwordError, 'shown');
    }
}

function countDown () {
    if (countDownValue <= 0) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '获取验证码'
        countDownValue = 60;
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerHTML = `${countDownValue} 秒后重试`;

    setTimeout(() => {
        --countDownValue;
        countDown();
    }, 1000);
}

function removeClass (obj, cls) {
    const reg = new RegExp(`${cls}`, 'g');
    obj.className = obj.className.replace(reg, '')
}

function addClass (obj, cls) {
    obj.className += ` ${cls}`;
}
