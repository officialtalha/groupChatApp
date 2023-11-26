const cancelBtn = document.getElementById('cancelBtn');
const changeBtn = document.getElementById('grp-form');
const groupId = Number(localStorage.getItem('groupId'));
const successMessage = document.getElementById('successMessage');
cancelBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // window.location.href = './chatting.html';
    window.history.back();
});

changeBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const textBox = document.getElementById('group-name').value;
        const obj = {
            groupName: textBox,
            id: groupId
        }
        const result = await axios.put(`http://65.1.130.212:3000/group`, obj);
        // console.log();
        if (result.data.success) {
            successMessage.innerText = 'Group Name Has Changed Successfully!!!';
            successMessage.style.color = 'green';
            setTimeout(() => {
                window.location.href = './chatting.html';
            }, 1000);
        }
    } catch (err) {
        console.log(err);
    }
});
