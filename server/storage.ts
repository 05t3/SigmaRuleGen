import { type SigmaRule, type InsertSigmaRule } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for Sigma Rule Generator

export interface IStorage {
  getSigmaRule(id: string): Promise<SigmaRule | undefined>;
  getAllSigmaRules(): Promise<SigmaRule[]>;
  createSigmaRule(rule: InsertSigmaRule): Promise<SigmaRule>;
  updateSigmaRule(id: string, rule: Partial<SigmaRule>): Promise<SigmaRule | undefined>;
  deleteSigmaRule(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private rules: Map<string, SigmaRule>;

  constructor() {
    this.rules = new Map();
  }

  async getSigmaRule(id: string): Promise<SigmaRule | undefined> {
    return this.rules.get(id);
  }

  async getAllSigmaRules(): Promise<SigmaRule[]> {
    return Array.from(this.rules.values());
  }

  async createSigmaRule(insertRule: InsertSigmaRule): Promise<SigmaRule> {
    const rule: SigmaRule = { ...insertRule };
    this.rules.set(rule.id, rule);
    return rule;
  }

  async updateSigmaRule(id: string, updateRule: Partial<SigmaRule>): Promise<SigmaRule | undefined> {
    const existingRule = this.rules.get(id);
    if (!existingRule) return undefined;
    
    const updatedRule: SigmaRule = { ...existingRule, ...updateRule };
    this.rules.set(id, updatedRule);
    return updatedRule;
  }

  async deleteSigmaRule(id: string): Promise<boolean> {
    return this.rules.delete(id);
  }
}

export const storage = new MemStorage();
