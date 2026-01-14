import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BrutalistButton } from "@/components/ui/brutalist/BrutalistButton";
import { Link } from "lucide-react";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
                <h1 className="font-serif text-5xl font-black uppercase tracking-tighter">
                    Dossier Candidat
                </h1>
                <div className="hidden md:block transform rotate-2">
                    <div className="bg-red-600 text-white font-bold px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm">
                        CONFIDENTIEL
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Form Area */}
                <div className="md:col-span-2 space-y-8">

                    {/* Identity Section */}
                    <div className="bg-white p-6 border-2 border-black shadow-hard relative">
                        <div className="absolute -top-3 left-4 bg-secondary px-2 font-bold border border-black text-sm">
                            01. IDENTITÉ
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Prénom</label>
                                <input
                                    type="text"
                                    placeholder="Jean"
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Nom</label>
                                <input
                                    type="text"
                                    placeholder="Dupont"
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-white p-6 border-2 border-black shadow-hard relative">
                        <div className="absolute -top-3 left-4 bg-secondary px-2 font-bold border border-black text-sm">
                            02. CONTACT
                        </div>
                        <div className="space-y-4 mt-2">
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Email (Vérifié)</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full p-3 border-2 border-gray-300 text-gray-500 font-mono bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Téléphone</label>
                                <input
                                    type="tel"
                                    placeholder="06 12 34 56 78"
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Adresse Complète</label>
                                <textarea
                                    rows={3}
                                    placeholder="123 Rue de la Réussite, 75000 Paris"
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Digital Section */}
                    <div className="bg-white p-6 border-2 border-black shadow-hard relative">
                        <div className="absolute -top-3 left-4 bg-secondary px-2 font-bold border border-black text-sm">
                            03. PRÉSENCE DIGITALE
                        </div>
                        <div className="space-y-4 mt-2">
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Profil LinkedIn URL</label>
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/..."
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Portfolio / Site Perso (Optionnel)</label>
                                <input
                                    type="url"
                                    placeholder="https://mon-portfolio.com"
                                    className="w-full p-3 border-2 border-black font-serif bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <BrutalistButton className="flex-1 text-lg py-6">
                            SAUVEGARDER LES INFOS
                        </BrutalistButton>
                    </div>

                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-yellow-100 p-6 border-2 border-black transform rotate-1 sticky top-8">
                        <div className="w-4 h-4 rounded-full bg-red-500 border border-black absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm"></div>
                        <h3 className="font-bold text-lg mb-2 text-red-600 uppercase border-b border-red-600 pb-1">Pourquoi ces infos ?</h3>
                        <p className="font-serif text-sm leading-relaxed mb-4">
                            L'IA utilise ces données pour générer automatiquement l'en-tête de vos documents (CV & Lettres).
                        </p>
                        <p className="font-serif text-sm leading-relaxed">
                            Plus c'est complet, moins vous aurez à éditer à la main après.
                        </p>
                    </div>

                    <div className="border-t-2 border-black pt-8">
                        <h3 className="font-bold text-sm uppercase mb-4 text-gray-500">Actions du Compte</h3>
                        <form action="/auth/signout" method="post">
                            <button type="submit" className="text-red-600 font-bold hover:underline text-sm flex gap-2 items-center">
                                <Link className="w-4 h-4" /> Se déconnecter
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
