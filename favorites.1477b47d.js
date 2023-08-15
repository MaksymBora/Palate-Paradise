!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i),i("7mS1x");var o=i("d3Gjh"),a={recipesListContainer:document.querySelector(".fav-list"),categoriesContainer:document.querySelector(".fav-categories"),noFavoritesMessage:document.querySelector(".fav-empty"),paginationElement:document.getElementById("pagination"),allButton:document.querySelector(".common-btn"),categoriesList:document.querySelector(".fav-categories"),renderedRecipesBox:document.getElementById("fav-rendered-card"),heroImage:document.querySelector(".fav-hero")};function c(e){var t=localStorage.getItem(e);return JSON.parse(t)}var s=i("8nrFW");function d(){return window.innerWidth<768?9:12}function l(e,t){for(var n={},r=0;r<e.length;r+=t){n[Math.floor(r/t)+1]=e.slice(r,r+t)}return n}var u=i("2lkGM"),f=i("au4Ux"),v=(f=i("au4Ux"),u=i("2lkGM"),i("8dpKU"));function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;(0,v.showLoader)();var t=c("favoriteRecipes");if(a.allButton.style.display=t&&t.length?"block":"none",!t||0===t.length)return a.noFavoritesMessage.classList.remove("visually-hidden"),a.allButton.classList.add("visually-hidden"),void(window.innerWidth<768&&a.heroImage.classList.add("visually-hidden"));var n=d(),r=l(t,n),i=Object.keys(r).length;a.paginationElement.style.display=i>1?"block":"none",(0,f.default)(e,n,i,p);var o=r[e].map((function(e){var t=e.title,n=e.description,r=e.thumb,i=e.rating,o=e.id,a=e.category;return(0,u.renderingFavRec)(t,n,r,i,o,a)})).join("");a.recipesListContainer.innerHTML=o,a.noFavoritesMessage.classList.add("visually-hidden"),(0,v.hideLoader)()}v=i("8dpKU");var m="";s=i("8nrFW"),v=i("8dpKU");function g(e){return'<button class="fav-button">'.concat(e,"</button>")}function y(t){(0,v.showLoader)();var n=t.closest("div.recipe-item").dataset.category,r=c("favoriteRecipes"),i=r.find((function(e){return e.category===n})),o=e(s)(refs.categoriesContainer.children).find((function(e){return e.textContent===n}));!i&&o?o.remove():i&&!o&&refs.categoriesContainer.insertAdjacentHTML("beforeend",g(n)),refs.allButton.style.display=r&&r.length?"block":"none",(0,v.hideLoader)()}v=i("8dpKU"),new(0,o.default);function h(){(0,v.showLoader)();var e=function(){var e=localStorage.getItem("favoriteRecipes"),t=JSON.parse(e);return t&&0!==t.length?t.flatMap((function(e){return e.category})).filter((function(e,t,n){return n.indexOf(e)===t})).reduce((function(e,t){return e+g(t)}),""):""}(),t=c("favoriteRecipes");a.recipesListContainer.innerHTML="",a.categoriesContainer.innerHTML=t&&t.length?"".concat('<button class="fav-button common-btn is-active" name="main-cat-btn">All categories</button>').concat(e):"",p(),(0,v.hideLoader)()}function L(e){var t=e.dataset.info,n=(JSON.parse(localStorage.getItem("favoriteRecipes"))||[]).filter((function(e){return e.id!==t}));localStorage.setItem("favoriteRecipes",JSON.stringify(n)),h()}window.addEventListener("load",(function(){var e=document.querySelectorAll(".menu-nav-links");e[0].classList.contains("header-accent")&&(e[0].classList.remove("header-accent"),e.length>1&&e[1].classList.add("header-accent"))})),document.addEventListener("click",(function(e){e.target.closest(".heart-btn")&&function(e){var t=e.target;L(t),t.classList.remove("active")}(e)})),a.renderedRecipesBox.addEventListener("click",(function(e){var t=e.target;if(t.closest("button")){var n=t.closest("button");"favoriteRecipes"===n.name&&(L(n),y(t))}})),a.categoriesList.addEventListener("click",(function(t){if((0,v.showLoader)(),!t.target.classList.contains("is-active")){var n,r,i,o=[];a.recipesListContainer.innerHTML="",t!==Number(t)&&"BUTTON"===t.target.nodeName&&(r=t.target,(i=document.querySelector(".is-active"))?i.classList.remove("is-active"):a.allButton.classList.add("is-active"),r.classList.add("is-active"),m="main-cat-btn"===t.target.name?"":t.target.textContent);var c=localStorage.getItem("favoriteRecipes");if((o=JSON.parse(c))&&0!==o.length)if(m){n=e(s)(o.filter((function(e){return e.category===m})));var g=1;Number(t)===t&&(g=t);var y=d(),h=l(n,y),L=Object.keys(h).length;a.paginationElement.style.display=L>1?"block":"none",(0,f.default)(g,y,L,p);var b=h[g].reduce((function(e,t){var n=t.title,r=t.description,i=t.preview,o=t.rating,a=t.id,c=t.category;return e+(0,u.renderingFavRec)(n,r,i,o,a,c)}),"");a.recipesListContainer.innerHTML=b,(0,v.hideLoader)()}else p();else a.categoriesContainer.style.display="none"}})),document.addEventListener("DOMContentLoaded",h),i("3rVfH");var b=document.querySelector(".scroll-to-top"),w=document.querySelector(".fav-list"),S=window.pageYOffset;b.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"}),b.style.display="none"})),window.addEventListener("scroll",(function(){var e=window.innerHeight,t=w.offsetHeight,n=window.scrollY;b.style.display=n<=S||n+e>=t?"block":"none",(0===n||n>S)&&(b.style.display="none"),S=n}));var k,x=i("bpxeT"),E=i("2TvXO"),q=i("dIxxU"),C=document.querySelector(".backdrop-recipes"),R=document.querySelector(".modal-close-btn"),M=document.querySelector(".modal-recipes");function O(){M&&(M.classList.remove("is-hidden"),C.classList.remove("is-hidden"),document.addEventListener("keydown",N),M.addEventListener("click",(function(e){e.stopPropagation()})),C.removeEventListener("click",T),C.addEventListener("click",T),P(k))}function T(){M&&(document.querySelector(".recipes-iframe-video").src="",M.classList.add("is-hidden"),document.removeEventListener("keydown",N),C.removeEventListener("click",T),C.classList.add("is-hidden"))}function N(e){"Escape"===e.key&&T()}function H(e){return I.apply(this,arguments)}function I(){return(I=e(x)(e(E).mark((function t(n){var r,i,o;return e(E).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://tasty-treats-backend.p.goit.global/api/recipes/".concat(n),e.prev=1,e.next=4,q.default.get(r);case 4:return i=e.sent,B(o=i.data),U(o),F(o),_(o),j(o),A(o),J(o),K(o),e.abrupt("return",o);case 17:e.prev=17,e.t0=e.catch(1),console.log(e.t0);case 20:case"end":return e.stop()}}),t,null,[[1,17]])})))).apply(this,arguments)}function B(e){var t=document.querySelector(".recipes-iframe-video");t.src="";var n,r,i=e.youtube,o=(n=/(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i,(r=i.match(n))&&r[1]?r[1]:"");t.src="https://www.youtube.com/embed/".concat(o)}function U(e){document.querySelector(".recipes-title").textContent=e.title}function F(e){document.querySelector(".recipes-description").textContent=e.instructions}function _(e){document.querySelector(".recipes-cooking-time").textContent=e.time}function j(e){document.querySelector(".ratinng-value").textContent=e.rating}function A(e){document.querySelector(".recipes-hashtags-list").innerHTML=e.tags.map((function(e){return'<li class="recipes-hashtags-item">#'.concat(e,"</li>")})).join("")}function J(e){document.querySelector(".recipes-components-list").innerHTML=e.ingredients.map((function(e){var t=e.measure,n=e.name;return'\n    <li class="recipes-components-item">\n      <p class="recipes-components-item_name">'.concat(n,'</p>\n      <p class="recipes-components-item_quantity">').concat(t,"</p>\n    </li>\n  ")})).join("")}function K(e){for(var t=parseFloat(e.rating),n=document.querySelectorAll(".modal-rating-star-icon"),r=0;r<n.length;r++)r<t?n[r].classList.add("active"):n[r].classList.remove("active")}function D(){return JSON.parse(localStorage.getItem("favoriteRecipes"))||[]}function W(e){localStorage.setItem("favoriteRecipes",JSON.stringify(e))}R.addEventListener("click",T),document.addEventListener("keydown",N),C.addEventListener("click",(function(e){e.target===M||M.contains(e.target)||T()})),C.addEventListener("click",(function(e){e.target===C&&T()})),document.addEventListener("DOMContentLoaded",(function(){var t,n=document.querySelector(".image-container"),r=document.querySelector(".popular-list");n.addEventListener("click",(t=e(x)(e(E).mark((function t(n){var r,i,o;return e(E).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.target.closest(".rec-btn-open")){e.next=3;break}return e.abrupt("return");case 3:return i=r.dataset.id,e.prev=4,e.next=7,H(i);case 7:(o=e.sent)&&(P(k=o),O()),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0);case 14:case"end":return e.stop()}}),t,null,[[4,11]])}))),function(e){return t.apply(this,arguments)})),r&&r.addEventListener("click",function(){var t=e(x)(e(E).mark((function t(n){var r,i,o;return e(E).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.target.closest(".popular-list-item")){e.next=3;break}return e.abrupt("return");case 3:return i=r.dataset.id,e.prev=4,e.next=7,H(i);case 7:(o=e.sent)&&(P(k=o),O()),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0);case 14:case"end":return e.stop()}}),t,null,[[4,11]])})));return function(e){return t.apply(this,arguments)}}())}));var G=document.querySelector(".btn-add-favorite");function Y(e){return D().some((function(t){return t.id===e._id}))}function P(e){var t=Y(e);G.textContent=t?"Remove from favorite":"Add to favorite"}G.addEventListener("click",(function(){var e,t,n,r,i,o,a,c,s,d;Y(k)?(d=k,W(D().filter((function(e){return e.id!==d._id}))),h(),G.textContent="Add to favorite"):(e=k,t=D(),n=e._id,r=e.title,i=e.category,o=e.rating,a=e.preview,c=e.description,s={id:n,title:r,category:i,rating:o,preview:a,description:c},Y(e)?(W(t.filter((function(e){return e.id!==n}))),G.textContent="Add to favorite"):(t.push(s),G.textContent="Remove from favorite"),W(t),G.textContent="Remove from favorite")})),i("fH4Kd"),i("6oxRu")}();
//# sourceMappingURL=favorites.1477b47d.js.map