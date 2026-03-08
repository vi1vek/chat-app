

    const socket = io();

    const input = document.querySelector("#input");
    const btn = document.querySelector("#sendbtn");
    const toggleBtn = document.querySelector("#toggle-btn");

    const fileInput = document.getElementById('fileInput')

    btn.addEventListener("click", (e) => {
    e.preventDefault();
    // for post data......
    socket.emit("chat-message", {
        message:input.value.trim(),
        image:fileInput.files[0] });
    input.value = "";
    fileInput.value=""
    });

    //  recive data......
    socket.on("receive-chat", (data,senderId) => {
    if(data.message && data.image){
    const li = document.createElement("li");
    const lil = document.createElement("li");
    li.innerHTML = `${data.message}<small class='time'>${data.timeStamp}</small>`;
    // console.log(data.message);
    
    if(data.image){
        const blob = new Blob([data.image])
        const url = URL.createObjectURL(blob)
        const img = document.createElement('img')
        img.src=url;
        img.style.width='150px'
        lil.innerHTML = `<small class='time-img'>${data.timeStamp}</small>`;
        lil.appendChild(img)
        
        
        // console.log(lil);
    }
    // console.log(senderId);

    if (senderId === socket.id) {
        li.classList.add("my-message");
        lil.classList.add("my-message");
    } else {
        li.classList.add("other-message");
        lil.classList.add("other-message");
    }

    document.querySelector("#messages").appendChild(li);
    document.querySelector("#messages").appendChild(lil);

    // ! auto scroll
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight
    }else if(data.message){
    const li = document.createElement("li");
    
    li.innerHTML = `${data.message}<small class='time'>${data.timeStamp}</small>`;

    if (senderId === socket.id) {
        li.classList.add("my-message");
    } else {
        li.classList.add("other-message");
    }

    document.querySelector("#messages").appendChild(li);

    // ! auto scroll
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight
    }else if(data.image){
    // console.log(data.image);
    
    const li = document.createElement("li");
    
    
    if(data.image){
        const blob = new Blob([data.image])
        const url = URL.createObjectURL(blob)
        const img = document.createElement('img')
        img.src=url;
        img.style.width='150px'
        li.innerHTML = `<small class='time-img'>${data.timeStamp}</small>`;
        li.appendChild(img)
        // console.log(li);
    }
    // console.log(senderId);

    if (senderId === socket.id) {
        li.classList.add("my-message");
    } else {
        li.classList.add("other-message");
    }
    document.querySelector("#messages").appendChild(li);

    // ! auto scroll
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight
    }

});

    toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (socket.connected) {
        toggleBtn.innerHTML = "Connect";
        socket.disconnect();
    } else {
        toggleBtn.innerHTML = "Disconnect";
        socket.connect();
    }
    });
