"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
class TableReporter {
    constructor() {
        this.specs = {};
        this.totalDuration = 0;
    }
    onTestBegin(test) {
        var _a;
        const spec = path.basename((_a = test.location) === null || _a === void 0 ? void 0 : _a.file) || "Unknown Spec";
        if (!this.specs[spec]) {
            this.specs[spec] = {
                duration: 0,
                tests: 0,
                passing: 0,
                failing: 0,
                skipped: 0,
                interrupted: 0,
            };
        }
        this.specs[spec].tests++;
    }
    onTestEnd(test, result) {
        var _a;
        const spec = path.basename(((_a = test.location) === null || _a === void 0 ? void 0 : _a.file) || "Unknown Spec");
        const duration = result.duration;
        this.specs[spec].duration += duration;
        switch (result.status) {
            case "passed":
                this.specs[spec].passing++;
                break;
            case "skipped":
                this.specs[spec].skipped++;
                break;
            case "interrupted":
                this.specs[spec].interrupted++;
                break;
            case "failed":
            case "timedOut":
            default:
                this.specs[spec].failing++;
                break;
        }
    }
    onEnd() {
        console.log("Running " +
            Object.keys(this.specs).length +
            " tests across " +
            Object.keys(this.specs).length +
            " suites...");
        console.log("┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐");
        console.log("│ Spec                                               │ Duration   │ Tests │ Passing │ Failing │ Skipped │ Interrupted │");
        console.log("├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤");
        Object.entries(this.specs).forEach(([spec, data]) => {
            const durationFormatted = (data.duration / 1000).toFixed(1) + "s";
            console.log(`│ ${spec.padEnd(50)} │ ${durationFormatted.padEnd(10)} │ ${data.tests
                .toString()
                .padEnd(5)} │ ${data.passing.toString().padEnd(7)} │ ${data.failing
                .toString()
                .padEnd(7)} │ ${data.skipped
                .toString()
                .padEnd(7)} │ ${data.interrupted.toString().padEnd(7)} │`);
        });
        const totalPassed = Object.values(this.specs).reduce((sum, data) => sum + data.passing, 0);
        const totalFailed = Object.values(this.specs).reduce((sum, data) => sum + data.failing, 0);
        const totalSkipped = Object.values(this.specs).reduce((sum, data) => sum + data.skipped, 0);
        const totalInterrupted = Object.values(this.specs).reduce((sum, data) => sum + data.interrupted, 0);
        const totalDurationFormatted = (this.totalDuration / 1000).toFixed(1) + "s";
        console.log("└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘");
        console.log(`Test Results: ${totalPassed} passed, ${totalFailed} failed, ${totalSkipped} skipped, ${totalInterrupted} interrupted`);
        console.log(`Total Duration: ${totalDurationFormatted}`);
    }
}
exports.default = TableReporter; // Assure-toi que c'est bien exporté
