import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Database, Brain, Globe, Target, Rocket, ShieldCheck, Network } from "lucide-react";

const DigiationSection = () => {
  return (
    <section id="about-digiation" className="py-20 w-full bg-background">
      <div className="container mx-auto px-4">
        {/* Label above the section */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-2 text-sm font-semibold bg-foreground text-background rounded-full">
            DATA & AI SOLUTIONS
          </span>
        </div>
        
        {/* Main Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Digiations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading solution provider specializing in Data and AI-driven platforms, transforming business ecosystems through intelligent data integration and advanced analytics.
          </p>
        </div>

        {/* Vision and Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <motion.div 
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border p-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Transform Saudi Arabia's business landscape by empowering organizations with cutting-edge data solutions — driving measurable value for citizens, residents, and enterprises through superior, data-driven decisions and high-impact innovation.
            </p>
            
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium text-blue-500">Vision 2030 Aligned</span>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border p-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                <Rocket className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Leverage advanced data analytics and strategic partnerships to empower Saudi Arabian businesses — unlocking their potential through actionable insights, streamlined operations, and innovative digital services that drive progress in alignment with Saudi Arabia's Vision 2030.
            </p>
            
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm font-medium text-purple-500">Strategic Empowerment</span>
            </div>
          </motion.div>
        </div>

        {/* Core Services & Expertise Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Core Services & Expertise</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to drive digital transformation and business excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <Database className="w-5 h-5" />, 
                title: "Digital Transformation", 
                description: "End-to-end enterprise transformation through intelligent data integration" 
              },
              { 
                icon: <Brain className="w-5 h-5" />, 
                title: "AI & Machine Learning", 
                description: "Advanced predictive analytics and AI-powered business insights" 
              },
              { 
                icon: <TrendingUp className="w-5 h-5" />, 
                title: "Data Integration & Analytics", 
                description: "Real-time dashboards, reporting, and enterprise-wide data unification" 
              },
              { 
                icon: <Globe className="w-5 h-5" />, 
                title: "Cloud-Native Platforms", 
                description: "Scalable, secure cloud solutions for modern enterprise needs" 
              },
              { 
                icon: <ShieldCheck className="w-5 h-5" />, 
                title: "Cybersecurity & Governance", 
                description: "Zero Trust security and comprehensive data governance frameworks" 
              },
              { 
                icon: <Network className="w-5 h-5" />, 
                title: "Enterprise Integration", 
                description: "Seamless ERP, CRM, and HIS system connectivity and optimization" 
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>



        {/* Real-time Monitoring Heartbeat Visualization */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Real-time Monitoring</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platforms provide continuous data monitoring with visualization for critical systems.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-32 mb-8">
              {/* Heartbeat line visualization */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background line */}
                <div className="absolute w-full h-0.5 bg-muted"></div>
                
                {/* Animated heartbeat line */}
                <svg 
                  className="absolute w-full h-16" 
                  viewBox="0 0 800 100" 
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 50 L 100 50 L 120 30 L 140 70 L 160 50 L 300 50 L 320 20 L 340 80 L 360 50 L 500 50 L 520 40 L 540 60 L 560 50 L 800 50"
                    fill="none"
                    stroke="url(#heartbeatGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <defs>
                    <linearGradient id="heartbeatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Heartbeat pulses at key points */}
       
              </motion.div>
              
              {/* Heart icon with pulse animation */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-muted-foreground mb-4">
                Continuous monitoring ensures your systems are always performing optimally with real-time insights.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Live Data Stream</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigiationSection;