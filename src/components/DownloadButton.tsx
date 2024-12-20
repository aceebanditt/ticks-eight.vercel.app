import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "your-choice-tickets.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading project:", error);
    }
  };

  return (
    <Button onClick={handleDownload} className="gap-2">
      <Download className="h-4 w-4" />
      Download Project
    </Button>
  );
};