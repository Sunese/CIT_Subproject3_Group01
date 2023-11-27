import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import BookmarkClient from '../api/bookmarkClient';

const UserBookmarks = () => {
    const { isAuthenticated, token, username } = useAuth();
    const [error, setError] = useState(null);
    const [loadingTitleBookmarks, setLoadingTitleBookmarks] = useState(true);
    const [titleBookmarks, setTitleBookmarks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated) {
                setLoadingTitleBookmarks(false);
                return;
            }
            try {
                console.log('Fetching bookmarks for: ', username);
                const bookmarkClient = new BookmarkClient();
                const pagedTitleBookmarks = await bookmarkClient.getTitleBookmarks(token, username);
                console.log('pagedTitleBookmarks: ', pagedTitleBookmarks)
                setTitleBookmarks(pagedTitleBookmarks.items);
                setLoadingTitleBookmarks(false);
            } catch (error) {
                setLoadingTitleBookmarks(false);
                setError(error.message);
                console.error('error: ', error);
            }
        }
        fetchData();
    }, [isAuthenticated, token, username]);

    if (loadingTitleBookmarks) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }

    if (!isAuthenticated) {
        return <h1 style={{color: 'red'}}>You must be logged in to view this page.</h1>
    }

    return (
        <>
        <h2>Bookmarks</h2>
        <ul>
            {titleBookmarks.map((bookmark) => {
                return <li key={bookmark.titleID}>{bookmark.primaryTitle} <br/> {bookmark.notes} </li>
            })}
        </ul>
        </>
    );
}

export default UserBookmarks;