
const users = [];
let currentUser = null;

function registerUser(email, password) {
  if (users.some(user => user.email === email)) {
    return { success: false, message: "Email já cadastrado." };
  }
  users.push({ email, password, message: "" });
  return { success: true, message: "Cadastro realizado com sucesso!" };
}

function authenticateUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    currentUser = user;
    return true;
  }
  return false;
}

function saveMessage(message) {
  if (currentUser) {
    currentUser.message = message;
    return { success: true, message: "Mensagem salva com sucesso!" };
  }
  return { success: false, message: "Nenhum usuário logado." };
}

function logoutUser() {
  currentUser = null;
  toggleMessageArea();
  toggleLogoutButton();
  document.getElementById("message").textContent = "Logout realizado com sucesso!";
  document.getElementById("message").style.color = "green";
}

function toggleMessageArea() {
  const messageArea = document.getElementById("messageArea");
  const savedMessage = document.getElementById("savedMessage");

  if (currentUser) {
    messageArea.style.display = "block";
    savedMessage.textContent = currentUser.message || "Nenhuma mensagem salva.";
  } else {
    messageArea.style.display = "none";
    savedMessage.textContent = "";
  }
}

function toggleLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.style.display = currentUser ? "block" : "none";
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const message = document.getElementById("message");

  const result = registerUser(email, password);
  message.textContent = result.message;
  message.style.color = result.success ? "green" : "red";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (authenticateUser(email, password)) {
    message.textContent = "Login concluído com sucesso!";
    message.style.color = "green";
    toggleMessageArea();
    toggleLogoutButton();
  } else {
    message.textContent = "Email ou senha incorretos!";
    message.style.color = "red";
  }
});

document.getElementById("logoutButton").addEventListener("click", function() {
  logoutUser();
});

document.getElementById("messageForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userMessage = document.getElementById("userMessage").value;
  const message = document.getElementById("message");

  const result = saveMessage(userMessage);
  message.textContent = result.message;
  message.style.color = result.success ? "green" : "red";

  if (result.success) {
    document.getElementById("savedMessage").textContent = currentUser.message;
    document.getElementById("userMessage").value = "";
  }
});
