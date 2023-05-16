import React from "react";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
            <a className="navbar-brand mb-0 h1 justify-content-center" href="/">Jefi Wash</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto">
                        <a className="nav-link" href="/packages">Packages</a>
                        <a className="nav-link" href="/about">About Us</a>
                </div>
            </div>
        </nav>
        )
    };

export default NavBar
