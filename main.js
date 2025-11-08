// Efecto de aparición de secciones
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) section.classList.add('visible');
  });
});

// Efecto de luz dinámica suave (parallax follow)
const lightLayer = document.createElement("div");
lightLayer.classList.add("light-follow");
document.body.appendChild(lightLayer);

document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth) * 100;
  const y = (e.clientY / innerHeight) * 100;

  lightLayer.style.background = `
    radial-gradient(
      circle at ${x}% ${y}%,
      rgba(100, 255, 218, 0.1),
      rgba(20, 184, 166, 0.03),
      transparent 60%
    )
  `;
});
