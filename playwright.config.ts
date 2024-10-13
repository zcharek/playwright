import { defineConfig, ReporterDescription } from "@playwright/test";
import TableReporter from "./tools/reporters/tableReporter"; // Assurez-vous que le chemin est correct

const useReporter = true; // Remplacez ceci par votre logique pour déterminer si le reporter doit être utilisé

const reportersList: ReporterDescription[] = [
  ["list", { printSteps: true }],
  ["html", { open: "never" }],
  ["junit", { outputFile: "junit/results.xml" }],
];

// Ajoutez le custom reporter uniquement si useReporter est vrai
if (useReporter) {
  reportersList.push(["./tools/reporters/tableReporter"]); // Chemin du custom reporter
}

export default defineConfig({
  testDir: "./tests", // Dossier où se trouvent vos tests
  testMatch: /.*\.spec\.ts/, // Regex pour matcher les fichiers de tests
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
});
