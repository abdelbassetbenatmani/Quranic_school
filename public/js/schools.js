const schoolsBox = document.querySelectorAll('.schools-box');

schoolsBox.forEach(item => {
  const schoolName = item.querySelector('.school-name');
  const schoolInf = item.querySelector('.school-inf');
  
  schoolName.addEventListener('click', () => {
    schoolInf.classList.toggle('show');
  });
});