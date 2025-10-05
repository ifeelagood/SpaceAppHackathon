import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  effects: {
    money: number;
    publicOpinion: number;
    research: number;
    defense: number;
  };
}

interface ActionButtonProps {
  option: DecisionOption;
  onSelect: (option: DecisionOption) => void;
  disabled?: boolean;
}

export function ActionButton({ option, onSelect, disabled }: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full h-16 text-left p-4 hover:bg-accent transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(option)}
        disabled={disabled}
      >
        <div className="w-full">
          <div className="font-medium">{option.title}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Hover for details
          </div>
        </div>
      </Button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <Card className="p-4 w-80 bg-background border shadow-lg">
              <h4 className="font-semibold mb-2">{option.title}</h4>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}