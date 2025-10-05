import { useState, useEffect } from "react";
import { ResourceMeter } from "./ResourceMeter";
import { ActionButton, DecisionOption } from "./ActionButton";
import { GameBackground } from "./GameBackground";
import { GameOverScreen } from "./GameOverScreen";
import { motion } from "motion/react";
import { 
  DollarSign, 
  Users, 
  Microscope, 
  Shield,
  Timer
} from "lucide-react";

interface GameResources {
  money: number;
  publicOpinion: number;
  research: number;
  defense: number;
}

type GameState = 'playing' | 'money' | 'opinion' | 'defense' | 'research';

export function GameUI() {
  const [resources, setResources] = useState<GameResources>({
    money: 50,
    publicOpinion: 60,
    research: 40,
    defense: 30
  });

  const [gameState, setGameState] = useState<GameState>('playing');
  const [turn, setTurn] = useState(1);
  const [threatLevel, setThreatLevel] = useState(10);

  // Decision options for the current turn
  const [currentDecisions, setCurrentDecisions] = useState<DecisionOption[]>([]);

  // Generate new decisions for each turn
  useEffect(() => {
    generateDecisions();
  }, [turn]);

  // Check for game over conditions
  useEffect(() => {
    if (resources.money <= 0) setGameState('money');
    else if (resources.publicOpinion <= 0) setGameState('opinion');
    else if (resources.defense <= 0) setGameState('defense');
    else if (resources.research <= 0) setGameState('research');
  }, [resources]);

  // Increase threat level over time
  useEffect(() => {
    if (gameState === 'playing') {
      setThreatLevel(prev => Math.min(100, prev + (5 + turn * 0.5)));
    }
  }, [turn, gameState]);

  const generateDecisions = () => {
    const decisionPools = [
      // Early game decisions
      {
        id: "fund-research",
        title: "Fund Asteroid Research",
        description: "Allocate significant budget to studying the incoming asteroid threat and potential countermeasures.",
        effects: { money: -15, publicOpinion: -5, research: 20, defense: 5 }
      },
      {
        id: "public-address",
        title: "Reassure the Public",
        description: "Hold a press conference to calm public fears about the asteroid threat.",
        effects: { money: -5, publicOpinion: 15, research: 0, defense: 0 }
      },
      {
        id: "defense-spending",
        title: "Increase Defense Budget",
        description: "Redirect funds to develop and deploy asteroid defense systems.",
        effects: { money: -20, publicOpinion: -10, research: 5, defense: 25 }
      },
      {
        id: "international-cooperation",
        title: "Seek International Aid",
        description: "Collaborate with other nations to share costs and resources.",
        effects: { money: 10, publicOpinion: 5, research: 10, defense: 10 }
      },
      {
        id: "tax-increase",
        title: "Emergency Tax Levy",
        description: "Implement special taxes to fund the asteroid defense program.",
        effects: { money: 25, publicOpinion: -20, research: 0, defense: 5 }
      },
      {
        id: "private-sector",
        title: "Partner with Private Companies",
        description: "Encourage private space companies to contribute to defense efforts.",
        effects: { money: 5, publicOpinion: 10, research: 15, defense: 10 }
      },
      {
        id: "military-draft",
        title: "Mobilize Military Resources",
        description: "Repurpose military assets for the asteroid defense mission.",
        effects: { money: -10, publicOpinion: -15, research: 0, defense: 20 }
      },
      {
        id: "cut-programs",
        title: "Cut Social Programs",
        description: "Reduce spending on non-essential programs to fund defense initiatives.",
        effects: { money: 15, publicOpinion: -25, research: 0, defense: 10 }
      },
      {
        id: "scientific-recruitment",
        title: "Recruit Top Scientists",
        description: "Offer incentives to attract the world's best minds to the project.",
        effects: { money: -10, publicOpinion: 5, research: 25, defense: 0 }
      },
      {
        id: "emergency-powers",
        title: "Declare National Emergency",
        description: "Assume emergency powers to accelerate decision-making and resource allocation.",
        effects: { money: 10, publicOpinion: -15, research: 10, defense: 15 }
      }
    ];

    // Randomly select 2 decisions for this turn
    const shuffled = [...decisionPools].sort(() => 0.5 - Math.random());
    setCurrentDecisions(shuffled.slice(0, 2));
  };

  const handleDecision = (option: DecisionOption) => {
    // Apply effects
    setResources(prev => ({
      money: Math.max(0, Math.min(100, prev.money + option.effects.money)),
      publicOpinion: Math.max(0, Math.min(100, prev.publicOpinion + option.effects.publicOpinion)),
      research: Math.max(0, Math.min(100, prev.research + option.effects.research)),
      defense: Math.max(0, Math.min(100, prev.defense + option.effects.defense))
    }));

    // Advance turn
    setTurn(prev => prev + 1);
  };

  const handleRestart = () => {
    setResources({
      money: 50,
      publicOpinion: 60,
      research: 40,
      defense: 30
    });
    setGameState('playing');
    setTurn(1);
    setThreatLevel(10);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <GameBackground threatLevel={threatLevel} gameState={gameState} />

      {/* Game UI Overlay */}
      {gameState === 'playing' && (
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Section - Day Tracker */}
          <div className="flex justify-center pt-4 pb-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background/90 backdrop-blur-sm rounded-lg px-6 py-3 border"
            >
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-primary" />
                <span className="font-semibold">Day {turn}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  Threat Level: {threatLevel.toFixed(0)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Resource Meters */}
          <div className="flex justify-between px-6 pb-4">
            {/* Top Left - Money and Public Opinion */}
            <div className="space-y-4">
              <ResourceMeter
                icon={<DollarSign className="w-5 h-5" />}
                label="Budget"
                value={resources.money}
                className="w-48"
              />
              <ResourceMeter
                icon={<Users className="w-5 h-5" />}
                label="Public Opinion"
                value={resources.publicOpinion}
                className="w-48"
              />
            </div>

            {/* Top Right - Research and Defense */}
            <div className="space-y-4">
              <ResourceMeter
                icon={<Microscope className="w-5 h-5" />}
                label="Research Progress"
                value={resources.research}
                className="w-48"
              />
              <ResourceMeter
                icon={<Shield className="w-5 h-5" />}
                label="Defense Readiness"
                value={resources.defense}
                className="w-48"
              />
            </div>
          </div>

          {/* Center Spacer */}
          <div className="flex-1"></div>

          {/* Bottom Section - Action Buttons */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              {currentDecisions.map((decision) => (
                <ActionButton
                  key={decision.id}
                  option={decision}
                  onSelect={handleDecision}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState !== 'playing' && (
        <GameOverScreen gameState={gameState} onRestart={handleRestart} />
      )}
    </div>
  );
}