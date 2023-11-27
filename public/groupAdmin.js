const backBtn = document.getElementById('backBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addMembers = document.getElementById('addMembers');
const removeMembers = document.getElementById('removeMembers');
const makeAdmin = document.getElementById('makeAdmin');
const deleteGroup = document.getElementById('deleteGroup');
const welcomingDiv = document.getElementById('welcomingDiv');
const addMembersDiv = document.getElementById('addMembersDiv');
const removeMembersDiv = document.getElementById('removeMembersDiv');
const makeAdminDiv = document.getElementById('makeAdminDiv');
const deleteGroupDiv = document.getElementById('deleteGroupDiv');
const whenRefresh = document.getElementById('whenRefresh');
const groupNameTopTxt = document.getElementById('groupNameTopTxt');
const messageHeadingForRemoveUser = document.getElementById('messageHeadingForRemoveUser');
const messageHeadingForMakeAdmin = document.getElementById('messageHeadingForMakeAdmin');
const messageHeadingForAddUser = document.getElementById('messageHeadingForAddUser');
const groupId = JSON.parse(localStorage.getItem('groupId'));
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;

//back button to back page
backBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.history.back();
});

//logout button to move login page
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
});

//when page refresh
(async () => {
    try {
        //getting selected group name 
        const selectedGroupName = await axios.get(`http://localhost:3000/group/${groupId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        groupNameTopTxt.innerText = `👩‍👨‍👧‍👦 ${selectedGroupName.data.result.groupName}`;
    } catch (err) {
        console.log(err);
    }
})();

//Add members action

addMembers.addEventListener('click', async (e) => {
    e.preventDefault();
    //appearing or disapprearing the divisions from the when refresh div
    welcomingDiv.setAttribute("style", "display: none;");
    addMembersDiv.removeAttribute('style');
    removeMembersDiv.setAttribute("style", "display: none;");
    makeAdminDiv.setAttribute("style", "display: none;");
    deleteGroupDiv.setAttribute("style", "display: none;");

    const addMembersSerchBar = document.getElementById('addMembersSerchBar');
    const regExMobile = /[0-9]{10}/;
    const regExName = /^[a-zA-Z\s]+$/;
    const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let userIdToAdd;

    //text box input  event 
    addMembersSerchBar.addEventListener('input', async () => {
        messageHeadingForAddUserAddBtn.innerText = '';
        // messageHeadingForAddUserAddBtn.setAttribute('style', 'display: none;');
        const addMembersSerchBarValue = document.getElementById('addMembersSerchBar').value;

        //matching for mobile
        if (regExMobile.test(addMembersSerchBarValue)) {
            const mobile = parseInt(addMembersSerchBarValue);
            const isAvailable = await axios.get(`http://localhost:3000/getallusers/1/2/3`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            // console.log(isAvailable.data.result);
            if (isAvailable.data.result.length > 0) {
                messageHeadingForAddUser.innerText = isAvailable.data.result[0].name;
                messageHeadingForAddUser.style.color = 'rgb(37, 214, 37)';
                userIdToAdd = isAvailable.data.result[0].id;
                console.log(userIdToAdd);
            }
        } else {
            messageHeadingForAddUser.innerText = 'not exist';
            messageHeadingForAddUser.style.color = 'rgb(248, 54, 54)';
        }

        //matching for name
        if (regExName.test(addMembersSerchBarValue)) {

            const name = addMembersSerchBarValue;
            const isAvailable = await axios.get(`http://localhost:3000/getallusers/1/2/3/${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log(isAvailable.data.result);
            if (isAvailable.data.result.length > 0) {
                messageHeadingForAddUser.innerText = isAvailable.data.result[0].name;
                messageHeadingForAddUser.style.color = 'rgb(37, 214, 37)';
                userIdToAdd = isAvailable.data.result[0].id;
                console.log(userIdToAdd);
            } else {
                messageHeadingForAddUser.innerText = 'not exist';
                messageHeadingForAddUser.style.color = 'rgb(248, 54, 54)';
            }
        }

        //matching for Email
        if (regExEmail.test(addMembersSerchBarValue)) {

            const email = addMembersSerchBarValue;
            const isAvailable = await axios.get(`http://localhost:3000/getallusers/1/2/3/4/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log(isAvailable.data.result);
            if (isAvailable.data.result.length > 0) {
                messageHeadingForAddUser.innerText = isAvailable.data.result[0].name;
                messageHeadingForAddUser.style.color = 'rgb(37, 214, 37)';
                userIdToAdd = isAvailable.data.result[0].id;
                console.log(userIdToAdd);
            } else {
                messageHeadingForAddUser.innerText = 'not exist';
                messageHeadingForAddUser.style.color = 'rgb(248, 54, 54)';
            }
        }
    });

    //add button action 
    document.getElementById('addMembersFrom').addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageHeadingForAddUserAddBtn = document.getElementById('messageHeadingForAddUserAddBtn');
        try {
            const obj = {
                userId: userIdToAdd,
                GroupId: groupId
            }
            const result = await axios.post(`http://localhost:3000/usersgroups`, obj);
            if (result.data.success) {
                messageHeadingForAddUserAddBtn.innerText = 'User Has been Added Successfully!!!';
                messageHeadingForAddUserAddBtn.style.color = 'rgba(143, 139, 232, 255)';
            }
        } catch (err) {
            console.log(err);
            messageHeadingForAddUserAddBtn.innerText = 'User Already in Group.';
            messageHeadingForAddUserAddBtn.style.color = 'rgba(143, 139, 232, 255)';
        }
    });

});

//remove members action

removeMembers.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        welcomingDiv.setAttribute("style", "display: none;");
        addMembersDiv.setAttribute("style", "display: none;");
        removeMembersDiv.removeAttribute('style');
        makeAdminDiv.setAttribute("style", "display: none;");
        deleteGroupDiv.setAttribute("style", "display: none;");

        const removeMembersForm = document.getElementById('removeMembersForm');
        const removeMembersInnerDiv = document.getElementById('removeMembersInnerDiv');

        //first empty div
        removeMembersInnerDiv.innerHTML = '';
        //getting all users id which are the memners of this group 
        const result = await axios.get(`http://localhost:3000/usersgroups/${groupId}`);
        // console.log(result.data.result);

        //getting all the users name 
        for (let x = 0; x < result.data.result.length; x++) {
            const onlyUserName = 1;
            const usersNames = await axios.get(`http://localhost:3000/getallusers/${onlyUserName}/${result.data.result[x].userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            const loggedInUserId = usersNames.data.loggedInUserId;

            if (usersNames.data.result[0].id != loggedInUserId) {
                const label = document.createElement('label');
                label.id = 'label2';
                label.setAttribute("for", "username");
                label.appendChild(document.createTextNode(`${usersNames.data.result[0].name}`));

                const input = document.createElement('input');
                input.setAttribute("type", "checkbox");
                input.setAttribute("class", "chbx-class");
                input.setAttribute("name", "username");
                input.setAttribute("id", usersNames.data.result[0].id);
                input.setAttribute("value", usersNames.data.result[0].name);

                const br = document.createElement('br');

                removeMembersInnerDiv.appendChild(label);
                removeMembersInnerDiv.appendChild(input);
                removeMembersInnerDiv.appendChild(br);
            }

        }

        removeMembersForm.addEventListener('submit', async (e) => {
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
                            const removeUsers = 1;
                            await axios.post(`http://localhost:3000/usersgroups/${removeUsers}`, obj1);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
                messageHeadingForRemoveUser.innerText = 'Users Has Been Removed Successfully!!!';
                messageHeadingForRemoveUser.style.color = 'blue';
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

//make admin action

makeAdmin.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        welcomingDiv.setAttribute("style", "display: none;");
        addMembersDiv.setAttribute("style", "display: none;");
        removeMembersDiv.setAttribute("style", "display: none;");
        makeAdminDiv.removeAttribute('style');
        deleteGroupDiv.setAttribute("style", "display: none;");

        const makeAdminForm = document.getElementById('makeAdminForm');
        const makeAdminInnerDiv = document.getElementById('makeAdminInnerDiv');

        //first empty div
        makeAdminInnerDiv.innerHTML = '';

        //getting all users id which are the memners of this group 
        const result = await axios.get(`http://localhost:3000/usersgroups/${groupId}`);
        // console.log(result.data.result);

        //getting all the users name 
        for (let x = 0; x < result.data.result.length; x++) {
            const onlyUserName = 1;
            const usersNames = await axios.get(`http://localhost:3000/getallusers/${onlyUserName}/${result.data.result[x].userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            const loggedInUserId = usersNames.data.loggedInUserId;

            if (usersNames.data.result[0].id != loggedInUserId) {
                const label = document.createElement('label');
                label.id = 'label2';
                label.setAttribute("for", "username");
                label.appendChild(document.createTextNode(`${usersNames.data.result[0].name}`));

                const input = document.createElement('input');
                input.setAttribute("type", "checkbox");
                input.setAttribute("class", "chbx-class");
                input.setAttribute("name", "username");
                input.setAttribute("id", usersNames.data.result[0].id);
                input.setAttribute("value", usersNames.data.result[0].name);

                const br = document.createElement('br');

                makeAdminInnerDiv.appendChild(label);
                makeAdminInnerDiv.appendChild(input);
                makeAdminInnerDiv.appendChild(br);
            }

        }

        makeAdminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const users = document.querySelectorAll('.chbx-class');
                users.forEach(async (user) => {
                    try {
                        if (user.checked) {
                            const userId = user.id;
                            const obj1 = {
                                adminId: userId,
                                groupId
                            };
                            await axios.post(`http://localhost:3000/admin`, obj1);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
                messageHeadingForMakeAdmin.innerText = 'Successfull!!!';
                messageHeadingForMakeAdmin.style.color = 'green';
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }

});

//delete group action

deleteGroup.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        welcomingDiv.setAttribute("style", "display: none;");
        addMembersDiv.setAttribute("style", "display: none;");
        removeMembersDiv.setAttribute("style", "display: none;");
        makeAdminDiv.setAttribute("style", "display: none;");
        deleteGroupDiv.removeAttribute('style');

        const deleteGrpBtn = document.getElementById('deleteGrpBtn');
        const messageHeadingForDeleteGroup = document.getElementById('messageHeadingForDeleteGroup');

        //delete button action
        deleteGrpBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const flag = confirm('Are You sure want to delete this group?');
                if (flag) {
                    await axios.delete(`http://localhost:3000/deletegroup/${groupId}`);
                    messageHeadingForDeleteGroup.innerText = 'Group Deleted successfully.';
                    messageHeadingForDeleteGroup.style.color = 'red';
                    setTimeout(() => {
                        window.location.href = './chatting.html';
                    }, 2000);
                }

            } catch (err) {
                console.log(err);
            }

        });
    } catch (err) {
        console.log(err);
    }

});