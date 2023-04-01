import {
  Box,
  Center,
  Alert,
  AlertIcon,
  VStack
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react';
import LayerOptions from './LayerOptions';

import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-measure/dist/leaflet-measure.css';
import 'leaflet-measure/dist/leaflet-measure.js';
import '../js/leaflet-tilelayer-wmts-src.js'

const Map = ({ projects, selectedId, handleSelect }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const optionsRef = useRef(null);
  const prevLayer = useRef(null);
  const currLayer = useRef(null);
  const groupRef = useRef(null);
  const [layerName, setLayerName] = useState('TRUE-COLOR-S2L2A');
  const [layerTime, setLayerTime] = useState('2023-01-01/2023-12-31')
  const [showAlert, setShowAlert] = useState(false);
  const minZoom = 7;
  const menuOffset = 560

  // Define layer name options
  let layerNames = [
    {label: 'True Color', name: 'TRUE-COLOR-S2L2A' },
    {label: 'False Color', name: 'FALSE-COLOR' },
    {label: 'NDVI', name:  'NDVI'}
  ]

  // Define layer time options
  let layerTimes = [
    {label: '2015', name: '2015-01-01/2015-12-31'},
    {label: '2016', name: '2016-01-01/2016-12-31'},
    {label: '2017', name: '2017-01-01/2017-12-31'},
    {label: '2018', name: '2018-01-01/2018-12-31'},
    {label: '2019', name: '2019-01-01/2019-12-31'},
    {label: '2020', name: '2020-01-01/2020-12-31'},
    {label: '2021', name: '2021-01-01/2021-12-31'},
    {label: '2022', name: '2022-01-01/2022-12-31'},
    {label: '2023', name: '2023-01-01/2023-12-31'},
  ]

  // Center map on map layer with offset
  const centerMap = (layer) => {
    const bounds = layer.getBounds().pad(0.1)
    mapRef.current.fitBounds(bounds, {
      paddingTopLeft: [menuOffset, 0],
      paddingBottomRight: [0, mapContainerRef.current.clientHeight - optionsRef.current.offsetTop]
    });
  }

  // Add selected tile layer and delete previous layer
  const addLayer = () => {

    // Define WMTS layer with selected display options
    const sentinelHubKey = process.env.REACT_APP_SENTINEL_HUB_KEY
    const baseUrl = `https://services.sentinel-hub.com/ogc/wmts/${sentinelHubKey}`
    const wmts = L.tileLayer.wmts(baseUrl, {
      attribution: '<a href="https://www.sentinel-hub.com/">Sentinel</a>',
      layer: layerName,
      tilematrixSet: "PopularWebMercator512",
      format: "image/jpeg",
      maxcc: 20,
      time: layerTime,
      updateWhenIdle: true,
      updateWhenZooming: false
    });

    // Track previous and current layer
    prevLayer.current = currLayer.current;
    currLayer.current = wmts;

    // Add current layer to map
    mapRef.current.addLayer(currLayer.current);

    // Remove prev layer after timeout
    if (prevLayer.current) {
      prevLayer.current.active = false;
      let deleteLayer = prevLayer.current;
      setTimeout(() => {
        deleteLayer.remove();
      }, 5000);
    }
  }

  // Effect ran on initialization 
  useEffect(() => { 

    // Create map - store reference
    const map = L.map(mapContainerRef.current, {
      center: [0, 0],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.5
    });
    mapRef.current = map;

    // Create layer group - store reference
    const featureGroup = L.featureGroup().addTo(map);
    groupRef.current = featureGroup;

    // OpenStreetMap layer
    L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', {
      attribution: '<a href="http:/google.com/maps">Google</a>'
    }).addTo(map);

    // Attribution
    L.control.attribution({
      position: 'topright',
      prefix: '<a href="https://leafletjs.com/">Leaflet</a>'
    }).addTo(map);

    // Zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Leaflet-measure fix for Leaflet >v1.8
    L.Control.Measure.include({
      _setCaptureMarkerIcon: function () {
        this._captureMarker.options.autoPanOnFocus = false;    
        this._captureMarker.setIcon(
          L.divIcon({
            iconSize: this._map.getSize().multiplyBy(2)
          })
        );
      },
    });

    // Measure control
    new L.Control.Measure({
      position: 'topright'
    }).addTo(map);

    // Map zoom callback
    map.on('zoomend', (e) => {
      // Show alert based on zoom level
      var currZoom = map.getZoom();
      //setShowAlert(currZoom < minZoom);
    })
  }, []);

  // Tile layer options change effect
  useEffect(() => {
    //addLayer();
  }, [layerName, layerTime])

  // Effect called each time products are updated
  useEffect(() => {
    if (projects) {

      // Clear layer group
      groupRef.current.clearLayers();

      // Loop through each product
      for (let project of projects) {

          // Create layer from product geoJSON data
          const geoLayer = L.geoJSON(project.GeoJSON, {
            style: {
              fillOpacity: 0.01,
              weight: 2,
              color: 'yellow',
            }
          })
          geoLayer.id = project.Id;
          groupRef.current.addLayer(geoLayer)

          // Set click callback for layer
          geoLayer.on('click', () => handleSelect(project.Id))          
      }

      // Center map on group
      centerMap(groupRef.current)
    }
  }, [projects])

  // Effect called each time selectedId is updated
  useEffect(() => {
    
    if (selectedId) {
      // Fit map to selected layer
      groupRef.current.eachLayer((geoLayer) => {
        if (geoLayer.id == selectedId) {
          centerMap(geoLayer);
        }
      });
    }
  }, [selectedId])

  return (
    <Box 
      w={'100%'}
    >
      <Box
        ref={mapContainerRef}
        height='100vh'
        zIndex={1}
      />
      <Center
        ref={optionsRef}
        position='absolute'
        bottom={'3vh'}
        zIndex={100}
        w={'100%'}
      >
        <VStack
          ml={menuOffset + 'px'}
        >
          {showAlert &&
            <Alert 
              status='warning'
              w={'fit-content'}
              justifyContent={'center'}
            >
              <AlertIcon />
              Zoom in to view satellite imagery
            </Alert>
          } 
          <LayerOptions options={layerNames} setOption={setLayerName} activeOption={layerName} themeColor={'green.500'} />
          <LayerOptions options={layerTimes} setOption={setLayerTime} activeOption={layerTime} themeColor={'green.500'} />
        </VStack>
      </Center>
    </Box>
  );
};

export default Map;