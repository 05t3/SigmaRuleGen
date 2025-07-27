import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileJson2, FileText, Target, Zap, UsersIcon } from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Generator
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <FileJson2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                About Sigma Rules
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Understanding Sigma Rules
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Sigma rules serve as the foundation for defining and distributing detection strategies in the realm of cybersecurity. 
              They offer a systematic approach to spotting threats and malicious actions across various SIEM systems.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>YAML Format</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Human-readable YAML format makes rules easy to write, read, and maintain across teams.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Platform Agnostic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Designed for flexibility, Sigma rules can be crafted once and adapted to work with any SIEM query language, ensuring wide applicability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Thousands of community-contributed rules covering the latest threats and attack techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Fast Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Optimized for performance with field-based searches and efficient query generation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What are Sigma Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What are Sigma Rules?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Sigma is an open and versatile signature format that empowers security analysts to document log events in an organized manner. 
                This facilitates the seamless exchange of detection techniques, signatures, and IOCs across different platforms and tools.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Key Components:</h3>
              <ul className="space-y-2">
                <li><strong>Detection Logic:</strong> The core of the rule that defines what to look for in logs</li>
                <li><strong>Log Source:</strong> Specifies which type of logs the rule should be applied to</li>
                <li><strong>Metadata:</strong> Information about the rule including author, references, and MITRE ATT&CK tags</li>
                <li><strong>Conditions:</strong> Boolean logic that combines detection criteria</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">Why Use Sigma Rules?</h3>
              <ul className="space-y-2">
                <li><strong>Standardization:</strong> Unified format across different security tools</li>
                <li><strong>Portability:</strong> Rules can be converted to any SIEM query language</li>
                <li><strong>Collaboration:</strong> Easy sharing and peer review of detection logic</li>
                <li><strong>Version Control:</strong> Track changes and improvements over time</li>
                <li><strong>Testing:</strong> Validate detection logic before deployment</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">Example Detection Scenarios:</h3>
              <ul className="space-y-2">
                <li>PowerShell execution with suspicious command line parameters</li>
                <li>Lateral movement using administrative shares</li>
                <li>Credential dumping from LSASS process</li>
                <li>Suspicious network connections to known malicious IPs</li>
                <li>Registry modifications for persistence mechanisms</li>
                <li>File modifications in sensitive system directories</li>
              </ul>
            </CardContent>
          </Card>

          {/* Detection Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Detection Methods</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4">Field-Based Detection</h3>
              <p>
                The most efficient method for SIEM performance. Search for specific values in known fields 
                like process names, command lines, or event IDs.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Keyword Detection</h3>
              <p>
                Search for specific keywords or strings across all log fields. Useful for detecting 
                known malicious commands or file names.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Pattern Matching</h3>
              <p>
                Use regular expressions and modifiers to detect complex patterns, encoded content, 
                or variations of known indicators.
              </p>
            </CardContent>
          </Card>

          {/* MITRE ATT&CK Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">MITRE ATT&CK Integration</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Sigma rules are closely integrated with the MITRE ATT&CK framework, allowing security teams 
                to map detections to specific tactics, techniques, and procedures (TTPs) used by attackers.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Common MITRE ATT&CK Tags:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <ul className="space-y-1">
                    <li><code>attack.initial_access</code></li>
                    <li><code>attack.execution</code></li>
                    <li><code>attack.persistence</code></li>
                    <li><code>attack.privilege_escalation</code></li>
                    <li><code>attack.defense_evasion</code></li>
                    <li><code>attack.credential_access</code></li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li><code>attack.discovery</code></li>
                    <li><code>attack.lateral_movement</code></li>
                    <li><code>attack.collection</code></li>
                    <li><code>attack.command_and_control</code></li>
                    <li><code>attack.exfiltration</code></li>
                    <li><code>attack.impact</code></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4">Writing Effective Rules</h3>
              <ul className="space-y-2">
                <li><strong>Be Specific:</strong> Use precise field names and values to reduce false positives</li>
                <li><strong>Test Thoroughly:</strong> Validate rules against known good and bad data</li>
                <li><strong>Document Well:</strong> Include clear descriptions and references</li>
                <li><strong>Use Appropriate Levels:</strong> Set correct severity levels for proper alerting</li>
                <li><strong>Consider Performance:</strong> Prefer field-based over keyword searches</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">Rule Maintenance</h3>
              <ul className="space-y-2">
                <li><strong>Regular Updates:</strong> Keep rules current with evolving threats</li>
                <li><strong>False Positive Tuning:</strong> Continuously refine to reduce noise</li>
                <li><strong>Version Control:</strong> Track changes and maintain rule history</li>
                <li><strong>Community Contribution:</strong> Share effective rules with the community</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}