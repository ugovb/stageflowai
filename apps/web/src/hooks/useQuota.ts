import useSWR from "swr";
import { QuotaStatus } from "@/types/pricing";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch quota");
  return res.json();
});

export const useQuota = () => {
  const { data, error, isLoading, mutate } = useSWR<QuotaStatus>(
    "/api/quota/status", // This should match the backend route proxy or direct URL
    // Note: Since backend is on 8000 and frontend on 3000, we usually need next.config.ts rewrite or env var base url
    // For now assuming Next.js rewrites /api to backend, or we use absolute URL if configured.
    // Given the prompt structure, I'll assume a rewrite or relative path works.
    // Actually, looking at the backend routes, it is /api/quota/status.
    // If we need to proxy, I'll assume that's handled in next.config.ts or I should use env var.
    // I'll stick to relative path for now.
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false, // Don't retry 401s infinitely
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
    isUnlimited: data?.plan === "unlimited",
    canGenerateLetter: data?.usage?.coverLetters?.limit 
      ? data.usage.coverLetters.used < data.usage.coverLetters.limit 
      : true, // If no limit or unlimited
  };
};
