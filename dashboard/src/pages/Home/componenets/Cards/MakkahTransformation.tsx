import React from 'react';

const MakkahTransformation = () => {
  return (
    <section className="py-20 w-full bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Makkah Digital Transformation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of innovation and spiritual enhancement through technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold">Introduction</h3>
              </div>
              <p className="text-muted-foreground pl-14">
                Makkah, the holiest city in Islam, has embraced a digital transformation journey to enhance the experience of millions of pilgrims who visit annually. This sacred city has seamlessly integrated cutting-edge technology with its spiritual significance.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold">Technology</h3>
              </div>
              <p className="text-muted-foreground pl-14">
                Leveraging AI, IoT sensors, and real-time analytics, the city has deployed smart crowd management systems, predictive maintenance for facilities, and intelligent transportation solutions. These technologies work together to ensure a seamless and safe experience for all visitors.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold">Impact</h3>
              </div>
              <p className="text-muted-foreground pl-14">
                The transformation has resulted in a <span className="font-bold text-primary">40% reduction in bottlenecks</span> during peak times and a <span className="font-bold text-primary">30% increase in pilgrim satisfaction</span> scores. Emergency response times have improved by 50%, and resource allocation has become more efficient.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="text-2xl font-bold">Vision</h3>
              </div>
              <p className="text-muted-foreground pl-14">
                This transformation exemplifies how technology can respectfully enhance spiritual experiences while providing a scalable, modern infrastructure. Makkah continues to pioneer innovative solutions that honor its sacred purpose while serving humanity with excellence.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1518049474179-938673471963?q=80&w=2070&auto=format&fit=crop" 
                alt="Makkah Digital Transformation" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakkahTransformation;