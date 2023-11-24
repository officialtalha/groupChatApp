const groupForm = document.getElementById('grp-form');
const cancelBtn = document.getElementById('cancelBtn');
const members = document.getElementById('members');
const successMessage = document.getElementById('successMessage');
const groupId = JSON.parse(localStorage.getItem('groupId'));
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;

//cancel button action
cancelBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.href = './chatting.html'
});
// when page refresh
(async () => {
    try {

        //this var only for making distiguish between two get routes in Group route
        const allUsersfromThisGroupEndpoint = 1;

        //getting all the users from this group 
        const allUsersfromThisGroup = await axios.get(`http://localhost:3000/group/${allUsersfromThisGroupEndpoint}/${groupId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        //getting all the users from user model
        const allUsersFromUserModel = await axios.get(`http://localhost:3000/getallusers/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        //showing only those users who are not the part of this group
        const allUsers = allUsersFromUserModel.data.result;
        const allGroupMembers = allUsersfromThisGroup.data.result;
        // console.log(allUsers);
        console.log(allGroupMembers);
        for (let x = 0; x < allGroupMembers.length; x++) {
            for (let y = 0; y < allUsers.length; y++) {
                if (allUsers[y].id == allGroupMembers[x].userId) {
                    allUsers.splice(y, 1);
                }
            }
        }
        console.log(allUsers);
        //showing checkboxes
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

        // create button action
        groupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {

                const users = document.querySelectorAll('.chbx-class');
                users.forEach(async (user) => {
                    try {
                        if (user.checked) {
                            const userId = user.id;
                            const obj1 = {
                                userId,
                                GroupId: groupId
                            };
                            resultForSuccessMessage = await axios.post(`http://localhost:3000/usersgroups`, obj1);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
                successMessage.innerText = 'Members Has Been Added To Group Successfully!!!';
                successMessage.style.color = 'blue';
                setTimeout(() => {
                    window.location.href = './chatting.html';
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
