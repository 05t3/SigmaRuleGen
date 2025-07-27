import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Code } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/sigma-utils";

interface YamlPreviewProps {
  yamlContent: string;
}

export function YamlPreview({ yamlContent }: YamlPreviewProps) {
  const { theme } = useTheme();
  const { toast } = useToast();

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

  return (
    <Card className="mt-12">
      <CardHeader className="bg-slate-50 :bg-slate-700 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Code className="w-5 h-5 mr-2 text-primary" />
            Rule Preview
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <SyntaxHighlighter
            language="yaml"
            style={theme === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              // background: "transparent",
              fontSize: "0.875rem",
            }}
            wrapLongLines
          >
            {yamlContent || "# No YAML content generated yet"}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
}
