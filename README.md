# Forest-Watch
ForestWatch is a web app that allows users to monitor forest-related carbon offset projects using satellite imagery.

The app displays the details and geographic boundaries of various afforestation and reforestation projects within a map interface. Historical satellite imagery can be overlaid on the map to explore land-cover changes through time.

Users are able to verify whether a project's offset goals are being acheived by easily observing any changes to tree coverage occurring within a project's boundaries.

Project data is stored on [CO2.Storage](https://co2.storage/) as assets which follow a "ForestWatch" template.

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

The app interface is comprised of two main components: a project menu and map.

The menu lists project data obtained from CO2.Storage. The app queries CO2.Storage for assets created with the ForestWatch template, which includes project details such as name, description, registry, and area.

The map displays geographic boundary polygons for each of the listed projects. Users can pan, zoom, and measure acreage using the map tools.

<div align="center">
  <div>
      <img src="img/interface.png" width="700">
  </div>
  <p>
    <i>ForestWatch UI</i>
  </p>
</div>

Buttons along the map bottom enable users to select the date and product type of satellite imagery to display. 

True Color, False Color, and NDVI imagery products each provide a unique visualization of land-cover that highlights vegetation, making forest monitoring easier.

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

Project's can be explored by either clicking a menu item or clicking a map polygon. Both actions will scroll the menu list to the selected project's details, and center the map on the project's boundary. 

Once selected, users can read the project's description to help determine the goals of the carbon offset project - either reforresation or afforesation efforts. The imagery controls can then be used to view satellite imagery of the project's area throughout many years, and observe if the tree coverage has changed in that time, according to the project's goals. 

## Data Processing