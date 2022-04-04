import React, { useState } from 'react';
import { useEffect } from 'react';
import { optionsIcon } from '../../assets';
import './options.css';

const Options = ({ deleteHandler }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	const handleOutsideClick = e => {
		if (
			!e.target.classList.contains('options') &&
			!e.target.classList.contains('options__icon')
		) {
			setIsOptionsVisible(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
		return () => document.body.removeEventListener('click', handleOutsideClick);
	});
	return (
		<div className='options' onClick={() => setIsOptionsVisible(val => !val)}>
			<img src={optionsIcon} alt='options' className='options__icon' />
			<ul className={isOptionsVisible ? 'show' : ''}>
				<li
					onClick={() => {
						setIsOptionsVisible(false);
						deleteHandler();
					}}
				>
					Delete
				</li>
			</ul>
		</div>
	);
};

export default Options;
