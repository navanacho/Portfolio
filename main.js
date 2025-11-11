// Efecto de aparición al hacer scroll (solo para la sección de scroll)
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  // Función para verificar si un elemento está en la vista
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Función para aplicar la animación
  function checkScrollSection() {
    cards.forEach(card => {
      if (isInViewport(card)) {
        card.classList.add('visible');
      }
    });
  }

  // Aplicar la verificación al cargar la página y al hacer scroll
  window.addEventListener('scroll', checkScrollSection);
  window.addEventListener('resize', checkScrollSection);

  // Verificar inmediatamente al cargar
  checkScrollSection();
});

// Botones desplegables
document.querySelectorAll('.btn-action[data-target]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Prevenir la acción por defecto si es un enlace
    if (btn.tagName === 'A') {
        e.preventDefault();
        alert('Funcionalidad de descarga de CV pendiente de implementar.');
        return;
    }

    const dropdown = document.getElementById(btn.dataset.target);
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  });
});