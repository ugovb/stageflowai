"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { Search as SearchIcon, MapPin, Building2, Star, ArrowUpRight, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  compatibility_score: number;
  logo_url: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await apiClient(`/api/search/companies?q=${query}&location=${location}`);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompanies();
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-2">
          <Target className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Trouvez votre cible.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          L'IA analyse vos compétences validées pour vous suggérer les entreprises où vous aurez le plus d'impact.
        </p>
      </div>

      {/* Search Bar Section - Apple Style */}
      <div className="bg-card border rounded-[2rem] p-4 shadow-xl shadow-primary/5 mb-16 max-w-4xl mx-auto backdrop-blur-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Rôle, compétence ou entreprise..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 bg-transparent border-none text-lg focus-visible:ring-0"
            />
          </div>
          <div className="w-px bg-border hidden md:block my-2" />
          <div className="flex-1 relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Ville, pays ou Remote..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-12 h-14 bg-transparent border-none text-lg focus-visible:ring-0"
            />
          </div>
          <Button type="submit" size="lg" className="h-14 px-8 rounded-2xl font-bold shadow-lg shadow-primary/20">
            Rechercher
          </Button>
        </form>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Analyse des opportunités...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col p-6 bg-card border rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border bg-white flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain" />
                    ) : (
                      <Building2 className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-primary/5 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {company.compatibility_score}%
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">{company.industry}</span>
                    <span>•</span>
                    <span>{company.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-8 line-clamp-2 leading-relaxed">
                  {company.description}
                </p>

                <div className="mt-auto flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl h-11">
                    Détails
                  </Button>
                  <Button className="flex-1 rounded-xl h-11 gap-2">
                    Cibler <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && companies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Aucune entreprise ne correspond à votre recherche actuelle.</p>
          <Button variant="link" onClick={() => {setQuery(""); setLocation(""); fetchCompanies();}}>
            Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  );
}
