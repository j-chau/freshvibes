(this.webpackJsonpfreshvibes=this.webpackJsonpfreshvibes||[]).push([[0],{26:function(e,t,a){e.exports=a(53)},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(24),o=a.n(s),l=(a(31),a(2)),i=a(3),c=a(5),u=a(4),m=(a(32),a(33),a(10)),h=a.n(m);a(35);h.a.initializeApp({apiKey:"AIzaSyCcjQZCdsuQzcdA9Zk1-xvJ43qLM3Nl4ho",authDomain:"fresh-vibes.firebaseapp.com",databaseURL:"https://fresh-vibes.firebaseio.com",projectId:"fresh-vibes",storageBucket:"fresh-vibes.appspot.com",messagingSenderId:"772541813549",appId:"1:772541813549:web:ae9aa0c6ce4b542ffd39a4"});var d=h.a,p=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).handleClick=function(t){var a=JSON.parse(window.localStorage.getItem("heartsLog"));null===a&&(window.localStorage.setItem("heartsLog","{}"),a={}),a[t]||(e.setState((function(e){return{hearts:e.hearts+1,oldHeart:!0}}),(function(){d.database().ref(t+"/header").update({hearts:e.state.hearts})})),a[t]=!0,window.localStorage.setItem("heartsLog",JSON.stringify(a)))},e.state={hearts:0,oldHeart:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(window.localStorage.getItem("heartsLog"));null!==e&&e[this.props.id]&&this.setState({oldHeart:!0}),this.setState({hearts:this.props.count})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"heartContainer"},r.a.createElement("p",{className:"counterDisplay","aria-hidden":"true"},this.state.hearts),r.a.createElement("span",{className:"srOnly"},this.state.hearts+" likes"),r.a.createElement("i",{className:"fas fa-heart"+(this.state.oldHeart?" oldHeart":""),onClick:function(){return e.handleClick(e.props.id)},tabIndex:0,"aria-label":"like this post"}))}}]),a}(n.Component),b=function(e){var t=e.header,a=e.description,n=e.songList,s=e.banner,o=e.id;return r.a.createElement("div",{className:"block postContainer"},r.a.createElement("div",{className:"postHeader"},r.a.createElement("h2",null,t.title),r.a.createElement(p,{id:o,count:t.hearts})),r.a.createElement("span",{className:"postInfo"},"by ",t.author," on ",t.publishInfo),r.a.createElement("div",{className:"bannerImg"},r.a.createElement("img",{src:s.imgUrl,alt:s.altText})),r.a.createElement("p",{className:"imgCredit"},"Photo by ",r.a.createElement("a",{href:"https://unsplash.com/@"+s.photographer+"?utm_source=fresh_vibes&utm_medium=referral",target:"_blank",rel:"noopener noreferrer"},s.photographer),"\xa0on ",r.a.createElement("a",{href:"https://unsplash.com/?utm_source=fresh_vibes&utm_medium=referral",target:"_blank",rel:"noopener noreferrer"},"Unsplash")),r.a.createElement("p",null,a),r.a.createElement("ul",null,n.map((function(e,t){var a="https://bandcamp.com/EmbeddedPlayer/album="+e.embedId+"/size=small/bgcol=f5f1ea/linkcol=0687f5/transparent=true/";return r.a.createElement("li",{className:"songInfo",key:t},r.a.createElement("iframe",{src:a,title:e.credit,seamless:!0},r.a.createElement("a",{href:e.embedLink},e.credit)))}))))},g=a(8),f=a(6),v=a(25),E=a.n(v),I=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).handleChange=function(t){e.setState({searchTerm:t.target.value}),clearTimeout(e.timer),e.timer=setTimeout((function(){e.doSearch()}),1e3)},e.selectImg=function(t){var a=t.urls,n=t.alt_description,r=t.user;e.setState({selectImg:{imgUrl:a.regular,altText:n,photographer:r.username}})},e.state={searchTerm:"",searchArr:[],APIKey:"UTVmOX5KTgYoWwFFdjDBBDvIbovGexTDgITSGWjrC3c",selectImg:{imgUrl:"",altText:"",photographer:""}},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",t=document.querySelector("body"),a=document.querySelector(".modalContainer"),n=t.querySelectorAll(e),r=a.querySelectorAll(e);n.forEach((function(e){return e.setAttribute("tabindex","-1")})),r.forEach((function(e){return e.removeAttribute("tabindex")})),document.body.style.overflow="hidden"}},{key:"componentWillUnmount",value:function(){document.querySelector("body").querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").forEach((function(e){return e.setAttribute("tabindex","0")})),document.body.style.overflow="unset"}},{key:"doSearch",value:function(){var e=this;E()({url:"https://api.unsplash.com/search/photos/",method:"GET",dataResponse:"json",params:{client_id:this.state.APIKey,orientation:"landscape",per_page:12,query:this.state.searchTerm}}).then((function(t){e.setState({searchArr:Object(g.a)(t.data.results)})}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"modalContainer newBtn form"},r.a.createElement("label",{htmlFor:"searchText",className:"srOnly"},"Search image"),r.a.createElement("input",{type:"text",id:"searchText",value:this.state.searchTerm,name:"author",onChange:this.handleChange,placeholder:"Search for an image",required:!0}),r.a.createElement("div",{className:"unsplashImgs"},r.a.createElement("div",{className:"unsplashInner"},this.state.searchArr.map((function(t){return r.a.createElement("img",{key:t.id,src:t.urls.thumb,alt:t.alt_description,className:"imgThumbs",onClick:function(){return e.selectImg(t)},tabIndex:0})})))),r.a.createElement("div",{className:"selectImg bannerImg"},r.a.createElement("img",{src:this.state.selectImg.imgUrl,alt:this.state.selectImg.altText})),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.props.closeModal,className:"delBtn"},"close"),r.a.createElement("button",{className:"impBtn",onClick:function(t){return e.props.handleSelect(t,e.state.selectImg)}},"select")))}}]),a}(n.Component),S=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).addSongs=function(){for(var t=e.state.userInput.songList,a=[],n=0;n<t.length;n++)a.push(r.a.createElement("li",{key:n},r.a.createElement("label",{className:"srOnly",htmlFor:"inputEmbed"+n},"Song Embed Code"),r.a.createElement("input",{type:"text",id:"inputEmbed"+n,value:t[n],name:"songList",onChange:e.handleChange,placeholder:"Song Embed Code",className:"songInput",required:!0})));return a},e.addImg=function(t,a){t.preventDefault();var n=Object(f.a)({},e.state.userInput);n.banner=Object(f.a)({},a),e.setState({userInput:n,showImg:!1})},e.closeModal=function(){return e.setState({showImg:!1})},e.handleChange=function(t){var a=Object(f.a)({},e.state.userInput),n=t.target,r=n.name,s=n.value,o=n.id.slice(-1);"songList"===r?a.songList[o]=s:a[r]=s,e.setState({userInput:a})},e.handleAdd=function(t){if(t.preventDefault(),e.state.numSongs<3){var a=Object(g.a)(e.state.userInput.songList);a.push("");var n=e.state.numSongs+1;e.setState((function(e){return{numSongs:n,userInput:Object(f.a)(Object(f.a)({},e.userInput),{},{songList:a})}}),(function(){return e.addSongs()}))}},e.handleSubmit=function(t){var a="";t.preventDefault();var n=Object.values(Object(f.a)({},e.state.userInput));5!==n.filter((function(e){var t=e;return void 0===e.length&&(t=Object.values(e)),t.length>0})).length?a="all fields are required":n[3].forEach((function(e){e.indexOf("bandcamp.com/EmbeddedPlayer")<0&&e.length>0&&(a="please use the embed code from bandcamp")})),0===a.length?e.props.handleSubmit(e.state.userInput):e.setState({error:{isError:!0,errorMsg:a}})},e.state={numSongs:1,showImg:!1,userInput:{title:"",author:"",descript:"",songList:[""],banner:{imgUrl:""}},error:{isError:!1,errorMsg:""}},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=this.state.userInput,a=t.title,n=t.author,s=t.descript,o=t.banner,l=!(this.state.numSongs<3);return r.a.createElement(r.a.Fragment,null,this.state.showImg&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"modalBg"}),r.a.createElement(I,{handleSelect:this.addImg,closeModal:this.closeModal})),r.a.createElement("form",{className:"block newBtn form"},r.a.createElement("label",{className:"srOnly",htmlFor:"inputTitle"},"Post Title"),r.a.createElement("input",{type:"text",id:"postTitle",value:a,name:"title",onChange:this.handleChange,placeholder:"Post Title",required:!0}),r.a.createElement("label",{className:"srOnly",htmlFor:"inputAuthor"},"Your Name"),r.a.createElement("input",{type:"text",id:"inputAuthor",value:n,name:"author",onChange:this.handleChange,placeholder:"Author Name",required:!0}),r.a.createElement("div",{className:"bannerImg"+(o.imgUrl.length<1?" noImg":""),onClick:function(){return e.setState({showImg:!0})},tabIndex:0},o.imgUrl.length>1?r.a.createElement("img",{src:o.imgUrl,alt:o.altText}):r.a.createElement("p",null,"Click to select an image")),r.a.createElement("label",{className:"srOnly",htmlFor:"inputDescrip"},"Description"),r.a.createElement("textarea",{rows:"7",maxLength:"500",id:"inputDescrip",value:s,name:"descript",onChange:this.handleChange,placeholder:"add a description about your song or album selection. let others konw what kind of mood to expect.",required:!0}),r.a.createElement("ul",null,this.addSongs()),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.handleAdd,className:"impBtn addSongBtn",disabled:l,"aria-disabled":l},"add new song")),r.a.createElement("div",{className:"btnContainer"},r.a.createElement("button",{onClick:this.props.closeForm,className:"delBtn"},"delete"),r.a.createElement("button",{type:"submit",onClick:this.handleSubmit,className:"impBtn"},"post"),r.a.createElement("p",{className:"errMsg"+(this.state.error.isError?" show":"")},this.state.error.errorMsg))))}}]),a}(n.Component),y=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).savePost=function(t){for(var a=t.title,n=t.author,r=t.descript,s=t.songList,o=t.banner,l=new Date,i={header:{author:n,title:a,publishInfo:"".concat(l.getFullYear(),"-").concat(("0"+(l.getMonth()+1)).slice(-2),"-").concat(("0"+l.getDate()).slice(-2)),hearts:0},description:r,songList:[],banner:o},c=s.filter((function(e){return e.length>0})),u=0;u<c.length;u++){var m=c[u],h=m.indexOf("album")+"album".length+1,p=m.indexOf("/",h),b=m.slice(h,p),g=m.indexOf("<a href")+"<a href".length+2,f=m.indexOf('">',g),v=m.slice(g,f),E=m.indexOf("</a>",f),I=m.slice(f+2,E);i.songList.push({credit:I,embedId:b,embedLink:v})}d.database().ref().push(i),e.setState({showNew:!1})},e.state={posts:[],showNew:!1,touchscreen:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;d.database().ref().on("value",(function(t){var a=[],n=t.val();for(var r in n)a.unshift({key:r,content:n[r]});e.setState({posts:a})})),("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)&&this.setState({touchscreen:!0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"block"},"fresh vibes"),this.state.touchscreen?"":this.state.showNew?r.a.createElement(S,{closeForm:function(){return e.setState({showNew:!1})},handleSubmit:this.savePost}):r.a.createElement("button",{className:"block newBtn",onClick:function(){return e.setState({showNew:!0})}},"+ New"),this.state.posts.map((function(e){var t=e.content,a=t.header,n=t.description,s=t.songList,o=t.banner;return r.a.createElement(b,{key:e.key,id:e.key,header:a,description:n,songList:s,banner:o})})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,2]]]);
//# sourceMappingURL=main.e553ecd1.chunk.js.map