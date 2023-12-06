
import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import SearchClient from '../api/searchClient';
import PagedData from '../data/pagedData';
import SearchHistoryData from '../data/search/searchHistoryData';
import Table from 'react-bootstrap/Table';
import Paginator from '../components/Paginator';

const SearchHistory = () => {
	const { token, isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchHistory, setSearchHistory] = useState(new PagedData());
	const [pageCount, setPageCount] = useState(0);
	const [itemCount, setItemCount] = useState(10);

	let handleResponse = (response) => {
		if (!response.ok) {
			throw new Error('Error getting search history');
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await SearchClient.searchHistory(
					token,
					'?page=' + pageCount + 
					'&pageSize=' + itemCount
				);
				handleResponse(response);
				const data = await response.json();
				console.log('data: ', data);
				setSearchHistory(PagedData.fromJson(data, SearchHistoryData.fromJson));
				setLoading(false);
				return data;
			} catch (error) {
				setLoading(false);
				console.error(error);
			}
		};
	fetchData();
	}, [token, pageCount, itemCount]);

	function MapSearchHistory() {
		if (!Array.isArray(searchHistory.items)) {
			return;
		}
		return searchHistory.items.map((item) => (
			<tr key={item.timestamp}>
				<td>{item.searchType}</td>
				<td>{item.query}</td>
				<td>{item.timestamp}</td>
			</tr>
		));
	}

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
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Search Type</th>
							<th>Query</th>
							<th>Timestamp</th>
						</tr>
					</thead>
					<tbody>
						<MapSearchHistory />
					</tbody>
				</Table>
				<Paginator pageCount={pageCount} setPageCount={setPageCount} itemCount={itemCount} setItemCount={setItemCount}/>
			</div>
		);
	}
};

export default SearchHistory;