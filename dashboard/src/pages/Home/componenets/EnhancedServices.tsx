import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import FloatingBlobs from "@/components/ui/FloatingBloom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EnhancedServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
 

useGSAP(
  () => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const heading = headingRef.current;

    if (!section || !wrapper || !heading) return;

    // ✅ كل الأنيميشنز هتكون جوه matchMedia
    ScrollTrigger.matchMedia({
      // 📱 موبايل
      "(max-width: 767px)": function () {
        // عنوان
        gsap.fromTo(
          heading,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Scroll أفقي
        const totalWidth = wrapper.scrollWidth;
        const viewportWidth = section.clientWidth;
        const scrollDistance = totalWidth - viewportWidth;

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top", // يبدأ لما يوصل أول الصفحة
            end: () => `+=${scrollDistance * 0.9}`, // أقل مسافة للموبايل
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        }).to(wrapper, {
          x: -scrollDistance,
          ease: "none",
        });
      },

      // 💻 تابلت و لابتوب وما فوق
      "(min-width: 768px)": function () {
        // عنوان
        gsap.fromTo(
          heading,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Scroll أفقي
        const totalWidth = wrapper.scrollWidth;
        const viewportWidth = section.clientWidth;
        const scrollDistance = totalWidth - viewportWidth;

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top", // يبدأ التثبيت من أول الصفحة
            end: () => `+=${scrollDistance}`, // ياخد المسافة الكاملة
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        }).to(wrapper, {
          x: -scrollDistance,
          ease: "none",
        });
      },
    });
  },
  { scope: sectionRef } // ✅ cleanup تلقائي عند unmount
);


  const services = [
    { 
      icon: "👤",
      title: "Consulting", 
      desc: "Transform your organization with Saudi Arabia's most experienced digital transformation consultants. We architect enterprise-wide solutions that drive measurable ROI and sustainable growth.",
      offerings: [
        "Enterprise Digital Strategy & Roadmapping",
        "AI Implementation & Governance Frameworks",
        "Data Architecture & Clinical Workflow Design",
        "Vision 2030 Compliance & Regulatory Guidance"
      ],
      tagline: "🔹 The Kingdom's premier digital transformation advisory powerhouse",
      cta: "Engage Strategic Consulting",
   
       link: "https://digiations.com/"
    },
    { 
      icon: "<>",
      title: "Tech-Build", 
      desc: "Build sovereign, enterprise-grade platforms with our dedicated engineering teams. From Health360 to DigiNexa, we deliver production-ready solutions at unprecedented speed and scale.",
      offerings: [
        "Custom Platform Development & Integration",
        "Sovereign AI Model Development & Deployment",
        "Clinical & Enterprise System Architecture",
        "24/7 DevOps & Infrastructure Management"
      ],
      tagline: "🔹 Saudi Arabia's most advanced platform engineering powerhouse",
      cta: "Explore Tech-Build Services",
        link: "https://techgeneration.sa/"
    },
    { 
      icon: "🎓",
      title: "Academy", 
      desc: "Accelerate your workforce transformation with comprehensive AI and digital skills training. From clinical staff to C-suite executives, we build the capabilities that drive Vision 2030 success.",
      offerings: [
        "Executive AI Leadership & Strategy Programs",
        "Clinical AI & Digital Health Certification",
        "Data Science & Analytics Upskilling",
        "Custom Corporate Learning Pathways"
      ],
      tagline: "🔹 Saudi Arabia's most comprehensive digital skills academy",
      cta: "Explore Academy Programs",
    
      link: "https://raqmanaplus.academy/"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background text-foreground py-20 rounded-lg"
    >      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1  }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-1"
       >
          {/* Category Label */}
       
          
          <motion.div
            ref={headingRef}
            className="text-2xl  sm:text-6xl md:text-2xl lg:text-5xl   font-bold bg-clip-text text-transparent text-center "
            animate={{
              backgroundPositionX: ["0%", "400%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "linear-gradient(270deg, var(--primary), var(--foreground), var(--chart-2), var(--primary))",
              backgroundSize: "400% auto",
            }}
          >
            Three Powerhouses, One Vision
          </motion.div>
          
         
        </motion.div>
      </div>

  <div ref={wrapperRef} className="flex space-x-8 px-4 sm:px-6 md:px-8 py-8 md:py-10">
  {services.map((service, i) => (
    <div
      key={i}
      className="w-[90vw] sm:w-[80vw] md:w-screen flex-shrink-0 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-card to-muted p-[1px] shadow-2xl border border-border">
        <div className="h-full bg-background rounded-3xl overflow-hidden p-4 sm:p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3 sm:mr-4">
              <span className="text-lg sm:text-xl font-bold text-primary-foreground">{service.icon}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-5 md:mb-6">
            {service.desc}
          </p>

          {/* Offerings */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
              Key Offerings:
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {service.offerings.map((offering, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {offering}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground italic">
              {service.tagline}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-6 md:mt-8">
            <button
              onClick={() => window.open(service.link, "_blank")}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 flex items-center text-sm sm:text-base"
            >
              {service.cta}
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

{/* عناصر ديكور */}
<FloatingBlobs />

    </section>
  );
};

export default EnhancedServices;