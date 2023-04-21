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
const daira = document.querySelector('#daira')
const commune = document.querySelector('#commune')
const teacher = document.getElementById('teacher')
let dairaArr = []
laghouat.forEach((element)=>{
    dairaArr.push( element.daira_name)
})
dairaArr = new Set(dairaArr)
dairaArr.forEach((element)=>{
    const option = document.createElement('option')
    option.innerHTML = element
    daira.appendChild(option)
})
daira.addEventListener('change',()=>{
    let baladiya = []
    baladiya= laghouat.filter((element)=>{
       return  element.daira_name === daira.value
    })
    commune.innerHTML = '';
    baladiya.forEach((element)=>{
        const option = document.createElement('option')
        option.innerHTML = element.commune_name
        commune.appendChild(option)
    })
})


// fetch users to select box
teacher.addEventListener('click',async (e)=>{
    await getUsersList()
},{once:true})

async function getUsersList (){
    try {
        const response = await fetch('http://localhost:3000/dashboard/users', {
          method: 'GET',
        });
        const users = await response.json();
        teacher.innerHTML = '';
        let option = document.createElement("option");
        option.text = 'اختراسم مستخدم';
        option.value = '';
        teacher.add(option)
        users.data.forEach((user)=>{
            let option = document.createElement("option");
            option.text = user.username;
            option.value = user._id;
            teacher.add(option)
            
        })
        console.log(users);
      } catch (error) {
        console.log(error);
      }
}