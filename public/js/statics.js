const carousels = document.querySelectorAll('.carousel-item')
const studentInfos = document.querySelectorAll('.student-infos')
const searchInput = document.getElementById('searchInput')
const searchStudentInput = document.getElementById('searchStudentInput')
const searchBtn = document.getElementById('searchBtn')
const emptyInput = document.getElementById('emptyInput')
const emptyStudentInput = document.getElementById('emptyStudentInput')
carousels[0].classList.add('active')

function liveSearch(id,content) {
    let search_query = document.getElementById(id).value;
    for (var i = 1; i < content.length ; i++) {
      content[i].classList.remove("active");
    }

    for (var i = 0; i < content.length; i++) {
        if(content[i].textContent.toLowerCase()
                .includes(search_query.toLowerCase())) {
                  content[i].classList.add("active");
                    break;
        } else {
          content[i].classList.remove("active");
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
      typingTimer = setTimeout(liveSearch('searchInput',carousels), typeInterval);
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

emptyStudentInput.addEventListener('click',()=>{
  searchStudentInput.value = '';
  for (var i = 1; i < studentInfos.length ; i++) {
    studentInfos[i].classList.remove("active");
  }
  // studentInfos[0].classList.add('active')
})

searchStudentInput.addEventListener('input',()=>{
  if(searchStudentInput.value ===''){
    for (var i = 1; i < carousels.length ; i++) {
      studentInfos[i].classList.remove("active");
    }
    // studentInfos[0].classList.add('active')
  }
  
})

searchStudentInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch('searchStudentInput',studentInfos), typeInterval);
});