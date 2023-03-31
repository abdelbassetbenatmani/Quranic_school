const menu = document.querySelector('.menu')
const sideBar = document.querySelector('.side-bar')
menu.addEventListener('click',()=>{
    menu.classList.toggle('white-menu')
    sideBar.classList.toggle('show-bar')
})