const sections = document.getBoundingClientRect().top;
 
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = document.getBoundingClientRect().top;
        const sectionVisible = sectionTop < window.innerHeight - 100;

        if(sectionVisible){
            section.classList.add('visible');
        }
    });
});

window.addEventListener('load', () =>{
    setTimeout(() =>{
        sections.forEach(sectio =>{
            const sectionTop = section.getBoundingClientRect().top;
            if(sectionTop < window.innerHeight - 100){
                section.classList.add('visible');
            }
        });
    }, 100);
})