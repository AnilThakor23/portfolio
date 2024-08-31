var scrollY=0
function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  const sections = gsap.utils.toArray("section");

  sections.forEach(function (section) {
    const inner = section.querySelector(".section-inner");

    ScrollTrigger.create({
      scroller: ".main",
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: inner,
      pinSpacing: false,
      pinType: "transform",
    });
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


///////////////////////////////
  locoScroll.on('scroll', (instance) => {
    // The current scroll position in pixels
    scrollY = instance.scroll.y;
  });

}
loco();

function page1(){
  
      function menu() {
        const btn = document.querySelector(".page1 .menuBtn");
        const menuContent = document.querySelector(".page1 .menuContent");
        const menuClose = document.querySelector(".page1 .menuBtn .menu-close");
        let isMenuOpen = false;
    
        // Function to open or close the menu
        function toggleMenu() {
            if (!isMenuOpen) {
                gsap.to(menuClose, { top: "-100%" });
                if (window.innerWidth > 768) {
                    gsap.to(menuContent, { top: "2vh", ease: "power2.out", duration: 1, onComplete: () => { isMenuOpen = true; } });
                } else {
                    gsap.to(menuContent, { top: "0vh", ease: "power2.out", duration: 1, onComplete: () => { isMenuOpen = true; } });
                }
                gsap.to(".page1", { backgroundColor: "black" });
                gsap.to(".page1 .bigText", { opacity: 0.4 });
            } else {
                gsap.to(menuClose, { top: "0%" });
                gsap.to(menuContent, { top: "-100vh", ease: "power2.in", duration: 1, onComplete: () => { isMenuOpen = false; } });
                gsap.to(".page1", { backgroundColor: "#151515" });
                gsap.to(".page1 .bigText", { opacity: 1 });
            }
        }
    
        // Event listener for menu button
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the click from propagating to the document
            toggleMenu();
        });
    
        // Event listener for clicks outside the menu content
        document.addEventListener('click', (event) => {
            if (isMenuOpen && !menuContent.contains(event.target) && event.target !== btn) {
                toggleMenu();
            }
        });
    }
    
    menu();
    
    //  hire me btn animation
    function page1HoverAnimation(){
      let btn = document.querySelector(".page1 .hoverAnimation")
      let textPart1 = document.querySelector(".page1 .hoverAnimation .textPart1")
      let textPart2 = document.querySelector(".page1 .hoverAnimation .textPart2")
      let Splited_TextContent = textPart1.textContent.split("")
      
      let k = ""
      Splited_TextContent.forEach((e)=>{k += `<span>${e}</span>`})
      
      textPart1.innerHTML=k
      textPart2.innerHTML=k
      
      AllSpans1 = document.querySelectorAll(".page1 .hoverAnimation .textPart1 span")
      AllSpans2 = document.querySelectorAll(".page1 .hoverAnimation .textPart2 span")
      AllSpans1.forEach((e)=>{e.style.position = "relative" ;})
      AllSpans2.forEach((e)=>{e.style.position = "relative" ; e.style.opacity =0 })
      
      btn.addEventListener("mouseenter",()=>{
        gsap.to(AllSpans1,{ top:"-70%" ,stagger:0.015,opacity:0,})
        gsap.to(".page1 .hoverAnimation .iconPart1",{y:-10 ,opacity:0})
        gsap.to(AllSpans2,{ top:"-100%",stagger:0.015,opacity:1,})
        gsap.to(".page1 .hoverAnimation .iconPart2",{y:-20 ,opacity:1,})
      })
     btn.addEventListener("mouseleave",()=>{
       gsap.to(AllSpans1,{ top:"0%" ,stagger:0.015,opacity:1,})
       gsap.to(".page1 .hoverAnimation .iconPart1",{y:0 ,opacity:1})
       gsap.to(AllSpans2,{ top:"0%",stagger:0.015,opacity:0,})
       gsap.to(".page1 .hoverAnimation .iconPart2",{y:0 ,opacity:0})
      })
    }
    function updateTime() {
      const timeDisplay = document.querySelector('.page1 nav .time-display');
      const now = new Date();
  
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
  
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
  
      // Format hours and minutes to always have two digits
      let formattedHours = hours.toString().padStart(2, '0');
      let formattedMinutes = minutes.toString().padStart(2, '0');
  
      const timeString = formattedHours + ':' + formattedMinutes + ' ' + ampm;
      timeDisplay.textContent = timeString;
    }


  // Initial call to set the time immediately when the page loads
  updateTime();
  // Call updateTime every minute (60,000 milliseconds)
  setInterval(updateTime, 60000);
  
function imageAppearingAnimation() {
  const imagePaths = ["./images/1.webp", "./images/3.webp", "./images/6.webp","./images/7.webp", "./images/8.webp", "./images/9.webp", "./images/10.webp", "./images/11.webp", "./images/12.webp", "./images/13.webp", "./images/14.webp", "./images/15.webp"];
  const images = [];
  const parent = document.querySelector(".page1");
  let imageIndex = 0;
  let oldDets = { x: 0, y: 0, time: 0 }; // Track cursor position and time
  let width = "15vw";
  let height = "9vw";
  const thresholdX = 150; // Horizontal movement threshold
  const thresholdY = 90;  // Vertical movement threshold

  // Preload all images and start animation only after all are loaded
  let loadedImagesCount = 0;
  imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === imagePaths.length) {
              startAnimation();
          }
      };
      images.push(img);
  });

  function startAnimation() {
      parent.addEventListener("mousemove", (dets) => {
          let currentTime = Date.now();
          let timeDiff = currentTime - oldDets.time;
          let diffX = dets.x - oldDets.x;
          let diffY = dets.y - oldDets.y;

          if (Math.abs(diffX) > thresholdX || Math.abs(diffY) > thresholdY) {
              let speed = Math.sqrt(diffX ** 2 + diffY ** 2) / timeDiff; // Calculate cursor speed
              let moveDistance = gsap.utils.mapRange(0, 20, 20, 300, speed); // Increased the range for a faster effect

              let angle = Math.atan2(diffY, diffX);
              let offsetX = Math.cos(angle) * moveDistance;
              let offsetY = Math.sin(angle) * moveDistance;

              const div1 = document.createElement("div");
              const div2 = document.createElement("div");
              let img = images[imageIndex];

              imageIndex += 1;
              if (imageIndex >= images.length) { imageIndex = 0; }

              div1.style.position = "absolute";
              div1.style.justifyContent = "center";
              div1.style.alignItems = "center";
              div1.style.width = width;
              div1.style.height = height;
              div1.style.opacity = 0.2;

              div2.style.position = "absolute";
              div2.style.top = "50%";
              div2.style.left = "50%";
              div2.style.transform = "translate(-50%, -50%)";
              div2.style.width = "17vw";
              div2.style.height = "17vw";
              div2.style.borderRadius = "50%";
              div2.style.display = "flex";
              div2.style.justifyContent = "center";
              div2.style.alignItems = "center";
              div2.style.overflow = "hidden";

              img.style.width = width;
              img.style.height = height;
              img.style.objectFit = "cover";
              img.style.borderRadius = "10px";

              div1.style.transform = "translate(-50%, -50%)";
              div1.style.transformOrigin = "center";

              div1.style.top = `${dets.y + scrollY}px`;
              div1.style.left = `${dets.x}px`;

              gsap.set(div1, { opacity: 0 });

              div2.appendChild(img);
              div1.appendChild(div2);
              parent.appendChild(div1);

              // Enhanced appearance and movement for impact
              gsap.to(div1, {
                  duration: 0.5,
                  opacity: 1,
                  ease: "power2.out",
              });

              gsap.from(div2, { width: "0vw", height: "0vw", duration: 0.5 }); // Faster scaling

              // Smooth and slightly faster movement based on cursor speed
              gsap.to(div1, {
                  x: `+=${offsetX}`,
                  y: `+=${offsetY}`,
                  ease: "power2.out",
                  duration: 0.8, // Adjusted for a faster momentum effect
              });

              oldDets.x = dets.x;
              oldDets.y = dets.y;
              oldDets.time = currentTime; // Update last recorded time

              // Smooth and noticeable disappearance
              setTimeout(() => {
                  gsap.to(div1, {
                      opacity: 0,
                      scale: 0.8,
                      duration: 0.4,
                      ease: "power2.out",
                      onComplete: () => { parent.removeChild(div1); }
                  });
              }, 700);
          }
      });
  }
}

  if(window.innerWidth > 1000){imageAppearingAnimation()}

  }
  page1()
  


function page2(){

  // checkBox animation
  let checkBoxes = document.querySelectorAll(".page2 .checkBox");
  let circles = document.querySelectorAll(".page2 .circle");
  let checkState = [1, 1, 0];

  function selectBox(index){
      let tlForSelectBox = gsap.timeline();
      tlForSelectBox.to(checkBoxes[index], {backgroundColor: "black", duration: 0.05})
        .to(circles[index], {left: "20%", duration: 0.05})
        .to(circles[index], {left: "56%", backgroundColor: "#FF525B",  duration: 0.2});
      checkState[index] = 1;

      let otherIndex = Math.floor(Math.random() * 2) === 0 ? (index + 1) % 3 : (index + 2) % 3;
      gsap.to(checkBoxes[otherIndex], {backgroundColor: "#DCDCDC", duration: 0.05});
      gsap.to(circles[otherIndex], {left: "3%", backgroundColor: "black", rotate: "0deg", duration: 0.2});
      checkState[otherIndex] = 0;
  }

  function unselectBox(index){
      gsap.to(checkBoxes[index], {backgroundColor: "#DCDCDC", duration: 0.05});
      gsap.to(circles[index], {left: "3%", backgroundColor: "black",  duration: 0.2});
      checkState[index] = 0;

      let otherIndex = checkState[(index + 1) % 3] === 0 ? (index + 1) % 3 : (index + 2) % 3;
      let tlForUnselectBox = gsap.timeline();
      tlForUnselectBox.to(checkBoxes[otherIndex], {backgroundColor: "black", duration: 0.05})
        .to(circles[otherIndex], {left: "20%", duration: 0.05})
        .to(circles[otherIndex], {left: "56%", backgroundColor: "#FF525B",  duration: 0.2});
      checkState[otherIndex] = 1;
  }

  checkBoxes.forEach((box, index) => {
      box.addEventListener("click", () => {
          if (checkState[index] === 0) {
              selectBox(index);
          } else {
              unselectBox(index);
          }
      });
  });

/// become a client hover animation on laptop.
  function pg2HoverAnimation(){
    let becomeAClient = document.querySelector(".page2 .part4")
    let circle = document.querySelector(".page2 .part4 .letsTalk")
    let Rect = becomeAClient.getBoundingClientRect();

   if(window.innerWidth > 900){
      becomeAClient.addEventListener("mouseenter",(dets)=>{
        circle.style.top=dets.y - Rect.top + scrollY
        circle.style.left=dets.x - Rect.left
        gsap.to(circle,{scale:1,ease:"power2.out"})
      })
      becomeAClient.addEventListener("mousemove",(dets)=>{
        gsap.to(circle,{top: dets.y - Rect.top + scrollY ,left: dets.x - Rect.left})
      })
      becomeAClient.addEventListener("mouseleave",(dets)=>{
        gsap.to(circle,{scale:0,ease:"power2.in"})
      })
   }
   else{
      becomeAClient.addEventListener("mouseenter",()=>{
         gsap.to(circle,{top:"0%"})
      })
      becomeAClient.addEventListener("mouseleave",(dets)=>{
        gsap.to(circle,{top:"100%"})
      })
   }

    
  } pg2HoverAnimation() 

   
}
// page2();

function page3(){
   
  // heading text animation on start
  BreakTextIntoSpans(".page3 .HeadText div")
  // gsap.set(".page3 .HeadText h3 span",{position:"relative"})
  gsap.from(".page3 .HeadText div span ",{
    duration:1,
    y: 100,
    // transform:"translateY(-50%)",
    ease:"power2.out",
    stagger:0.03,
    scrollTrigger:{
        trigger:'.page3 .HeadText div',
        scroller:'.main',
        start:'top: 80%',
    }
  })

  // capsule type  image animation
  if(window.innerWidth > 900){

    let parents = document.querySelectorAll(".page3 .content .elem") 
   parents.forEach((el)=>{
    let capsule = el.querySelector(".capsule")
    let image = el.querySelector(".capsule img  ")
    let background = el.querySelector(".background")
    let numbers = el.querySelectorAll("span")
    

    el.addEventListener("mouseenter",()=>{
       let tl444 = gsap.timeline()
       gsap.to(el,{paddingLeft:"8vw",paddingRight:"8vw",duration:0.7})
       gsap.to(background,{top:"0%",duration:0.4})
       tl444.to(numbers,{top:"-100%",stagger:0.1,duration:0.3})
       tl444.fromTo(numbers,{top:"100%"},{top:0,stagger:0.1,duration:0.3}) 
       gsap.to(capsule,{top:"50%",opacity:1,force3D: true,})
    })
    el.addEventListener("mouseleave",()=>{
      let tl1 = gsap.timeline()
      gsap.to(el,{paddingLeft:"5vw",paddingRight:"5vw",duration:0.7})
      gsap.to(background,{top:"100%",duration:0.4})
      tl1.to(numbers,{top:"100%",stagger:0.1,duration:0.3})
      tl1.fromTo(numbers,{top:"-100%"},{top:0,stagger:0.1,duration:0.3}) 
      gsap.to(capsule,{top:"100%",opacity:0 ,delay:0.2,force3D: true,})
    })
    el.addEventListener("mousemove",(dets)=>{
       gsap.to(capsule,{
        left: `${gsap.utils.mapRange( 0, window.innerWidth, 35 , 55 ,dets.x)}%`
       })
       gsap.to(image,{
        objectPosition: `${gsap.utils.mapRange( 0, window.innerWidth, 65 , 35 ,dets.x)}% 50%`
       })
       
    })
  })
  }

}page3()

function contactPage(){
  let parent = document.querySelector(".contactPage .animationParent")
  let text = document.querySelector(".contactPage .animationParent .text")
  let copyEmail = document.querySelector(".contactPage .animationParent .copyEmail")
  let copyEmailText = document.querySelector(".contactPage .animationParent .copyEmail h5")
   
  // to set animation for mobile 
  let click = 0
 
  if(window.innerWidth > 900){
    parent.addEventListener("mouseenter",()=>{
      gsap.to(text,{opacity:0.5,rotate:"-5deg",scale:0.8})
      gsap.to(copyEmail,{opacity:1})
      gsap.from(copyEmailText,{y:30})
    })
    parent.addEventListener("mouseleave",()=>{
      gsap.to(text,{opacity:1,rotate:"0deg",scale:1})
      gsap.to(copyEmail,{opacity:0})
      gsap.to(copyEmailText,{y:0})
    })
  
    // copying  email 
      copyEmail.addEventListener('click', function() {
        const email = 'apcode23@gmail.com';
        navigator.clipboard.writeText(email).then(function() {
            copyEmailText.textContent = "email copied!"
            copyEmail.style.width=`fit-content`
            copyEmail.style.paddingLeft = "2vw"
            copyEmail.style.paddingRight = "2vw"
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
      });
  }
  else{
    parent.addEventListener("mouseenter",()=>{
      gsap.to(text,{opacity:0.6,rotate:"-5deg",scale:0.8})
      gsap.to(copyEmail,{opacity:1,onStart:()=>{copyEmail.style.display="flex"}})
      gsap.from(copyEmailText,{y:30})
    })
    parent.addEventListener("mouseleave",()=>{
      gsap.to(text,{opacity:1,rotate:"0deg",scale:1})
      gsap.to(copyEmail,{opacity:0,onComplete:()=>{copyEmail.style.display="none"}})
      gsap.to(copyEmailText,{y:0})
    })
  
    // copying  email 
      copyEmail.addEventListener('click', function() {
            copyEmailText.textContent = 'apcode23@gmail.com'
            copyEmail.style.width=`fit-content`
            copyEmailText.style.textTransform=`lowercase`
            copyEmail.style.paddingLeft = "5vw"
            copyEmail.style.paddingRight = "5vw"   
      });
   }
 


}contactPage()


function aboutPage(){
  // about text animation on start

  BreakTextIntoSpans(".aboutPage .aboutText")
    gsap.from(".aboutPage .aboutText span",{
      duration:1,
      y: 100,
      ease:"power2.out",
      stagger:0.03,
      scrollTrigger:{
          trigger:'.aboutPage',
          scroller:'.main',
          start:'top: 85%',
      }
    })
   
    // more about me text animation
    let paragraph = document.querySelector(".aboutPage .paragraph")
    let splitedtext = paragraph.textContent.split("")
    let count = ''
      splitedtext.forEach((e)=>{
        count += `<span>${e}</span>`
      })
    paragraph.innerHTML=count
    gsap.set(".aboutPage .paragraph span",{opacity:0.3})
    gsap.to(".aboutPage .paragraph span",{
        // color:"red",
        duration:1,
        opacity:1,
        ease:"power2.out",
        stagger:0.5,
        scrollTrigger:{
            trigger:'.aboutPage .paragraph',
            scroller:'.main',
            start:'top: 98%',
            end:"top: 40%",
            scrub:1,
        }
      }) 
      
   


  function AboutPageSvgAnimation(){
    let svgParent = document.querySelector(".aboutPage .svgParent")
    //  svg string animation
    let Rect = svgParent.getBoundingClientRect();
    let height = Rect.height
    let width = Rect.width
    let initialPath = `M 0 ${height/2} Q ${width/2} ${height/2} ${0.85*window.innerWidth} ${height/2}`
    let path =``
    
    document.querySelector(".aboutPage svg path").setAttribute("d",initialPath)
  
    svgParent.addEventListener("mousemove",(dets)=>{
       path = `M 0 ${height/2} Q ${dets.x} ${(dets.y - Rect.top + scrollY)} ${0.85*window.innerWidth} ${height/2}`
       
       gsap.to(".aboutPage svg path",{
        attr:{d:path}
       })
    })
    svgParent.addEventListener("mouseleave",()=>{        
      gsap.to(".aboutPage svg path",{
       attr:{d:initialPath},
       duration:2.5,
       ease:"elastic.out(1,0.2)"
      })
   })
  
  }

  AboutPageSvgAnimation()
}aboutPage()



function buttonsHover(){
   let allParents = document.querySelectorAll(".main .buttonHover")

   allParents.forEach((parent)=>{
    let bg1 = parent.querySelector(".bg1")
    let bg2 = parent.querySelector(".bg2")
    parent.addEventListener("mouseenter",()=>{
        gsap.to(bg1,{
          left:"-49%",
        })
        gsap.to(bg2,{
          left:"51%",
        })
      })
      parent.addEventListener("mouseleave",()=>{
        gsap.to(bg1,{
          left:"-100%",
        })
        gsap.to(bg2,{
          left:"100%",
        })
      })
   })
   
}
buttonsHover()













function loadingpage() {
  let tl = gsap.timeline();

  document.addEventListener("DOMContentLoaded", function () {
    const loaderCount = document.querySelector(".loaderPage #count");

    tl.from(".loaderPage .content .text", {
      y: 100,
      duration: 0.8,
      stagger: 0.2,
    });

    tl.to(
      {},
      {
        delay: 0.8,
        duration: 0.4, // duration in seconds
        ease: "none",
        onUpdate: function () {
          const progress = Math.round(this.progress() * 10)*10;
          loaderCount.textContent = `${progress}%`;
        },
        onComplete: function () {
          loaderCount.textContent = "100%";
          document.querySelector(".loaderPage .wrapper").style.borderRadius =
            "10px";

          tl.to(".loaderPage .wrapper", {
            onStart: () => {
              gsap.to(".loaderPage .content .text", {
                y: -120,
                duration: 0.7,
                stagger: 0.1,
              });
            },
            top: "70%",
            duration: 1.3,
            height: "0",
            ease: "power3.in",
            width: "85vw",
            onComplete:()=>{document.querySelector(".loaderPage").style.display="none"},
          });
        },
      }
    );
  });
}
loadingpage();




// tool functions

function BreakTextIntoSpans(parameter){
   let element = document.querySelectorAll(parameter)
   element.forEach((elem)=>{
      let splitedtext = elem.textContent.split("")
      elem.innerHTML = ""
      splitedtext.forEach((e)=>{
        let span= document.createElement("span")
        span.textContent = e
        if(e == " "){
          if(window.innerWidth >800 ){ span.style.marginLeft="2vw"}
          else{span.style.marginLeft="4vw"}
        }
        span.style.display = "inline-block"
        console.log(span)
        elem.appendChild(span)
      })
      console.log(elem)
   })
   return element
}


let imagekk = new Image()
imagekk.src= "./images/1.webp"
imagekk.onload = () => {
    console.log("anil bapuuuuuuuu")
};