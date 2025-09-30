import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
        <>
         <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-20 blur-3xl"
        initial={{ opacity: 0, y: 50, scale: 0.8,  x:200}}
        animate={{  opacity: [0.7, 0.4, 0.3], scale: [0.8, 1, 0.8], x:[50, -30, 50] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Blue Blob */}
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-500 opacity-20 blur-3xl"
        initial={{ opacity: 0, y: -50, scale: 0.8 ,x:-200 }}
        animate={{ opacity: [0.7, 0.4, 0.3], scale: [0.8, 1, 0.8] ,x:[50, -30, 50] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
        
        </>
  );
}