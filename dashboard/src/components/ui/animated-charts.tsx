import { motion } from 'motion/react';
import { useState } from 'react';

export function AnimatedBars() {
  const [bars] = useState([
    { height: 65, delay: 0, baseHeight: 65, amplitude: 35 },
    { height: 85, delay: 0.3, baseHeight: 85, amplitude: 40 },
    { height: 55, delay: 0.6, baseHeight: 55, amplitude: 28 },
    { height: 100, delay: 0.9, baseHeight: 100, amplitude: 45 },
    { height: 75, delay: 1.2, baseHeight: 75, amplitude: 32 },
    { height: 60, delay: 1.5, baseHeight: 60, amplitude: 30 },
    { height: 90, delay: 1.8, baseHeight: 90, amplitude: 40 },
  ]);

  return (
    <div className="flex items-end space-x-2 h-40">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="w-3 rounded-t-sm relative"
          style={{
            background: `linear-gradient(180deg, 
              var(--chart-1) 0%, 
              var(--chart-2) 50%, 
              var(--chart-3) 100%)`,
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: [
              bar.baseHeight, 
              bar.baseHeight + bar.amplitude, 
              bar.baseHeight - bar.amplitude * 0.5,
              bar.baseHeight + bar.amplitude * 0.8,
              bar.baseHeight
            ],
            opacity: [0.4, 1, 0.6, 0.9, 0.7],
            scaleY: [1, 1.1, 0.95, 1.05, 1]
          }}
          transition={{
            duration: 4,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        >
          {/* Glowing top effect */}
          <motion.div
            className="absolute -top-1 left-0 right-0 h-3 rounded-full blur-sm"
            style={{ backgroundColor: 'var(--chart-1)' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 2,
              delay: bar.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedDonut() {
  return (
    <div className="relative w-36 h-36">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <svg width="144" height="144" viewBox="0 0 144 144" className="transform -rotate-90">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--chart-1)" />
              <stop offset="50%" stopColor="var(--chart-2)" />
              <stop offset="100%" stopColor="var(--chart-3)" />
            </linearGradient>
          </defs>
          <circle
            cx="72"
            cy="72"
            r="54"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="8"
            strokeDasharray="120 60"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute inset-3"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
          <defs>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--chart-4)" />
              <stop offset="50%" stopColor="var(--chart-5)" />
              <stop offset="100%" stopColor="var(--chart-2)" />
            </linearGradient>
          </defs>
          <circle
            cx="56"
            cy="56"
            r="42"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="6"
            strokeDasharray="90 45"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Pulsing center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: 'var(--chart-1)' }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              '0 0 0 0 var(--chart-1)',
              '0 0 0 14px transparent',
              '0 0 0 0 var(--chart-1)'
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Orbiting particles */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: `var(--chart-${(i % 3) + 1})`,
            left: '50%',
            top: '50%',
            transformOrigin: '0 0'
          }}
          animate={{
            rotate: [angle, angle + 360],
            x: [0, 48, 0, -48, 0],
            y: [0, -48, 0, 48, 0],
            scale: [0.5, 1.3, 0.5]
          }}
          transition={{
            duration: 6,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function FloatingCharts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary floating bar chart */}
      <motion.div
        className="absolute top-[10%] start-[10%] opacity-25 scale-125"
        animate={{
          y: [-20, 20, -20],
          x: [-12, 12, -12],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <AnimatedBars />
      </motion.div>

      {/* Primary floating donut chart */}
      <motion.div
        className="absolute top-1/3 right-1/5 opacity-30 scale-125"
        animate={{
          y: [16, -16, 16],
          x: [10, -10, 10],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <AnimatedDonut />
      </motion.div>

      {/* Secondary smaller donut */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 opacity-20"
        animate={{
          y: [-12, 12, -12],
          x: [12, -12, 12],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-24 h-24">
          <motion.svg width="96" height="96" viewBox="0 0 96 96" className="transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="30"
              fill="none"
              stroke="var(--chart-2)"
              strokeWidth="4"
              strokeDasharray="60 30"
              opacity="0.6"
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-2/3 right-1/6 w-8 h-8 opacity-25"
        style={{ backgroundColor: 'var(--chart-1)' }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 1],
          borderRadius: ['0%', '50%', '0%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-6 h-6 opacity-20"
        style={{ backgroundColor: 'var(--chart-3)' }}
        animate={{
          y: [-28, 28, -28],
          rotate: [0, 180, 360],
          scale: [0.7, 1.7, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulsing gradient circles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`absolute w-12 h-12 rounded-full opacity-15`}
          style={{
            background: `radial-gradient(circle, var(--chart-${i}) 0%, transparent 70%)`,
            top: `${15 + i * 18}%`,
            left: `${75 - i * 12}%`,
          }}
          animate={{
            scale: [0.5, 2.5, 0.5],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wandering lines */}
      <motion.svg
        className="absolute top-1/2 left-1/2 w-48 h-48 opacity-10"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.path
          d="M30,96 Q60,30 126,60 Q90,120 30,96"
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="3"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
