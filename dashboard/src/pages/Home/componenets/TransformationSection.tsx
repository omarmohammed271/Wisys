import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Mail, MapPin, Phone, Calendar, Lock, ExternalLink } from "lucide-react";
import { Link } from 'react-router-dom';

const TransformationSection = () => {
  return (
    <section className="pt-40 w-full bg-background">
      <div className="container mx-auto px-4">
        {/* Main Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Start Your Transformation Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business with cutting-edge data solutions? Explore our live demo or schedule a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT CARD - Live Demo Access */}
          <motion.div 
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border p-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4">
                <Monitor className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Live Demo Access</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Experience our Digiations 360 platform firsthand with our interactive demo environment.
            </p>
            
            {/* Demo Credentials Card */}
            <div className="bg-muted rounded-xl p-5 mb-6">
              <div className="flex items-center mb-3">
                <Lock className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-sm font-semibold text-foreground">Demo Credentials</span>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Username: <span className="font-mono font-semibold">demo</span></p>
                <p className="text-muted-foreground">Password: <span className="font-mono font-semibold">demo123</span></p>
              </div>
            </div>
            
            {/* Tag/Label */}
            <div className="flex items-center mb-6">
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mr-3">
                Digiations 360
              </span>
              <span className="text-sm text-muted-foreground">Full Platform Demo</span>
            </div>
            
            {/* Primary CTA Button */}
            <a 
              href="http://87.237.225.137:3000/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors mb-6"
            >
              Access Live Demo
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
            
            <p className="text-sm text-muted-foreground">
              Explore our unified platform with real-time dashboards, AI-powered analytics, and sovereign data intelligence.
            </p>
          </motion.div>

          {/* RIGHT CARD - Get in Touch */}
          <motion.div 
            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border p-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Schedule a personalized consultation tailored to your specific requirements.
            </p>
            
            {/* Contact Options */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Location: Saudi Arabia</span>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Business Inquiries: Available upon request</span>
              </div>
              
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Demo Scheduling: Flexible scheduling available</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
             <Link to="/contact" className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center">
                <Calendar className="mr-2 w-4 h-4" />
                Schedule Demo
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-transparent border border-blue-700 text-blue-700 hover:bg-blue-700/10 font-semibold rounded-lg transition-colors flex items-center justify-center">
                <Mail className="mr-2 w-4 h-4" />
                Contact Us
              </Link>
            </div>
            
            {/* Optional Footer Note */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground text-center">
                We would be delighted to schedule a dedicated POC tailored to your specific business requirements.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Footer Section */}
        <div className="mt-16 pt-2 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Digiations. Transforming business ecosystems through intelligent data integration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;