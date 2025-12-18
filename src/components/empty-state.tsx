import { type LucideIcon, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  Icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: string;
  iconClassName?: string;
}

const EmptyState = ({
  Icon,
  title = "No data found",
  description = "No data available for this section",
  className,
  iconClassName,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 bg-gray-300 text-background rounded-full flex items-center justify-center",
          iconClassName
        )}
      >
        {Icon ? <Icon /> : <Inbox />}
      </div>

      {/* Title and Description */}
      <div className="text-center space-y-1">
        <p className="font-medium text-xl">{title}</p>
        <span className="text-muted-foreground">{description}</span>
      </div>
    </div>
  );
};

export default EmptyState;
