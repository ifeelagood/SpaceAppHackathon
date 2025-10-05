import { Progress } from "./ui/progress";

interface ResourceMeterProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue?: number;
  className?: string;
}

export function ResourceMeter({ 
  icon, 
  label, 
  value, 
  maxValue = 100, 
  className = "" 
}: ResourceMeterProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  
  // Color based on value level
  const getProgressColor = () => {
    if (percentage <= 20) return "bg-destructive";
    if (percentage <= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{maxValue}</span>
        </div>
        <div className="relative">
          <Progress 
            value={percentage} 
            className="h-2 bg-muted"
          />
          <div 
            className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}