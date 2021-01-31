import React, { useEffect } from 'react';
import './PageNotFound.scss';

function PageNotFound() {

  useEffect(() => {
    document.title = `Han-DIY | Page not found`;
  }, []);
  
  return (
    <h1 className="page-title container">
      Requested content does not exist.
    </h1>
  )
}

export default PageNotFound
