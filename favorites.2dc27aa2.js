var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a("8FnLx");var i=a("tgDFu"),o=a("2P2v9");function r(e){const t=localStorage.getItem(e);return JSON.parse(t)}a("2P2v9");function s(){return window.innerWidth<768?9:12}function l(e,t){const n={};for(let a=0;a<e.length;a+=t){n[Math.floor(a/t)+1]=e.slice(a,a+t)}return n}var d=a("fT9c6"),c=a("gW4Nf"),f=(o=a("2P2v9"),c=a("gW4Nf"),d=a("fT9c6"),a("gjiCh"));function u(e=1){(0,f.showLoader)();const t=r("favorites-data");if(o.default.allButton.style.display=t&&t.length?"block":"none",!t||0===t.length)return o.default.noFavoritesMessage.classList.remove("visually-hidden"),o.default.allButton.classList.add("visually-hidden"),void(window.innerWidth<768&&o.default.heroImage.classList.add("visually-hidden"));const n=s(),a=l(t,n),i=Object.keys(a).length;o.default.paginationElement.style.display=i>1?"block":"none",(0,c.default)(e,n,i,u);const g=a[e].map((({title:e,description:t,preview:n,rating:a,id:i,category:o})=>(0,d.renderingFavRec)(e,t,n,a,i,o))).join("");o.default.recipesListContainer.innerHTML=g,o.default.noFavoritesMessage.classList.add("visually-hidden"),(0,f.hideLoader)()}f=a("gjiCh");let g="";f=a("gjiCh");function v(e){return`<button class="fav-button">${e}</button>`}function p(e){(0,f.showLoader)();const t=e.closest("div.recipe-item").dataset.category,n=r("favorites-data"),a=n.find((e=>e.category===t)),i=[...refs.categoriesContainer.children].find((e=>e.textContent===t));!a&&i?i.remove():a&&!i&&refs.categoriesContainer.insertAdjacentHTML("beforeend",v(t)),refs.allButton.style.display=n&&n.length?"block":"none",(0,f.hideLoader)()}f=a("gjiCh");const h=new(0,i.default);function L(){(0,f.showLoader)();const e=function(){const e=localStorage.getItem("favorites-data"),t=JSON.parse(e);if(!t||0===t.length)return"";return t.flatMap((e=>e.category)).filter(((e,t,n)=>n.indexOf(e)===t)).reduce(((e,t)=>e+v(t)),"")}(),t=r("favorites-data");o.default.recipesListContainer.innerHTML="",o.default.categoriesContainer.innerHTML=t&&t.length?`<button class="fav-button common-btn is-active" name="main-cat-btn">All categories</button>${e}`:"",u(),(0,f.hideLoader)()}window.addEventListener("load",(function(){const e=document.querySelectorAll(".menu-nav-links");e[0].classList.contains("header-accent")&&(e[0].classList.remove("header-accent"),e.length>1&&e[1].classList.add("header-accent"))})),h.getRecipe().then((e=>{const t=e.results,n=[];for(let e=0;e<6;e++){const{_id:a,title:i,category:o,rating:r,preview:s,description:l}=t[e];for(let e=0;e<5;e++)n.push({_id:a,title:i,category:o,rating:r,preview:s,description:l})}localStorage.setItem("favorites-data",JSON.stringify(n))})),o.default.renderedRecipesBox.addEventListener("click",(function({target:e}){if(!e.closest("button"))return;const t=e.closest("button");"favorites-data"===t.name&&(!function(e){const t=JSON.parse(e.dataset.info),n=JSON.parse(localStorage.getItem("favorites-data"));localStorage.setItem("favorites-data",JSON.stringify(n.filter((e=>e.id!==t.id)))),L()}(t),p(e)),"details"===t.name&&console.log("modal here")})),o.default.categoriesList.addEventListener("click",(function(e){if((0,f.showLoader)(),e.target.classList.contains("is-active"))return;let t,n=[];o.default.recipesListContainer.innerHTML="",e!==Number(e)&&"BUTTON"===e.target.nodeName&&(!function({target:e}){const t=document.querySelector(".is-active");t?t.classList.remove("is-active"):o.default.allButton.classList.add("is-active"),e.classList.add("is-active")}(e),g="main-cat-btn"===e.target.name?"":e.target.textContent);const a=localStorage.getItem("favorites-data");if(n=JSON.parse(a),!n||0===n.length)return void(o.default.categoriesContainer.style.display="none");if(!g)return void u();t=[...n.filter((e=>e.category===g))];let i=1;Number(e)===e&&(i=e);const r=s(),v=l(t,r),p=Object.keys(v).length;o.default.paginationElement.style.display=p>1?"block":"none",(0,c.default)(i,r,p,u);const h=v[i].reduce(((e,{title:t,description:n,preview:a,rating:i,id:o,category:r})=>e+(0,d.renderingFavRec)(t,n,a,i,o,r)),"");o.default.recipesListContainer.innerHTML=h,(0,f.hideLoader)()})),document.addEventListener("DOMContentLoaded",L);
//# sourceMappingURL=favorites.2dc27aa2.js.map
