const chatForm = document.getElementById('chat-form');
const logoutBtn = document.getElementById('logoutBtn');
const chatMsg = document.getElementById('chatMsg');
const clearChatBtn = document.getElementById('clearChatBtn');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
//logout button to move login page
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
});
//new msgs storing into db
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const message = document.getElementById('msg').value;

        const obj = {
            message,
            token
        };
        document.getElementById('msg').value = null;
        const result = await axios.post(`http://localhost:3000/msg`, obj);
        // console.log(result);
    } catch (err) {
        console.log(err);
    }
});
//clearing all chat from the db for a user
clearChatBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const flag = confirm('are sure want to delete the chats?')
        if (flag) {
            await axios.delete(`http://localhost:3000/dltchat`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            window.location.reload;
        }
    } catch (err) {
        console.log(err);
    }
});
//when page refresh msgs retrive from db
(async () => {
    let result;
    setInterval(async () => {
        chatMsg.innerHTML = '';
        result = await axios.get(`http://localhost:3000/msglist`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
        const name = result.data.name;
        for (let i = 0; i < result.data.message.length; i++) {
            // console.log(result.data.message[i].message);
            const p = document.createElement('p');
            p.appendChild(document.createTextNode(`${result.data.name}: ${result.data.message[i].message}`));
            chatMsg.appendChild(p);
        }

        // console.log(name);
    }, 2000);

})();