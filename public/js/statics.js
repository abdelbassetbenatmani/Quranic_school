const carousels = document.querySelectorAll('.carousel-item')
const searchInput = document.getElementById('searchInput')
const emptyInput = document.getElementById('emptyInput')
carousels[0].classList.add('active')

function liveSearch() {
    let search_query = document.getElementById("searchInput").value;
    
    // if(search_query ===''){
    //     carousels[0].classList.add("active");
    // }
    for (var i = 0; i < carousels.length; i++) {
        if(carousels[i].textContent.toLowerCase()
                .includes(search_query.toLowerCase())) {
                    // carousels[i].style.display = "none";
                    carousels[i].classList.add("active");
        } else {
            // carousels[i].style.display = "block";
            carousels[i].classList.remove("active");
        }
    }
  }
  
  //A little delay
  let typingTimer;               
  let typeInterval = 500;  
  
  searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
  });
  
  emptyInput.addEventListener('click',()=>{
    searchInput.value = '';
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
  })