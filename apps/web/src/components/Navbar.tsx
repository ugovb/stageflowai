import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrutalistButton } from "@/components/ui/brutalist/BrutalistButton"
import { Sparkles } from "lucide-react"

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b-2 border-black bg-[#FDFBF7] sticky top-0 z-50">
      <div className="flex h-20 items-center px-4 md:px-8 max-w-7xl mx-auto">
        {/* LOGO */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 transform -rotate-3 group-hover:rotate-0 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif font-black text-2xl tracking-tight relative">
              StageFlow
              <span className="absolute -top-2 -right-4 font-hand text-xs text-primary rotate-12 bg-secondary px-1 border border-black transform group-hover:scale-110 transition-transform">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-8">
            <Link href="/pricing" className="text-sm font-bold uppercase tracking-widest hover:underline decoration-wavy decoration-primary underline-offset-4">
              tarifs
            </Link>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hidden md:block font-hand text-lg hover:text-primary -rotate-1">
                Mon espace
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-10 w-10 rounded-none border-2 border-black overflow-hidden hover:opacity-80 transition-opacity">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src="" alt={user.email || ""} />
                      <AvatarFallback className="rounded-none bg-secondary font-bold text-black border-none">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal font-hand text-lg bg-yellow-100 border-b-2 border-black">
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold leading-none">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild className="focus:bg-primary focus:text-white rounded-none cursor-pointer">
                    <Link href="/dashboard" className="font-bold">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-primary focus:text-white rounded-none cursor-pointer">
                    <Link href="/profile" className="font-bold">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-black" />
                  <DropdownMenuItem className="focus:bg-red-500 focus:text-white rounded-none cursor-pointer">
                    <form action="/auth/signout" method="post" className="w-full">
                      <button type="submit" className="w-full text-left font-bold">
                        Déconnexion
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:block font-hand text-lg hover:text-primary rotate-1 font-bold">
                Connexion
              </Link>
              <Link href="/login">
                <BrutalistButton variant="primary" className="text-sm px-6 py-2 shadow-hard-sm">
                  C'est parti !
                </BrutalistButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
