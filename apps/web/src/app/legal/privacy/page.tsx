export const metadata = {
  title: "Politique de Confidentialité - StageFlow AI",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate">
      <h1>Politique de Confidentialité</h1>
      <p className="lead">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      
      <h2>1. Responsable du traitement</h2>
      <p>
        StageFlow AI est édité par [Ton Nom], étudiant entrepreneur.<br/>
        Contact : contact @stageflow.app
      </p>
      
      <h2>2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>
      <ul>
        <li><strong>Données d'identification :</strong> Email, nom (optionnel)</li>
        <li><strong>Données de profil :</strong> Formation, compétences, expériences (que vous saisissez)</li>
        <li><strong>Données d'usage :</strong> Historique des conversations avec l'IA</li>
        <li><strong>Données techniques :</strong> Adresse IP, type de navigateur (pour la sécurité)</li>
      </ul>
      
      <h2>3. Finalités du traitement</h2>
      <ul>
        <li>Fournir le service de coaching IA</li>
        <li>Générer vos documents de candidature (CV, lettres)</li>
        <li>Améliorer nos algorithmes (données anonymisées)</li>
        <li>Communiquer sur votre compte (si vous y consentez)</li>
      </ul>
      
      <h2>4. Base légale</h2>
      <ul>
        <li><strong>Exécution du contrat :</strong> Pour fournir le service</li>
        <li><strong>Consentement :</strong> Pour les communications marketing</li>
        <li><strong>Intérêt légitime :</strong> Pour la sécurité et l'amélioration du service</li>
      </ul>
      
      <h2>5. Partage des données</h2>
      <p>Vos données sont transmises à :</p>
      <ul>
        <li><strong>OpenRouter/OpenAI :</strong> Pour le traitement IA (données de conversation)</li>
        <li><strong>Supabase :</strong> Hébergement base de données (UE)</li>
        <li><strong>Lemon Squeezy :</strong> Traitement des paiements (si applicable)</li>
      </ul>
      <p>Nous ne vendons jamais vos données à des tiers.</p>
      
      <h2>6. Durée de conservation</h2>
      <ul>
        <li><strong>Données de compte :</strong> Jusqu'à suppression du compte + 30 jours</li>
        <li><strong>Conversations :</strong> 12 mois après la dernière activité</li>
        <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
      </ul>
      
      <h2>7. Vos droits (RGPD)</h2>
      <p>Vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Accès :</strong> Consulter vos données dans les paramètres</li>
        <li><strong>Rectification :</strong> Modifier vos informations</li>
        <li><strong>Effacement :</strong> Supprimer votre compte</li>
        <li><strong>Portabilité :</strong> Exporter vos données (JSON)</li>
        <li><strong>Opposition :</strong> Retirer vos consentements</li>
      </ul>
      <p>
        Pour exercer ces droits : <strong>Paramètres {">"} Mes Données</strong> ou contactez-nous.
      </p>
      
      <h2>8. Sécurité</h2>
      <p>Nous mettons en œuvre :</p>
      <ul>
        <li>Chiffrement HTTPS (TLS 1.3)</li>
        <li>Authentification sécurisée (JWT/OAuth)</li>
        <li>Isolation des données par utilisateur (Row Level Security)</li>
        <li>Monitoring des accès anormaux</li>
      </ul>
      
      <h2>9. Cookies</h2>
      <p>Nous utilisons uniquement des cookies essentiels (session d'authentification).</p>
      
      <h2>10. Contact DPO</h2>
      <p>
        Pour toute question relative à vos données :<br/>
        Email : privacy @stageflow.app
      </p>
    </main>
  );
}
