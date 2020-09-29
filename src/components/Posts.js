import React from 'react';
import HeartCounter from './HeartCounter';

const Post = ({ header, description, songList, id }) => {
    return (
        <div className="block postContainer">
            <div className="postHeader">
                <h2>{header.title}</h2>
                <HeartCounter id={id} count={header.hearts} />
            </div>
            <span className="postInfo">by {header.author} on {header.publishInfo}</span>
            <p>{description}</p>
            <ul>
                {songList.map((el, index) => {
                    const urlString = "https://bandcamp.com/EmbeddedPlayer/album=" + el.embedId + "/size=small/bgcol=f5f1ea/linkcol=0687f5/transparent=true/";

                    return (
                        <li className="songInfo" key={index}>
                            <iframe style={{ border: "0", width: "100%", height: "42px" }} src={urlString} title={el.credit} seamless>
                                <a href={el.embedLink}>{el.credit}</a>
                            </iframe>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Post;

