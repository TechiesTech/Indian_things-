import { motion } from "framer-motion";
import { titleIndianLetters, titleThingsLetters } from "../../constants/heroConstants";

export default function HeroSlideIndianThings() {
  return (
    <motion.div
      key="slide-1-content"
      className="w-full flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        className="eyebrow text-center mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        A CONTEMPORARY EXPRESSION OF INDIA
      </motion.p>

      <div className="hero-title flex flex-col items-center justify-center text-center w-full" aria-label="INDIAN THINGS">
        <div className="flex justify-center items-center overflow-hidden">
          {titleIndianLetters.map((char, i) => (
            <motion.span
              key={`ind-${i}`}
              className="animated-letter inline-block"
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
                filter: "blur(0px)",
              }}
              transition={{
                opacity: { duration: 0.9, delay: 0.2 + i * 0.08 },
                filter: { duration: 0.9, delay: 0.2 + i * 0.08 },
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5 + i * 0.12,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <div className="flex justify-center items-center outline-title overflow-hidden mt-1.5">
          {titleThingsLetters.map((char, i) => (
            <motion.span
              key={`th-${i}`}
              className="animated-letter inline-block"
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
                filter: "blur(0px)",
              }}
              transition={{
                opacity: { duration: 0.9, delay: 0.45 + i * 0.08 },
                filter: { duration: 0.9, delay: 0.45 + i * 0.08 },
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.75 + i * 0.12,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Below text with slow zoom-in animation from small to big */}
      <motion.p
        className="max-w-[580px] mx-auto text-[11px] sm:text-xs md:text-sm mt-8 font-light leading-relaxed tracking-widest text-center text-[#d9cbb5]/90"
        initial={{
          opacity: 0,
          scale: 0.35,
          y: 20,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: [0.35, 1.04, 1],
          y: 0,
          filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
        }}
        transition={{
          duration: 3.4,
          delay: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "center center",
          textShadow: "0 1px 12px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,1), 0 0 4px rgba(230,203,140,0.3)",
          letterSpacing: "0.03em",
        }}
      >
        Purveyors of rare origin-certified Grade-A Indian spices, wildcomb raw forest
        honey, and pure cold-pressed coastal <span className="text-[#FFE600] font-semibold" style={{ textShadow: "0 0 20px rgba(255,230,0,0.6)" }}>harvests</span>. Preserving centuries of botanical purity.
      </motion.p>
    </motion.div>
  );
}
