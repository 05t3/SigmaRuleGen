import { SigmaRule } from "@shared/schema";
import * as yaml from "js-yaml";

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function convertToSnakeCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function generateYamlFromRule(rule: Partial<SigmaRule>): string {
  const yamlObject: any = {};

  if (rule.title) yamlObject.title = rule.title;
  if (rule.id) yamlObject.id = rule.id;
  if (rule.status) yamlObject.status = rule.status;
  if (rule.description) yamlObject.description = rule.description;
  if (rule.references && rule.references.length > 0) yamlObject.references = rule.references;
  if (rule.author) yamlObject.author = rule.author;
  if (rule.date) yamlObject.date = rule.date.replace(/-/g, '/');
  if (rule.modified) yamlObject.modified = rule.modified.replace(/-/g, '/');
  if (rule.tags && rule.tags.length > 0) yamlObject.tags = rule.tags;

  if (rule.logsource) {
    const logsource: any = {};
    if (rule.logsource.product) logsource.product = rule.logsource.product;
    if (rule.logsource.category) logsource.category = rule.logsource.category;
    if (rule.logsource.service) logsource.service = rule.logsource.service;
    if (rule.logsource.definition) logsource.definition = rule.logsource.definition;
    
    if (Object.keys(logsource).length > 0) {
      yamlObject.logsource = logsource;
    }
  }

  if (rule.detection) {
    const detection: any = {};
    
    // Add detection blocks
    rule.detection.blocks?.forEach(block => {
      const blockData: any = {};
      
      Object.entries(block.fields).forEach(([fieldName, fieldValue]) => {
        let key = fieldName;
        let value = fieldValue;
        
        if (typeof fieldValue === 'object' && 'value' in fieldValue) {
          // Handle field with modifier
          if (fieldValue.modifier && fieldValue.modifier !== 'none') {
            key = `${fieldName}|${fieldValue.modifier}`;
          }
          value = fieldValue.value;
        }
        
        blockData[key] = value;
      });
      
      if (Object.keys(blockData).length > 0) {
        detection[block.name] = blockData;
      }
    });
    
    if (rule.detection.condition) {
      detection.condition = rule.detection.condition;
    }
    
    yamlObject.detection = detection;
  }

  if (rule.falsepositives && rule.falsepositives.length > 0) {
    yamlObject.falsepositives = rule.falsepositives;
  }

  if (rule.level) yamlObject.level = rule.level;

  if (rule.related && rule.related.length > 0) {
    yamlObject.related = rule.related;
  }

  try {
    return yaml.dump(yamlObject, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });
  } catch (error) {
    console.error('Error generating YAML:', error);
    return '# Error generating YAML';
  }
}

export function downloadYamlFile(yamlContent: string, filename: string) {
  const blob = new Blob([yamlContent], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.yml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
