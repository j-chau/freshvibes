import React, { Component } from 'react';
import Axios from 'axios';

// TODO: add tabindex to img selection from unsplash
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

    // code to show / hide elements from assistive tech from here: https://codepen.io/noahblon/pen/yJpXka

    componentDidMount() {
        const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
        const main = document.querySelector('body');
        const modal = document.querySelector('.modalContainer');
        const focusInMain = main.querySelectorAll(FOCUSABLE_SELECTORS);
        const focusInModal = modal.querySelectorAll(FOCUSABLE_SELECTORS);

        focusInMain.forEach(el => el.setAttribute('tabindex', '-1'));
        focusInModal.forEach(el => el.removeAttribute('tabindex'));

        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
        const main = document.querySelector('body');
        const focusInMain = main.querySelectorAll(FOCUSABLE_SELECTORS);

        focusInMain.forEach(el => el.setAttribute('tabindex', '0'));

        document.body.style.overflow = "unset";
    }

    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.doSearch();
        }, 1000)

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
            <div className="modalContainer newBtn form">
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
                <div>
                    <button onClick={this.props.closeModal} className="delBtn">close</button>
                    <button className="impBtn" onClick={(e) => this.props.handleSelect(e, this.state.selectImg)}>select</button>
                </div>
            </div>
        )
    }
}
export default Modal;