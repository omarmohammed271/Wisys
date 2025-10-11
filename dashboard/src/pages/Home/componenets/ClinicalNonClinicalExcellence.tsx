import React from 'react';
import { motion } from 'framer-motion';
import { Network, BarChart3, Brain, Radio, HeartPulse, Activity, Hospital, ShieldCheck, Heart } from "lucide-react";
import NonTech from "@/assets/img/Healthcare_platform_illustration_3ba1d352.png";
import Clincal from "@/assets/img/Enterprise_platform_illustration_1a918fd5.png";
import { Link } from 'react-router-dom';

const ClinicalNonClinicalExcellence = () => {
  return (
    <section className="py-20 w-full bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Label above the section */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-2 text-sm font-semibold bg-foreground text-background rounded-full">
            POWERFUL PLATFORMS
          </span>
        </div>

        {/* Main Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clinical & Non-Clinical Excellence
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized sovereign platforms for healthcare and enterprise transformation, each designed to deliver measurable impact through intelligent data integration and AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT CARD - CLINICAL PLATFORM */}
          <motion.div
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Visual Illustration - Top */}
            <div className="relative w-full">
              <img src={NonTech} alt="Clinical Platform Illustration" className="w-full h-[300px] md:h-[400px] object-cover" />
              <div className="mb-6">
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                  Clinical Platform
                </span>
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Content Block */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                    <Heart />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Health360</h3>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  Unifying healthcare domains through intelligent data integration and AI-powered analytics for enhanced patient care.
                </p>

                {/* Feature Tags */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center p-3 bg-blue-500/5 rounded-lg">
                    <HeartPulse className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">Patient Care Optimization</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-500/5 rounded-lg">
                    <Activity className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">Real-time Monitoring</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-500/5 rounded-lg">
                    <Hospital className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">14 Healthcare Domains</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-500/5 rounded-lg">
                    <ShieldCheck className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">HIPAA Compliant</span>
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-3">Key Capabilities</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-muted-foreground">14 integrated healthcare domains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-muted-foreground">Real-time patient monitoring dashboards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-muted-foreground">AI-powered early detection systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-muted-foreground">Unified HIS system integration</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/Clinical`}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Explore Health360 Platform →
                  </Link>
                  <Link
                    to={`/Clinical`}
                    className="px-6 py-3 bg-transparent border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500/10 transition-colors"
                  >
                    Live Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD - NON-CLINICAL PLATFORM */}
          <motion.div
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Visual Illustration - Top */}
            <div className="relative w-full">
              <img src={Clincal} alt="Non-Clinical Platform Illustration" className="w-full h-[300px] md:h-[400px] object-cover" />
              <div className="mb-6">
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-purple-500 text-white rounded-full">
                  Non-Clinical Platform
                </span>
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Content Block */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                    <Hospital />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">DIGINexa</h3>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  Enterprise-grade platform for business transformation through advanced analytics and seamless system integration.
                </p>

                {/* Feature Tags */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center p-3 bg-purple-500/5 rounded-lg">
                    <Network className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">Enterprise Integration</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-500/5 rounded-lg">
                    <Brain className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">AI-Powered Analytics</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-500/5 rounded-lg">
                    <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">Business Intelligence</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-500/5 rounded-lg">
                    <Radio className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">IoT Connectivity</span>
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-3">Key Capabilities</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-muted-foreground">ERP, CRM, and HIS integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-muted-foreground">Predictive analytics and forecasting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-muted-foreground">IoT and connected device management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-muted-foreground">Enterprise-wide data governance</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/non-Clinical`}
                    className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors"
                  >
                    Explore DIGINexa Platform →
                  </Link>
                  <Link
                    to={`/non-Clinical`}
                    className="px-6 py-3 bg-transparent border border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-500/10 transition-colors"
                  >
                    Live Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalNonClinicalExcellence;