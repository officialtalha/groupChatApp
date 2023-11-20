const chatForm = document.getElementById('chat-form');
const logoutBtn = document.getElementById('logoutBtn');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const message = document.getElementById('msg').value;

        const obj = {
            message,
            token
        };

        const result = await axios.post(`http://localhost:3000/msg`, obj);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
});

