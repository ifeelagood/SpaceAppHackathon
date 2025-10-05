import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GameBackgroundProps {
  threatLevel: number; // 0-100, higher means asteroid is closer
  gameState: 'playing' | 'money' | 'opinion' | 'defense' | 'research';
}

export function GameBackground({ threatLevel, gameState }: GameBackgroundProps) {
  const getAsteroidPosition = () => {
    // As threat level increases, asteroid moves closer to Earth
    const distance = 100 - (threatLevel * 0.8); // Min distance of 20%
    return distance;
  };

  const getAsteroidSize = () => {
    // Asteroid appears larger as it gets closer
    const baseSize = 30;
    const additionalSize = (threatLevel / 100) * 40;
    return baseSize + additionalSize;
  };

  if (gameState !== 'playing') {
    // Show end-game backgrounds
    const endGameImages = {
      money: "https://images.unsplash.com/photo-1646227163733-90957a87b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0cm95ZWQlMjBjaXR5JTIwcnVpbnMlMjBhcG9jYWx5cHNlfGVufDF8fHx8MTc1OTU1NjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      opinion: "https://images.unsplash.com/photo-1616600974135-0f850809ca28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZXN0JTIwYW5ncnklMjBjcm93ZCUyMGNpdHl8ZW58MXx8fHwxNzU5NTU2ODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      defense: "https://images.unsplash.com/photo-1646227163733-90957a87b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0cm95ZWQlMjBjaXR5JTIwcnVpbnMlMjBhcG9jYWx5cHNlfGVufDF8fHx8MTc1OTU1NjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      research: "https://images.unsplash.com/photo-1646227163733-90957a87b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0cm95ZWQlMjBjaXR5JTIwcnVpbnMlMjBhcG9jYWx5cHNlfGVufDF8fHx8MTc1OTU1NjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    };

    return (
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src={endGameImages[gameState as keyof typeof endGameImages]}
          alt={`Game over - ${gameState}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Earth */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: threatLevel > 80 ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: threatLevel > 80 ? Infinity : 0,
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZSUyMGJsdWUlMjBwbGFuZXR8ZW58MXx8fHwxNzU5NTQ1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Earth"
          className="w-48 h-48 rounded-full object-cover"
        />
        {threatLevel > 70 && (
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
        )}
      </motion.div>

      {/* Asteroid */}
      <motion.div
        className="absolute"
        style={{
          right: `${getAsteroidPosition()}%`,
          top: `${20 + (threatLevel / 100) * 30}%`,
          width: `${getAsteroidSize()}px`,
          height: `${getAsteroidSize()}px`,
        }}
        animate={{
          rotate: 360,
          x: threatLevel > 90 ? [-2, 2, -2] : 0,
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          x: { duration: 0.5, repeat: Infinity },
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1710268470228-6d77e6d999b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZCUyMHNwYWNlJTIwcm9jayUyMGRhcmt8ZW58MXx8fHwxNzU5NTU2ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Asteroid"
          className="w-full h-full rounded-full object-cover"
        />
        {threatLevel > 60 && (
          <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-pulse" />
        )}
      </motion.div>

      {/* Trajectory line */}
      {threatLevel > 40 && (
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-px bg-gradient-to-l from-red-500 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            transform: `rotate(${45 + (threatLevel / 100) * 15}deg)`,
            transformOrigin: 'right center',
          }}
        />
      )}

      {/* Warning effects when threat is high */}
      {threatLevel > 80 && (
        <motion.div
          className="absolute inset-0 bg-red-500/10"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  );
}