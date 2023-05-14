const carousels = document.querySelectorAll('.carousel-item')
const studentInfos = document.querySelectorAll('.student-infos')
const searchInput = document.getElementById('searchInput')
const searchStudentInput = document.querySelectorAll('.searchStudentInput')
const searchBtn = document.getElementById('searchBtn')
const emptyInput = document.getElementById('emptyInput')
const emptyStudentInput = document.querySelectorAll('.emptyStudentInput')
const scrollToTop = document.querySelector('.scroll-to-top')
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


emptyStudentInput.forEach((empty)=>{
  empty.addEventListener('click',(e)=>{
    e.currentTarget.parentElement.previousElementSibling.value = '';
    for (var i = 0; i < studentInfos.length ; i++) {
      studentInfos[i].classList.remove("is-hidden");
    }
  })
})



searchStudentInput.forEach((student)=>{
  student.addEventListener('keyup',(e)=>{
    let search_query = document.getElementById(e.currentTarget.id).value;
    const StudentTable = document.querySelector(`[data-id="${e.currentTarget.id}"]`);
    const trTableStudent = StudentTable.querySelectorAll('tr')
    const searchRegex = new RegExp(search_query, 'g');
    trTableStudent.forEach((tr)=>{
      if (searchRegex.test(tr.dataset.fullname)){
        tr.classList.remove("is-hidden");
      }else{
        tr.classList.add("is-hidden");

      }

    })

  })

})


scrollToTop.onclick = function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}