/*
  Collect and format Verra.org project's into a JSON asset structure
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser } from 'xmldom';
import toGeoJSON from 'togeojson';

// Define script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create output dir
let assetDir = path.join('./', 'assets')
if (!fs.existsSync(assetDir)) {
  fs.mkdirSync(assetDir);
}

// Request project data from Verra registry
const response = await fetch("https://registry.verra.org/uiapi/resource/resource/search?$count=true", {
  "body": JSON.stringify({
    "program":"VCS",
    "protocolCategories": ["14"],
    "resourceStatuses": ["VCS_EX_REGISTERED"]
  }),
  "method": "POST"
});
const registryResults = await response.json();
console.log("Total registry results: " + registryResults.totalCount)

// Loop through projects
for (const result of registryResults.value) {
  console.log("Processing project ID " + result.resourceIdentifier)

  // Request project data
  const response = await fetch("https://registry.verra.org/uiapi/resource/resourceSummary/" + result.resourceIdentifier);
  const projectData = await response.json();

  // Parse state
  let stateAttr = projectData.attributes.find(item => item.code == "STATE_PROVINCE")
  let state = stateAttr ? stateAttr.values[0].value : ""
  
  // Parse vcs data
  let vcsData = projectData.participationSummaries.find(item => item.programCode == "VCS");

  // Parse emmission
  let emissionsAttr = vcsData.attributes.find(item => item.code == "EST_ANNUAL_EMISSION_REDCT")
  let emissionReductions = emissionsAttr ? emissionsAttr.values[0].value : ""

  // Parse category name
  let categoryAttr = vcsData.attributes.find(item => item.code == "PRIMARY_PROJECT_CATEGORY_NAME")
  let categoryName = categoryAttr ? categoryAttr.values[0].value : ""

  // Parse acreage
  let acreageAttr = vcsData.attributes.find(item => item.code == "PROJECT_ACREAGE")
  let acreage = acreageAttr ? acreageAttr.values[0].value : ""

  // Parse registration date
  let dateAttr = vcsData.attributes.find(item => item.code == "PROJECT_REGISTRATION_DATE")
  let registrationDate = dateAttr ? dateAttr.values[0].value : ""

  // Parse project status
  let statusAttr = vcsData.attributes.find(item => item.code == "PROJECT_STATUS")
  let projectStatus = statusAttr ? statusAttr.values[0].value : ""

  // Parse validator name
  let validatorAttr = vcsData.attributes.find(item => item.code == "VALIDATOR_NAME")
  let validatorName = validatorAttr ? validatorAttr.values[0].value : ""

  // Parse proponent name
  let proponentAttr = vcsData.attributes.find(item => item.code == "PROPONENT_NAME")
  let proponentName = proponentAttr ? proponentAttr.values[0].value : ""

  // Parse buffer pool credits
  let creditsAttr = vcsData.attributes.find(item => item.code == "TOTAL_BUFFER_POOL_CREDITS")
  let poolCredits = creditsAttr ? creditsAttr.values[0].value : ""

  // Parse credit period
  let periodAttr = vcsData.attributes.find(item => item.code == "CREDIT_PERIOD_INFO")
  let creditPeriod = periodAttr ? periodAttr.values[0].value : ""

  // Parse other docs
  let otherDocs = projectData.documentGroups.find(item => item.code == "VCS_OTHER_DOCUMENTS")

  // Parse KML doc 
  let kmlDoc = otherDocs.documents.find(item => item.documentType == "KML File")
  if (kmlDoc) {
    try {
      // Request KML text
      console.log('Requsting KML doc')
      const response = await fetch(kmlDoc.uri);
      const kmlText = await response.text();

      // Convert KML to GeoJSON
      let kml = new DOMParser().parseFromString(kmlText);
      var geoJSON = toGeoJSON.kml(kml, { styles: false });

      // Remove styling from GeoJSON
      for (const feature of geoJSON.features) {
        feature.properties = {};
        delete feature.id;
      }

      // Include only polygon features
      geoJSON.features = geoJSON.features.filter(feature => feature.geometry.type == "Polygon")

      // Skip assets with empty feature list
      if (geoJSON.features.length == 0) {
        continue;
      }

      // Structure asset data
      let asset = {
        id: projectData.resourceIdentifier,
        name: projectData.resourceName,
        description: projectData.description,
        state: state,
        emissionReductions: emissionReductions,
        categoryName: categoryName,
        acreage: acreage,
        registrationDate: registrationDate,
        projectStatus: projectStatus,
        validatorName: validatorName,
        proponentName: proponentName,
        poolCredits: poolCredits,
        creditPeriod: creditPeriod,
        geoJSON: geoJSON
      }

      // Save asset data as JSON
      let fname = path.join(assetDir, asset.id + '.json');
      let data = JSON.stringify(asset, null, 4);
      fs.writeFileSync(fname, data);

    } catch(e) {
      console.log('Failed to convert KML.')
    }

  } else {
    console.log('No KML found. Skipping asset.')
  }

}