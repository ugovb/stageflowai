import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BrutalistDashboardGrid from '@/components/dashboard/BrutalistDashboardGrid'
import { Sparkles } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-foreground p-4 md:p-8 pb-32">
      {/* Background Grid/Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 max-w-6xl mx-auto relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-hand text-xl font-bold -rotate-1 text-gray-500">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Mon Bureau
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight font-serif">
            Salut, <span className="relative inline-block px-2">
              <span className="absolute inset-0 bg-secondary transform -skew-x-6 opacity-60 rounded-sm -z-10"></span>
              <span className="font-hand font-bold text-5xl">{user.email?.split('@')[0]}</span>
            </span>
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="font-mono text-xs font-bold bg-black text-white px-3 py-1.5 border-2 border-black uppercase tracking-widest flex items-center gap-2 transform rotate-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse border border-white" />
            Online
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <BrutalistDashboardGrid currentPhase={1} phaseName="L'Appel à l'Aventure" />
      </div>
    </div>
  )
}