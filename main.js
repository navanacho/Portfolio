// Efecto de aparición al hacer scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) section.classList.add('visible');
  });
});

// Luz parallax suave
const lightLayer = document.createElement("div");
lightLayer.classList.add("light-follow");
document.body.appendChild(lightLayer);

document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth) * 100;
  const y = (e.clientY / innerHeight) * 100;

  lightLayer.style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(125,249,255,0.08), rgba(95,0,183,0.03), transparent 60%)
  `;
});

// Botones desplegables
const buttons = document.querySelectorAll('.btn-action[data-target]');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = document.getElementById(btn.dataset.target);
    dropdown.classList.toggle('active');
  });
});