const chatForm = document.getElementById('chat-form');
const logoutBtn = document.getElementById('logoutBtn');
const chatMsg = document.getElementById('chatMsg');
const clearChatBtn = document.getElementById('clearChatBtn');
const leftPanelBody = document.getElementById('left-panel-body');
const welcomeHeading = document.getElementById('welcome-user');
const messageText = document.getElementById('msgText');
const msgSendBtn = document.getElementById('msgSendBtn');
const createGroupBtn = document.getElementById('createGroupBtn');
const info = JSON.parse(localStorage.getItem("info"));
const token = info.token;
let recieverId;
//create group button to move creating group page
createGroupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './groupcreating.html';
});
//logout button to move login page
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
});
//new msgs storing into db
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const message = document.getElementById('msgText').value;

        const obj = {
            message,
            token,
            recieverId
        };
        document.getElementById('msgText').value = null;
        const result = await axios.post(`http://localhost:3000/msg`, obj);
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
        //getting alll the user from the User table
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
            p1.appendChild(document.createTextNode(`${allUsers[y].name}`));
            leftPanelBody.appendChild(p1);
        }
        //clickable event
        const contactUsers = document.querySelectorAll('.clickablePara');
        contactUsers.forEach(async (contactUser) => {
            contactUser.addEventListener('click', async () => {
                try {
                    messageText.removeAttribute('style');
                    msgSendBtn.removeAttribute('style');
                    chatMsg.innerHTML = '';
                    chatMsg.className = 'chat-msg'
                    recieverId = contactUser.id;
                    const result = await axios.get(`http://localhost:3000/msglist/${recieverId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                    });
                    // console.log(result);
                    for (let i = 0; i < result.data.result.length; i++) {
                        const p = document.createElement('p');
                        const time = result.data.result[i].timestamp;
                        const [hour, minute, sec] = time.split(':');
                        const hours = Number(hour);
                        const minutes = Number(minute);
                        let ampm;
                        let hoursampm;
                        if (hours > 12) {
                            ampm = 'PM';
                            hoursampm = hours % 12;
                        } else {
                            ampm = 'AM';
                            hoursampm = hours;
                        }
                        p.appendChild(document.createTextNode(`${result.data.result[i].senderName}: ${result.data.result[i].messageContent} (${hoursampm}:${minutes} ${ampm})`));
                        chatMsg.appendChild(p);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
    // let result;
    // const findMax = [];
    // try {

    //     //finding maximux id or last msg in db
    //     for (let i = 0; i < result.data.message.length; i++) {
    //         findMax[i] = result.data.message[i].id;
    //     }
    //     lastMsg = Math.max(...findMax);
    //     //storing all the msgs in local storage 
    //     for (let j = 0; j < result.data.message.length; j++) {
    //         arr[j] = result.data.message[j].message;
    //     }
    //     // console.log(arr);
    //     localStorage.setItem('msg', JSON.stringify(arr));
    //     //showing msgs in the chat section
    //     const name = result.data.name;
    //     const msg = JSON.parse(localStorage.getItem('msg'));
    //     for (let k = 0; k < msg.length; k++) {
    //         // console.log(result.data.message[i].message);
    //         const p = document.createElement('p');
    //         p.appendChild(document.createTextNode(`${name}: ${msg[k]}`));
    //         chatMsg.appendChild(p);
    //     }

    // } catch (err) {
    //     console.log(err);
    // }

})();

