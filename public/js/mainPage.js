//fetch('http://localhost:3000/auth/logout');

const logout = document.querySelector('#logout-btn');
if (logout) {
  logout.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
      });
      location.href = '/auth/login';
      //window.location.reload();
      //return false;
    } catch (error) {
      console.log(error);
    }
  });
}

// current Date
function formatDateForDateInput(givenDate = Date.now()) {
  const date = new Date(givenDate);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

function findMaxDateElement(arr) {
  if (arr.length === 0) {
    return null; // Return null if the array is empty
  }

  let maxDateElement = arr[0]; // Assume the first element has the biggest date

  for (let i = 1; i < arr.length; i++) {
    const currentDate = new Date(arr[i].date);
    const maxDate = new Date(maxDateElement.date);

    if (currentDate > maxDate) {
      maxDateElement = arr[i]; // Update maxDateElement if a bigger date is found
    }
  }

  return maxDateElement;
}

function getTeacherModel(teacherInfos = {}) {
  const {
    fullName = '',
    grade = 'OTQ',
    type = 'employee',
    isAuthorized = 'true',
    registrationDate = Date.now(),
  } = teacherInfos;
  return `<form class="row g-3 needs-validation submit-form" novalidate="novalidate">
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="teacher-fullname-input">الاسم و اللقب</label>
    <input class="form-control" id="teacher-fullname-input" type="text" value="${fullName}" name="fullName" required="true"/>
    <div class="invalid-feedback">يرجي ملئ البيانات</div>
  </div>
  <div class="py-2">
  <p class="fw-bold fs-5 form-label">الحالة</p>
  <div class="form-check">
    <label class="form-check-label" for="state-emp">موظف</label>
    <input class="form-check-input" id="state-emp" type="radio" name="type" ${
      type === 'employee' ? 'checked' : ''
    } value="employee" required/>
  </div>
  <div class="form-check">
    <label class="form-check-label" for="state-non-emp">متطوع</label>
    <input class="form-check-input" id="state-non-emp" type="radio" name="type" ${
      type === 'nonEmployee' ? 'checked' : ''
    } value="nonEmployee"/>
  </div>
</div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="grade-selectbox">الرتبة</label>
    <select class="form-control" id="grade-selectbox" name="grade" ${
      type === 'employee' ? '' : 'disabled'
    } ${type === 'employee' ? 'required' : ''}>
      <option value="OTQ" ${
        grade === 'OTQ' ? 'selected' : ''
      }>استاذ التعليم القراني</option>
      <option value="MQ" ${
        grade === 'MQ' ? 'selected' : ''
      }>معلم قران</option>
      <option value="MD" ${
        grade === 'MD' ? 'selected' : ''
      }> مرشدة دينية </option>
      <option value="MO" ${grade === 'MO' ? 'selected' : ''}>مؤذن</option>
      <option value="QAY" ${grade === 'QAY' ? 'selected' : ''}>قيم</option>
      <option value="IM" ${
        grade === 'IM' ? 'selected' : ''
      }>امام مدرس</option>
      <option value="IO" ${
        grade === 'IO' ? 'selected' : ''
      }>امام استاذ</option>
    </select>
    <div class="invalid-feedback">يرجي ملئ البيانات</div>
  </div>
  <div class="py-2">
    <p class="fw-bold fs-5 form-label">الترخيص</p>
    <div class="form-check">
      <input class="form-check-input" id="authorization-checkbox" type="checkbox" value="${isAuthorized}" ${
    isAuthorized ? 'checked' : ''
  } name="isAuthorized" ${type === 'employee' ? 'disabled' : ''} />
      <label class="form-check-label" for="authorization-checkbox">مرخص</label>
    </div>
  </div>
  <div class="py-2"> 
    <label class="fw-bold fs-5 form-label"> تاريخ اول تعيين</label>
    <input class="form-control" type="date" required="true" name="registrationDate" value="${formatDateForDateInput(
      registrationDate
    )}"/>
    <div class="invalid-feedback">يرجي ملئ البيانات </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">اغلاق</button>
    <input class="btn btn-primary" type="submit" value="حفظ" data-title="حفظ" id="save-btn"/>
  </div>
  </form>`;
}

function getStudentModel(studentInfos = {},qSave = false) {
  const {
    fullName = '',
    BirthDate = '01/01/2000',
    sex = 'male',
    fatherName = '',
    schoolStatus = 'in',
    isInternal = false,
    level = '',
    quranSave = [],
  } = studentInfos;
  return `<form action="addstudent" class="row g-3 needs-validation submit-form" novalidate="novalidate">
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="student-fullname-input">الاسم و اللقب</label>
    <input class="form-control" id="student-fullname-input" type="text" value="${fullName}" name="fullName" required="true"/>
    <div class="invalid-feedback">يرجي ملئ الاسم و اللقب</div>
  </div>
  <div class="py-2"> 
    <label class="fw-bold fs-5 form-label"> تاريخ الميلاد</label>
    <input class="form-control" type="date" required="true" name="BirthDate" value="${formatDateForDateInput(
      BirthDate
    )}"/>
    <div class="invalid-feedback">يرجي ملئ تاريخ الميلاد </div>
  </div>
  <div class="py-2">
  <p class="fw-bold fs-5 form-label">الجنس</p>
  <div class="form-check">
    <label class="form-check-label" for="male">ذكر</label>
    <input class="form-check-input" id="male" type="radio" name="sex" ${
      sex === 'male' ? 'checked' : ''
    } value="male" required/>
  </div>
  <div class="form-check">
    <label class="form-check-label" for="female">أنثى</label>
    <input class="form-check-input" id="female" type="radio" name="sex" ${
      sex === 'female' ? 'checked' : ''
    } value="female"/>
  </div>
  </div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="student-fathername-input">اسم الأب</label>
    <input class="form-control" id="student-fathername-input" type="text" value="${fatherName}" name="fatherName" required="true"/>
    <div class="invalid-feedback">اسم الأب</div>
  </div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="schoolStatus-selectbox">الوضعية مع المدرسة التربوية</label>
    <select class="form-control" id="schoolStatus-selectbox" name="schoolStatus">
      <option value="before" ${
        schoolStatus[0].status === 'before' ? 'selected' : ''
      }>قبل سن التمدرس</option>
      <option value="in" ${
        schoolStatus[0].status === 'in' ? 'selected' : ''
      }>متمدرس</option>
      <option value="out" ${
        schoolStatus[0].status === 'out' ? 'selected' : ''
      }>منفصل</option>
      <option value="old" ${schoolStatus[0].status === 'old' ? 'selected' : ''}>متفرغ</option>

    </select>
    <div class="invalid-feedback">يرجي ملئ الوضعية التربوية</div>
  </div>
  <div class="py-2">
    <p class="fw-bold fs-5 form-label">داخلي</p>
    <div class="form-check">
      <input class="form-check-input" id="isInternal-checkbox" type="checkbox" value="${isInternal}" ${
        isInternal ? 'checked' : ''
  } name="isInternal"  />
      <label class="form-check-label" for="authorization-checkbox">داخلي</label>
    </div>
  </div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="level-selectbox">المستوى التعليمي</label>
    <select class="form-control" id="level-selectbox" name="level" ${
      schoolStatus === 'before' ? 'disabled' : ''
    } ${schoolStatus === 'in' ? 'required' : ''}>
      <option value="AP" ${
        level === 'AP' ? 'selected' : ''
      }>مستوى ابتدائي</option>
      <option value="AF" ${
        level === 'AF' ? 'selected' : ''
      }>مستوى متوسط</option>
      <option value="AS" ${level === 'AS' ? 'selected' : ''}>مستوى ثانوي</option>
      <option value="UN" ${level === 'UN' ? 'selected' : ''}>مستوى جامعي</option>
    </select>
    <div class="invalid-feedback">يرجي ملئ المستوى التعليمي</div>
  </div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="quranSave-selectbox">متسوى الحفظ</label>
    <select class="form-control" id="quranSave-selectbox" name="quranSave">
      <option value="0" ${
        qSave ==true ? (findMaxDateElement(quranSave).Qsave == '0' ? 'selected' : ''):null
      }>أقل من الربع</option>
      <option value="0.25" ${
        qSave ==true ? (findMaxDateElement(quranSave).Qsave == '0.25' ? 'selected' : ''):null
      }>ربع القرآن</option>
      <option value="0.5" ${
        qSave ==true ? (findMaxDateElement(quranSave).Qsave == '0.5' ? 'selected' : ''):null
      }>نصف القرآن</option>
      <option value="0.75" ${qSave ==true ? (findMaxDateElement(quranSave).Qsave == '0.75' ? 'selected' : ''):null}>ثلاثة أرباع القرآن</option>
      <option value="1" ${qSave ==true ? (findMaxDateElement(quranSave).Qsave == '1' ? 'selected' : ''):null}>القرآن كاملا</option>

    </select>
    <div class="invalid-feedback">يرجي ملئ  مستوى الحفظ</div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">اغلاق</button>
    <input class="btn btn-primary" type="submit" value="حفظ" data-title="حفظ" id="save-btn"/>
  </div>
  </form>`;
}


// add buttons
const addStudentBtn = document.getElementById('add-student-btn');
const addTeacherBtn = document.getElementById('add-teacher-btn');
// create model function
function createModel(
  htmlContent,
  UrlEndpoint,
  fetchOptions = {
    method: 'POST',
  }
) {
  // set the title
  const modalTitle = document.getElementById('staticBackdropLabel');
  modalTitle.textContent = this.dataset.title;
  // set the body
  const modalBody = document.querySelector(
    '#staticBackdrop .modal-content .modal-body'
  );
  const modalBodyHTMLContent = htmlContent;
  modalBody.innerHTML = modalBodyHTMLContent;
  // validate the model
  clientSideValidation();
  // change the state of the checkboxes
  [...modalBody.querySelectorAll('input[type="checkbox"]')].forEach(
    (checkbox) => {
      checkbox.addEventListener('change', () => {
        checkbox.value = checkbox.checked ? 'true' : 'false';
        //checkbox.checked = checkbox.checked ? 'true' : 'false';
        console.log('checkbox  : ', checkbox);
      });
    }
  );
  // handle the changed state of the radio buttons
  [...modalBody.querySelectorAll('input[name="type"]')].forEach(
    (radioBtn) => {
      radioBtn.addEventListener('change', () => {
        const gradeSelectBox = modalBody.querySelector('#grade-selectbox');
        const authorizationCheckbox = modalBody.querySelector(
          '#authorization-checkbox'
        );
        if (radioBtn.value === 'employee') {
          gradeSelectBox.removeAttribute('disabled');
          gradeSelectBox.removeAttribute('required');
          authorizationCheckbox.setAttribute('disabled', true);
        } else {
          gradeSelectBox.setAttribute('disabled', true);
          gradeSelectBox.setAttribute('required', true);
          authorizationCheckbox.removeAttribute('disabled');
        }
      });
    }
  );
  let schoolStatus= document.querySelector('#schoolStatus-selectbox')
  if (typeof(schoolStatus) != 'undefined' && schoolStatus != null)
  {
    let levelStatus= document.querySelector('#level-selectbox')
    schoolStatus.addEventListener('change',()=>{
      if(schoolStatus.value ==="before"){
        levelStatus.setAttribute('disabled', true);
      }else{
        levelStatus.removeAttribute('disabled')
      }
    })
  }
  
  
  const form = modalBody.querySelector('.submit-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const successMessage = modalBody.querySelector('.alert-success');
    if (successMessage) successMessage.remove();
    // get form data
    const formData = new FormData(form);
    fetchOptions.body = formData;
    // send the request
    fetch(`http://localhost:3000/myschool/${UrlEndpoint}`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
           
          const { _id, fullName } = data.teacher || data.student;
          console.log(`fullname is : ${fullName}`);
          // add success message
          const successMessage = document.createElement('div');
          successMessage.classList.add('alert', 'alert-success');
          successMessage.textContent = data.msg;
          modalBody.prepend(successMessage);
          // update the stats on the UI
          if (/\bteachers/.test(UrlEndpoint)) {
            // update the number
            document.querySelector('#nbr-teachers').textContent =
              data.numberOfTeachers;
            const teachersListWrapper = document.querySelector(
              'ul.teachers-list__wrapper'
            );
            // add the teacher info to the UI
            if (fetchOptions.method === 'POST') {
              const teachersCard = document.createElement('li');
              teachersCard.classList.add(
                'teachers-card',
                'shadow-sm',
                'd-flex',
                'justify-content-between',
                'align-items-center',
                'p-2',
                '.mb-3'
              );
              teachersCard.dataset.id = _id;
              teachersCard.dataset.fullname = fullName;
              teachersCard.innerHTML = `<p class="teachers-name m-0 ml-1">${fullName} </p>
              <div class="controllers-wrapper"> 
                <button class="get-teacher-infos btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-title="معلومات" data-def="get-teacher-infos">معلومات</button>
                <button class="remove-teacher btn btn-danger"> احالة</button>
              </div>`;
              console.log('teachers card : ', teachersCard);
              // add event listeners to buttons
              teachersCard
                .querySelector('button.get-teacher-infos')
                .addEventListener('click', (event) => {
                  showInfosEvent(event, _id);
                });
              teachersListWrapper.append(teachersCard);
            }
            // update the teacher info
            else {
              const teachersCard = document.querySelector(
                `.teachers-card[data-id="${_id}"]`
              );
              console.log('teacherCard : ', teachersCard);
              teachersCard.querySelector('.teachers-name').textContent =
                fullName;
            }
          } else if(/\bstudents/.test(UrlEndpoint)){
            document.querySelector('#nbr-students').textContent =
              data.numberOfStudent;
            document.querySelector('#nbr-males').textContent =
              data.numberOfStudentMale;
            document.querySelector('#nbr-females').textContent =
              data.numberOfStudentFemale;
            const studentsListWrapper = document.querySelector(
                'ul.students-list__wrapper'
            );
            if (fetchOptions.method === 'POST'){
              const studentsCard = document.createElement('li');
              studentsCard.classList.add(
                'students-card',
                'shadow-sm',
                'd-flex',
                'justify-content-between',
                'align-items-center',
                'p-2',
                '.mb-3'
              );
              studentsCard.dataset.id = _id;
              studentsCard.dataset.fullname = fullName;
              studentsCard.innerHTML = `<p class="students-name m-0 ml-1">${fullName} </p>
              <div class="controllers-wrapper"> 
                <button class="update-student-save btn btn-outline-primary ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-title="حفظ" data-def="update-student-save">زيادة الحفظ</button>
                <button class="get-student-infos btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-title="معلومات" data-def="get-teacher-infos">معلومات</button>
                <button class="remove-student btn btn-outline-danger"> احالة</button>
              </div>`;
              console.log('student card : ', studentsCard);
              // add event listeners to buttons
              studentsCard
                .querySelector('button.get-student-infos')
                .addEventListener('click', (event) => {
                  showInfosEvent(event, _id);
                });
                studentsListWrapper.append(studentsCard);
            }
            // update the student info
            else {
              const studentsCard = document.querySelector(
                `.students-card[data-id="${_id}"]`
              );
              console.log('studentCard : ', studentsCard);
              studentsCard.querySelector('.students-name').textContent =
                fullName;
            }
          }
        }
      })
      .catch((e) => console.log('errr : ', e));
  });
}
// add events
addTeacherBtn.addEventListener('click', function () {
  createModel.call(addTeacherBtn, getTeacherModel(), 'teachers');
});

addStudentBtn.addEventListener('click', function () {
  createModel.call(
    addStudentBtn,
    getStudentModel(),
    'students'
  );

});

// infos teacher buttons
const teachersCards = document.querySelectorAll('.teachers-card');
[...teachersCards].forEach((card) => {
  card.addEventListener('click', (event) => {
    showInfosEvent(event, card.dataset.id);
  });
});

// infos student buttons
const studentsCards = document.querySelectorAll('.students-card');
[...studentsCards].forEach((card) => {
  card.addEventListener('click', (event) => {
    showInfosEvent(event, card.dataset.id);
  });
});

function showInfosEvent(event, Id) {
  if (event.target.dataset.def === 'get-teacher-infos') {
    const button = event.target;
    fetch(`http://localhost:3000/myschool/teachers/${Id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const { msg, teacher } = data;
        createModel.call(
          button,
          getTeacherModel(teacher),
          `teachers/${Id}`,
          {
            method: 'PUT',
          }
        );
      });
  }else if(event.target.dataset.def === 'get-student-infos'){
    const button = event.target;
    fetch(`http://localhost:3000/myschool/students/${Id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const { msg, student } = data;
        console.log(student);
        createModel.call(
          button,
          getStudentModel(student,true),
          `students/${Id}`,
          {
            method: 'PUT',
          }
        );
      });
  }
}
// search functionality
const searchInput = document.getElementById('search-by-name');
searchInput.addEventListener('keyup', () => {
  const teachersList = document.querySelector('.teachers-list__wrapper');
  teachersList.innerHTML = '';
  const searchInputVal = searchInput.value;
  const searchRegex = new RegExp(searchInputVal, 'g');
  //console.log('search regex : ', searchRegex);
  // append the items
  teachersCards.forEach((card) => {
    //console.log('fulName : ', card.dataset.fullName);
    if (searchRegex.test(card.dataset.fullname)) {
      teachersList.append(card);
    }
  });
  // if there are no matches
  if (teachersList.innerHTML === '') {
    const thereIsNoMatchWrapper = document.createElement('p');
    thereIsNoMatchWrapper.classList.add('h3', 'text-center', 'opacity-25');
    thereIsNoMatchWrapper.textContent = 'لا يوجد مدرسين';
    teachersList.append(thereIsNoMatchWrapper);
  }
});

// from bootstrap docs
function clientSideValidation() {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
}


