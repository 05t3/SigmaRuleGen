import { z } from "zod";

export const sigmaRuleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  id: z.string().uuid("Invalid UUID format"),
  status: z.enum(["stable", "test", "experimental", "deprecated"]),
  description: z.string().optional(),
  references: z.array(z.string().url("Invalid URL")).optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  modified: z.string().optional(),
  tags: z.array(z.string()).optional(),
  logsource: z.object({
    product: z.string().optional(),
    category: z.string().optional(),
    service: z.string().optional(),
    definition: z.string().optional(),
  }),
  detection: z.object({
    blocks: z.array(z.object({
      name: z.string().min(1, "Block name is required"),
      fields: z.record(z.union([
        z.string(),
        z.array(z.string()),
        z.object({
          value: z.union([z.string(), z.array(z.string())]),
          modifier: z.string().optional(),
        }),
      ])),
    })),
    condition: z.string().min(1, "Condition is required"),
  }),
  falsepositives: z.array(z.string()).optional(),
  level: z.enum(["informational", "low", "medium", "high", "critical"]),
  related: z.array(z.object({
    id: z.string().uuid("Invalid UUID format"),
    type: z.enum(["similar", "derived", "obsoletes", "merged", "renamed"]),
  })).optional(),
});

export type SigmaRule = z.infer<typeof sigmaRuleSchema>;

export const insertSigmaRuleSchema = sigmaRuleSchema;
export type InsertSigmaRule = z.infer<typeof insertSigmaRuleSchema>;
