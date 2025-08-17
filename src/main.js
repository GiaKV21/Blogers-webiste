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