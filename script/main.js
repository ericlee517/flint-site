/* Fetch */


fetch("/json/message.json") //json文件
    .then((response) => response.json())
    .then((data) => {
        if (document.getElementById("msg")) {
            document.getElementById("msg").innerHTML = data.message
        }
    });

