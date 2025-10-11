import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ------------------------------
// Data object for sections/items
// ------------------------------
const sections = [
  {
    title: 'Settings',
    items: [
      { label: 'MasterBook', to: 'http://87.237.225.137:3000/MasterBook' },
      { label: 'Region', to: 'http://87.237.225.137:3000/Region' },
      { label: 'Pages', to: 'http://87.237.225.137:3000/Pages' },
      { label: 'Roles', to: 'http://87.237.225.137:3000/Roles' },
      { label: 'Users', to: 'http://87.237.225.137:3000/Users' },
      { label: 'Domain', to: 'http://87.237.225.137:3000/Domain' },
    ],
  },
  {
    title: 'Mapping',
    items: [
      { label: 'Facility', to: 'http://87.237.225.137:3000/Facility' },
      {
        label: 'Facility Master Data',
        to: 'http://87.237.225.137:3000/FacilityMasterData',
      },
      {
        label: 'Mapping Master Data',
        to: 'http://87.237.225.137:3000/MappingMasterData',
      },
      {
        label: 'Section Master',
        to: 'http://87.237.225.137:3000/section-master',
      },
      {
        label: 'Section Mapping',
        to: 'http://87.237.225.137:3000/section-mapping',
      },
    ],
  },
  {
    title: 'Dashboard',
    items: [
      {
        label: 'Clinical Beds Overview New',
        to: 'http://87.237.225.137:3000/N-Mhc-Beds',
      },
      {
        label: 'Clinical Beds Critical New',
        to: 'http://87.237.225.137:3000/N-Critical-Care',
      },
      {
        label: 'Emergency Dashboard New',
        to: 'http://87.237.225.137:3000/MHCEmergencyNew',
      },
      {
        label: 'Emergency Status',
        to: 'http://87.237.225.137:3000/MHCEmergency-two-new',
      },
      { label: 'Admitted New', to: 'http://87.237.225.137:3000/Admitted-new' },
      {
        label: 'Clinical Morque-Data New',
        to: 'http://87.237.225.137:3000/N-Morque-Data',
      },
      {
        label: 'Clinical Makkah Bed Details New',
        to: 'http://87.237.225.137:3000/N-bed-makka-details',
      },
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
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// ------------------------------
// Main Component
// ------------------------------
export default function Clinical() {
  return (
    <div className="container lg:pt-10 lg:min-h-[88vh] lg:overflow-hidden pb-10 relative mx-auto">
      {/* Background dots */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div
            className={cn(
              'absolute inset-0',
              '[background-size:30px_30px]',
              '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
              'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
            )}
          />
        </motion.div>
        {/* Radial fade overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background"></div>
      </div>

      {/* Header */}
      <div className="w-full relative">
        <div className="flex w-full justify-center lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:mx-10 w-[80%] items-center py-10 bg-gradient-to-br from-primary to-secondary
              rounded-lg shadow-md transition-all duration-500"
          >
            <h1 className="text-3xl lg:text-5xl xl:text-7xl text-center font-bold text-white">
              Clinical Dashboards
            </h1>
          </motion.div>
        </div>

        {/* Sections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 h-full w-2/3 mx-auto mt-10 gap-10"
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
                <div
                  className="absolute start-2 top-0 h-full w-1 
                  bg-gradient-to-b from-transparent via-secondary/40 dark:via-muted to-transparent"
                ></div>

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
