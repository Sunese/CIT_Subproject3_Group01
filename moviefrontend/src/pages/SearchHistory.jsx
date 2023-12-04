
import React from 'react';

import { useAuth } from '../utils/AuthContext';

const SearchHistory = () => {
	const { isAuthenticated } = useAuth();
	
	if (!isAuthenticated) {
		return (
			<div>
				<h1>Search History</h1>
				<p>Please sign in to view your search history</p>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Search History</h1>
				{/* TODO: Render the user's search history data */}
			</div>
		);
	}
};

export default SearchHistory;
