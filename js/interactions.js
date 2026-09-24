// Cursor Spotlight effect
const root = document.documentElement;

document.addEventListener('mousemove', e => {
    root.style.setProperty('--mouse-x', e.clientX + "px");
    root.style.setProperty('--mouse-y', e.clientY + "px");
});

// Magnetic Buttons
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', function(e) {
        const position = elem.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    elem.addEventListener('mouseout', function(e) {
        elem.style.transform = `translate(0px, 0px)`;
    });
});
