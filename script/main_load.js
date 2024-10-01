const AppNavBar = Vue.createApp({})
AppNavBar.component('Navbar', {
            template: `
         <nav>
        <ul>
            <li><strong>Turbo Flint</strong></li>
        </ul>
        <ul>
            <li><a href="../../">首页</a></li>
            <li><a href="../../horizon">阅读</a></li>
            <li><a href="../../policy/index.html">政策</a></li>
            <li><a href="../../service/index.html">服务</a></li>
        </ul>
    </nav>
         `
            
})
 
AppNavBar.mount('#header')