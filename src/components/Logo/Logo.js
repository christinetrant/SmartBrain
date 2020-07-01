import React from 'react';
import Tilt from 'react-tilt';
import faceid from './faceid.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className='Tilt br3 shadow-2' options={{ max : 55 }} style={{ height: 100, width: 100 }} >
				<div className="Tilt-inner">
					<img src={faceid} alt='Face ID Logo' />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;