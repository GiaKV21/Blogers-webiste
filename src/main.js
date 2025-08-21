// რეგისტაცია

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));

  if (tab === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('formTitle').textContent = "კეთილი იყოს შენი კალამი!";
  } else if (tab === 'register') {
    document.getElementById('registerForm').classList.add('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
    document.getElementById('formTitle').textContent = "შენი ამბავი იწყება აქ!";
  } else if (tab === 'reset') {
    document.getElementById('resetForm').classList.add('active');
    document.getElementById('formTitle').textContent = "პაროლის აღდგენა";
  }
}

document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = document.getElementById(icon.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// დამავიწყდა პაროლი

function goToStep(step) {
  document.querySelectorAll('.password-container > div').forEach(div => div.classList.add('hidden'));
  document.getElementById('step' + step).classList.remove('hidden');

  if (step === 2) {
    const email = document.getElementById('youremail').value.trim();
    document.getElementById('showEmail').innerText = email;
  }

  const inputs = document.querySelectorAll(".code");
  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}