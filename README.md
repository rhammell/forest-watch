# Forest-Watch
Forest-watch is a web app that allows users to monitor forest-related carbon offset projects using satellite imagery.

The app displays the details and geographic outlines of various afforestation, reforestation, and revegetation projects within a map interface. Users can overlay historical satellite imagery on the map to inspect how the land-cover has changed through time, and verify that a project's stated goals are being accomplished.

Project data used by the app are stored is assets on co2.storage and conform to a ForestWatch template. This repository includes scripts for building this template, gathering project data from Verra.org, and uploading the data to co2.storage. 

## Setup
Node.js is required to run this application. 

Begin by cloning this repository and installing the required Node packages: 

```bash
# Clone this repository
git clone https://github.com/rhammell/forest-watch.git

# Navigate into the repository
cd forest-watch

# Install required node packages
npm install
```

## Configuration

Developer specific settings are required for interacting with co2.storage, IPFS, and imagery providers. These settings must be defined as environment variables within an `.env` file in the root directory.

Copy the included `.env.example` template file as `.env`: 

```bash
# Copy the environment variables template
cp .env.example .env
```

Update the `.env` file by replacing the default variable values with your unique developer values. The required variables are described below: 

| Variable                          | Description                                                                       |
|-----------------------------------|-----------------------------------------------------------------------------------|
| ESTUARY_API_KEY            | Estuary API Key. Available within [co2.storage](https://co2.storage/) account.           |
| FG_TOKEN                   | Filecoin Green API Key. Available within [co2.storage](https://co2.storage/) account.    |
| INFURA_API_KEY             | Infura API Key. Available within [Infura](https://www.infura.io/) account.                |
| PK                         | Private wallet key. Exportable from wallet application.                                  |
| REACT_APP_SENTINEL_HUB_KEY | Sentinel Hub Key. Available within [Sentinel Hub](https://www.sentinel-hub.com/) account.|