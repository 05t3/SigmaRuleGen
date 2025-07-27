import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  X, 
  Info, 
  Tag, 
  Link, 
  Server, 
  Lightbulb, 
  AlertTriangle,
  GitMerge,
  RefreshCw
} from "lucide-react";
import { useSigmaForm, SigmaFormData } from "@/hooks/use-sigma-form";
import { SIGMA_PRODUCTS, SIGMA_CATEGORIES, SIGMA_SERVICES, SIGMA_MODIFIERS, SIGMA_STATUSES, SIGMA_LEVELS, SIGMA_RELATED_TYPES, COMMON_AUTHORS, COMMON_TAGS } from "@/lib/sigma-constants";
import { useToast } from "@/hooks/use-toast";

interface DetectionFieldRowProps {
  fieldName: string;
  fieldValue: string | string[] | { value: string | string[]; modifier?: string };
  blockIndex: number;
  onUpdateField: (blockIndex: number, fieldName: string, value: string | string[] | { value: string | string[]; modifier?: string }) => void;
  onRemoveField: (blockIndex: number, fieldName: string) => void;
}

function DetectionFieldRow({ fieldName, fieldValue, blockIndex, onUpdateField, onRemoveField }: DetectionFieldRowProps) {
  const [localFieldName, setLocalFieldName] = React.useState(fieldName);
  const [localValue, setLocalValue] = React.useState(
    typeof fieldValue === 'object' && 'value' in fieldValue
      ? Array.isArray(fieldValue.value) ? fieldValue.value.join(', ') : fieldValue.value
      : Array.isArray(fieldValue) ? fieldValue.join(', ') : fieldValue
  );
  const [modifier, setModifier] = React.useState(
    typeof fieldValue === 'object' && 'modifier' in fieldValue ? fieldValue.modifier || '' : ''
  );

  const updateField = () => {
    const values = localValue.split(',').map(v => v.trim()).filter(v => v);
    let newValue: string | string[] | { value: string | string[]; modifier?: string };
    
    if (modifier) {
      newValue = {
        value: values.length === 1 ? values[0] : values,
        modifier: modifier
      };
    } else {
      newValue = values.length === 1 ? values[0] : values;
    }
    
    onUpdateField(blockIndex, localFieldName, newValue);
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded border">
      <Input
        value={localFieldName}
        onChange={(e) => setLocalFieldName(e.target.value)}
        onBlur={updateField}
        placeholder="Field name (e.g., CommandLine)"
        className="w-40"
      />
      <Select value={modifier || "none"} onValueChange={(value) => setModifier(value === "none" ? "" : value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Modifier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {SIGMA_MODIFIERS.map((mod) => (
            <SelectItem key={mod} value={mod}>{mod}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={updateField}
        placeholder="Value(s) - comma separated for multiple"
        className="flex-1"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemoveField(blockIndex, fieldName)}
        className="text-red-500 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

interface SigmaFormProps {
  onFormChange: (data: SigmaFormData) => void;
}

export function SigmaForm({ onFormChange }: SigmaFormProps) {
  const {
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
    generateNewUUID,
    validateForm,
  } = useSigmaForm();

  const { toast } = useToast();
  const [newTag, setNewTag] = React.useState("");
  const [newReference, setNewReference] = React.useState("");
  const [newFalsePositive, setNewFalsePositive] = React.useState("");

  React.useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const validationErrors = validateForm();

  const handleAddTag = () => {
    if (newTag.trim()) {
      addToArray('tags', newTag.trim());
      setNewTag("");
      toast({ title: "Success", description: `Tag "${newTag.trim()}" added` });
    }
  };

  const handleAddReference = () => {
    if (newReference.trim()) {
      try {
        new URL(newReference.trim());
        addToArray('references', newReference.trim());
        setNewReference("");
        toast({ title: "Success", description: "Reference added" });
      } catch {
        toast({ 
          title: "Error", 
          description: "Please enter a valid URL", 
          variant: "destructive" 
        });
      }
    }
  };

  const handleAddFalsePositive = () => {
    if (newFalsePositive.trim()) {
      addToArray('falsepositives', newFalsePositive.trim());
      setNewFalsePositive("");
      toast({ title: "Success", description: "False positive added" });
    }
  };

  const handleAddRelated = () => {
    addToArray('related', { id: "", type: "similar" });
    toast({ title: "Success", description: "Related rule added" });
  };

  const handleGenerateUUID = () => {
    generateNewUUID();
    toast({ title: "Success", description: "New UUID generated" });
  };

  return (
    <div className="space-y-8">
      {/* Validation Alerts */}
      {validationErrors.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            <strong className="text-amber-800 dark:text-amber-200">Missing Required Fields:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-amber-700 dark:text-amber-300 text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter rule title (e.g., Network Connection by PowerShell)"
            />
          </div>

          <div>
            <Label htmlFor="id">Rule ID</Label>
            <div className="flex space-x-2">
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => updateField('id', e.target.value)}
                className="font-mono text-sm"
              />
              <Button variant="outline" onClick={handleGenerateUUID}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => updateField('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIGMA_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Select value={formData.author} onValueChange={(value) => updateField('author', value === 'Custom Author' ? '' : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_AUTHORS.map((author) => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.author === '' && (
              <Input
                className="mt-2"
                value={formData.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Enter custom author name"
              />
            )}
          </div>

          <div>
            <Label htmlFor="level">Level</Label>
            <Select value={formData.level} onValueChange={(value) => updateField('level', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIGMA_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="modified">Modified (Optional)</Label>
            <Input
              id="modified"
              type="date"
              value={formData.modified}
              onChange={(e) => updateField('modified', e.target.value)}
            />
          </div>

          <div className="lg:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe what this rule detects..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="w-5 h-5 mr-2 text-primary" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeFromArray('tags', index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter tag (e.g., attack.t1059)"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button onClick={handleAddTag}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tag
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="w-5 h-5 mr-2 text-primary" />
            References
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {formData.references.map((ref, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <Link className="w-4 h-4 text-slate-500" />
                <span className="flex-1 text-sm font-mono">{ref}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromArray('references', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="url"
              value={newReference}
              onChange={(e) => setNewReference(e.target.value)}
              placeholder="Enter reference URL"
              onKeyPress={(e) => e.key === 'Enter' && handleAddReference()}
            />
            <Button onClick={handleAddReference}>
              <Plus className="w-4 h-4 mr-2" />
              Add Reference
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Source */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="w-5 h-5 mr-2 text-primary" />
            Log Source <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select value={formData.logsource.product} onValueChange={(value) => updateField('logsource.product', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {SIGMA_PRODUCTS.map((product) => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.logsource.category} onValueChange={(value) => updateField('logsource.category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {SIGMA_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="service">Service (Optional)</Label>
            <Select value={formData.logsource.service} onValueChange={(value) => updateField('logsource.service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {formData.logsource.product && SIGMA_SERVICES[formData.logsource.product] ? 
                  SIGMA_SERVICES[formData.logsource.product].map((service) => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  )) : 
                  <SelectItem value="none" disabled>Select a product first</SelectItem>
                }
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="definition">Definition (Optional)</Label>
            <Input
              id="definition"
              value={formData.logsource.definition}
              onChange={(e) => updateField('logsource.definition', e.target.value)}
              placeholder="e.g., 'EventID: 3'"
            />
          </div>
        </CardContent>
      </Card>

      {/* Detection Logic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-primary" />
            Detection Logic <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {formData.detection.blocks.map((block, blockIndex) => (
              <div key={blockIndex} className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <Input
                    value={block.name}
                    onChange={(e) => updateDetectionBlock(blockIndex, 'name', e.target.value)}
                    placeholder="Block name (e.g., selection_1)"
                    className="max-w-xs font-mono text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDetectionBlock(blockIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(block.fields).map(([fieldName, fieldValue], fieldIndex) => (
                    <DetectionFieldRow
                      key={fieldIndex}
                      fieldName={fieldName}
                      fieldValue={fieldValue}
                      blockIndex={blockIndex}
                      onUpdateField={updateBlockField}
                      onRemoveField={removeFieldFromBlock}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addFieldToBlock(blockIndex)}
                  className="mt-3"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Field
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={addDetectionBlock}>
            <Plus className="w-4 h-4 mr-2" />
            Add Detection Block
          </Button>
          
          <div className="border-t pt-6">
            <Label htmlFor="condition">Condition Logic <span className="text-red-500">*</span></Label>
            <Textarea
              id="condition"
              value={formData.detection.condition}
              onChange={(e) => updateField('detection.condition', e.target.value)}
              placeholder="e.g., selection_1 and not filter_1"
              rows={3}
              className="font-mono text-sm mt-2"
            />
            <p className="text-xs text-slate-500 mt-2">
              Use logical operators: and, or, not. Reference detection block names.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* False Positives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
            False Positives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {formData.falsepositives.map((fp, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="flex-1 text-sm">{fp}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromArray('falsepositives', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={newFalsePositive}
              onChange={(e) => setNewFalsePositive(e.target.value)}
              placeholder="Describe potential false positive scenario"
              onKeyPress={(e) => e.key === 'Enter' && handleAddFalsePositive()}
            />
            <Button onClick={handleAddFalsePositive}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitMerge className="w-5 h-5 mr-2 text-primary" />
            Related Rules (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {formData.related.map((rel, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={rel.id}
                    onChange={(e) => {
                      const newRelated = [...formData.related];
                      newRelated[index] = { ...newRelated[index], id: e.target.value };
                      updateField('related', newRelated);
                    }}
                    placeholder="Related rule ID"
                    className="font-mono text-sm"
                  />
                  <Select
                    value={rel.type}
                    onValueChange={(value) => {
                      const newRelated = [...formData.related];
                      newRelated[index] = { ...newRelated[index], type: value as any };
                      updateField('related', newRelated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="similar">Similar</SelectItem>
                      <SelectItem value="derived">Derived</SelectItem>
                      <SelectItem value="obsoletes">Obsoletes</SelectItem>
                      <SelectItem value="merged">Merged</SelectItem>
                      <SelectItem value="renamed">Renamed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromArray('related', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={handleAddRelated}>
            <Plus className="w-4 h-4 mr-2" />
            Add Related Rule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
