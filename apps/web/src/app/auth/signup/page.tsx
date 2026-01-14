import { signup } from '@/app/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-3xl shadow-lg border">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Créer un compte</h2>
          <p className="text-sm text-muted-foreground">Rejoignez l'aventure StageFlow AI</p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-xl h-11"
              />
            </div>
          </div>

          <Button 
            formAction={signup}
            className="w-full h-11 rounded-xl font-bold"
          >
            S'inscrire
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
