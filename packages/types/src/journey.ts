export interface JourneyState {
  id: number;
  user_id: number;
  current_phase: number;
  is_locked: boolean;
  updated_at: string;
}

export interface ChatMessage {
  id: number;
  user_id: number;
  role: 'user' | 'assistant';
  content: string;
  phase_context: number;
  created_at: string;
}
