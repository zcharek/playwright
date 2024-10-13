🚀 Installation et Mise en Place du Rapport Personnalisé avec Playwright
Ce guide vous montrera comment installer Playwright et configurer un rapport personnalisé qui affiche les résultats des tests dans un tableau, similaire à ce que vous pourriez trouver avec Cypress.

# Prérequis

Node.js installé (version 14 ou supérieure).
npm (inclus avec Node.js).

1. Installation de Playwright
   Pour commencer, créez un nouveau projet ou accédez à votre projet existant.

# Créer un nouveau projet

bash
Copier le code
mkdir mon-projet-playwright
cd mon-projet-playwright
npm init -y
Installer Playwright
Installez Playwright et ses dépendances :

bash
Copier le code
npm i -D @playwright/test

# Installer les navigateurs pris en charge

npx playwright install 2. Configuration de Playwright
Créez un fichier de configuration Playwright, playwright.config.ts, dans la racine de votre projet. Voici les fichiers à vérifier :

playwright.config.ts : Assurez-vous que le chemin vers votre reporter personnalisé est correct et que la liste des reporters est bien configurée.
typescript
Copier le code
import { defineConfig } from "@playwright/test";
import TableReporter from "./tools/reporters/tableReporter"; // Chemin vers votre reporter personnalisé

const reportersList = [
["list", { printSteps: true }],
["html", { open: "never" }],
["junit", { outputFile: "junit/results.xml" }],
[TableReporter], // Utiliser le reporter personnalisé
];

export default defineConfig({
testDir: "./tests", // Dossier où se trouvent vos tests
testMatch: /.\*\.spec\.ts/, // Regex pour matcher les fichiers de tests
timeout: 30000, // Temps d'attente pour chaque test
expect: {
timeout: 5000, // Temps d'attente pour expect
},
retries: 1, // Nombre de réessais pour les tests échoués
use: {
headless: true, // Exécute les tests en mode headless (sans interface graphique)
browserName: "chromium", // Navigateur par défaut
baseURL: "http://localhost:3000", // URL de base pour les tests
trace: "on-first-retry", // Trace pour le premier échec
},
reporter: reportersList, // Utilise la liste de reporters définie
}); 3. Créer un Rapporteur Personnalisé
Créez un dossier pour vos outils de rapport personnalisé :

bash
Copier le code
mkdir -p tools/reporters
Créez un fichier tableReporter.ts dans le dossier tools/reporters. Vérifiez que le contenu du fichier est conforme à votre logique de reporting.

tableReporter.ts : Implémentez la logique du reporter pour générer un tableau des résultats des tests.
typescript
Copier le code
import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class TableReporter implements Reporter {
// Logique pour le rapport personnalisé
}

export default TableReporter; 3. Écrire des Tests
Créez un dossier tests et ajoutez vos fichiers de test .spec.ts.

tests : Assurez-vous que les fichiers de tests respectent la convention de nommage spécifiée dans playwright.config.ts (par exemple, \*.spec.ts). 4. Exécuter les Tests
Exécutez vos tests avec la commande suivante :

bash
Copier le code
npx playwright test 5. Résultats
Après l'exécution des tests, les résultats apparaîtront dans la console, indiquant quels tests ont réussi ou échoué, sous forme de tableau.

# Ressources Supplémentaires

Documentation Playwright 'https://playwright.dev/docs/intro'
API de Playwright 'https://playwright.dev/docs/api/class-playwright/'

Ce guide vous fournit les étapes nécessaires pour configurer Playwright et personnaliser vos rapports de test. Si vous avez d'autres questions ou avez besoin d'aide supplémentaire, n'hésitez pas à demander !
