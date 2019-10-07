import React from 'react';
import { navLinks } from '../../constants/index';
import { NavLink } from 'react-router-dom';

const RenderNavigationLinks = ({ items }) => {    
       let nav = items.map((item, index) => {
            return(
                <li key={index}>
                    <NavLink to={item.url}>
                        {item.title}
                    </NavLink>
                </li>
            )
        })
        return nav;
}


const renderPerUser = () => {
    let navigationLinks;
    let navigationLinksDOM;
    if(localStorage.getItem("album_access_token")) {
        navigationLinks = navLinks().currentUser
        navigationLinksDOM = <RenderNavigationLinks items={navigationLinks} />
    } else {
        navigationLinks = navLinks().guestUser;
        navigationLinksDOM = <RenderNavigationLinks items={navigationLinks} />
    }
    return navigationLinksDOM;
}

const Header = () => {
    return (
        <header 
      className="App-header"
      >
          <div className="navigationLinks">
          <ul>
                {renderPerUser()}
          </ul>
          </div>
      </header>
    )
}

export default Header;