import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FloatingCharts } from '../../../../components/ui/animated-charts';
import FloatingBloom from '../../../../components/ui/FloatingBloom';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "HR Dashboard",
    description: "Monitor employee performance, attendance, engagement scores, and turnover rates. Track hiring metrics like time-to-hire and cost-per-hire to optimize recruitment processes.",
    color: "from-blue-600 to-indigo-700",
    link: "/hr-dashboard",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Finance Dashboard",
    description: "Track financial KPIs including revenue, expenses, budgets, and cash flow. Visualize spending patterns, profitability trends, and investment returns for informed decision-making.",
    color: "from-cyan-500 to-blue-500",
    link: "/finance-dashboard",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Manufacturing Dashboard",
    description: "Optimize production efficiency with real-time monitoring of OEE, downtime, scrap rates, and maintenance compliance. Track output by shift and machine performance metrics.",
    color: "from-orange-500 to-amber-500",
    link: "/dashboards/manufacturing",
    imageUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Procurement Dashboard",
    description: "Manage supplier relationships, monitor purchasing patterns, and track cost savings. Analyze spend distribution, delivery times, and contract compliance across vendors.",
    color: "from-emerald-500 to-green-500",
    link: "/dashboards/procurement",
    imageUrl: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Healthcare Dashboard",
    description: "Oversee patient care metrics, bed occupancy rates, emergency department performance, and healthcare resource allocation. Monitor quality indicators and operational efficiency.",
    color: "from-purple-500 to-pink-500",
    link: "/healthcare",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1974&auto=format&fit=crop"
  }
];

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cardElements = cardsRef.current;
    
    cardElements.forEach((card, index) => {
      const isLast = index === cardElements.length - 1;
      
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLast ? "+=100%" : "bottom top",
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          if (!isLast) {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        },
        onEnterBack: () => {
          gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            scale: 1.05,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Cards Container */}
      <div ref={containerRef} className="relative">
        
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            className=" relative h-screen flex items-center justify-center px-4"
            style={{ zIndex: cards.length - index }}
          >
            {/* Wider card with text on left and image on right */}
            <div className="w-full max-w-6xl h-[80vh] rounded-2xl bg-gradient-to-br from-card to-muted p-1 shadow-2xl">
              <div className="h-full bg-background rounded-xl overflow-hidden border border-border">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Text content - Left side */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="text-sm font-semibold mb-4 text-primary">
                      Dashboard {card.id} of {cards.length}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{card.title}</h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">{card.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={card.link} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center">
                        Explore Dashboard
                      </Link>
                      <button className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Image - Right side */}
                  <div className="w-full md:w-1/2 h-64 md:h-full">
                    <div className={`w-full h-full rounded-xl overflow-hidden`}>
                      <img 
                        src={card.imageUrl} 
                        alt={`${card.title} Preview`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <FloatingBloom/>
          </div>
        ))}
      </div>

      {/* Spacer to ensure last card is fully visible */}
      
    </div>
  );
}