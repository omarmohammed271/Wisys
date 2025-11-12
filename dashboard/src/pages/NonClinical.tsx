import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, MapPin, LayoutDashboard, Cog, BarChart3, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------
// Tabs & Section Definitions
// -------------------------------------------------------------
const tabs = {
  dashboard: {
    label: "Data Visualization",
    icon: BarChart3,
    items: [
      { label: 'HR Dashboard', to: '/hr-dashboard' },
      { label: 'Procurement Dashboard', to: '/procurement-dashboard' },
      { label: 'Finance Dashboard', to: '/finance-dashboard' },
      { label: 'Manufacturing Dashboard', to: '/manufacturing-dashboard' },
      { label: 'Contracting dashboard (Arabic version)', to: 'http://app2.basirah-360.com/' },
    ],
  },
} as const;

// -------------------------------------------------------------
// Utility: Gradient Colors by Tab
// -------------------------------------------------------------
const getGradientColor = (tab: string) => {
  const gradients: Record<string, string> = {
    dashboard: "from-blue-500 to-cyan-500",
    mapping: "from-purple-500 to-pink-500",
    settings: "from-pink-500 to-orange-500",
  };
  return gradients[tab] || "from-blue-500 to-purple-500";
};

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------
export default function NonClinical() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("dashboard");

  return (
    <div className="container lg:pt-10 sm:h-[80vh] lg:overflow-hidden pb-10 relative mx-auto">
      {/* Decorative dotted background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className={cn(
          "absolute inset-0 [background-size:30px_30px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background" />

      <div className="relative z-10 min-h-screen">
        {/* Title */}
        <motion.div
          className="max-w-7xl mx-auto px-6 pb-16 max-lg:pt-7 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-5xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Non-Clinical Dashboards
          </h1>
        </motion.div>

        {/* Tabs Bar */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex justify-center"
          >
            <div
              className={cn(
                "relative flex gap-3 max-lg:overflow-x-auto scrollbar-none p-2 rounded-2xl",
                "border border-gray-300 dark:border-white/10 backdrop-blur-md transition-all duration-500 ease-out",
                "shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(150,100,255,0.3)]",
                "bg-gradient-to-r from-white/10 via-white/5 to-white/10"
              )}
            >
              {(Object.keys(tabs) as Array<keyof typeof tabs>).map((tabKey) => {
                const { icon: TabIcon, label } = tabs[tabKey];
                const isActive = activeTab === tabKey;

                return (
                  <motion.button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    whileHover={{ scale: isActive ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "relative px-5 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 shrink-0",
                      isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    {/* Active tab highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={cn(
                          "absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)]",
                          "bg-gradient-to-r",
                          getGradientColor(tabKey)
                        )}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <TabIcon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10 whitespace-nowrap font-medium">
                      {label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Animated Tab Content Grid */}
          <AnimatePresence>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tabs[activeTab].items.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative group"
                  >
                    {/* Gradient Border Card */}
                    <Link
                      to={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "relative block rounded-2xl p-[1px] transition-all duration-300",
                        "bg-gradient-to-r",
                        `${getGradientColor(activeTab)}/20`
                      )}
                    >
                      <div
                        className={cn(
                          "bg-white dark:bg-background backdrop-blur-sm rounded-2xl px-5 py-3",
                          "flex items-center gap-3"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full bg-gradient-to-r",
                            getGradientColor(activeTab)
                          )}
                        />
                        <span className="truncate transition-colors">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: 'Dashboards',
    items: [
      { label: 'HR Dashboard', to: '/hr-dashboard' },
      { label: 'Procurement Dashboard', to: '/procurement-dashboard' },
      { label: 'Finance Dashboard', to: '/finance-dashboard' },
      { label: 'Manufacturing Dashboard', to: '/manufacturing-dashboard' },
      { label: 'Contracting dashboard (Arabic version)', to: 'http://app2.basirah-360.com/' },
    ],
  },
];