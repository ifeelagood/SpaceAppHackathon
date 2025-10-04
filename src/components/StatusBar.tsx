import { Progress } from "./ui/progress";

interface StatusBarProps {
  label: string;
  value: number;
}

export function StatusBar({ label, value }: StatusBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-foreground">{label}</span>
      <Progress value={value} className="w-24" />
    </div>
  );
}
