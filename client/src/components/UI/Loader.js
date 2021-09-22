import React from 'react'

function Loader() {
    return (
        <div className="preloader-wrapper big active" style={{display: "block", marginTop: "50", marginLeft: "auto", marginRight: "auto"}}>
            <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
        </div>
    )
}

export default Loader
