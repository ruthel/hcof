# Administration HCOF avec PostgreSQL

L’espace `/admin` gère les activités, les actualités et les albums, en anglais et en français. Les comptes, les sessions, les contenus et les photos sont conservés dans PostgreSQL. Better Auth gère la connexion dans le site : aucun compte Clerk n’est nécessaire.

## Installation dans Vercel

1. Dans le projet **HCOF**, ouvrir **Storage**, installer une base **PostgreSQL** depuis le Marketplace et la connecter à l’environnement **Production**.
2. Les variables Prisma/Vercel `POSTGRES_URL`, `DATABASE_URL` et `PRISMA_DATABASE_URL` sont reconnues. Le site choisit la première URL PostgreSQL TCP valide dans cet ordre, avec ses paramètres TLS. Une URL `prisma+postgres://...` est ignorée : le pilote utilise la connexion PostgreSQL standard, pas Prisma Accelerate.
3. Dans **Settings → Environment Variables**, configurer pour **Production** :

| Variable | Valeur |
| --- | --- |
| `DATABASE_URL` | Connexion fournie par la base reliée au projet |
| `BETTER_AUTH_URL` | `https://www.hopescityoutreach.org` |
| `BETTER_AUTH_SECRET` | Secret aléatoire d’au moins 32 caractères, conservé côté serveur |
| `ADMIN_EMAILS` | `admin@hcof.com` |
| `ADMIN_INITIAL_PASSWORD` | Mot de passe choisi par l’administrateur, 12 à 128 caractères |

4. Redéployer HCOF. La commande de build prépare automatiquement les tables PostgreSQL et crée le premier compte administrateur si le mot de passe initial est renseigné. Aucun compte existant ni contenu existant n’est remplacé. Une erreur de migration bloque le build et conserve le déploiement précédent.
5. Ouvrir `https://www.hopescityoutreach.org/admin` et se connecter avec `admin@hcof.com` et le mot de passe choisi.
6. Après la première connexion, retirer `ADMIN_INITIAL_PASSWORD` des variables Vercel. Le mot de passe est conservé sous forme de hachage dans PostgreSQL. Garder `BETTER_AUTH_SECRET` stable : il protège les sessions.

La création publique de comptes est désactivée. Chaque accès à l’administration, sauvegarde et envoi de photo vérifie la session et `ADMIN_EMAILS`. Les tentatives de connexion sont limitées dans la base. La déconnexion invalide la session côté serveur.

Les variables Clerk et Blob ne sont plus utilisées par le code. L’ancien magasin privé `hcof-content` n’est plus utilisé. Cette version reprend les contenus initiaux du site ; les contenus enregistrés dans un ancien stockage doivent être importés séparément avant le changement de source. Aucune publication en ligne n’avait été activée lors de ce remplacement.

## Contenus et photos

- Ajouter un brouillon, écrire les deux langues, puis enregistrer. Le titre et le résumé doivent être renseignés en anglais et français avant publication.
- Cocher **À la une** pour une actualité. La date reste facultative. Le texte complet est affiché dans la rubrique correspondante de Galerie.
- Le carrousel affiche trois activités sur ordinateur et une sur mobile, avec cinq activités maximum, brouillons compris.
- Ajouter jusqu’à 40 photos par album, JPEG/PNG/WebP, 3 Mo maximum par photo. Choisir la couverture, les légendes et l’ordre, puis enregistrer.
- Les photos sont stockées dans la table `hcof_photos` en données binaires. Le site les sert uniquement si leur contenu est publié ou à un administrateur connecté. Remettre un contenu en brouillon rend aussi ses photos privées.
- Les sauvegardes utilisent une révision vérifiée dans une requête SQL atomique pour empêcher l’écrasement des modifications d’une autre session.
- Retirer un contenu ou une photo retire son association au site après enregistrement. Les fichiers restent privés dans la base. Leur nettoyage est une opération distincte.

## Développement et vérification

Créer `.env.local` avec une base de développement et les variables ci-dessus, en utilisant `BETTER_AUTH_URL=http://localhost:3000`. Exécuter `pnpm db:setup`, puis `pnpm dev`. Utiliser une base et un secret distincts pour les prévisualisations ; ne pas connecter celles-ci à la base de production.

`pnpm test:cms` démarre un PostgreSQL embarqué PGlite et un serveur HTTP isolé. Il vérifie les migrations répétables, la connexion Better Auth, l’interdiction d’inscription publique, les brouillons, la confidentialité des photos, les albums, les publications, les conflits de sauvegarde et la déconnexion. Cela ne remplace pas la vérification finale de la connexion TLS au PostgreSQL du prestataire Vercel.
