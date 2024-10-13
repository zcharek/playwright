import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import * as path from "path";

class TableReporter implements Reporter {
  private specs: {
    [key: string]: {
      duration: number;
      tests: number;
      passing: number;
      failing: number;
      interrupted: number;
      skipped: number;
    };
  } = {};
  private totalDuration: number = 0;

  onTestBegin(test: TestCase) {
    const spec = path.basename(test.location?.file) || "Unknown Spec";
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

  onTestEnd(test: TestCase, result: TestResult) {
    const spec = path.basename(test.location?.file || "Unknown Spec");
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
    console.log(
      "Running " +
        Object.keys(this.specs).length +
        " tests across " +
        Object.keys(this.specs).length +
        " suites..."
    );
    console.log(
      "┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐"
    );
    console.log(
      "│ Spec                                               │ Duration   │ Tests │ Passing │ Failing │ Skipped │ Interrupted │"
    );
    console.log(
      "├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤"
    );
    Object.entries(this.specs).forEach(([spec, data]) => {
      const durationFormatted = (data.duration / 1000).toFixed(1) + "s";
      console.log(
        `│ ${spec.padEnd(50)} │ ${durationFormatted.padEnd(10)} │ ${data.tests
          .toString()
          .padEnd(5)} │ ${data.passing.toString().padEnd(7)} │ ${data.failing
          .toString()
          .padEnd(7)} │ ${data.skipped
          .toString()
          .padEnd(7)} │ ${data.interrupted.toString().padEnd(7)} │`
      );
    });

    const totalPassed = Object.values(this.specs).reduce(
      (sum, data) => sum + data.passing,
      0
    );
    const totalFailed = Object.values(this.specs).reduce(
      (sum, data) => sum + data.failing,
      0
    );
    const totalSkipped = Object.values(this.specs).reduce(
      (sum, data) => sum + data.skipped,
      0
    );
    const totalInterrupted = Object.values(this.specs).reduce(
      (sum, data) => sum + data.interrupted,
      0
    );
    const totalDurationFormatted = (this.totalDuration / 1000).toFixed(1) + "s";

    console.log(
      "└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘"
    );
    console.log(
      `Test Results: ${totalPassed} passed, ${totalFailed} failed, ${totalSkipped} skipped, ${totalInterrupted} interrupted`
    );
    console.log(`Total Duration: ${totalDurationFormatted}`);
  }
}

export default TableReporter;
