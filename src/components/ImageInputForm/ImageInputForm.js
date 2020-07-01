import React from 'react';
import './ImageInputForm.css';

// destructure instead of putting {props} then calling props.onInputChange
const ImageInputForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f4'>
				{'This magic app will detect faces in your pictures. Enter an image url to try!'}
			</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5'>
					<input 
					onChange={onInputChange}
					className='f4 pa2 w-70' type='text' />
					<button 
					onClick={onButtonSubmit}
					className='f4 pa2 w-30 grow link ph3 dib white bg-light-purple'
					>Detect!</button>
				</div>
			</div>
		</div>
	)
}

export default ImageInputForm;



// 72544c4221bd4b4fa43737e8d84bb367