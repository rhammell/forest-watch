/*
  Add Verra.org project data as assets on CO2.Storage
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FGStorage } from '@co2-storage/js-api'

// Init FG Storage object - Note: ensure .env file is configured
const authType = "pk"
const ipfsNodeType = "client"
const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https"
const fgApiUrl = "https://co2.storage"
const fgStorage = new FGStorage({
    authType: authType, 
    ipfsNodeType: ipfsNodeType, 
    ipfsNodeAddr: ipfsNodeAddr, 
    fgApiHost: fgApiUrl
})

// Initiate IPFS client
await fgStorage.ensureIpfsIsRunning();

// Dir of project asset data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetDir = path.join(__dirname, 'assets')

// Get list of JSON file paths
const fnames = fs.readdirSync(assetDir)
               .filter(fname => fname.endsWith('.json'))
               .map(fname => path.join(assetDir, fname))

console.log(fnames.length)

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Loop through filenames
for (const fname of fnames) {
  //console.log(fname)
  await sleep(6000)

  // Read in JSON data
  const rawdata = fs.readFileSync(fname);
  const asset = JSON.parse(rawdata);

  // Upload geoJSON to IPFS
  const jsonString = JSON.stringify(asset.geoJSON)
  const result = await fgStorage.ipfs.add(jsonString)
  const geoCid = result.path

  // Asset elements
  const assetElements = [
    {"name": "RegistryName", "value": "Verra"},
    {"name": "RegistryUrl", "value": "https://verra.org/"},
    {"name": "Id", "value": asset.id},
    {"name": "Name", "value": asset.name},
    {"name": "Description", "value": asset.description},
    {"name": "State", "value": asset.state},
    {"name": "EmissionReductions", "value": asset.emissionReductions},
    {"name": "CategoryName", "value": asset.categoryName},
    {"name": "Acreage", "value": asset.acreage},
    {"name": "RegistrationDate", "value": asset.registrationDate},
    {"name": "Status", "value": asset.projectStatus},
    {"name": "ValidatorName", "value": asset.validatorName},
    {"name": "ProponentName", "value": asset.proponentName},
    {"name": "PoolCredits", "value": asset.poolCredits.toString()},
    {"name": "CreditPeriod", "value": asset.creditPeriod},
    {"name": "GeoCid", "value": geoCid},
    {"name": "Url", "value": `https://registry.verra.org/app/projectDetail/VCS/${asset.id}`},
  ]

  // Define CO2.Storage parameters
  const templateCID = "bafyreifi3kwwrq2av6o7qvzhlq6f5jlbvceyrtjtppgz2u6xxlxmszlfeq" // ForestWatch template
  const chainName = "ForestWatch" // ForestWach Environment
  const assetName = "Verra Project " + asset.id
  const assetDesc = asset.name

  // Add asset to c02.storage
  const addAssetResponse = await fgStorage.addAsset(
    assetElements,
    {
      parent: null,
      name: assetName,
      description: assetDesc,
      template: templateCID,
      filesUploadStart: () => {console.log("Upload started")},
      filesUpload: async (bytes, p) => {console.log(`${bytes} uploaded`)},
      filesUploadEnd: () => {console.log("Upload finished")},
      createAssetStart: () => {console.log("Creating asset")},
      createAssetEnd: () => {console.log("Asset created")}
    },
    chainName
  )
  console.log("Verra Project: " + asset.id)

}

