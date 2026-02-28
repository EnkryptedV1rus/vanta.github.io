/* cursor reactive */
document.addEventListener("mousemove",e=>{
  document.documentElement.style.setProperty("--x",e.clientX+"px");
  document.documentElement.style.setProperty("--y",e.clientY+"px");
});

/* command palette */
document.addEventListener("keydown",e=>{
  if(e.key==="/"){
    const p=document.getElementById("palette");
    if(p) p.classList.toggle("active");
  }
});

/* stat counter */
document.querySelectorAll(".stat-number").forEach(el=>{
  const target=+el.dataset.target;
  let count=0;
  const step=target/80;
  function update(){
    count+=step;
    if(count<target){
      el.textContent=Math.floor(count).toLocaleString();
      requestAnimationFrame(update);
    }else{
      el.textContent=target.toLocaleString();
    }
  }
  update();
});
