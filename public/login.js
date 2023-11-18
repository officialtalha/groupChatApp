const loginForm = document.getElementById('login-form');
const messageHeading = document.getElementById('messageHeading');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('pass').value;
        const obj = {
            username,
            password
        }
        const result = await axios.post(`http://localhost:3000/login`, obj);
        console.log(result);
        const info = {
            token: result.data.token,
            name: result.data.name
        };
        localStorage.setItem('info', JSON.stringify(info));
        messageHeading.innerText = '';
        messageHeading.appendChild(document.createTextNode(result.data.message));
        if (result.data.success == true) {
            messageHeading.style.color = 'green';
        }
        if (result.data.success == false) {
            messageHeading.style.color = 'red';
        }
    } catch (err) {
        console.log(err);
    }
});