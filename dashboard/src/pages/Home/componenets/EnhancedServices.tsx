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

      if (!section || !wrapper) return;

      // Animate heading
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 50, opacity: 0 },
          {
            fontSize: "3rem",
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }


      
      // Horizontal scroll
      const totalWidth = wrapper.scrollWidth;
      const viewportWidth = section.clientWidth;
      const scrollDistance = totalWidth - viewportWidth;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      }).to(wrapper, {
        x: -scrollDistance,
        ease: "none",
      });
    },
    { scope: sectionRef } // cleanup تلقائي عند unmount
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
      link: "https://techgeneration.sa/"
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
      link: "https://digiations.com/"
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
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-1"
       >
          {/* Category Label */}
       
          
          <motion.h2
            ref={headingRef}
            className="text-2xl  sm:text-6xl md:text-2xl lg:text-5xl font-bold bg-clip-text text-transparent text-center "
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
          </motion.h2>
          
         
        </motion.div>
      </div>

      <div ref={wrapperRef} className="flex space-x-8 px-8 py-10">
        {services.map((service, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 flex flex-col items-center justify-center"
          >
            <div className="w-4/5 max-w-5xl rounded-3xl bg-gradient-to-br from-card to-muted p-1 shadow-2xl border border-border">
              <div className="h-full bg-background rounded-3xl overflow-hidden p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-primary-foreground">{service.icon}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6">{service.desc}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Offerings:</h4>
                  <ul className="space-y-2">
                    {service.offerings.map((offering, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{offering}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <p className="text-muted-foreground italic">{service.tagline}</p>
                </div>

                <div className="mt-8">
                  <button onClick={() => window.open(service.link, '_blank')} className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white-foreground hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 flex items-center">
                    {service.cta}
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <FloatingBlobs/>
    </section>
  );
};

export default EnhancedServices;