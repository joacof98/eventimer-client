import React, {useState, useContext} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/auth';

function Menubar(){
	const {user, logout} = useContext(AuthContext);

	const pathname = window.location.pathname;
  	const path = pathname === '/' ? "home" : pathname.substr(1);
 	const [activeItem,setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const menuBar = user ? (
		<Menu pointing secondary size="massive" color="blue">
	      <Menu.Item
	        name={user.username}
	        active={true}
	        onClick={handleItemClick}
	      />

	      <Menu.Menu position='right'>

	        <Menu.Item
	          name='Salir'
	          active={false}
	          onClick={logout}
	          as={Link}
	          to="/"
	        />
	      </Menu.Menu>
	    </Menu>

	) : (
		<Menu pointing secondary size="massive" color="blue">
	      <Menu.Item
	        name='home'
	        active={activeItem === 'home'}
	        onClick={handleItemClick}
	        as={Link}
	        to="/"
	      />

	      <Menu.Menu position='right'>

	        <Menu.Item
	          name='entrar'
	          active={activeItem === 'entrar'}
	          onClick={handleItemClick}
	          as={Link}
	          to="/entrar"
	        />
	        <Menu.Item
	          name='registrate'
	          active={activeItem === 'registrate'}
	          onClick={handleItemClick}
	          as={Link}
	          to="/registrate"
	        />
	      </Menu.Menu>
	    </Menu>

	);

	return menuBar;
}

export default Menubar;