import { useEffect, useRef, useState } from 'react';
import { FGStorage } from '@co2-storage/js-api'
import Map from './Map'
import Menu from './Menu'

function App() {
  const [projects, setProjects] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Set search page size
  const pageSize = 50;

  // Get project details
  const fetchProjectData = async (cid) => {
    
    // Request asset details from IPFS
    const ipfsApi = process.env.REACT_APP_IPFS_API_HOST
    const apiUrl = `${ipfsApi}/api/v0/dag/get?arg=${cid}`
    const apiRes = await fetch(apiUrl, {method: "POST", mode: "cors"});
    const data = await apiRes.json();

    // Convert array of key/value pairs into single object
    const projectData = Object.assign({}, ...data);

    // Request GeoJSON data from IPFS
    const ipfsGateway = process.env.REACT_APP_IPFS_GATEWAY_HOST
    const gatewayUrl = `${ipfsGateway}/ipfs/${projectData.GeoCid}`
    const gatewayRes = await fetch(gatewayUrl);
    const geoJSON = await gatewayRes.json();

    // Update asset data with geojson
    projectData.GeoJSON = geoJSON;

    return projectData;
  }

  // Search projects and collete projec details
  const fetchProjects = async () => {

    // Update loading state
    setIsLoading(true);

    // Search co2.storage for project assets based on template and creator
    const templateCID =  "bafyreifi3kwwrq2av6o7qvzhlq6f5jlbvceyrtjtppgz2u6xxlxmszlfeq"
    const creatorAddress = "0xa401067a067395820ccf50c2370ec3286ac885db"
    const fgApiUrl = "https://co2.storage/"
    const fgStorage = new FGStorage({fgApiHost: fgApiUrl})
    const searchAssetsResponse = await fgStorage.search(null, null, 'asset', null, null, null, null, null, templateCID, null, creatorAddress, null, null, null, page * pageSize, pageSize)
    const searchResults = searchAssetsResponse.result;
    
    // Request details for each result
    console.log(searchResults.length)
    const requests = searchResults.map(result => fetchProjectData(result.content_cid))
    const projects = await Promise.all(requests)

    // Update state
    setTotal(searchResults.length ? searchResults[0].total : 0)
    setProjects(projects)
    setSelectedId(null)
    setIsLoading(false)
  }

  useEffect(() => { 
    fetchProjects();
  }, [page]);

  return (
    <>
      <Menu 
        projects={projects} 
        total={total} 
        page={page} 
        pageSize={pageSize} 
        isLoading={isLoading} 
        handleSelect={setSelectedId} 
        selectedId={selectedId}
        handlePage={setPage}
      />
      <Map 
        projects={projects} 
        selectedId={selectedId}
        handleSelect={setSelectedId} 
      />
    </>
  );
}

export default App;
