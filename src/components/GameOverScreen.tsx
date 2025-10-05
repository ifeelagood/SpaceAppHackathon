import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertTriangle, Skull, Users, Banknote } from "lucide-react";

interface GameOverScreenProps {
  gameState: 'money' | 'opinion' | 'defense' | 'research';
  onRestart: () => void;
}

export function GameOverScreen({ gameState, onRestart }: GameOverScreenProps) {
  const getGameOverContent = () => {
    switch (gameState) {
      case 'money':
        return {
          icon: <Banknote className="w-16 h-16 text-yellow-500" />,
          title: "Economic Collapse",
          description: "Your administration has run out of funds. Without financial resources, the asteroid defense program has been shut down. The world economy crumbles as panic spreads.",
          color: "border-yellow-500"
        };
      case 'opinion':
        return {
          icon: <Users className="w-16 h-16 text-red-500" />,
          title: "Popular Uprising",
          description: "Public trust has completely eroded. Mass protests and civil unrest have paralyzed the government. Your administration has been overthrown, leaving Earth defenseless.",
          color: "border-red-500"
        };
      case 'defense':
        return {
          icon: <Skull className="w-16 h-16 text-orange-500" />,
          title: "Planetary Destruction",
          description: "Without adequate defense systems, the asteroid has struck Earth. Civilization as we know it has ended. Billions of lives lost due to inadequate preparation.",
          color: "border-orange-500"
        };
      case 'research':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-blue-500" />,
          title: "Scientific Failure",
          description: "Lack of research funding has left humanity blind to the threat. Without scientific knowledge, all defense efforts have proven futile. The asteroid approaches undetected.",
          color: "border-blue-500"
        };
      default:
        return {
          icon: <AlertTriangle className="w-16 h-16" />,
          title: "Game Over",
          description: "The mission has failed.",
          color: "border-muted"
        };
    }
  };

  const content = getGameOverContent();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-black/70 p-8 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex justify-center mb-4"
        >
          {content.icon}
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl font-bold mb-4 text-white"
        >
          {content.title}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-200 mb-6 leading-relaxed max-w-md"
        >
          {content.description}
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button onClick={onRestart} className="w-full">
            Try Again
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}