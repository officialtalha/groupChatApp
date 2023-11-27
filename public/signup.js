const signUpForm = document.getElementById('sighnup-form');
const messageHeading = document.getElementById('messageHeading');
const loginBtn = document.getElementById('loginBtn');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('pass').value;
        const obj = {
            name,
            email,
            mobile,
            password
        };

        const result = await axios.post(`http://localhost:3000/signup`, obj);
        console.log(result);
        messageHeading.innerText = '';
        messageHeading.appendChild(document.createTextNode(result.data.message));
        if (result.data.success == true) {
            messageHeading.style.color = 'green';
            setTimeout(() => {
                window.location.href = './login.html';
            }, 1000);
        }
        if (result.data.success == false) {
            messageHeading.style.color = 'red';
        }
    } catch (err) {
        console.log(err);
    }
});

signUpForm.addEventListener('reset', async (e) => {
    e.preventDefault();
    try {
        document.getElementById('name').value = null;
        document.getElementById('email').value = null;
        document.getElementById('mobile').value = null;
        document.getElementById('pass').value = null;
    } catch (err) {
        console.log(err);
    }
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html'
});