import { useEffect, useRef, useState } from 'react';
import { FGStorage } from '@co2-storage/js-api'
import Map from './Map'
import Menu from './Menu'

function App() {
  const [projects, setProjects] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Set search page size
  const pageSize = 50;

  // Get project details
  const fetchProjectData = async (cid) => {
    // Request asset details from IPFS
    let ipfsUrl = "https://ipfs.io/api/v0/dag/get?arg=" + cid
    let res = await fetch(ipfsUrl);
    let data = await res.json();

    // Convert array of key/value pairs into single object
    data = Object.assign({}, ...data);

    // Request GeoJSON data from IPFS
    ipfsUrl = "https://ipfs.io/ipfs/" + data.GeoCid;
    res = await fetch(ipfsUrl);
    const geoJSON = await res.json();

    // Update asset data with geojson
    data.GeoJSON = geoJSON;

    return data;
  }

  // Search projects and collete projec details
  const fetchProjects = async () => {

    // Update loading state
    setIsLoading(true);

    // Search co2.storage for project assets based on template and creator
    const fgApiUrl = "https://co2.storage/"
    const fgStorage = new FGStorage({fgApiHost: fgApiUrl})
    const searchAssetsResponse = await fgStorage.search(null, null, 'asset', null, null, null, null, null, "bafyreifxryghih3tojumjo6jnrugenzwjxlxrq6ud22bclwbw3o6eulmx4", null, "0xa401067a067395820ccf50c2370ec3286ac885db", null, null, null, page * pageSize, pageSize)
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
  }, []);

  return (
    <>
      <Menu projects={projects} total={total} page={page} pageSize={pageSize} isLoading={isLoading} handleSelect={setSelectedId} selectedId={selectedId}/>
      <Map projects={projects} selectedId={selectedId} handleSelect={setSelectedId} />
    </>
  );
}

export default App;
