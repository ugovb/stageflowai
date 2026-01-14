export const metadata = {
  title: "Conditions Générales d'Utilisation - StageFlow AI",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate">
      <h1>Conditions Générales d'Utilisation</h1>
      <p className="lead">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      
      <h2>1. Objet</h2>
      <p>
        Les présentes CGU régissent l'utilisation de StageFlow AI, 
        une application d'aide à la recherche de stage utilisant l'intelligence artificielle.
      </p>
      
      <h2>2. Acceptation</h2>
      <p>
        L'utilisation du service implique l'acceptation pleine et entière des présentes CGU.
        Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
      </p>
      
      <h2>3. Description du service</h2>
      <p>StageFlow AI propose :</p>
      <ul>
        <li>Un assistant IA pour identifier vos compétences</li>
        <li>Un générateur de profil professionnel</li>
        <li>Un moteur de recherche d'entreprises</li>
        <li>Un générateur de lettres de motivation personnalisées</li>
      </ul>
      
      <h2>4. Compte utilisateur</h2>
      <ul>
        <li>Vous devez fournir des informations exactes</li>
        <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
        <li>Un seul compte par personne est autorisé</li>
      </ul>
      
      <h2>5. Utilisation acceptable</h2>
      <p>Il est interdit de :</p>
      <ul>
        <li>Utiliser le service à des fins illégales</li>
        <li>Tenter de contourner les limitations techniques</li>
        <li>Revendre ou redistribuer le service</li>
        <li>Soumettre du contenu offensant ou discriminatoire</li>
        <li>Utiliser le service pour générer du spam</li>
      </ul>
      
      <h2>6. Propriété intellectuelle</h2>
      <ul>
        <li><strong>Vos contenus :</strong> Vous restez propriétaire des informations que vous saisissez</li>
        <li><strong>Documents générés :</strong> Vous pouvez librement utiliser les CV et lettres générés</li>
        <li><strong>Notre technologie :</strong> Le code, les algorithmes et l'interface restent notre propriété</li>
      </ul>
      
      <h2>7. Limitations de l'IA</h2>
      <p>
        <strong>Important :</strong> Les contenus générés par l'IA sont des suggestions. 
        Vous êtes responsable de vérifier et d'adapter les documents avant de les utiliser.
        Nous ne garantissons pas l'exactitude des informations sur les entreprises.
      </p>
      
      <h2>8. Tarification (Version Cloud)</h2>
      <ul>
        <li><strong>Gratuit :</strong> Fonctionnalités de base, limite de requêtes quotidiennes</li>
        <li><strong>Premium :</strong> Fonctionnalités complètes, limites étendues</li>
      </ul>
      <p>Les prix sont indiqués TTC. Le paiement est géré par Lemon Squeezy.</p>
      
      <h2>9. Résiliation</h2>
      <ul>
        <li>Vous pouvez supprimer votre compte à tout moment</li>
        <li>Nous pouvons suspendre un compte en cas de violation des CGU</li>
        <li>En cas de résiliation, vos données seront supprimées sous 30 jours</li>
      </ul>
      
      <h2>10. Limitation de responsabilité</h2>
      <p>
        StageFlow AI est fourni "tel quel". Nous ne garantissons pas que le service 
        sera ininterrompu ou exempt d'erreurs. Notre responsabilité est limitée 
        au montant des sommes versées au cours des 12 derniers mois.
      </p>
      
      <h2>11. Droit applicable</h2>
      <p>
        Les présentes CGU sont régies par le droit français. 
        Tout litige sera soumis aux tribunaux compétents de [Ville].
      </p>
      
      <h2>12. Contact</h2>
      <p>
        Pour toute question : contact @stageflow.app
      </p>
    </main>
  );
}
