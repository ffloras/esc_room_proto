import { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoad(false);
    }, 400);
    return () => clearTimeout(loadTimer);
  }, [])

  
  return (
    <div className="loading-screen" style={{
        
        display: load ? "block" : "none",
      }}></div>
  )
}

export default LoadingScreen