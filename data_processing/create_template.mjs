/*
  Create ForestWatch asset template on CO2.Storage
*/

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

// Template parameters
const template = {
  RegistryName: { type: 'string', mandatory: true },
  RegistryUrl: { type: 'string', mandatory: true },
  Id: { type: 'string', mandatory: true },
  Name: { type: 'string', mandatory: true },
  Description: { type: 'string', mandatory: true },
  State: { type: 'string' },
  EmissionReductions: { type: 'string' },
  CategoryName: { type: 'string'},
  Acreage: { type: 'string' },
  RegistrationDate: { type: 'string' },
  Status: { type: 'string'},
  ValidatorName: { type: 'string' },
  ProponentName: { type: 'string' },
  PoolCredits: { type: 'string' },
  CreditPeriod: { type: 'string' },
  GeoCid: { type: 'string', mandatory: true },
  Url: { type: 'string', mandatory: true },
}
const templateName = 'ForestWatch'
const templateDescription = 'Template for forest-related carbon offset projects which include geospatial data'
const chainName = 'ForestWatch'

// Create template
let addTemplateResponse = await fgStorage.addTemplate(template, templateName, null, templateDescription, null, chainName)

console.log(addTemplateResponse)