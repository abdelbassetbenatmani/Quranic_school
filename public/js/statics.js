const carousels = document.querySelectorAll('.carousel-item')
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const emptyInput = document.getElementById('emptyInput')
carousels[0].classList.add('active')

function liveSearch() {
    let search_query = document.getElementById("searchInput").value;
    

    for (var i = 0; i < carousels.length; i++) {
        if(carousels[i].textContent.toLowerCase()
                .includes(search_query.toLowerCase())) {
                    carousels[i].classList.add("active");
                    break;
        } else {
                    carousels[i].classList.remove("active");
        }
    }
  }
  
  //A little delay
  let typingTimer;               
  let typeInterval = 500;  
  
  // searchInput.addEventListener('keyup', () => {
  //   clearTimeout(typingTimer);
  //   typingTimer = setTimeout(liveSearch, typeInterval);
  // });
searchBtn.addEventListener('click', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(liveSearch, typeInterval);
}) 
emptyInput.addEventListener('click',()=>{
    searchInput.value = '';
    for (var i = 1; i < carousels.length ; i++) {
      carousels[i].classList.remove("active");
    }
    carousels[0].classList.add('active')
})

searchInput.addEventListener('input',()=>{
  if(searchInput.value ===''){
    for (var i = 1; i < carousels.length ; i++) {
      carousels[i].classList.remove("active");
    }
    carousels[0].classList.add('active')
  }
  
})