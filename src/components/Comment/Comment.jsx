import React from 'react';
import { Link } from 'react-router-dom';
import { dp } from '../../assets';
import './comment.css';

const Comment = ({ comment, user }) => {
	return (
		<div className='comment'>
			<Link to={`/user/${user?._id}`}>
				<img
					src={user?.profileImage || dp}
					alt={`${user?.name}-dp`}
					className='comment__dp'
				/>
			</Link>
			<div>
				<h3>{user?.name || 'user'}</h3>
				<p>{comment?.comment}</p>
			</div>
		</div>
	);
};

export default Comment;
