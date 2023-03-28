# Forest-Watch
ForestWatch is a web app that allows users to monitor forest-related carbon offset projects using satellite imagery.

The app displays the details and geographic boundaries of various afforestation and reforestation projects within a map interface. Historical satellite imagery can be overlaid on the map to explore land-cover changes through time.

Users are able to verify whether a project's offset goals are being achieved by easily observing any changes to tree coverage happening within a project's boundaries.

Project data is stored on [CO2.Storage](https://co2.storage/) as assets which follow a "ForestWatch" template. This repository includes scripts for building this template, gathering project data from Verra.org, and uploading the data to CO2.Storage. 

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

Developer specific settings are required for interacting with CO2.Storage, IPFS, and imagery providers. These settings must be defined as environment variables within an `.env` file in the root directory.

Copy the included `.env.example` template file as `.env`: 

```bash
# Copy the environment variables template
cp .env.example .env
```

Update the `.env` file by replacing the default variable values with your unique developer values. The required variables are described below: 

| Variable                   | Description                                                                              |
|----------------------------|------------------------------------------------------------------------------------------|
| ESTUARY_API_KEY            | Estuary API Key. Available within [CO2.Storage](https://co2.storage/).                   |
| FG_TOKEN                   | Filecoin Green API Key. Available with [CO2.Storage](https://co2.storage/).              |
| INFURA_API_KEY             | Infura API Key. Available with [Infura](https://www.infura.io/).                         |
| PK                         | Private wallet key. Exportable from wallet application.                                  |
| REACT_APP_SENTINEL_HUB_KEY | Sentinel Hub Key. Available with [Sentinel Hub](https://www.sentinel-hub.com/).          |

## Web App
Start a local development server to launch the app:

```bash
# Start development server
npm start
```

Open a browser and navigate to `http://localhost:3002/` to view the web interface.

## Usage

The app interface is comprised of two main components, a project menu and map.

The menu lists project data obtained from CO2.storage. When the app loads, it queries CO2.Storage for project assets created with the ForestWatch template. Details such as name, description, registry, and project hectares are included for each project. 

The map displays all the geographic boundary polygons for the listed projects. It includes controls for panning, zooming, measuring acreage, and controlling satellite image layers. 

<div align="center">
  <div>
      <img src="img/interface.png" width="700">
  </div>
  <p>
    <i>ForestWatch User Interface</i>
  </p>

</div>


Projects can be explored by either clicking a menu item or map polygon. This will scoll the menu to highlight selected project's details, and center the map on the corresponding boundary polygon.

Buttons along the bottom of the map allow user to choose the date range and format of satellite imagery to display. True Color, False Color, and NDVI imagery formats each provide a unique way to visualize the land-cover encompassed by a project's outline. 

<div align="center">
  <div>
  <img src="img/true-color2.png" width="270px">
  <img src="img/false-color2.png" width="270px">
  <img src="img/ndvi2.png" width="270px">
  </div>
  <p>
    <i>True Color, False Color, and NDVI imagery examples</i>
  </p>
</div>

With 

## Data Processing