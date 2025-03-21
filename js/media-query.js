function updateText() {
    const TextContainer = document.querySelector(".animated-text");
 if(window.innerWidth < 1024) {
     TextContainer.innerHTML =`
        <div class="text-line"><span id="line1" class="span hover-word"> HEYO!</span></div>
        <div  class="text-line"><span id="line2" class="span hover-word"> I MOONPIE </span></div>
        <div class="text-line"><span id="line3" class="span hover-word"> I'M A BEGINNER </span></div>
        <div  class="text-line"><span id="line4" class="span hover-word"> DEVELOPER </span></div>
        <div class="text-line"><span id="line5" class="span hover-word"> GRAPHIC DESIGNER </span></div>
        <div class="text-line"><span id="line6" class="span hover-word"> AND PRODUCER. </span></div>
 `;
    }
}

function removeSvg(){
    if(window.innerWidth < 1024){
document.querySelectorAll(".first-crystals, .second-crystals").forEach(svg =>{
    if(svg) svg.remove();
});
}
}

function addDecorationDiv() {
 if(document.querySelectorAll(".deco-container").length === 0){
    const main = document.querySelector(".main");
    for (let i = 0; i < 2; i++) {
        let div = document.createElement("div");
        div.classList.add("deco-container");
        div.id = "deco" + i;
        main.appendChild(div);
    }
}
}

if (window.innerWidth < 1024) {
    addDecorationDiv();
}
function checkScroll() {
    const decoContainers = document.querySelectorAll(".deco-container");
    const screenHeight = window.innerHeight;
    decoContainers.forEach((deco) => {
        let decoPosition = deco.getBoundingClientRect().top;

        if (decoPosition < screenHeight - 100) {
            deco.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", checkScroll);
checkScroll();

let cards = document.querySelectorAll(".card-container");
let currentIndex = 0;

let cardWrapper = null;
let prevButton = null;
let nextButton = null;
let mobileButtonWrapper = null;

function createCardWrapper () {
    if (!cardWrapper) {
        cardWrapper =document.createElement('div');
        cardWrapper.classList.add("card-wrapper");
        
        cards.forEach((card, i) => {
            cardWrapper.appendChild(card);
            if(i !== 0){
                card.style.display = "none";
            }
        });

        document.querySelector('.project').appendChild(cardWrapper);
    }
}

function createButtons(){
    if(!mobileButtonWrapper){
        prevButton = document.createElement('button');
        prevButton.classList.add("prev-button");
        prevButton.innerHTML= '<i class="fa-solid fa-arrow-left"></i>';
        prevButton.style.display = "none";

        nextButton = document.createElement('button');
        nextButton.classList.add("next-button");
        nextButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
  
        prevButton.addEventListener('click', () => {
            if(currentIndex > 0){
                currentIndex --;
                showCards(currentIndex);
            }
        });

        nextButton.addEventListener('click', ()=>{
            if(currentIndex < cards.length - 1){
                currentIndex++;
                showCards(currentIndex);
            }
        });

        mobileButtonWrapper = document.createElement('div');
        mobileButtonWrapper.classList.add("mobile-button-wrapper");

        mobileButtonWrapper.appendChild(prevButton);
        mobileButtonWrapper.appendChild(nextButton);

        document.querySelector(".card-wrapper").appendChild(mobileButtonWrapper);

        gsap.from([prevButton, nextButton], {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "bounce.out",
        });
                showCards(currentIndex); 
            }        
    }

    let prevButtonAnimated = false;

    function showCards(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? "block" : "none";
        });
    
        if (prevButton && nextButton) {
            // prevButton kontrolü
            if (index === 0) {
                prevButton.style.display = "none";  
            } else {
                if (prevButton.style.display === "none") {
                    prevButton.style.display = "inline-block";  
    
                    if (!prevButtonAnimated) {
                        gsap.from(prevButton, {
                            y: 50,
                            opacity: 0,
                            duration: 0.8,
                            ease: "bounce.out"
                        });
                        prevButtonAnimated = true;  
                    }
                }
            }
    
           
            nextButton.style.display = index === cards.length - 1 ? "none" : "inline-block";
        }
    }
    
let wrapper;  
let originalParent;  
document.addEventListener("DOMContentLoaded", () => {
    const Boxes = document.querySelectorAll(".skill-container");
    if (Boxes.length === 0) return;

    originalParent = Boxes[0].parentElement;

    createWrapper(Boxes);
    checkSize();
    window.addEventListener("resize", checkSize);
});

function createWrapper(Boxes) {
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.classList.add("skills-wrapper");
        originalParent.insertBefore(wrapper, Boxes[0]);
        Boxes.forEach((box, i) => {
            box.id = `skill-${i}`;
            wrapper.appendChild(box);
        });
        addHoverEffect(Boxes);
    }
}

function addHoverEffect(Boxes) {
    const animationDurations = {
        "skill-0": 500,
        "skill-1": 1100,
        "skill-2": 1400,
    };

    function resetBoxes() {
        Boxes.forEach((box, i) => {
            box.style.transform = i === 0 ? "translateX(0)" : "translateX(-400%)";
            box.style.transition = "";
        });
    }

    resetBoxes();

    wrapper.addEventListener("mouseenter", () => {
        Boxes.forEach((box, i) => {
            const duration = animationDurations[box.id] || 1000;
            setTimeout(() => {
                box.style.transition = `transform ${duration}ms ease-in-out`;
                box.style.transform = "translateX(0)";
            }, duration * i);
        });
    });

    wrapper.addEventListener("mouseleave", resetBoxes);
}

function checkSize() {
    const Boxes = document.querySelectorAll(".skill-container");
    if (window.innerWidth <= 1024) {
        if (!wrapper || !document.body.contains(wrapper)) {
            createWrapper(Boxes);
        }
    } else {
        if (wrapper && document.body.contains(wrapper)) {
            
            Boxes.forEach(box => {
                originalParent.appendChild(box);
                box.style.transform = "";
                box.style.transition = "";
            });
            wrapper.remove();
            wrapper = null;  
        }
    }
}


function checkScreenSize() {
    if(window.innerWidth < 1024) {
        createCardWrapper();
        createButtons();

    }else{
        if (cardWrapper) {
            cardWrapper.replaceWith(...cardWrapper.children);
            cards.forEach(card => card.style.display = "block");
        }
        if(mobileButtonWrapper){
            mobileButtonWrapper.remove();
            mobileButtonWrapper = null;
        }
        prevButton = null;
        nextButton = null;
    }    
    }

let resizeTimer;
window.addEventListener("resize", () =>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() =>{
        updateText();
        removeSvg();
        checkScreenSize();
        checkScroll(); 
    }, 150);
});

document.addEventListener("DOMContentLoaded", () =>{
    updateText();
    checkScreenSize();
    checkScroll();
    removeSvg();
});
