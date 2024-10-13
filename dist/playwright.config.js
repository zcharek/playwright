"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const tableReporter_1 = __importDefault(require("./tools/reporters/tableReporter")); // Assure-toi que le chemin est correct
exports.default = (0, test_1.defineConfig)({
    testDir: "./tests", // Dossier où se trouvent tes tests
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
    reporter: [
        [tableReporter_1.default.name, {}], // Utilisation du custom reporter avec une instance
    ],
});
