function openProject(project) {
  window.location.href = "projects/" + project + ".html";
}

const elements = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});