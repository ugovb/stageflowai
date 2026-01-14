"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Skill } from "@stageflow/types";
import { Loader2, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SkillInventory = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiClient("/api/skills/");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
        <p>No skills validated yet.</p>
        <p className="text-sm mt-1">Chat with the AI to uncover your talents.</p>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category}>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-card hover:bg-accent transition-colors text-sm font-medium"
              >
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Simple Modal for Details */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-background rounded-xl border shadow-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              {selectedSkill.name}
            </h3>
            <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
              {selectedSkill.category}
            </span>

            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Evidence & Context</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{selectedSkill.evidence?.text || "No specific evidence context saved."}&rdquo;
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillInventory;
