document.addEventListener("DOMContentLoaded", () => {

let sections = [".main", ".project", ".mySkills", ".aboutMe"];
let currentIndex = 0;
let isScrolling = false;

document.addEventListener("wheel", (event) =>{

    if(isScrolling) return;
     isScrolling = true;

    if(event.deltaY > 0){
        currentIndex = Math.min(currentIndex +1, sections.length - 1);
    } else{
        currentIndex = Math.max(currentIndex - 1, 0);
    }
    const targetSection = document.querySelector(sections[currentIndex]);
    if(targetSection){
    targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}
    setTimeout(() =>{
        isScrolling = false;
    }, 500);
});

 if(window.innerWidth > 1024){
 document.querySelectorAll(".card-container").forEach((card, index) =>{
    gsap.from(card,{
        opacity: 0,
        x: -170,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.3,
        scrollTrigger:{
            trigger: ".project",
            start: "top 75%",
            toggleActions: "play none none reverse",
        },
        onComplete: () =>{
            gsap.to(card, {
                x: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
            });
        }
    });
 });
 }
 
 if(window.innerWidth > 1024){
 document.querySelectorAll(".skill-container").forEach((skill, index) =>{
    gsap.from(skill,{
        opacity: 0,
       x: 500,
        rotate: 200,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.3,
        scrollTrigger:{
            trigger: ".mySkills",
            start: "top center",
            toggleActions: "play none none reverse"
        }
    });
   });
 }

const animations =[
    {
        selector: ".about-container",
        props:{
            opacity: 0,
            y: 50,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger:{
                trigger: ".about-container",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        },
    },
    {
      selector: ".project-header",
      props:{
        opacity: 0,
        scale: 0.3,
        rotate: 80,
        duration: 1.3,
        transformOrigin : "left bottom",
        ease: "elastic.out(1, 0.6)",
        scrollTrigger:{
            trigger: ".project",
            start: "top 75%",
            toggleActions: "play none none reverse",
        },
      },
    },
    {
        selector: ".h3-container",
        props:{
            opacity: 0,
            scale: 0.5,
            rotate: 100,
            transformOrigin: "left bottom",
            duration: "elastic.out(1, 0.6)",
            stagger: 0.3,
            scrollTrigger:{
                trigger: ".mySkills",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        },
    },

    {
        selector: ".about-header",
        props: {
            opacity: 0,
            scale: 0.5,
            rotate: 100,
            transformOrigin: "left bottom",
            duration: 1.7,
            ease: "elastic.out(1, 0.6)",
            stagger: 0.3,
            scrollTrigger:{
                trigger: ".aboutMe",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        },
    },
];
  
 animations.forEach(({selector, props})=>{
    gsap.from(selector,props);
 });
 
 
 const title = document.querySelectorAll("h3");
    title.forEach((title) => {
        let text = title.textContent;
        title.textContent = "";
        title.classList.add("hover-title");

        text.split("").forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter === "  " ? "\u00A0" : letter;
            title.appendChild(span);
        });
    });
 
    const starsContainer = document.querySelector('.stars');
    const aboutMe = document.querySelector('.aboutMe');

    function placeStars() {
        if (!starsContainer || !aboutMe) return;

        const aboutWidth = aboutMe.offsetWidth;
        const aboutHeight = aboutMe.offsetHeight;

        starsContainer.innerHTML = '';

        for (let i = 0; i < 45; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star', 'star');

            const xPos = Math.random() * aboutWidth;
            const yPos = Math.random() * aboutHeight;

            star.style.position = 'absolute';
            star.style.top = `${yPos}px`;
            star.style.left = `${xPos}px`;

            star.style.textShadow = `2px 2px 0px black`;

            let scale = Math.random() * 0.7 + 0.6;
            star.style.transform = `scale(${scale})`;
            star.style.fontSize = Math.random() * 2 + "em";
            star.style.color = "rgba(255, 255, 255, 0.8)";

            star.style.animation = `twinkle ${Math.random() * 2 + 1.5}s linear infinite alternate`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            starsContainer.appendChild(star);
        }
    }

    placeStars();
    window.addEventListener('resize', placeStars);

    const animatedText = document.querySelector(".animated-text");
    const imgContainer = document.querySelector(".img-container");
    
if(animatedText && imgContainer){
    function checkScroll() {
        let textPosition = animatedText.getBoundingClientRect().top;
        let imgPosition = imgContainer.getBoundingClientRect().top;
       
        let screenHeight = window.innerHeight;

        if (textPosition < screenHeight - 100) {
            animatedText.classList.add("active");
        }

        if (imgPosition < screenHeight - 100) {
            imgContainer.classList.add("active");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
}
    const hoverWords = document.querySelectorAll(".hover-word");

hoverWords.forEach((word) =>{
    let text = word.textContent;
    word.textContent ="";

    
    text.split("").forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        word.appendChild(span);
    });


    const spans = word.querySelectorAll("span");

    spans.forEach((span) => {
        span.addEventListener("mouseenter", () => {
            span.classList.add("hovered");
        });

        span.addEventListener("mouseleave", () =>{
            span.classList.remove("hovered");
        });
    });

});
});