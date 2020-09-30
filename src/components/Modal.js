import React, { Component } from 'react';
import Axios from 'axios';


class Modal extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            searchArr: [],
            APIKey: "UTVmOX5KTgYoWwFFdjDBBDvIbovGexTDgITSGWjrC3c",
            selectImg: {
                imgUrl: '',
                altText: '',
                photographer: '',
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.doSearch();
        }, 1500)

    }
    doSearch() {
        Axios({
            url: "https://api.unsplash.com/search/photos/",
            method: "GET",
            dataResponse: "json",
            params: {
                client_id: this.state.APIKey,
                orientation: "landscape",
                per_page: 12,
                query: this.state.searchTerm
            }
        }).then(res => {
            this.setState({
                searchArr: [...res.data.results]
            })
        })
    }

    selectImg = ({ urls, alt_description, user }) => {
        this.setState({
            selectImg: {
                imgUrl: urls.regular,
                altText: alt_description,
                photographer: user.username
            }
        })
    }

    render() {
        return (
            <div className="modalContainer newBtn">
                <form className="modalForm">
                    <label htmlFor="searchText" className="srOnly">Search image</label>
                    <input type="text"
                        id="searchText"
                        value={this.state.searchTerm}
                        name="author"
                        onChange={this.handleChange}
                        placeholder="Search for an image"
                        required />

                    <div className="unsplashImgs">
                        <div className="unsplashInner">
                            {this.state.searchArr.map(el => {
                                return (
                                    <img key={el.id}
                                        src={el.urls.thumb}
                                        alt={el.alt_description}
                                        className="imgThumbs"
                                        onClick={() => this.selectImg(el)}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <div className="selectImg bannerImg">
                        <img src={this.state.selectImg.imgUrl} alt={this.state.selectImg.altText} />
                    </div>

                    <button className="impBtn" onClick={(e) => this.props.handleSelect(e, this.state.selectImg)}>select</button>
                </form>
            </div>
        )
    }
}
export default Modal;