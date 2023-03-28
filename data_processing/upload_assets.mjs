/*
  Add Verra.org project data as assets on c02.storage
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FGStorage } from '@co2-storage/js-api'
import * as dotenv from 'dotenv' 
dotenv.config()

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
  //console.log(asset.id)

  // Asset elements
  const assetElements = [
    {"name": "Id", "value": asset.id},
    {"name": "Name", "value": asset.name},
    {"name": "Description", "value": asset.description},
    {"name": "State", "value": asset.state},
    {"name": "EmissionReductions", "value": asset.emissionReductions},
    {"name": "CategoryName", "value": asset.categoryName},
    {"name": "Acreage", "value": asset.acreage},
    {"name": "RegistrationDate", "value": asset.registrationDate},
    {"name": "ProjectStatus", "value": asset.projectStatus},
    {"name": "ValidatorName", "value": asset.validatorName},
    {"name": "ProponentName", "value": asset.proponentName},
    {"name": "PoolCredits", "value": asset.poolCredits.toString()},
    {"name": "CreditPeriod", "value": asset.creditPeriod},
    {"name": "GeoCid", "value": geoCid}
  ]

  // Add asset to c02.storage
  const addAssetResponse = await fgStorage.addAsset(
    assetElements,
    {
      parent: null,
      name: "Verra Project: " + asset.id,
      description: asset.name,
      template: "bafyreifxryghih3tojumjo6jnrugenzwjxlxrq6ud22bclwbw3o6eulmx4",
      filesUploadStart: () => {console.log("Upload started")},
      filesUpload: async (bytes, p) => {console.log(`${bytes} uploaded`)},
      filesUploadEnd: () => {console.log("Upload finished")},
      createAssetStart: () => {console.log("Creating asset")},
      createAssetEnd: () => {console.log("Asset created")}
    },
    'sandbox'
  )

  console.log("Verra Project: " + asset.id)

}

