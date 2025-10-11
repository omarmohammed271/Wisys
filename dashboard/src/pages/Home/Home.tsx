import AreaChart from "@/components/Charts/Home/AreaChart";
import PieChart from "@/components/Charts/Home/PieChart";
import RadarChart from "@/components/Charts/Home/RadarChart";
import { FloatingCharts } from "@/components/ui/animated-charts";
import ServiceCard from "@/components/ui/ServiceCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
import { motion, scale } from "framer-motion";
import { BrainCircuit, Framer, Globe, Scale } from "lucide-react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Preloader from "@/components/ui/Preloader";
import StackedCards from "@/pages/Home/componenets/Cards/StackedCards";
import MakkahTransformation from "./componenets/MakkahTransformation";
import ClinicalNonClinicalExcellence from "./componenets/ClinicalNonClinicalExcellence";
import DigiationSection from "./componenets/DigiationSection";
import TransformationSection from "./componenets/TransformationSection";
import EnhancedServices from './componenets/EnhancedServices';

export default function Home() {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloader(false);
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div>
          <div className="container relative items-center flex mx-auto pt-40">
            <div>
              {/* Floating animated charts in background */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <FloatingCharts />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                  )}
                />
              </motion.div>

              {/* Radial gradient */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background"></div>

              <div className="relative xl:px-40 py-20 w-full">
                <section id="hero" className="flex items-center">
                  <div className="w-full xl:mx-10 flex justify-center z-10 items-center ">
                    <div className="text-center rounded-3xl w-full mb-20">
                      <span className="text-center">
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                          <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: 1,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="mb-8"
                          >
                            <motion.h1
                              className=" lg:px-15 text-5xl min-h-29 sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent"
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
                              Digiations 360.
                            </motion.h1>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 2 }}
                        >
                          <div className="animate-in fade-in-55 transition-all">
                            <span className="w-full flex justify-center mb-6">
                              <h1 className="text-xl text-muted-foreground lg:w-1/2 text-center">
                            Digiations turns enterprise data into regulated, real-time intelligence—
architected in Saudi Arabia for Vision 2030. Sovereign AI, clinical-grade governance,
and seamless integration—at enterprise scale.
                              </h1>
                            </span>
                          </div>
                        </motion.div>
                      </span>
                    </div>
                  </div>
                </section>

                {/* Feature Cards */}
                <div className="w-full px-4 pb-20">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div
                      
                        initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 2 }}
                       className="bg-card rounded-xl p-6 shadow-lg border border-border">
                        <h3 className="text-xl font-bold mb-3 text-foreground">Sovereign & Secure</h3>
                        <p className="text-muted-foreground">
                          KSA data residency with enterprise-grade security
                        </p>
                      </motion.div>
                      
                      <motion.div
                             whileHover={{ scale: 1.03 }}
                              
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 2 }}
                        className="bg-card rounded-xl p-6 shadow-lg border border-border  ">
                        <h3 className="text-xl font-bold mb-3 text-foreground">GenAI Orchestration</h3>
                        <p className="text-muted-foreground">
                          Enterprise AI with clinical-grade governance
                        </p>
                      </motion.div>
                      
                      <motion.div 
                    
                      initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1.5 }}
                      className="bg-card rounded-xl p-6 shadow-lg border border-border">
                        <h3 className="text-xl font-bold mb-3 text-foreground">Integration Fabric</h3>
                        <p className="text-muted-foreground">
                          Connect EHR, ERP, IoT, and legacy systems
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <section
                  id="services"
                  className="flex items-center justify-center w-full pb-20 z-10"
                >
                
                </section>
              </div>
            </div>
          </div>

          <div className="pt-20 w-full">
            <EnhancedServices />
          </div>

          {/* Clinical & Non-Clinical Excellence Section */}
          <ClinicalNonClinicalExcellence />

          {/* About Digiations Section */}
          <DigiationSection />

          {/* Makkah Digital Transformation Section */}
          <MakkahTransformation />
      
          {/* Start Your Transformation Today Section */}
          <TransformationSection />
        </div>
      )}
    </>
  );
}
