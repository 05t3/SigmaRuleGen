import * as React from "react";
import { SigmaRule } from "@shared/schema";
import { generateUUID } from "@/lib/sigma-utils";

export interface DetectionBlock {
  name: string;
  fields: Record<string, string | string[] | { value: string | string[]; modifier?: string }>;
}

export interface SigmaFormData {
  title: string;
  id: string;
  status: "stable" | "test" | "experimental" | "deprecated";
  description: string;
  references: string[];
  author: string;
  date: string;
  modified: string;
  tags: string[];
  logsource: {
    product: string;
    category: string;
    service: string;
    definition: string;
  };
  detection: {
    blocks: DetectionBlock[];
    condition: string;
  };
  falsepositives: string[];
  level: "informational" | "low" | "medium" | "high" | "critical";
  related: {
    id: string;
    type: "similar" | "derived" | "obsoletes" | "merged" | "renamed";
  }[];
}

const initialFormData: SigmaFormData = {
  title: "",
  id: generateUUID(),
  status: "test",
  description: "",
  references: [],
  author: "",
  date: new Date().toISOString().split('T')[0],
  modified: "",
  tags: [],
  logsource: {
    product: "",
    category: "",
    service: "",
    definition: "",
  },
  detection: {
    blocks: [],
    condition: "",
  },
  falsepositives: [],
  level: "medium",
  related: [],
};

export function useSigmaForm() {
  const [formData, setFormData] = React.useState<SigmaFormData>(initialFormData);

  const updateField = React.useCallback((field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        const [key1, key2] = keys;
        if (key1 === 'logsource') {
          return {
            ...prev,
            logsource: {
              ...prev.logsource,
              [key2]: value,
            },
          };
        } else if (key1 === 'detection') {
          return {
            ...prev,
            detection: {
              ...prev.detection,
              [key2]: value,
            },
          };
        }
      }
      return prev;
    });
  }, []);

  const addToArray = React.useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof SigmaFormData] as any[]), value],
    }));
  }, []);

  const removeFromArray = React.useCallback((field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof SigmaFormData] as any[]).filter((_, i) => i !== index),
    }));
  }, []);

  const addDetectionBlock = React.useCallback(() => {
    const newBlock: DetectionBlock = {
      name: `selection_${formData.detection.blocks.length + 1}`,
      fields: {},
    };
    
    setFormData(prev => ({
      ...prev,
      detection: {
        ...prev.detection,
        blocks: [...prev.detection.blocks, newBlock],
      },
    }));
  }, [formData.detection.blocks.length]);

  const removeDetectionBlock = React.useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      detection: {
        ...prev.detection,
        blocks: prev.detection.blocks.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateDetectionBlock = React.useCallback((blockIndex: number, field: string, value: any) => {
    setFormData(prev => {
      const newBlocks = [...prev.detection.blocks];
      if (field === 'name') {
        newBlocks[blockIndex] = { ...newBlocks[blockIndex], name: value };
      }
      return {
        ...prev,
        detection: {
          ...prev.detection,
          blocks: newBlocks,
        },
      };
    });
  }, []);

  const addFieldToBlock = React.useCallback((blockIndex: number) => {
    setFormData(prev => {
      const newBlocks = [...prev.detection.blocks];
      const fieldName = `field_${Object.keys(newBlocks[blockIndex].fields).length + 1}`;
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        fields: {
          ...newBlocks[blockIndex].fields,
          [fieldName]: "",
        },
      };
      return {
        ...prev,
        detection: {
          ...prev.detection,
          blocks: newBlocks,
        },
      };
    });
  }, []);

  const removeFieldFromBlock = React.useCallback((blockIndex: number, fieldName: string) => {
    setFormData(prev => {
      const newBlocks = [...prev.detection.blocks];
      const newFields = { ...newBlocks[blockIndex].fields };
      delete newFields[fieldName];
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        fields: newFields,
      };
      return {
        ...prev,
        detection: {
          ...prev.detection,
          blocks: newBlocks,
        },
      };
    });
  }, []);

  const updateBlockField = React.useCallback((blockIndex: number, fieldName: string, value: string | string[] | { value: string | string[]; modifier?: string }) => {
    setFormData(prev => {
      const newBlocks = [...prev.detection.blocks];
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        fields: {
          ...newBlocks[blockIndex].fields,
          [fieldName]: value,
        },
      };
      return {
        ...prev,
        detection: {
          ...prev.detection,
          blocks: newBlocks,
        },
      };
    });
  }, []);

  const resetForm = React.useCallback(() => {
    setFormData({ ...initialFormData, id: generateUUID(), date: new Date().toISOString().split('T')[0] });
  }, []);

  const generateNewUUID = React.useCallback(() => {
    updateField('id', generateUUID());
  }, [updateField]);

  const validateForm = React.useCallback(() => {
    const errors: string[] = [];
    
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.logsource.product.trim() && !formData.logsource.category.trim()) {
      errors.push("Log source product or category is required");
    }
    if (!formData.detection.condition.trim()) errors.push("Detection condition is required");
    
    return errors;
  }, [formData]);

  return {
    formData,
    updateField,
    addToArray,
    removeFromArray,
    addDetectionBlock,
    removeDetectionBlock,
    updateDetectionBlock,
    addFieldToBlock,
    removeFieldFromBlock, 
    updateBlockField,
    resetForm,
    generateNewUUID,
    validateForm,
  };
}
