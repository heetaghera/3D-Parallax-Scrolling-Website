const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xvalue = 0 ,  yvalue = 0;
let rotateDegree = 0;

update(0);

function update(cursorPosition) {
    
    parallax_el.forEach((el) => {

        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotation = el.dataset.rotation;


        let isInleft =  parseFloat(getComputedStyle(el).left) < ( window.innerWidth / 2 ) ? 1 : -1 ;
        let zvalue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInleft * 0.1 ;

        el.style.transform = `perspective(2300px) translateZ(${ zvalue * speedz }px )
        rotateY(${ rotateDegree * rotation }deg )
        translateX(calc(-50% + ${ -xvalue * speedx }px ))
        translateY(calc(-50% + ${ yvalue * speedy }px ))
        `;    

    });
}

window.addEventListener("mousemove", (e) => {

    xvalue = e.clientX - window.innerWidth /2 ;
    yvalue = e.clientY - window.innerHeight /2 ;
    rotateDegree = xvalue / (window.innerWidth /2) * 20;

    update(e.clientX);
});



//For responsiveness

if(window.innerWidth >= 725){
    main.style.maxHeight = `${ window.innerWidth * 0.6 }px`;
}
else{
    main.style.maxHeight = `${ window.innerWidth * 1.6 }px`;
}



// GSAP Animation

function frontanimation(){

    gsap.from( ".bg-img" , {
        y:700,
        duration: 4,
        ease:"power3.out"
    })

    Array.from(parallax_el)
        .filter( (el) => !el.classList.contains("text") && !el.classList.contains("bg-img"))
        .forEach( (el) => {
            gsap.from( el , {
                y: `${el.offsetHeight / 2 + parseFloat(el.dataset.distance) }px`,
                duration: 4,
                ease:"power3.out",
            },
            "1"
            );
    });

    gsap.from( ".text h1" , {
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
        duration: 2.5,
        delay: 3,
        ease:"power3.out"
    })

    gsap.from( ".parallax h2" , {
        y: -1000,
        duration: 2.5,
        delay: 3,
        ease:"power3.out",
    })

    gsap.to(".hide" , {
        opacity: 1,
        duration: 2,
        delay: 3,
        ease:"power4.inout"
    })

};

frontanimation();
