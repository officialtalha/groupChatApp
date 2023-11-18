const signUpForm = document.getElementById('chat-form');
const name = document.getElementById('name').value;
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('pass');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
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

});