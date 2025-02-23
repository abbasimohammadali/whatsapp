const user = document.querySelectorAll('.user')
const page_start = document.querySelector('.page-start')
const content_user = document.querySelector('.content-user')
const image_chat = document.querySelector('.profile-pic img')
const name_user_chat = document.querySelector('.Information-user h2')
const cheng_messageInput = document.querySelector('#messageInput')

user.forEach(function (event) {
    event.addEventListener('click', function (e) {

        const userImage = event.querySelector('.profile-user img').src;
        image_chat.setAttribute('src', userImage);

        const userName = event.querySelector('.details-user h2').textContent
        name_user_chat.innerHTML = userName;

        page_start.style.display = 'none'
        content_user.style.display = 'block'
    })
})

cheng_messageInput.addEventListener('input', function () {
    document.querySelector('.send-sound').style.display = 'none'
    document.querySelector('.send').style.display = 'block'
    if (cheng_messageInput.value === '') {
        document.querySelector('.send-sound').style.display = 'block'
        document.querySelector('.send').style.display = 'none'
    }
})

function showMessage() {
    if (window.innerWidth < 1300) {
        document.getElementById("message").innerText = 'سایز مرورگر کمتراز حد مجاز است .';
        document.getElementById("message").style.display = 'flex'
        document.querySelector('.row').style.display = 'none'
    }
}

window.onload = showMessage;
