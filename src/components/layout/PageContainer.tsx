import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "narrow";
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className,
  maxWidth = "default" 
}) => {
  return (
    <main className={cn(
      "container mx-auto px-4 py-12 min-h-[calc(100vh-64px-300px)]",
      maxWidth === "narrow" && "max-w-4xl",
      className
    )}>
      {children}
    </main>
  );
};