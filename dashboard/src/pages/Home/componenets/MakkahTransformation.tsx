import React from 'react';
import { motion } from 'framer-motion';
import MakkahHealthCluster from '@/assets/img/1749630127473.jpg'

const MakkahTransformation = () => {
  // Gradient animation style for blue text
  const gradientTextStyle = {
    backgroundClip: "text",
    backgroundImage: "linear-gradient(270deg, var(--primary), var(--foreground), var(--chart-2), var(--primary))",
    backgroundSize: "400% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const gradientTextAnimation = {
    backgroundPositionX: ["0%", "400%"],
  };

  const gradientTextTransition = {
    duration: 15,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <section className="py-20 w-full bg-background">
      <div className="container mx-auto px-4">
        {/* Label above the section */}
        <div className="flex justify-center mb-4">
          <motion.span 
            className="px-4 py-2 text-2xl font-bold bg-clip-text text-transparent"
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
            SUCCESS STORY OF 2025
          </motion.span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Makkah Health Cluster
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Transforming healthcare operations through unified data integration and AI-powered analytics across the entire cluster
          </motion.p>
        </motion.div>

        {/* Key Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <motion.h3 
                className="text-2xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                14
              </motion.h3>
            </div>
            <p className="text-muted-foreground">General Hospitals Integrated under unified platform</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <motion.h3 
                className="text-2xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                1.9M
              </motion.h3>
            </div>
            <p className="text-muted-foreground">Beneficiaries Served across the cluster</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <motion.h3 
                className="text-2xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                3.09K
              </motion.h3>
            </div>
            <p className="text-muted-foreground">Bed Capacity Optimized through real-time data</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <motion.h3 
                className="text-2xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                115
              </motion.h3>
            </div>
            <p className="text-muted-foreground">Primary Care Centers Connected and monitored</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Solution Implementation - Single Card */}
            <motion.div 
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <motion.h3 
                  className="text-2xl font-bold"
                  animate={gradientTextAnimation}
                  transition={gradientTextTransition}
                  style={gradientTextStyle}
                >
                  Solution Implementation
                </motion.h3>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Implementations */}
                  <div>
                    <motion.h4 
                      className="text-xl font-bold mb-4"
                      animate={gradientTextAnimation}
                      transition={gradientTextTransition}
                      style={gradientTextStyle}
                    >
                      Key Implementations
                    </motion.h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Integrated clinical, operational, and emergency data via centralized data lake</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Ensured data quality through cleaning and standardization</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Delivered real-time, role-based dashboards across all hospitals</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Enabled alerting for infectious diseases and automated notifications</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Added AI layer for predictive analytics and early detection</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Platform Features */}
                  <div>
                    <motion.h4 
                      className="text-xl font-bold mb-4"
                      animate={gradientTextAnimation}
                      transition={gradientTextTransition}
                      style={gradientTextStyle}
                    >
                      Platform Features
                    </motion.h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Consultation-first unified platform approach</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Real-time dashboards and comprehensive reporting</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Advanced data quality management systems</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Secure access controls and role-based permissions</span>
                      </li>
                      <li className="flex items-start">
                        <motion.span 
                          className="mr-2"
                          animate={gradientTextAnimation}
                          transition={gradientTextTransition}
                          style={gradientTextStyle}
                        >
                          •
                        </motion.span>
                        <span className="text-muted-foreground">Scalable design for future expansion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Measurable Results */}
          </motion.div>
          

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={MakkahHealthCluster}
                alt="Makkah Health Cluster" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </div>


      <div className="mt-6 px-6 md:px-32">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <span className="text-primary font-bold">2</span>
          </div>
          <motion.h3 
            className="text-2xl font-bold"
            animate={gradientTextAnimation}
            transition={gradientTextTransition}
            style={gradientTextStyle}
          >
            Measurable Results
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-sm border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-3xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                30%
              </motion.span>
              <span className="text-muted-foreground">Reduction</span>
            </div>
            <p className="mt-2 text-muted-foreground">in ER patient wait times</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-sm border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-3xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                25%
              </motion.span>
              <span className="text-muted-foreground">Improvement</span>
            </div>
            <p className="mt-2 text-muted-foreground">in bed turnover efficiency</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-sm border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-3xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                31%
              </motion.span>
              <span className="text-muted-foreground">Increase</span>
            </div>
            <p className="mt-2 text-muted-foreground">in operating room and bed utilization</p>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-xl p-6 shadow-sm border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-3xl font-bold"
                animate={gradientTextAnimation}
                transition={gradientTextTransition}
                style={gradientTextStyle}
              >
                25%
              </motion.span>
              <span className="text-muted-foreground">Faster</span>
            </div>
            <p className="mt-2 text-muted-foreground">patient admission from ER</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MakkahTransformation;