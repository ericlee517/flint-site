/* Fetch */


fetch("/json/message.json") //json文件
    .then((response) => response.json())
    .then((data) => {
        if (document.getElementById("msg")) {
            document.getElementById("msg").innerHTML = data.message
        }
    });
    
    
function showError(){

Toastify({
  text: "该功能暂未上线。",
  duration: 3000,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
  },
  onClick: function(){} // Callback after click
}).showToast();
    
}

function showClose(){

Toastify({
  text: "活动暂未开启。",
  duration: 3000,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
  },
  onClick: function(){} // Callback after click
}).showToast();
    
}

function showNolink(){

Toastify({
  text: "当前链接没有重定向的目标。",
  duration: 3000,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  onClick: function(){} // Callback after click
}).showToast();
    
}