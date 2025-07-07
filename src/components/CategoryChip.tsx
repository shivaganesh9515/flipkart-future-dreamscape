import { cn } from '@/lib/utils';

interface CategoryChipProps {
  name: string;
  icon: string;
  isActive?: boolean;
  onClick: () => void;
}

export const CategoryChip = ({ name, icon, isActive = false, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105",
        isActive
          ? "category-chip-active border-accent bg-accent text-accent-foreground shadow-neon"
          : "border-border bg-card/50 text-foreground hover:border-accent/40 hover:bg-accent/10 backdrop-blur-sm"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span className="whitespace-nowrap">{name}</span>
    </button>
  );
};