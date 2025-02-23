// script.js
$(document).ready(function() {
    let currentUser   = 'کاربر 1'; // کاربر پیش‌فرض
    let messages = JSON.parse(localStorage.getItem(currentUser )) || []; // بارگذاری پیام‌ها از localStorage

    // انتخاب کاربر
    $('.user').click(function() {
        currentUser   = $(this).data('username');
        $('#userProfile .username').text(currentUser );
        messages = JSON.parse(localStorage.getItem(currentUser )) || []; // بارگذاری پیام‌ها از localStorage
        displayMessages(); // نمایش پیام‌ها
        scrollToBottom();
    });

    $('#sendButton').click(function() {
        const messageText = $('#messageInput').val();
        if (messageText) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            const message = {
                text: messageText,
                sender: 'me',
                time: timestamp
            };
            messages.push(message); // اضافه کردن پیام به آرایه
            localStorage.setItem(currentUser , JSON.stringify(messages)); // ذخیره پیام‌ها در localStorage
            $('#messageInput').val(''); // پاک کردن ورودی پیام
            displayMessages(); // نمایش پیام‌ها
            scrollToBottom();
    
            // ارسال پیام از طرف کاربر دیگر
            setTimeout(function() {
                const replyMessage = `پیام از ${currentUser }`;
                const replyTimestamp =new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                const reply = {
                    text: replyMessage,
                    sender: 'other',
                    time: replyTimestamp
                };
                messages.push(reply); // اضافه کردن پیام پاسخ به آرایه
                localStorage.setItem(currentUser , JSON.stringify(messages)); // ذخیره پیام‌ها در localStorage
                displayMessages(); // نمایش پیام‌ها
                scrollToBottom();
            }, 1000); // 1 ثانیه بعد از ارسال پیام شما
        }
    });

    // نمایش پیام‌ها
    function displayMessages() {
        $('#messages').empty(); // پاک کردن پیام‌ها از DOM
        messages.forEach(function(message) {
            $('#messages').append(`
                <div class="message ${message.sender}">
                    <div class="box-content">
                        <div class="message-content">${message.text}</div>
                        <div class="timestamp">${message.time}</div>
                    </div
                </div>
            `);
        });
    }

    // اسکرول به پایین
    function scrollToBottom() {
        const messagesDiv = $('#messages');
        messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
    }

    // اسکرول به پایین هنگام بارگذاری صفحه
    scrollToBottom();
});