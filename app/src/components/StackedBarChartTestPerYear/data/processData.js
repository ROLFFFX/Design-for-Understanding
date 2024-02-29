const fs = require("fs");

const inputFile = "./nuclear_explosions.json";
const outputFile = "./processed_data.json";

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const nuclearExplosions = JSON.parse(data);

  const processedData = nuclearExplosions.reduce((acc, curr) => {
    const year = new Date(
      curr.Date.Year,
      curr.Date.Month - 1,
      curr.Date.Day
    ).getFullYear();
    const country = curr.Location.Country;
    const key = `${country}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        countryName: country,
        year: new Date(curr.Date.Year, 0, 1),
        testNumber: 1,
      };
    } else {
      acc[key].testNumber += 1;
    }

    return acc;
  }, {});

  const result = Object.values(processedData);

  fs.writeFile(outputFile, JSON.stringify(result, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    console.log("Processed data has been written to", outputFile);
  });
});
