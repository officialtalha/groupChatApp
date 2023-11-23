const groupForm = document.getElementById('grp-form');
const cancelBtn = document.getElementById('cancelBtn');
const info = JSON.parse(localStorage.getItem('info'));
const members = document.getElementById('members');
const token = info.token;
const adminNameHeading = document.getElementById('adminName');
const adminName = info.name;
adminNameHeading.innerText = `Admin: ${adminName}`;
//cancel button action
cancelBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.href = './chatting.html'
});
//when page refresh 
(async () => {
    try {
        const result = await axios.get(`http://localhost:3000/getallusers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const allUsers = result.data.result;
        const loggedInUserId = result.data.loggedInUserId;
        for (let x = 0; x < allUsers.length; x++) {
            if (allUsers[x].id == loggedInUserId) {
                allUsers.splice(x, 1);
            }
        }
        for (let i = 0; i < allUsers.length; i++) {
            const label = document.createElement('label');
            label.id = 'label2';
            label.setAttribute("for", "username");
            label.appendChild(document.createTextNode(`${allUsers[i].name}`));

            const input = document.createElement('input');
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "chbx-class");
            input.setAttribute("name", "username");
            input.setAttribute("id", allUsers[i].id);
            input.setAttribute("value", allUsers[i].name);

            const br = document.createElement('br');

            members.appendChild(label);
            members.appendChild(input);
            members.appendChild(br);
        }
        //create button action 
        groupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const grpname = document.getElementById('group-name').value;
                const users = document.querySelectorAll('.chbx-class');
                // console.log(users);
                users.forEach((user) => {
                    if (user.checked) {
                        console.log(user.id);
                    }
                });
                const usersId = [];
                users.forEach((user) => {
                    if (user.checked) {
                        usersId.push(user.id);
                    }
                });
                const members = usersId.join();
                const obj = {
                    GroupName: grpname,
                    members,
                    admin: loggedInUserId
                }
                await axios.post(`http://localhost:3000/group`, obj);
                window.location.href = './chatting.html';
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
