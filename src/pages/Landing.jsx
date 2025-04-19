import React, { useEffect } from 'react';
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import SplitType from "split-type";
import { ProjectsData } from "../projects";

import img1 from '../assets/img-1.jpeg';
import img2 from '../assets/img-2.jpeg';
import img3 from '../assets/img-3.jpeg';
import img4 from '../assets/img-4.jpeg';
import img5 from '../assets/img-5.jpeg';
import img6 from '../assets/img-6.jpeg';
import img7 from '../assets/img-7.jpeg';
import img8 from '../assets/img-8.jpeg';
import img9 from '../assets/img-9.jpeg';
import img10 from '../assets/img-10.jpeg';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Landing = () => {

  const allImageSources = [
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10,
  ];
  

  useEffect(() => {
    const projectsContainer = document.querySelector(".projects");
    const locationsContainer = document.querySelector(".locations");
    const gridImages = gsap.utils.toArray(".img");
    const heroImage = document.querySelector(".img.hero-img");
    const images = gridImages.filter((img) => img !== heroImage);

    const introCopy = new SplitType(".intro-copy h3", {
      type: "words",
      absolute: false,
    });

    const titleHeading = new SplitType(".title h1", {
      types: "words",
      absolute: false,
    });

    // const allImageSources = Array.from(
    //   { length: 10 },
    //   (_, i) => `/img${i + 1}.jpeg`
    // );

    const getRandomImageSet = () => {
      const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    function initializeDynamicContent() {
      ProjectsData.forEach((project) => {
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";

        const projectName = document.createElement("p");
        projectName.textContent = project.name;

        const directorName = document.createElement("p");
        directorName.textContent = project.director;

        projectItem.appendChild(projectName);
        projectItem.appendChild(directorName);

        projectsContainer.appendChild(projectItem);
      });

      ProjectsData.forEach((project) => {
        const locationItem = document.createElement("div");
        locationItem.className = "location-item";

        const locationName = document.createElement("p");
        locationName.textContent = project.location;

        locationItem.appendChild(locationName);
        locationsContainer.appendChild(locationItem);
      });
    }

    function startImageRotation() {
      const totalCycles = 20;

      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();

        gsap.to({}, {
          duration: 0,
          delay: cycle * 0.15,
          onComplete: () => {
            gridImages.forEach((img, index) => {
              const imgElement = img.querySelector("img");

              if (cycle === totalCycles - 1 && img === heroImage) {
                imgElement.src = img5;
                gsap.set(".hero-img img", { scale: 2 });
              } else {
                imgElement.src = randomImages[index];
              }
            });
          },
        });
      }
    }

    function setupInitialStates() {
      gsap.set("nav", {
        y: "-125%"
      });

      gsap.set(introCopy.words, {
        y: "110%",
      });

      gsap.set(titleHeading.words, {
        y: "110%",
      });
    }

    function createAnimationTimeline() {
      const overlayTimeline = gsap.timeline();
      const imagesTimeline = gsap.timeline();
      const textTimeline = gsap.timeline();

      overlayTimeline.to(".logo-line-1", {
        backgroundPosition: "0% 0%",
        color: "#fff",
        duration: 1,
        ease: "none",
        delay: 0.5,
        onComplete: () => {
          gsap.to(".logo-line-2", {
            backgroundPosition: "0% 0%",
            color: "#fff",
            duration: 1,
            ease: "none",
          });
        },
      });

      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
        delay: 1,
      });

      overlayTimeline.to([".locations-header", ".location-item"], {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
      }, "<");

      overlayTimeline.to(".project-item", {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(".location-item", {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      }, "<");

      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to([".locations-header", ".location-item"], {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      }, "<");

      overlayTimeline.to(".overlay", {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });

      imagesTimeline.to(".img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
        onStart: () => {
          setTimeout(() => {
            startImageRotation();
            gsap.to(".loader", { opacity: 0, duration: 0.3 });
          }, 1000);
        },
      });

      imagesTimeline.to(images, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 2.5,
        ease: "hop",
        stagger: 0.05,
      });

      imagesTimeline.to(".hero-img", {
        y: "-45%",
        duration: 1,
        ease: "hop",
      });

      imagesTimeline.to(".hero-img", {
        scale: 4,
        clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
        duration: 1.5,
        ease: "hop",
        onStart: () => {
          gsap.to(".hero-img img", {
            scale: 1,
            duration: 1.5,
            ease: "hop",
          });

          gsap.to(".banner-img", { scale: 1, delay: 0.5, duration: 0.5 });
          gsap.to(".nav", { y: "0%", delay: 0.25, duration: 1, ease: "hop" });
        }
      });

      imagesTimeline.to(".banner-img-1", {
        left: "40%",
        rotate: -20,
        duration: 1.5,
        delay:0.5,
        ease: "hop",
      }, "<");

      imagesTimeline.to(".banner-img-2", {
        left: "60%",
        rotate: 20,
        duration: 1.5,
        ease: "hop",
      }, "<");

      textTimeline.to(titleHeading.words, {
        y: "0%",
        duration: 0.1,
        delay:9.5,
        stagger: 0.1,
        ease: "power3.out",
      });

      textTimeline.to(introCopy.words, {
        y: "0%",
        duration: 1,
        delay: 0.25,
        stagger: 0.25,
        ease: "power3.out",
      }, "<");
    }

    function init() {
      initializeDynamicContent();
      startImageRotation();
      setupInitialStates();
      createAnimationTimeline();
    }

    init();
  }, []);

  return (
   <>
    <div className="overlay fixed top-0 left-0 w-[100vw] p-8 h-[100svh] bg-black text-white flex gap-8 overflow-hidden"> 
    <div className="projects overflow-hidden absolute top-40 left-20 bottom-45 gap-1 flex">
        <div className="projects-header">
          <p >Projects</p>
          <p >Directors</p>
        </div>
      </div> 

        <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2">
          <h1 className="logo-line-1">Nova</h1>
          <h1 className="logo-line-2">Exe</h1>
        </div>

        <div className="locations flex-col gap-2 text-sm tracking-tight w-[25%] items-end overflow-hidden absolute top-40 right-20 bottom-45 flex">
          <div className="locations-header font-semibold uppercase opacity-60">
            <p>Location</p>
          </div>
        </div>
      
    </div>

    <div className="image-grid fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-[30%] flex flex-col gap-[1em] z-2 aspect-square">
      <div className="grid-row">
        <div className="img"><img src={img1} alt="" srcSet="" /></div>
        <div className="img"><img src={img2} alt="" srcSet="" /></div>
        <div className="img"><img src={img3} alt="" srcSet="" /></div>
        
      </div>
      <div className="grid-row ">
      <div className="img"><img src={img4} alt="" srcSet="" /></div>
        <div className="img hero-img"><img src={img5} alt="" srcSet="" /></div>
        <div className="img"><img src={img6} alt="" srcSet="" /></div>
      </div>
      <div className="grid-row">
      <div className="img"><img src={img7} alt="" srcSet="" /></div>
      <div className="img"><img src={img8} alt="" srcSet="" /></div>
      <div className="img"><img src={img9} alt="" srcSet="" /></div>
      </div>
    </div>

    <nav className='nav fixed w-[100vw] p-[1em] flex gap-[2em]'>
      <div className="links flex justify-around items-center">
        <a href="#">Index</a>
        <a href="#">Work</a>
      </div>
      <div className="nav-logo items-center flex justify-center">
        <a className="text-3xl font-extrabold leading-[0.9] italic " href="#">Nova <br /> Exe</a>
      </div>
      <div className="links flex justify-around items-center">
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </nav>

    <div className="banner-img banner-img-1"><img src={img10} alt="" srcSet="" /></div>
    <div className="banner-img banner-img-2"><img src={img8} alt="" srcSet="" /></div>
    
    <div className="intro-copy absolute top-[45%] -translate-y-1/2 w-full p-[0.8em] flex
    justify-between items-center">
      <h3 className='text-2xl'>Creative Solution</h3>
      <h3 className='text-2xl'>Impactfull Result</h3>
    </div>
    <div className="title absolute bottom-[10%] translate-x-1/2">
      <h1 className='text-6xl'>Crafting Bold Experience</h1>
    </div>
    </>
  )
}

export default Landing

// import gsap from "gsap";
// import { CustomEase } from "gsap/all";
//  import SplitType from "split-type";
// import { ProjectsData } from"./projects";

// gsap.registerPlugin(CustomEase);
// CustomEase.create("hop","0.9, 0, 0.1, 1");
//  document.addEventListener ("DOMContentLoaded", () => {

// const projectsContainer = document.querySelector(".projects");
// const locationsContainer = document.querySelector(".locations");
// const gridImages = gsap.utils.toArray(".img");
// const heroImage = document.querySelector(".img.hero-img");
// const images = gridImages.filter( (img) => img != heroImage);

// const introCopy = new SplitType(".intro-copy h3",{
// type: "words",
// absolute: false,
//  });

//  const titleHeading = new SplitType(".title h1", {
//   types: "words",
//    absolute: false,
//  });

//   const allImageSources = Array.from(
//   {length: 35},
//   (_,i) => '/img${i + 1}.jpeg'
//   );

//   const getRandomImageSet = () => {
//   const shuffled = [...allImageSources].sort(() => 0.5 - Math.random( )); 
//   return shuffled. slice(0, 9);
//  };

//  function initializeDynamicContent (){
//   ProjectsData.forEach ((project) => {
//     const projectItem = document.createElement("div");
//     projectItem.className="project-item";

//     const projectName = document.createElement("p");
//     projectName.textContent = project.name;

//     const directorName = document.createElement("p");
//     directorName.textContent = project.director;

//     projectItem.appendChild(projectName);
//     projectItem.appendChild(directorName);

//     projectsContainer.appendChild(projectItem); 
//   })

//   projectsData.forEach((project) => {
//     const locationItem = document.createElement("div");
//     locationItem.className = "location-item";

//     const locationName = document.createElement("p");
//     locationName.textContent = project.location;

//     locationItem.appendChild(locationName);
//     locationsContainer.appendChild(locationItem);
//   });
// }

// function startImageRotation () {
//   const totalCycles = 20 ;

//   for (let cycle =0 ; cycle < totalCycles ; cycle++){
//     const randomImages = getRandomImageSet();

//     gsap.to({}, {
//       duration:0,
//       delay:cycle * 0.15,
//       onComplete : () => {
//         gridImages.forEach((img, index) => {
//           const imgElement = img.querySelector("img");

//           if (cycle === totalCycles -1 && img === heroImage){
//             imgElement.src = "/img5.jpeg";
//             gsap.set (".hero-img img", {scale:2});
//           } else {
//             imgElement.src = randomImages[index];
            
//           }
//         })
//       }
//     })
//   }
// }

// function setupInitialStatus () {
//   gsap.set("nav", {
//     y:"-125"
//   });

//   gsap.set(introCopy.words,{
//     y:"110%",
//   });

//   gsap.set(titleHeading.words, {
//     y:"110%",
//   });
// }

// function init(){
//   initializeDynamicContent();
//   startImageRotation();
//   setupInitialStatus();
// }

// init();

// function createAnimationTimeline () {
// const overlayTimeline = gsap.timeline();
// const imagesTimeline = gsap.timeline();
// const textTimeline = gsap.timeline();

// overlayTimeline.to(".logo-line-1",{
//   backgroundPosition:"0% 0%",
//   color:"#fff",
//   duration:1,
//   ease:"none",
//   delay: 0.5,
//   onComplete:() => {
//     gsap.to (".logo-line-2",{
//       backgroundPosition:"0% 0%",
//       color:"#fff",
//       duration:1,
//       ease:"none",
      
//     })
//   }
// });

// overlayTimeline.to([".projects-header", ".project-item"],{
//   opacity:1,
//   duration:0.15,
//   stagger:0.075,
//   delay:1,
// })

// overlayTimeline.to (
//   [".locations-header", ".location-item"],
//   {
//     opacity:1,
//     duration:0.15,
//     stagger:0.75,
//   },
//   "<"
// );
// overlayTimeline.to(".project-item",{
//   color:"#fff",
//   duration:0.15,
//   stagger:0.075,
// });

// overlayTimeline.to(".location-item",{
//   color:"#fff",
//   duration:0.15,
//   stagger:0.075,
// },"<");

// overlayTimeline.to([".project-header", ".project-item"],{
//   opacity:0,
//   duration:0.15,
//   stagger:0.075,
// });

// overlayTimeline.to([".locations-header", ".location-item"],{
//   opacity:0,
//   duration:0.15,
//   stagger:0.075,
// },"<");

// overlayTimeline.to(".overlay",{
//   opacity:0,
//   duration:0.5,
//   delay:1.5,
// });

// imagesTimeline.to(".img",{
//   clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
//   duration:1,
//   delay:2.5,
//   stagger:0.05,
//   ease:"hop",
//   onStart:() => {
//     setTimeout(() => {
//       startImageRotation();
//       gsap.to(".loader", {opacity:0, duration:0.3});
//     }, 1000);
//   },
//   });

//   imagesTimeline.to(images,{
//     clipPath:"polygon(0 0, 100% 0, 100% 0, 0 0)",
//     duration:1,
//     delay:2.5,
//     ease:"hop",
//     stagger:0.05,
//   })

//   imagesTimeline.to(".hero-img",{
//     y:"-50%",
//     duration:1,
//     ease:"hop",
//   });
 
//   imagesTimeline.to(".hero-img",{
//     scale:4,
//     clipPath:"polygon(20% 10%, 80% 10%, 80% 90%, 20% 90% )",
//     duration:1.5,
//     ease:"hop",
//     onStart:() => {
//     gsap.to(".hero-img img",{
//       scale:1,
//       duration:1.5,
//       ease:"hop",
//     })

//     gsap.to(".banner-img", {scale:1, delay:0.5, duration:0.5});
//     gsap.to(".nav", {y:"0%", delay:0.25, duration:0.5, ease:"hop"});
    
//     }
//   });

//   imagesTimeline.to(".banner-img-1",{
//     left:"40%",
//     rotate:-20,
//     duration:1.5,
//     ease:"hop",
//   },"<");

//   imagesTimeline.to(".banner-img-2",{
//     left:"60%",
//     rotate:20,
//     duration:1.5,
//     ease:"hop",
//   },"<")

//   textTimeline.to(titleHeading.words,{
//     y:"0%",
//     duration:0.1,
//     stagger:9.5,
//     ease:"power3.out",
//   });

//   textTimeline.to(introCopy.words,{
//     y:"0%",
//     duration:1,
//     stagger:0.25,
//     ease:"power3.out",
//     },"<")
//   }
// });




