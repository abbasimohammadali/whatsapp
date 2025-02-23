$(document).ready(function () {
    let currentUser = 'کاربر 1';
    let messages = JSON.parse(localStorage.getItem(currentUser)) || [];

    $('.user').click(function () {
        currentUser = $(this).data('username');
        $('#userProfile .username').text(currentUser);
        messages = JSON.parse(localStorage.getItem(currentUser)) || [];
        displayMessages();
        scrollToBottom();
    });

    function sendMessage() {
        const messageText = $('#messageInput').val();
        if (messageText) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            const message = {
                text: messageText,
                sender: 'me',
                time: timestamp
            };
            messages.push(message);
            localStorage.setItem(currentUser, JSON.stringify(messages));
            $('#messageInput').val('');
            displayMessages();
            scrollToBottom();

            setTimeout(function () {
                const replyMessage = `پیام از ${currentUser}`;
                const replyTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                const reply = {
                    text: replyMessage,
                    sender: 'other',
                    time: replyTimestamp
                };
                messages.push(reply); 
                localStorage.setItem(currentUser, JSON.stringify(messages));
                displayMessages(); 
                scrollToBottom();
            }, 1000); 
        }
    }

    $('#sendButton').click(function () {
        sendMessage();
    });

    $('#messageInput').keydown(function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function displayMessages() {
        $('#messages').empty();
        messages.forEach(function (message) {
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

    function scrollToBottom() {
        const messagesDiv = $('#messages');
        messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
    }

    scrollToBottom();
});
