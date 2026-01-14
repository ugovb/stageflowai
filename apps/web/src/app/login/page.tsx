import { login } from './actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-3xl shadow-lg border">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bon retour</h2>
          <p className="text-sm text-muted-foreground">Connectez-vous pour continuer votre progression</p>
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
            formAction={login}
            className="w-full h-11 rounded-xl font-bold"
          >
            Se connecter
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
              Commencer l'aventure
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}