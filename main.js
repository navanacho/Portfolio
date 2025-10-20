document.addEventListener('DOMContentLoaded', () => {

  // === SCROLL REVEAL ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // === MODALES ===
  function openModal(modalId) {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById(modalId).classList.add('active');
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('techModal').classList.remove('active');
    document.getElementById('toolsModal').classList.remove('active');
    document.getElementById('cvModal').classList.remove('active');
  }

  // Eventos de botones
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target === 'tech') openModal('techModal');
      else if (target === 'tools') openModal('toolsModal');
      else if (target === 'cv') openModal('cvModal');
    });
  });

  // Cerrar con overlay y botón X
  document.getElementById('modalOverlay').addEventListener('click', closeModal);
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});