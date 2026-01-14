export interface Skill {
  id: number;
  user_id: number;
  name: string;
  category: string;
  evidence: Record<string, any>;
  created_at: string;
}
