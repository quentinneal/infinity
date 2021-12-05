/* React */
import React, {useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* Styles */
import './App.scss';

/* Components */
import Header from './components/header/header.component';
import Content from './components/content/content.component';

function App() {

  /* States */
  const [query, setQuery] = useState(sessionStorage.getItem('query') === null ? '' : sessionStorage.getItem('query')); // Search query state. Collect sessionStorage if not empty
  const [page, setPage] = useState(1); // API page number
  const [loading, setLoading] = useState(true); // API loading state
  const [error, setError] = useState(false); // API catch error state
  const [nasaData, setNasaData] = useState([]); // NASA image and video library API data state
  const [dataExists, setDataExists] = useState(false); // Existence of API data state

  /* References for intersection observer target (for infinite scroll) and search query */
  const intersectionRef = useRef(null);
  const queryRef = useRef(null);
  
  /* API request and modification */
  useEffect(() => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}`);
        const primaryData = await res.json();
        const modData = primaryData.collection.items.map((item) =>  ({ ...item, readMore: false})); // Loop through each item in array and add readMore property
        setNasaData((prev) => [...prev, ...modData]);
        setDataExists(modData.length > 0); // Checks to see if any data exists for current API call
        setLoading(false);
      } catch(error) {
          setError(true);
      }
    })();
  }, [query, page])

  /* Intersection observer callback */
  const intersectionCallback = useCallback((entries) => { // Memoizes function and will only change when dataExist changes
    const [entry] = entries; // Extracts entry related to intersection target
    if (entry.isIntersecting && dataExists) {  // If entry is intersecting, increase page by one. Ensures that pages don't increase indefinitely if API renders with no data
      setPage(prevPage => prevPage + 1);
    }
  }, [dataExists]);

  /* Intersection observer options */
  const options = useMemo(() => { // Memoises object to prevent unnecessary rendering (object will not change)
    return {
      root: null,
      rootMargin: '1000px',
      threshold: 0
    }
  }, [])

  /* Intersection observer */
  useEffect(() => {
    if (loading) return // Prevents accidental trigger of intersection target
    const observer = new IntersectionObserver(intersectionCallback, options);
    const currentTarget = intersectionRef.current;
    if(currentTarget) observer.observe(currentTarget); // If intersection target exists, watch for intersection

    return () => { // Clean up function for observer
      if(currentTarget) observer.unobserve(currentTarget);
    }
  }, [loading, options, intersectionCallback])

  /* Query sessionStorage */
  useEffect(() => {sessionStorage.setItem('query', query);}, [query]); // Sets query value to sessionStorage object

  /* Logo click function */
  const handleLogoClick = () => {
    if (query !== '') {
      setNasaData([]);
      setPage(1);
      setQuery('');
    }
  }

  /* Search query function */
  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value !== query) {
      window.scrollTo(0, 0);
      queryRef.current.blur(); // Unfocus (for exiting mobile keyboard)
      setNasaData([]);
      setPage(1);
      setQuery(e.target.value);
    }
  }

  /* Read more function */
  const handleReadMore = (i, readMore) => {
    const modNasaData = [...nasaData]; // Copy state to avoid mutation
    modNasaData[i] = { // destructure contents of list item and set readMore as opposite of its current boolean value.
        ...modNasaData[i], readMore: !readMore
      }
      setNasaData(modNasaData) // Set modified array as state.
  };
  
  return (
    <div className='App'>
      <Header queryRef={queryRef} handleLogoClick={handleLogoClick} handleSearch={handleSearch} query={query} />
      <Content nasaData={nasaData} handleReadMore={handleReadMore} intersectionRef={intersectionRef}/>
    </div>
  );
}

export default App;