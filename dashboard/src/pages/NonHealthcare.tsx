import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ------------------------------
// Data object for sections/items
// ------------------------------
const sections = [
  {
    title: "Dashboards",
    items: [
      { label: "HR Dashboard", to: "/hr-dashboard" },
      { label: "Procurement Dashboard", to: "/procurement-dashboard" },
      { label: "Finance Dashboard", to: "/finance-dashboard" },
      { label: "Manufacturing Dashboard", to: "/manufacturing-dashboard" },
    ],
  },
];

// ------------------------------
// Animation variants
// ------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

// ------------------------------
// Main Component
// ------------------------------
export default function NonHealthcare(){
  return (
    <div className="container lg:h-screen lg:overflow-hidden relative mx-auto">
      {/* Background dots */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:30px_30px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />
        </motion.div>
        {/* Radial fade overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background"></div>
      </div>

      {/* Header */}
      <div className="absolute w-full">
        <div className="flex w-full justify-center px-20">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-lg:mx-10 w-[80%] items-center py-10 bg-gradient-to-br from-primary to-secondary
              rounded-lg shadow-md transition-all duration-500"
          >
            <h1 className="text-7xl text-center font-bold text-white">
              Non-Healthcare Dashboards
            </h1>
          </motion.div>
        </div>

        {/* Sections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center w-full h-full mx-auto mt-10 gap-10"
        >
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className=""
            >
              <h1 className="text-3xl font-medium mb-6">{section.title}</h1>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute start-2 top-0 h-full w-1 
                  bg-gradient-to-b from-transparent via-secondary/40 dark:via-muted to-transparent">
                </div>

                {/* Items */}
                <div className="space-y-8 relative ps-5">
                  {section.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="flex items-center gap-4"
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary relative -start-4.5"></div>
                      <Link
                        to={item.to}
                        className="text-lg hover:text-foreground/60 transition"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
