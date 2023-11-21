const chatForm = document.getElementById('chat-form');
const logoutBtn = document.getElementById('logoutBtn');
const chatMsg = document.getElementById('chatMsg');
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

        const result = await axios.post(`http://localhost:3000/msg`, obj);
        // console.log(result);
    } catch (err) {
        console.log(err);
    }
});

//when page refresh msgs retrive from db
(async () => {
    const result = await axios.get(`http://localhost:3000/msglist`, {
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
    console.log(name);
})();