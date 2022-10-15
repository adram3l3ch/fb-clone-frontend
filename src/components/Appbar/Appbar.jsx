import React, { useState } from "react";
import { dp, closeIcon, searchIcon, hamburger, chatIcon, homeIcon } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, toggleSidebar } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import SearchResults from "../SearchResults/SearchResults";
import { fetchUsersService } from "../../services/userServices";
import { fetchPostsService } from "../../services/postServices";
import "./appbar.css";
import { logout } from "../../features/userSlice";

const Appbar = () => {
	//global states
	const {
		user: { id, profileImage, isGuest },
		modal: { isSidebarVisible },
	} = useSelector(state => state);

	//local states
	const [query, setQuery] = useState("");
	const [searchResult, setSearchResult] = useState({});

	const dispatch = useDispatch();
	const customFetch = useFetch();

	const searchHandler = async e => {
		e.preventDefault();
		if (query.length > 0) {
			dispatch(setIsLoading(true));
			const { posts } = await customFetch(fetchPostsService, { query });
			const { users } = await customFetch(fetchUsersService, { query });
			setSearchResult({ posts, users });
			dispatch(setIsLoading(false));
		}
	};

	const reset = () => {
		setQuery("");
		setSearchResult({});
	};

	const gotoLogin = () => dispatch(logout());

	return (
		<header className={searchResult.posts || searchResult.users ? "appbar topZ" : "appbar"}>
			<div className="hamburger" onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}>
				<img src={isSidebarVisible ? closeIcon : hamburger} alt="hamburger" />
			</div>
			<Link to="/">
				<img src={homeIcon} alt="home" className="home-icon" />
			</Link>
			<form onSubmit={searchHandler} className="searchform">
				<button type="submit" aria-label="search">
					<img src={searchIcon} alt="search" />
				</button>
				<input
					type="text"
					placeholder="Tap to search..."
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
				<button onClick={reset} type="button" aria-label="clear search">
					<img src={closeIcon} alt="close" className="close" />
				</button>
				{(searchResult.posts || searchResult.users) && (
					<SearchResults searchResult={searchResult} reset={reset} />
				)}
			</form>
			<nav className="appbar__profile">
				{isGuest ? (
					<button className="login-btn" onClick={gotoLogin}>
						Login
					</button>
				) : (
					<>
						<Link to={`/user/${id}`}>
							<img
								src={profileImage || dp}
								alt="profileImage"
								className="appbar__profile__dp"
								title="profile"
							/>
						</Link>
						<Link to="/chat">
							<img src={chatIcon} alt="chat" className="chat" />
						</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Appbar;
