/* 
Fetch the public message
Update In 2025/1/21 v4.5.6
*/

  fetch("/json/message.json")
   .then((response) => response.json())
   .then((data) => {
        // 检查是否存在 data.url 属性
        if (data.url) {
          const urlelement = document.getElementById("msg_url");
          const msgelement = document.getElementById("msg");
          const goelement = document.getElementById("msg_url");
          const boxelement = document.getElementById("msg_box");
          if (urlelement && msgelement) {
            msgelement.innerHTML = data.message;
            urlelement.href = data.url;
            goelement.innerHTML = data.go;
            boxelement.setAttribute('aria-busy', 'false');
          } else {
            console.log("ERROR: CANNOT FIND ELEMENTS");
          }
        }
    })
   .catch((error) => {
        console.error("JSON ERROR: ", error);
    });
    
    
function showError(){

Toastify({
  text: "该服务暂未开放，敬请期待。",
  duration: 3000,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right,rgb(248, 117, 141) 0%,rgb(253, 85, 119) 19%,rgb(245, 60, 70) 60%,rgb(245, 64, 36) 100%)",
  },
  onClick: function(){} // Callback after click
}).showToast();
    
}

function showClose(){

Toastify({
  text: "活动暂未开启，敬请期待。",
  duration: 3000,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right,rgb(248, 117, 141) 0%,rgb(253, 85, 119) 19%,rgb(245, 60, 70) 60%,rgb(245, 64, 36) 100%)",
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