const o=document.querySelector(".js-search"),m=document.querySelector(".js-btn"),d=document.querySelector(".js-reset"),s=document.querySelector(".js-results");let l=document.querySelector(".js-favs"),r=[];function u(t){t.preventDefault();const i=o.value;fetch(`https://api.jikan.moe/v4/anime?q=${i}`).then(e=>e.json()).then(e=>{r=e.data,g(r)})}m.addEventListener("click",u);function g(t){s.innerHTML="";for(const e of t){let n=e.images.jpg.image_url;n==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(n="https://placehold.co/600x400"),s.innerHTML+=`<li class="list js-anime" id=${e.mal_id}>  
           <h5>${e.title}</h5>
           <img src="${n}" class="image" alt="${e.title} "/>
           </li>`}document.querySelectorAll(".js-anime").forEach(e=>{e.addEventListener("click",f)})}function f(t){const i=t.currentTarget.id,e=r.find(a=>a.mal_id==i),n=document.createElement("li");n.classList.add("fav-item"),n.innerHTML=`
        <h5>${e.title}</h5>
        <img src="${e.images.jpg.image_url}" alt="${e.title}" />
    `,l.appendChild(n);let c=JSON.parse(localStorage.getItem("favorites"))||[];c.push({title:e.title,image:e.images.jpg.image_url,id:e.mal_id}),localStorage.setItem("favorites",JSON.stringify(c)),document.querySelectorAll(".js-anime").forEach(a=>{a.style.backgroundColor=""}),t.currentTarget.style.backgroundColor="#33ffc4"}function h(){let t=JSON.parse(localStorage.getItem("favorites"))||[];l.innerHTML="",t.forEach(i=>{const e=document.createElement("li");e.classList.add("fav-item"),e.innerHTML=`
            <h5>${i.title}</h5>
            <img src="${i.image}" alt="${i.title}" />
        `,l.appendChild(e)})}h();d.addEventListener("click",()=>{s.innerHTML="",l.innerHTML="",o.value=""});
//# sourceMappingURL=main.js.map
