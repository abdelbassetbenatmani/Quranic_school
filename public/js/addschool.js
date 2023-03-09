const laghouat = [
    {
        "id": 67,
        "commune_name": "البيضاء",
        "daira_name": "قتلة سيدي سعيد",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 73,
        "commune_name": "قلتة سيدي سعد",
        "daira_name": "قتلة سيدي سعيد",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 69,
        "commune_name": "بريدة",
        "daira_name": "بريدة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 66,
        "commune_name": "عين سيدي علي",
        "daira_name": "قتلة سيدي سعيد",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 85,
        "commune_name": "تاجموت",
        "daira_name": "عين ماضي",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 74,
        "commune_name": "الحاج مشري",
        "daira_name": "بريدة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 87,
        "commune_name": "تاويالة",
        "daira_name": "بريدة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 71,
        "commune_name": "الغيشة",
        "daira_name": "الغيشة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 86,
        "commune_name": "تاجرونة",
        "daira_name": "عين ماضي",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 82,
        "commune_name": "سبقاق",
        "daira_name": "أفلو",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 83,
        "commune_name": "سيدي بوزيد",
        "daira_name": "أفلو",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 80,
        "commune_name": "وادي مرة",
        "daira_name": "وادي مرة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 79,
        "commune_name": "الأغواط",
        "daira_name": "الأغواط",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 81,
        "commune_name": "وادي مزي",
        "daira_name": "وادي مرة",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 78,
        "commune_name": "قصر الحيران",
        "daira_name": "قصر الحيران",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 70,
        "commune_name": "العسافية",
        "daira_name": "سيدي مخلوف",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 84,
        "commune_name": "سيدي مخلوف",
        "daira_name": "سيدي مخلوف",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 75,
        "commune_name": "حاسي الدلاعة",
        "daira_name": "حاسي الرمل",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 76,
        "commune_name": "حاسي الرمل",
        "daira_name": "حاسي الرمل",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 65,
        "commune_name": "عين ماضي",
        "daira_name": "عين ماضي",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 72,
        "commune_name": "الحويطة",
        "daira_name": "عين ماضي",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 77,
        "commune_name": "الخنق",
        "daira_name": "عين ماضي",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 68,
        "commune_name": "بن ناصر بن شهرة",
        "daira_name": "قصر الحيران",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    },
    {
        "id": 64,
        "commune_name": "أفلو",
        "daira_name": "أفلو",
        "wilaya_code": "03",
        "wilaya_name": "الأغواط"
    }
]
const diara = document.querySelector('#diara')
const commune = document.querySelector('#commune')
let diaraArr = []
laghouat.forEach((element)=>{
    diaraArr.push( element.daira_name)
})
diaraArr = new Set(diaraArr)
diaraArr.forEach((element)=>{
    const option = document.createElement('option')
    option.innerHTML = element
    diara.appendChild(option)
})
diara.addEventListener('change',()=>{
    let baladiya = []
    baladiya= laghouat.filter((element)=>{
       return  element.daira_name === diara.value
    })
    console.log(baladiya);
    commune.innerHTML = '';
    baladiya.forEach((element)=>{
        const option = document.createElement('option')
        option.innerHTML = element.commune_name
        commune.appendChild(option)
    })
})