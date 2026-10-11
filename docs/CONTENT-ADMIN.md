# Administration HCOF

L’espace `/admin` gère les activités, les actualités et les albums. Le contenu existant est repris au premier démarrage. Il n’est écrit dans le stockage qu’au premier enregistrement.

## Activation en production

Le magasin privé `hcof-content` est déjà créé et raccordé à HCOF. `BLOB_READ_WRITE_TOKEN` est configuré pour la production et `ADMIN_EMAILS` contient `admin@hcof.com`. Les clés Clerk et l’invitation du compte restent à configurer. Le stockage de production n’est pas exposé aux prévisualisations.

1. Créer une application **Clerk** et activer une méthode de connexion pour `admin@hcof.com` (adresse e-mail vérifiée). Créer ou inviter ce compte depuis Clerk. La création publique de comptes n’est pas proposée dans l’interface HCOF.
2. Renseigner `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` et `CLERK_SECRET_KEY` dans les variables du projet Vercel HCOF. Utiliser les clés de production et configurer le domaine de production dans Clerk.
3. Renseigner `ADMIN_EMAILS=admin@hcof.com`. Une connexion Clerk réussie ne suffit pas : chaque accès à l’éditeur, chaque sauvegarde et chaque envoi de photo vérifie cette liste et la vérification de l’adresse.
4. Créer un magasin **Vercel Blob privé** réservé à HCOF, le relier au projet et renseigner son `BLOB_READ_WRITE_TOKEN`. Ne pas utiliser un magasin public : il contient aussi les brouillons et leurs photos.
5. Redéployer le projet, se connecter à `/admin`, enregistrer un brouillon, puis le publier pour vérifier le service connecté. Utiliser des clés et un magasin séparés pour les déploiements de prévisualisation.

Les secrets restent côté serveur. Les identifiants locaux de développement sont désactivés sur Vercel et en production. Aucune clé de connexion n’est enregistrée dans Git.

## Utilisation

- Choisir Activités ou Actualités. Ajouter un brouillon, écrire les deux langues, puis enregistrer.
- Le statut Publié rend le contenu visible après enregistrement. Pour publier, le titre et le résumé sont obligatoires en anglais et en français. Le contenu complet est affiché dans la rubrique correspondante de Galerie.
- Cocher À la une pour une actualité. La date est facultative ; aucune date n’est inventée pour les contenus repris.
- Le carrousel affiche trois activités sur ordinateur et une sur mobile. Cinq activités maximum, brouillons compris.
- Ajouter jusqu’à 40 photos par contenu, JPEG/PNG/WebP, 3 Mo par image. Choisir la couverture, saisir les légendes et changer l’ordre. Enregistrer après l’envoi.
- Les photos sont privées dans le magasin. Le site les sert uniquement si leur contenu est publié, ou à un administrateur connecté. Passer un contenu en brouillon retire aussi ses photos du site.
- Une sauvegarde refuse d’écraser les modifications d’une autre session grâce à la révision du document. En cas de conflit, copier les textes modifiés puis recharger.
- Retirer un contenu ou une photo retire son association au site après enregistrement. Les fichiers sont conservés dans le stockage privé ; leur nettoyage est une opération séparée. Les envois non enregistrés peuvent aussi laisser des fichiers privés non associés.

## Développement local

Dans `.env.development.local`, renseigner `CMS_LOCAL_STORAGE=true`, `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` (32 caractères aléatoires minimum), puis démarrer `pnpm dev`. Ces contenus sont conservés dans `.cms/`, ignoré par Git. Ce mode ne reproduit pas la connexion Clerk ni le service Blob ; ils doivent être vérifiés sur une prévisualisation configurée.

## Vérifications

`pnpm test:cms` teste les restrictions d’accès, la validation des traductions, les brouillons, les photos privées, la publication, la remise en brouillon et les conflits de sauvegarde à travers les véritables routes HTTP. Il démarre un serveur de développement avec un dossier temporaire isolé, sans modifier les contenus du projet ni le site public.
