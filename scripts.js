function createSquare() {
    const square = document.createElement('div');
    square.className = 'square parallax-square';

    const size = Math.random() * 60 + 20;
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 10; 
    const delay = Math.random() * 5; 
    const styles = ['', 'dashed', 'dotted', 'double'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    if (randomStyle) square.classList.add(randomStyle);

    square.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                --duration: ${duration}s;
                --delay: ${delay}s;
            `;

    return square;
}

function initSquares() {
    const container = document.getElementById('animatedSquares');
    const numSquares = 15;

    for (let i = 0; i < numSquares; i++) {
        const square = createSquare();
        container.appendChild(square);

        setTimeout(() => {
            square.remove();
            if (container.children.length < numSquares) {
                container.appendChild(createSquare());
            }
        }, (parseFloat(square.style.getPropertyValue('--duration')) + parseFloat(square.style.getPropertyValue('--delay'))) * 1000);
    }
}

function maintainSquares() {
    const container = document.getElementById('animatedSquares');
    if (container.children.length < 15) {
        container.appendChild(createSquare());
    }
}

window.addEventListener('load', () => {
    initSquares();

    setInterval(maintainSquares, 2000);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const squares = document.querySelectorAll('.square');

    squares.forEach((square, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        square.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

//email js 
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "g8AAzk7gt-qfmqoD_",
    });
})();

window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.sendForm('service_33sxuy8', 'template_auatnvk', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}


