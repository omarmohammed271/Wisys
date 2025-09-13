import ServiceCard from "@/components/ui/ServiceCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { BrainCircuit, Globe } from "lucide-react";

export default function Home(){
    return (
        <div className="container mx-auto pt-12">
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
                    <div className="w-full xl:mx-10 flex justify-center z-10 items-center lg:px-20">
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
                                        {/* <div className="w-full flex justify-center gap-x-3 mt-5">
                                            <Button variant={"default"} className="lg:text-lg p-6">Get Started</Button>
                                            <Button variant={"secondary"} className="lg:text-lg p-6">Learn More</Button>
                                        </div> */}
                                    </div>
                                </motion.div>

                            </span>
                            
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 2 }} // Delay before animation starts
                                className=""
                            >
                                <div className='flex justify-center'>
                                    <div className='p-3 mt-10 items-center text-center w-fit'>
                                    <blockquote className="text-4xl font-serif italic text-slate-300">
                                        “Your vision, our <strong>Genius AI</strong>”
                                    </blockquote>
                                    </div>
                                </div>
                            </motion.div>
                            
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
                        
                    <div className='grid lg:grid-cols-3 max-lg:grid-cols-1 gap-x-5  z-10 w-full'>

                        <ServiceCard
                            icon= {<BrainCircuit />}
                            title= {`AI-Powered Solutions`}
                            description= {`Leverage machine learning and automation to optimize workflows, personalize experiences, and drive innovation.`}
                            />

                        <ServiceCard
                            icon= {<Globe />}
                            title= {`Website Development`}
                            description= {`Build fast, scalable, and responsive websites with cutting-edge technologies, ensuring seamless user experiences.`}
                            />
                        
                    </div>
                    </motion.div>
                </section>

            </div>
            
        </div>
    );
}