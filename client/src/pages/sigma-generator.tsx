import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, RotateCcw, Sun, Moon, FileJson2, Info } from "lucide-react";
import { Link } from "wouter";
import { SigmaForm } from "@/components/sigma-form";
import { YamlPreview } from "@/components/yaml-preview";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { useSigmaForm, SigmaFormData } from "@/hooks/use-sigma-form";
import { generateYamlFromRule, downloadYamlFile, copyToClipboard, convertToSnakeCase } from "@/lib/sigma-utils";
import { Footer } from "@/components/footer";

export default function SigmaGenerator() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { resetForm } = useSigmaForm();
  const [formData, setFormData] = React.useState<SigmaFormData | null>(null);
  const [yamlContent, setYamlContent] = React.useState<string>("");

  const handleFormChange = React.useCallback((data: SigmaFormData) => {
    setFormData(data);
    const yaml = generateYamlFromRule(data as any);
    setYamlContent(yaml);
  }, []);

  const handleDownload = () => {
    if (!formData?.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title before downloading",
        variant: "destructive",
      });
      return;
    }

    const filename = convertToSnakeCase(formData.title);
    downloadYamlFile(yamlContent, filename);
    toast({
      title: "Success",
      description: "YAML file downloaded",
    });
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(yamlContent);
    if (success) {
      toast({
        title: "Success",
        description: "YAML copied to clipboard",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to copy YAML to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
      resetForm();
      toast({
        title: "Success",
        description: "Form reset successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-19 bg-primary rounded-lg flex items-center justify-center">
                <FileJson2 className="w-8 h-11 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Sigma Rule Generator
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/about">
                <Button variant="outline">
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Button>
              </Link>

              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>

              <Button variant="outline" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>

              <Button variant="outline" onClick={handleReset} className="text-red-700 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SigmaForm onFormChange={handleFormChange} />
        <YamlPreview yamlContent={yamlContent} />
      </main>
      
      <Footer />
    </div>
  );
}
