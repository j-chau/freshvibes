import React from 'react';

const Post = ({ header, description, songList }) => {
    return (
        <div className="block postContainer">
            <h2>{header.title}</h2>
            <span className="postInfo">by {header.author} on {header.publishInfo}</span>
            <p>{description}</p>
            <ul>
                {songList.map((el, index) => {
                    const songUrl = el.embedSong;
                    const albumIdStart = songUrl.indexOf("album") + "album".length + 1;
                    const albumIdEnd = songUrl.indexOf("/", albumIdStart);
                    const albumId = songUrl.slice(albumIdStart, albumIdEnd);
                    // console.log(albumId);

                    const urlString = "https://bandcamp.com/EmbeddedPlayer/album=" + albumId + "/size=small/bgcol=f5f1ea/linkcol=0687f5/transparent=true/";
                    const artistCredit = `${el.title} by ${el.artist}`;

                    return (
                        <li className="songInfo" key={index}>
                            <iframe style={{ border: "0", width: "100%", height: "42px" }} src={urlString} title={artistCredit} seamless>
                                <a href={el.embedSong}>{artistCredit}</a>
                            </iframe>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Post;

