const schoolsBox = document.querySelectorAll('.schools-box');
const schoolBox = document.querySelectorAll('.school-box');
const userBox = document.querySelectorAll('.user-box');
const updateAddress = document.querySelectorAll('.update-address');
const bigContainer = document.querySelector('.big-school-container')
const emptyInput = document.querySelector("#emptyInput")
let search_query = document.getElementById("searchInput")

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

updateAddress.forEach((item)=>{
  item.addEventListener('click',(e)=>{
    let changeAdrs = e.target.parentElement.nextElementSibling
    changeAdrs.classList.remove('d-none')
    changeAdrs.classList.add('d-flex')
  })
});

const laghouat = [
  {

      "commune_name": "البيضاء",
      "daira_name": "قتلة سيدي سعيد",

  },
  {

      "commune_name": "قلتة سيدي سعد",
      "daira_name": "قتلة سيدي سعيد",

  },
  {
      "commune_name": "بريدة",
      "daira_name": "بريدة",

  },
  {

      "commune_name": "عين سيدي علي",
      "daira_name": "قتلة سيدي سعيد",

  },
  {
      "commune_name": "تاجموت",
      "daira_name": "عين ماضي",

  },
  {

      "commune_name": "الحاج مشري",
      "daira_name": "بريدة",

  },
  {

      "commune_name": "تاويالة",
      "daira_name": "بريدة",

  },
  {

      "commune_name": "الغيشة",
      "daira_name": "الغيشة",

  },
  {

      "commune_name": "تاجرونة",
      "daira_name": "عين ماضي",

  },
  {

      "commune_name": "سبقاق",
      "daira_name": "أفلو",

  },
  {

      "commune_name": "سيدي بوزيد",
      "daira_name": "أفلو",

  },
  {

      "commune_name": "وادي مرة",
      "daira_name": "وادي مرة",

  },
  {

      "commune_name": "الأغواط",
      "daira_name": "الأغواط",

  },
  {

      "commune_name": "وادي مزي",
      "daira_name": "وادي مرة",

  },
  {

      "commune_name": "قصر الحيران",
      "daira_name": "قصر الحيران",

  },
  {

      "commune_name": "العسافية",
      "daira_name": "سيدي مخلوف",

  },
  {

      "commune_name": "سيدي مخلوف",
      "daira_name": "سيدي مخلوف",

  },
  {

      "commune_name": "حاسي الدلاعة",
      "daira_name": "حاسي الرمل",

  },
  {

      "commune_name": "حاسي الرمل",
      "daira_name": "حاسي الرمل",

  },
  {

      "commune_name": "عين ماضي",
      "daira_name": "عين ماضي",

  },
  {

      "commune_name": "الحويطة",
      "daira_name": "عين ماضي",

  },
  {

      "commune_name": "الخنق",
      "daira_name": "عين ماضي",

  },
  {

      "commune_name": "بن ناصر بن شهرة",
      "daira_name": "قصر الحيران",

  },
  {

      "commune_name": "أفلو",
      "daira_name": "أفلو",

  }
]

const daira = document.querySelectorAll('.daira')
const commune = document.querySelectorAll('.commune')
let dairaArr = []
laghouat.forEach((element)=>{
    dairaArr.push( element.daira_name)
})
dairaArr = new Set(dairaArr)

daira.forEach((element)=>{
  dairaArr.forEach((ele)=>{
    const option = document.createElement('option')
    option.innerHTML = ele
    element.appendChild(option)
  })
  element.addEventListener('change',(e)=>{
    let baladiya = []
    baladiya= laghouat.filter((comm)=>{
       return  comm.daira_name === element.value
    })
    nextElement  = e.target.parentElement.parentElement.children[1].children[1];
    nextElement.innerHTML = ''

    baladiya.forEach((bal)=>{
      const option = document.createElement('option')
      option.innerHTML = bal.commune_name
      nextElement.appendChild(option)
    })
  })
})

schoolBox.forEach((item)=>{
  item.addEventListener('click', (e) => {
    e.target.previousElementSibling.removeAttribute("disabled")
  })
})


    
function liveSearch() {
  let search_query = document.getElementById("searchInput").value;
  

  for (var i = 0; i < schoolsBox.length; i++) {
      if(schoolsBox[i].textContent.toLowerCase()
              .includes(search_query.toLowerCase())) {
                schoolsBox[i].classList.remove("is-hidden");
      } else {
        schoolsBox[i].classList.add("is-hidden");
      }
  }
}

//A little delay
let typingTimer;               
let typeInterval = 500;  
let searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
});

emptyInput.addEventListener('click',()=>{
  searchInput.value = '';
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
})