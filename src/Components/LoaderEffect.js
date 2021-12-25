import React from 'react';
// import Loader from 'react-loader-spinner'
import Spinner from "./Images/loading.gif";


function LoaderEffect() {
    return (
        <div className="content formComponent loaderComponent flex align-items-center justify-content-center">
            <img src={Spinner} className="fp-loader" alt="Loading" />
        </div>
    );
}

export default LoaderEffect;