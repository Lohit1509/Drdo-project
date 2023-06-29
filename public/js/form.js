const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = 1;
  }, i * 100);
});

window.onload = () => {
  if (sessionStorage.name) {
    location.href = '/';
  }
};

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if (document.querySelector('.name')) {
  // Register page is open
  const name = document.querySelector('.name');
  const rank = document.querySelector('.rank');
  const group_name = document.querySelector('.group_name');
  const OIC_name = document.querySelector('.OIC_name');
  const OIC_designation = document.querySelector('.OIC_designation');

  submitBtn.addEventListener('click', () => {
    if (validateForm()) {
      fetch('/register-user', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          rank: rank.value,
          group_name: group_name.value,
          OIC_name: OIC_name.value,
          OIC_designation: OIC_designation.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          validateData(data);
        });
    }
  });
} else {
  // Login page is open
  submitBtn.addEventListener('click', () => {
    if (validateForm()) {
      fetch('/login-user', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          validateData(data);
        });
    }
  });
}

const validateForm = () => {
  if (email.value.trim() === '' || password.value.trim() === '') {
    alert('Please fill all fields.');
    return false;
  }
  return true;
};

const validateData = (data) => {
  if (!data.name) {
    alertBox(data);
  } else {
    sessionStorage.name = data.name;
    sessionStorage.email = data.email;
    location.href = '/';
  }
};

const alertBox = (data) => {
  const alertContainer = document.querySelector('.alert-box');
  const alertMsg = document.querySelector('.alert');
  alertMsg.innerHTML = data;

  alertContainer.style.top = `5%`;
  setTimeout(() => {
    alertContainer.style.top = null;
  }, 5000);
};
