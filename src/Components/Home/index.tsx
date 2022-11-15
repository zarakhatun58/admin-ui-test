import React from 'react';
import SearchBar from '../SearchBar';

const Home = () => {
    //Get Current post 
//   const indexOfLastPost=currentPage* postsPerPage;
//   const indexOfLastPost=indexOfLastPost-  postsPerPage;
//   const currentPosts=posts.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <div>
            <SearchBar />
        </div>
    );
};

export default Home;