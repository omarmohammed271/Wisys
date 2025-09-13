import ServiceCard from "@/components/ui/ServiceCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BrainCircuit, Globe } from "lucide-react";

export default function Home(){
    return (
        <div className="container relative h-full mx-auto pt-12">
            <div
                className={cn(
                "absolute inset-0",
                "[background-size:20px_20px]",
                "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background"></div>
            
            <div className='relative overflow-'>
                <div className="max-lg:hidden w-full overflow- flex justify-center absolute px-5 top-0 z-0">
                    <div className='flex justify-center w-full '>
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 3 }} // Delay before animation starts
                        className="w-full lg:mx-32"
                    >
                        <img src={backGround} alt="" className='w-full rounded-2xl' />
                    </motion.div> */}
                    </div>
                </div>

                <section id={`hero`} className="flex items-center">
                    <div className="w-full xl:mx-10 flex justify-center z-10 items-center lg:px-15">
                        <div className='text-center p-20 rounded-3xl w-full'>
                            <span className='text-center'>
                                <div className='bg-gradient-to-br from-white via-white to-orange-300 bg-clip-text text-transparent font-bold pb-5'>
                                    {/* <h1 className='text-6xl'>
                                        Your Growth Partner in Innovation, Intelligence, and <i className='text-primary'>Success</i>
                                    </h1> */}
                                    {/* <TypewriterEffect words={words} cursorClassName='bg-primary'/> */}
                                    <TextGenerateEffect words={`Your Growth Partner in Innovation Intelligence, and Success.`} className='' />
                                    {/* <TextGenerateEffect words={` Intelligence, and Success.`} className=' text-6xl' /> */}
                                    
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 2 }} // Delay before animation starts
                                    className=""
                                >
                                    <div className="animate-in fade-in-55 transition-all">
                                        <span className="w-full flex justify-center mb-6">
                                            <h1 className="text-xl text-gray-400 lg:w-1/2 text-center">
                                                Empowering businesses to unlock their full potential with tailored, AI-driven solutions and innovative strategies.
                                            </h1>
                                        </span>
                                    </div>
                                </motion.div>
                            </span>
                        </div>
                    </div>
                </section>

                <section id={`services`} className="flex items-center justify-center w-full pb-20 z-10">
                    {/* <h1>Why choose us?</h1>
                    <h1></h1> */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 2 }} // Delay before animation starts
                        className="w-full md:mx-32"
                    >
                        
                    <div className='grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-5 z-10 w-full'>

                        <ServiceCard
                            icon= {<BrainCircuit />}
                            title= {`Health Cluster`}
                            description= {`Leverage machine learning and automation to optimize workflows, personalize experiences, and drive innovation.`}
                        />

                        <ServiceCard
                            icon= {<Globe />}
                            title= {`Non-health Cluster`}
                            description= {`Build fast, scalable, and responsive websites with cutting-edge technologies, ensuring seamless user experiences.`}
                        />
                        
                    </div>
                    </motion.div>
                </section>

            </div>
            
        </div>
    );
}