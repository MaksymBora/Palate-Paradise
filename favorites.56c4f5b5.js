!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},t.parcelRequired7c6=i),i("cs7FV");var r=i("d3Gjh"),o={recipesListContainer:document.querySelector(".fav-list"),categoriesContainer:document.querySelector(".fav-categories"),noFavoritesMessage:document.querySelector(".fav-empty"),paginationElement:document.getElementById("pagination"),allButton:document.querySelector(".common-btn"),categoriesList:document.querySelector(".fav-categories"),renderedRecipesBox:document.getElementById("fav-rendered-card"),heroImage:document.querySelector(".fav-hero")};function s(e){var t=localStorage.getItem(e);return JSON.parse(t)}var c=i("8nrFW");function l(){return window.innerWidth<768?9:12}function d(e,t){for(var n={},a=0;a<e.length;a+=t){n[Math.floor(a/t)+1]=e.slice(a,a+t)}return n}var u=i("2lkGM"),v=i("1VFfL");var g=function(t,n,a,i){var r={totalItems:n*a,itemsPerPage:n,visiblePages:window.innerWidth<768?2:3,page:t,centerAlign:!1,omitMiddlePages:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn pag-page">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}} move-button"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button"><span class="tui-ico-ellip">...</span></a>'}};new(e(v))("pagination",r).on("afterMove",(function(e){var t=e.page;i(t)}))},f=(u=i("2lkGM"),i("kvC6y"));function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;(0,f.showLoader)();var t=s("favorites-data");if(o.allButton.style.display=t&&t.length?"block":"none",!t||0===t.length)return o.noFavoritesMessage.classList.remove("visually-hidden"),o.allButton.classList.add("visually-hidden"),void(window.innerWidth<768&&o.heroImage.classList.add("visually-hidden"));var n=l(),a=d(t,n),i=Object.keys(a).length;o.paginationElement.style.display=i>1?"block":"none",g(e,n,i,p);var r=a[e].map((function(e){var t=e.title,n=e.description,a=e.preview,i=e.rating,r=e.id,o=e.category;return(0,u.renderingFavRec)(t,n,a,i,r,o)})).join("");o.recipesListContainer.innerHTML=r,o.noFavoritesMessage.classList.add("visually-hidden"),(0,f.hideLoader)()}f=i("kvC6y");var m="";c=i("8nrFW"),f=i("kvC6y");function y(e){return'<button class="fav-button">'.concat(e,"</button>")}function h(t){(0,f.showLoader)();var n=t.closest("div.recipe-item").dataset.category,a=s("favorites-data"),i=a.find((function(e){return e.category===n})),r=e(c)(refs.categoriesContainer.children).find((function(e){return e.textContent===n}));!i&&r?r.remove():i&&!r&&refs.categoriesContainer.insertAdjacentHTML("beforeend",y(n)),refs.allButton.style.display=a&&a.length?"block":"none",(0,f.hideLoader)()}f=i("kvC6y");var L=new(0,r.default);function b(){(0,f.showLoader)();var e=function(){var e=localStorage.getItem("favorites-data"),t=JSON.parse(e);return t&&0!==t.length?t.flatMap((function(e){return e.category})).filter((function(e,t,n){return n.indexOf(e)===t})).reduce((function(e,t){return e+y(t)}),""):""}(),t=s("favorites-data");o.recipesListContainer.innerHTML="",o.categoriesContainer.innerHTML=t&&t.length?"".concat('<button class="fav-button common-btn is-active" name="main-cat-btn">All categories</button>').concat(e):"",p(),(0,f.hideLoader)()}window.addEventListener("load",(function(){var e=document.querySelectorAll(".menu-nav-links");e[0].classList.contains("header-accent")&&(e[0].classList.remove("header-accent"),e.length>1&&e[1].classList.add("header-accent"))})),L.getRecipe().then((function(e){for(var t=e.results,n=[],a=0;a<6;a++)for(var i=t[a],r=i._id,o=i.title,s=i.category,c=i.rating,l=i.preview,d=i.description,u=0;u<5;u++)n.push({_id:r,title:o,category:s,rating:c,preview:l,description:d});localStorage.setItem("favorites-data",JSON.stringify(n))})),o.renderedRecipesBox.addEventListener("click",(function(e){var t=e.target;if(t.closest("button")){var n=t.closest("button");"favorites-data"===n.name&&(!function(e){var t=JSON.parse(e.dataset.info),n=JSON.parse(localStorage.getItem("favorites-data"));localStorage.setItem("favorites-data",JSON.stringify(n.filter((function(e){return e.id!==t.id})))),b()}(n),h(t)),"details"===n.name&&console.log("modal here")}})),o.categoriesList.addEventListener("click",(function(t){if((0,f.showLoader)(),!t.target.classList.contains("is-active")){var n,a,i,r=[];o.recipesListContainer.innerHTML="",t!==Number(t)&&"BUTTON"===t.target.nodeName&&(a=t.target,(i=document.querySelector(".is-active"))?i.classList.remove("is-active"):o.allButton.classList.add("is-active"),a.classList.add("is-active"),m="main-cat-btn"===t.target.name?"":t.target.textContent);var s=localStorage.getItem("favorites-data");if((r=JSON.parse(s))&&0!==r.length)if(m){n=e(c)(r.filter((function(e){return e.category===m})));var v=1;Number(t)===t&&(v=t);var y=l(),h=d(n,y),L=Object.keys(h).length;o.paginationElement.style.display=L>1?"block":"none",g(v,y,L,p);var b=h[v].reduce((function(e,t){var n=t.title,a=t.description,i=t.preview,r=t.rating,o=t.id,s=t.category;return e+(0,u.renderingFavRec)(n,a,i,r,o,s)}),"");o.recipesListContainer.innerHTML=b,(0,f.hideLoader)()}else p();else o.categoriesContainer.style.display="none"}})),document.addEventListener("DOMContentLoaded",b)}();
//# sourceMappingURL=favorites.56c4f5b5.js.map
