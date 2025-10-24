function toggleSkills(id){
    const element = document.getElementById(id);
    const allIcons = document.querySelectorAll('skill-icon');

    allIcons.forEach(el =>{
        if (el.id !== id){
            el.classList.add('hidden');
        }
    });

    element.classList.toggle('hidden');
}

//animacion del scroller
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () =>{
    sections.forEach(section =>{
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        if (sectionTop < window.innerHeight - 100 && sectionTop > -sectionHeight){
            section.classList.add('visible');
        }
    });
});