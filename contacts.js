function goBack() {
  window.history.back();
}

function copyEmail(el) {
  const email = el.textContent.trim();
  navigator.clipboard.writeText(email);

  el.textContent = "Copied!";
  setTimeout(() => {
    el.textContent = email;
  }, 1200);
}

// Click logo to go home
document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "frontpage.html";
});
