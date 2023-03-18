const schoolsBox = document.querySelectorAll('.schools-box');
const schoolBox = document.querySelectorAll('.school-box');
const userBox = document.querySelectorAll('.user-box');

schoolsBox.forEach(item => {
  const schoolName = item.querySelector('.school-name');
  const schoolInf = item.querySelector('.school-inf');
  
  schoolName.addEventListener('click', () => {
    schoolInf.classList.toggle('show');
  });
});

userBox.forEach((item)=>{
  item.addEventListener('click', (e) => {
    e.target.previousElementSibling.removeAttribute("disabled")
    
  })
})

schoolBox.forEach((item)=>{
  item.addEventListener('click', (e) => {
    e.target.previousElementSibling.removeAttribute("disabled")
  })
})