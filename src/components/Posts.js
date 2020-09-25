import React from 'react';

const Post = ({ header, description, songList }) => {
    return (
        <div className="postContainer">
            <h2>{header.title}</h2>
            <span>by {header.author} on {header.publishInfo}</span>
            <p>{description}</p>
            <ul>
                {songList.map((el, index) => {
                    return (
                        <li key={index}><a href={el.url}>{el.title}</a></li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Post;

