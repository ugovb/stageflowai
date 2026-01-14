"use client";

import React from "react";
import { QuotaStatus } from "@/types/pricing";
import { QuotaProgress } from "./QuotaProgress";
import { FileText, Download, Brain, Calendar } from "lucide-react";

interface UsageStatsProps {
  quota: QuotaStatus;
}

export const UsageStats = ({ quota }: UsageStatsProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white">Consommation</h3>
        {quota.renewsAt && (
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Renouvellement: {new Date(quota.renewsAt).toLocaleDateString()}
          </span>
        )}
        {quota.isLifetime && (
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            A VIE
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Cover Letters */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <FileText className="h-4 w-4" /> Lettres
            </span>
            <span className="font-medium">
              {quota.usage.coverLetters.used} / {quota.usage.coverLetters.limit ?? "∞"}
            </span>
          </div>
          <QuotaProgress 
            used={quota.usage.coverLetters.used} 
            limit={quota.usage.coverLetters.limit} 
            size="sm"
          />
        </div>

        {/* Profile Depth */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Brain className="h-4 w-4" /> Profil
            </span>
            <span className="font-medium uppercase text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              {quota.usage.profile.depth}
            </span>
          </div>
        </div>

        {/* Export Status */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Download className="h-4 w-4" /> Export PDF
            </span>
            <span className={`font-medium text-xs px-2 py-1 rounded ${quota.usage.profile.canExport ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              {quota.usage.profile.canExport ? "ACTIF" : "VERROUILLÉ"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
