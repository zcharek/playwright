/* eslint-disable */
import * as fs from "fs";
import * as xml2js from "xml2js";

const inputFile = "junit/results.xml";
const outputFile = "junit/filtered-results.xml";

fs.readFile(inputFile, (err, data) => {
  if (err) {
    console.error("Error reading the input file:", err);
    process.exit(1);
  }

  xml2js.parseString(
    data,
    (parseErr: any, result: { testsuites: { testsuite: any[] } }) => {
      if (parseErr) {
        console.error("Error parsing XML:", parseErr);
        process.exit(1);
      }

      // Check and filter out skipped test cases
      if (result.testsuites && result.testsuites.testsuite) {
        result.testsuites.testsuite.forEach((suite: any) => {
          if (suite.testcase) {
            suite.testcase = suite.testcase.filter(
              (testcase: any) => !testcase.skipped
            );
          }
        });
      }

      // Convert the filtered object back to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // Write the filtered XML to the output file
      fs.writeFile(outputFile, xml, (writeErr) => {
        if (writeErr) {
          console.error("Error writing the filtered XML:", writeErr);
          process.exit(1);
        }
        console.log("Filtered JUnit report saved as", outputFile);
      });
    }
  );
});
