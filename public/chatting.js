const chatForm = document.getElementById('chat-form');
const logoutBtn = document.getElementById('logoutBtn');
const chatMsg = document.getElementById('chatMsg');
const clearChatBtn = document.getElementById('clearChatBtn');
const leftPanelBody = document.getElementById('left-panel-body');
const welcomeHeading = document.getElementById('welcome-user');
const messageText = document.getElementById('msgText');
const msgSendBtn = document.getElementById('msgSendBtn');
const createGroupBtn = document.getElementById('createGroupBtn');
const groupSection = document.getElementById('groupSection');
const grpActionBtn = document.getElementById('grpActionBtn');
const changeNameBtn = document.getElementById('changeNameBtn');
const attachmentIcon = document.getElementById('attachmentIcon');
const msgImg = document.getElementById('msgImg');
const inviteBtn = document.getElementById('inviteBtn');
const changeNameBtnDiv = document.getElementById('changeNameBtnDiv');
const inviteBtnDiv = document.getElementById('inviteBtnDiv');
const selectedUser = document.getElementById('selectedUser');
const selectedGroup = document.getElementById('selectedGroup');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
let recieverId;
let groupId;
const socket = io();

//for attachment icon
attachmentIcon.addEventListener('click', (e) => {
    msgImg.click();
});
//create group button to move creating group page
createGroupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './groupcreating.html';
});

//invite button to move invite page
inviteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './invite.html';
});

//logout button to move login page
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
});

//new msgs storing into Message model
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const isGroup = JSON.parse(localStorage.getItem('isGroup'));
        if (isGroup == 1) {


            //if user using group chat
            const groupId = JSON.parse(localStorage.getItem('groupId'));
            const message = document.getElementById('msgText').value;

            if (message != "") {
                const obj = {
                    message,
                    token,
                    groupId
                };

                document.getElementById('msgText').value = null;

                const result = await axios.post(`http://localhost:3000/msg/1`, obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                });
            }

            //for sending image 
            const imageData = msgImg.files[0];
            if (imageData != undefined) {
                const formData = new FormData();
                formData.append('image', imageData);
                const result1 = await axios.post(`http://localhost:3000/img/1/${token}/${groupId}`, formData);
            }

        } else {
            //if user using normal chat
            const message = document.getElementById('msgText').value;
            if (message != "") {
                const obj = {
                    message,
                    token,
                    recieverId
                };

                document.getElementById('msgText').value = null;

                const result = await axios.post(`http://localhost:3000/msg`, obj);
            }

            //for sending image 
            const imageData = msgImg.files[0];
            if (imageData != undefined) {
                const formData = new FormData();
                formData.append('image', imageData);
                const result1 = await axios.post(`http://localhost:3000/img/${token}/${recieverId}`, formData);
            }

        }

    } catch (err) {
        console.log(err);
    }
});

//clearing all chat from the db for a user
clearChatBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const flag = confirm('are sure want to delete all the chats?')
        if (flag) {
            await axios.delete(`http://localhost:3000/dltchat`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            window.location.reload;
        }
    } catch (err) {
        console.log(err);
    }
});

//when page refresh msgs retrive from db
(async () => {
    try {
        //storing in LS that we are in group mode
        localStorage.setItem('isGroup', 0);

        //getting all the users from the User table
        const result = await axios.get(`http://localhost:3000/getallusers`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const loggedInUserId = result.data.loggedInUserId;
        const loggedInUserName = result.data.loggedInUserName;
        const allUsers = result.data.result;

        //showing logged in user name at top of the left side panel 
        welcomeHeading.appendChild(document.createTextNode(`welcome ${loggedInUserName}`));

        //showing name of the loggen in user in welcoming message section when user refresh chat page
        document.getElementById('p-name').appendChild(document.createTextNode(`${loggedInUserName}`));

        //removing logged in user from the array 
        for (let x = 0; x < allUsers.length; x++) {
            if (allUsers[x].id == loggedInUserId) {
                allUsers.splice(x, 1);
            }
        }
        //showin all the user in the side panel 
        for (let y = 0; y < allUsers.length; y++) {
            const p1 = document.createElement('p');
            p1.id = allUsers[y].id;
            p1.className = 'clickablePara';
            p1.appendChild(document.createTextNode(`👶 ${allUsers[y].name}`));
            leftPanelBody.appendChild(p1);
        }
        //clickable event users in the side panel
        const contactUsers = document.querySelectorAll('.clickablePara');
        contactUsers.forEach(async (contactUser) => {
            contactUser.addEventListener('click', async () => {
                try {

                    //storing in LS that we are in group mode
                    localStorage.setItem('isGroup', 0);

                    //manage welcome in msg section
                    messageText.removeAttribute('style');
                    msgSendBtn.removeAttribute('style');
                    attachmentIcon.removeAttribute('style');
                    document.getElementById('attachmentIconDivId').setAttribute('class', 'attachmentIconDiv');
                    chatMsg.innerHTML = '';
                    chatMsg.className = 'chat-msg';

                    //disappearing the group buttons from top-right
                    grpActionBtn.setAttribute("style", "display: none;");
                    changeNameBtn.setAttribute("style", "display: none;");
                    inviteBtn.setAttribute("style", "display: none;");
                    recieverId = contactUser.id;

                    //getting messages
                    const result = await axios.get(`http://localhost:3000/msglist/${recieverId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                    });

                    //getting selected user's name 
                    const selectedRceiverName = await axios.get(`http://localhost:3000/getallusers/${recieverId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                    });

                    //removing selected group initially
                    selectedUser.innerText = '';
                    selectedGroup.innerText = '';
                    selectedUser.appendChild(document.createTextNode(`👶 ${selectedRceiverName.data.result[0].name}`));

                    for (let i = 0; i < result.data.result.length; i++) {
                        const p = document.createElement('p');
                        // getting current time 
                        let a = result.data.result[i].timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        //time setting
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        const word = 'https';
                        const messageContent = result.data.result[i].messageContent;
                        if (messageContent.includes(word)) {
                            const p1 = document.createElement('p');
                            p1.appendChild(document.createTextNode(`${result.data.result[i].senderName}: (${hoursampm}:${minute} ${ampm})`));
                            chatMsg.appendChild(p1);

                            const imgDiv = document.createElement('div');
                            imgDiv.className = 'imgDiv';
                            const img = document.createElement('img');
                            img.setAttribute('src', result.data.result[i].messageContent);
                            img.className = 'chatImg';
                            imgDiv.appendChild(img);
                            chatMsg.appendChild(imgDiv);
                        } else {
                            p.appendChild(document.createTextNode(`${result.data.result[i].senderName}: ${result.data.result[i].messageContent} (${hoursampm}:${minute} ${ampm})`));
                            chatMsg.appendChild(p);
                        }

                    }
                    socket.on('message-emit-to-client', (msg) => {
                        const p = document.createElement('p');
                        // getting current time 
                        let a = msg.timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        p.appendChild(document.createTextNode(`${msg.senderName}: ${msg.messageContent} (${hoursampm}:${minute} ${ampm})`));
                        chatMsg.appendChild(p);
                    });

                    socket.on('message-emit-to-clientImg', (msg) => {
                        const p1 = document.createElement('p');
                        // getting current time 
                        let a = msg.timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        p1.appendChild(document.createTextNode(`${msg.senderName}: (${hoursampm}:${minute} ${ampm})`));
                        chatMsg.appendChild(p1);

                        const imgDiv = document.createElement('div');
                        imgDiv.className = 'imgDiv';
                        const img = document.createElement('img');
                        img.setAttribute('src', msg.messageContent);
                        img.className = 'chatImg';
                        imgDiv.appendChild(img);
                        chatMsg.appendChild(imgDiv);
                    });

                } catch (err) {
                    console.log(err);
                }
            });
        });

        //getting all the groups from the group table for this perticular user
        const groupResult = await axios.get(`http://localhost:3000/group`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        // console.log(groupResult.data);
        const allGroups = groupResult.data.arr;

        // showin all the groups in the side panel 
        for (let z = 0; z < allGroups.length; z++) {
            const p2 = document.createElement('p');
            p2.id = allGroups[z].id;
            p2.className = 'clickableGroup';
            p2.appendChild(document.createTextNode(`👩‍👨‍👧‍👦 ${allGroups[z].groupName}`));
            groupSection.appendChild(p2);
        }

        //clickable event for group in the side panel
        const contactGroups = document.querySelectorAll('.clickableGroup');
        contactGroups.forEach(async (contactGroup) => {
            contactGroup.addEventListener('click', async () => {
                try {

                    //first disappear the action button
                    // grpActionBtn.setAttribute("style", "display: none;");


                    //storing in LS that we are in group mode
                    localStorage.setItem('isGroup', 1);

                    groupId = contactGroup.id;
                    localStorage.setItem('groupId', groupId);

                    //manage welcome in msg section 
                    messageText.removeAttribute('style');
                    msgSendBtn.removeAttribute('style');
                    attachmentIcon.removeAttribute('style');
                    document.getElementById('attachmentIconDivId').setAttribute('class', 'attachmentIconDivGroup');
                    chatMsg.innerHTML = '';
                    chatMsg.className = 'chat-msg'



                    //appearing all the group buttons on the right-top
                    grpActionBtn.removeAttribute('style');
                    changeNameBtn.removeAttribute('style');
                    inviteBtn.removeAttribute('style');

                    //change name button action 
                    changeNameBtn.onclick = async () => {
                        try {
                            window.location.href = './changegroupname.html';
                        } catch (err) {
                            console.log(err);
                        }
                    };

                    //getting selected group name 
                    const selectedGroupName = await axios.get(`http://localhost:3000/group/${groupId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    const loggedInUserId = selectedGroupName.data.loggedInUserId;

                    // first it will normalise group action Btn
                    grpActionBtn.disabled = false;
                    grpActionBtn.className = 'grpActionBtnClass';

                    // checking whether a user is admin or not 
                    const isAdmin = await axios.get(`http://localhost:3000/admin/${groupId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });

                    if (isAdmin.data.message == 'not admin') {
                        grpActionBtn.disabled = true;
                        grpActionBtn.className = 'disabledBtn';
                    }

                    //group action button action 
                    grpActionBtn.onclick = async () => {
                        try {
                            window.location.href = './groupAdmin.html';
                        } catch (err) {
                            console.log(err);
                        }
                    };

                    // const hasStyleAttribute = grpActionBtn.getAttribute("style");
                    // if (!grpActionBtn.hasAttribute("style")) {
                    //     changeNameBtnDiv.className = 'changeNameBtnDiv1';
                    //     inviteBtnDiv.className = 'inviteBtnDiv1';
                    // }

                    //removing selected group and user initially
                    selectedUser.innerText = '';
                    selectedGroup.innerText = '';

                    //adding group name at the top when user click on the group name 
                    selectedGroup.appendChild(document.createTextNode(`👩‍👨‍👧‍👦 ${selectedGroupName.data.result.groupName}`));

                    //this var is only for distinguish between two get routes in the BE
                    const forGroup = 1;
                    const result = await axios.get(`http://localhost:3000/msglist/${forGroup}/${groupId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                    });
                    // console.log(result.data.result);

                    for (let i = 0; i < result.data.result.length; i++) {
                        const p = document.createElement('p');
                        // getting current time 
                        let a = result.data.result[i].timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }

                        const word = 'https';
                        const messageContent = result.data.result[i].messageContent;
                        if (messageContent.includes(word)) {
                            const p1 = document.createElement('p');
                            p1.appendChild(document.createTextNode(`${result.data.result[i].senderName}: (${hoursampm}:${minute} ${ampm})`));
                            chatMsg.appendChild(p1);

                            const imgDiv = document.createElement('div');
                            imgDiv.className = 'imgDiv';
                            const img = document.createElement('img');
                            img.setAttribute('src', result.data.result[i].messageContent);
                            img.className = 'chatImg';
                            imgDiv.appendChild(img);
                            chatMsg.appendChild(imgDiv);
                        } else {
                            p.appendChild(document.createTextNode(`${result.data.result[i].senderName}: ${result.data.result[i].messageContent} (${hoursampm}:${minute} ${ampm})`));
                            chatMsg.appendChild(p);
                        }
                    }
                    socket.on('message-emit-to-clientGroup', (msg) => {
                        const p = document.createElement('p');
                        // getting current time 
                        let a = msg.timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        p.appendChild(document.createTextNode(`${msg.senderName}: ${msg.messageContent} (${hoursampm}:${minute} ${ampm})`));
                        chatMsg.appendChild(p);
                    });
                    socket.on('message-emit-to-clientImgGroup', (msg) => {
                        const p1 = document.createElement('p');
                        // getting current time 
                        let a = msg.timeStamp;
                        let b = a.toString();
                        const arr = b.split('T');
                        const c = arr[1];
                        const arr2 = c.split('.');
                        const Time = arr2[0];
                        const [hour, minute, sec] = Time.split(':');
                        const hours = Number(hour);
                        // const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        p1.appendChild(document.createTextNode(`${msg.senderName}: (${hoursampm}:${minute} ${ampm})`));
                        chatMsg.appendChild(p1);

                        const imgDiv = document.createElement('div');
                        imgDiv.className = 'imgDiv';
                        const img = document.createElement('img');
                        img.setAttribute('src', msg.messageContent);
                        img.className = 'chatImg';
                        imgDiv.appendChild(img);
                        chatMsg.appendChild(imgDiv);
                    });
                } catch (err) {
                    console.log(err);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
})();

