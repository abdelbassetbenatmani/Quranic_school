fetch('http://localhost:3000/auth/logout');

const logout = document.querySelector('#logout-btn');
if (logout) {
  logout.addEventListener('click', async () => {
    try {
      await fetch('/auth/logout', { method: 'POST' });
      //window.location.reload();
      window.location.href = '/auth/login';
    } catch (error) {
      console.log(error);
    }
  });
}

const addStudentBtn = document.getElementById('add-student-btn');
const addTeacherBtn = document.getElementById('add-teacher-btn');

addTeacherBtn.addEventListener('click', () => {
  console.log('title : ', addStudentBtn.dataset);
  // set the title
  const modalTitle = document.getElementById('staticBackdropLabel');
  modalTitle.textContent = addTeacherBtn.dataset.title;
  // set the body
  const modalBody = document.querySelector(
    '#staticBackdrop .modal-content .modal-body'
  );
  const modalBodyHTMLContent = `<form class="row g-3 needs-validation submit-form" novalidate="novalidate">
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="teacher-fullname-input">الاسم و اللقب</label>
    <input class="form-control" id="teacher-fullname-input" type="text" name="fullName" required="true"/>
    <div class="invalid-feedback">يرجي ملئ البيانات</div>
  </div>
  <div class="py-2"> 
    <label class="form-label fw-bold fs-5" for="grade-selectbox">الرتبة</label>
    <select class="form-control" id="grade-selectbox" name="grade" required="true">
      <option value="dd">استاذ</option>
      <option value="معلم قران" selected="selected"> معلم قران </option>
      <option value="مرشدة دينية" selected="selected"> مرشدة دينية </option>
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
  <div class="py-2"> 
    <label class="fw-bold fs-5 form-label"> تاريخ اول تعيين</label>
    <input class="form-control" type="date" required="true" name="registrationDate" value="01/01/2023"/>
    <div class="invalid-feedback">يرجي ملئ البيانات </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">اغلاق</button>
    <input class="btn btn-primary" type="submit" value="حفظ" data-title="حفظ" id="save-btn"/>
  </div>
</form>`;
  modalBody.innerHTML = modalBodyHTMLContent;
  clientSideValidation();
  const form = modalBody.querySelector('.submit-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const successMessage = modalBody.querySelector('.success-message');
    if (successMessage) successMessage.remove();
    // get form data
    const formData = new FormData(form);
    fetch('http://localhost:3000/teachers', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log('from then');
        const successMessage = document.createElement('div');
        successMessage.classList.add(
          'success-message',
          'error-prompt',
          'bg-success',
          'text-success',
          'bg-opacity-10',
          'p-2',
          'mb-2',
          'rounded'
        );
        successMessage.textContent = 'تمت الاضافة بنجاح';
        modalBody.prepend(successMessage);
        console.log(data.message);
      })
      .catch((e) => console.log('errr : ', e));
  });
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
