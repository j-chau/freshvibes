import React, { Component } from 'react';
import Axios from 'axios';


class Modal extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            searchArr: [],
            APIKey: "UTVmOX5KTgYoWwFFdjDBBDvIbovGexTDgITSGWjrC3c"
        }
    }

    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.doSearch();
        }, 2000)

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

    render() {
        return (
            <div className="modalContainer newBtn">
                <form>
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
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <div className="selectImg bannerImg"></div>

                    <button className="impBtn">select</button>
                </form>
            </div>
        )
    }
}
export default Modal;