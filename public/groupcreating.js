const groupForm = document.getElementById('grp-form');
const cancelBtn = document.getElementById('cancelBtn');
const members = document.getElementById('members');
const adminNameHeading = document.getElementById('adminName');
const info = JSON.parse(localStorage.getItem('info'));
const token = info.token;
const adminName = info.name;
adminNameHeading.innerText = `Admin: ${adminName}`;
//cancel button action
cancelBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // window.location.href = './chatting.html'
    window.history.back();
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

        //showing checkboxes
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id != loggedInUserId) {
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
        }

        //create button action 
        groupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const groupName = document.getElementById('group-name').value;
                const obj = {
                    groupName,
                    adminId: loggedInUserId
                }
                //for creating group in group model
                const result = await axios.post(`http://localhost:3000/group`, obj);
                const GroupId = result.data.groupId;

                //for creating entry in users-groups model after getting newly created group id
                await axios.post(`http://localhost:3000/usersgroups`, {
                    userId: loggedInUserId,
                    GroupId
                });
                const users = document.querySelectorAll('.chbx-class');
                users.forEach(async (user) => {
                    try {
                        if (user.checked) {
                            const userId = user.id;
                            const obj1 = {
                                userId,
                                GroupId
                            };
                            const result = await axios.post(`http://localhost:3000/usersgroups`, obj1);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
                window.location.href = './chatting.html';
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
