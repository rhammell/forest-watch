/*
  Create Verra.org project asset template on c02.storage
*/

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

// Template parameters
const template = {
  Id: { type: 'string', mandatory: true },
  Name: { type: 'string', mandatory: true },
  Description: { type: 'string', mandatory: true },
  State: { type: 'string' },
  EmissionReductions: { type: 'string' },
  CategoryName: { type: 'string'},
  Acreage: { type: 'string' },
  RegistrationDate: { type: 'string' },
  ProjectStatus: { type: 'string'},
  ValidatorName: { type: 'string' },
  ProponentName: { type: 'string' },
  PoolCredits: { type: 'string' },
  CreditPeriod: { type: 'string' },
  GeoCid: { type: 'string', mandatory: true }
}
const templateName = 'Verra Project'
const templateDescription = 'Verra project details'
const chainName = 'sandbox'

// Create template
let addTemplateResponse = await fgStorage.addTemplate(template, templateName, null, templateDescription, null, chainName)

console.log(addTemplateResponse)