//fetch('http://localhost:3000/auth/logout');

const logout = document.querySelector('#logout-btn');
if (logout) {
  logout.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
      });
      console.log('errrrrrrrrrr');
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
  const form = modalBody.querySelector('.submit-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const successMessage = modalBody.querySelector('.alert-success');
    if (successMessage) successMessage.remove();
    // get form data
    const formData = new FormData(form);
    fetchOptions.body = formData;
    console.log('fetch : ', fetchOptions);
    // send the request
    fetch(`http://localhost:3000/myschool/${UrlEndpoint}`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('data : ', data);
        // add success message
        if (!data.errors) {
          const successMessage = document.createElement('div');
          successMessage.classList.add('alert', 'alert-success');
          successMessage.textContent = data.msg;
          modalBody.prepend(successMessage);
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
    `<form class="row g-3 needs-validation submit-form" novalidate="novalidate">
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="fullname-input">الاسم و اللقب</label>
    <input class="form-control" id="fullname-input" type="text" name="fullName" required="true"/>
    <div class="invalid-feedback">يرجي ملئ البيانات</div>
  </div>
  <div class="py-2"> 
  <label class="fw-bold fs-5 form-label"> تاريخ الميلاد</label>
  <input class="form-control" type="date" required="true" name="BirthDate" value="01/01/2023"/>
  <div class="invalid-feedback">يرجي ملئ البيانات </div>
</div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="grade-selectbox">الرتبة</label>
    <select class="form-control" id="grade-selectbox" name="grade" required="true">
      <option value="dd">استاذ</option>
      <option value="MQ" selected> معلم قران </option>
      <option value="MD"> مرشدة دينية </option>
    </select>
    <div class="invalid-feedback">يرجي ملئ البيانات</div>
  </div>
  <div class="py-2">
    <p class="fw-bold fs-5 form-label">الحالة</p>
    <div class="form-check">
      <label class="form-check-label" for="#state-emp">موظف</label>
      <input class="form-check-input" id="state-emp" type="radio" name="type" checked="checked" value="employee"/>
    </div>
    <div class="form-check">
      <label class="form-check-label" for="#state-non-emp">متطوع</label>
      <input class="form-check-input" id="state-non-emp" type="radio" name="type" value="nonEemployee"/>
    </div>
  </div>
  <div class="py-2">
    <p class="fw-bold fs-5 form-label">الترخيص</p>
    <div class="form-check">
      <input class="form-check-input" id="authorization-checkbox" type="checkbox" value="true" name="isAuthorized"/>
      <label class="form-check-label" for="authorization-checkbox">مرخص</label>
    </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">اغلاق</button>
    <input class="btn btn-primary" type="submit" value="حفظ" data-title="حفظ" id="save-btn"/>
  </div>
  </form>`,
    'student'
  );
});

// infos buttons
const teachersCards = document.querySelectorAll('.teachers-card');
[...teachersCards].forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.dataset.def === 'get-teacher-infos') {
      const button = event.target;
      console.log('from button');
      const teacherId = card.dataset.id;
      fetch(`http://localhost:3000/myschool/teachers/${teacherId}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          const { msg, teacher } = data;
          console.log('teacher : ', teacher);
          createModel.call(
            button,
            getTeacherModel(teacher),
            `teachers/${teacherId}`,
            {
              method: 'PUT',
            }
          );
        });
    }
  });
});

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
