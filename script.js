(function(){
  var T=new Date(2026,9,7,0,0,0).getTime(),done=false;
  var $=function(i){return document.getElementById(i)};
  function pad(n){return n<10?'0'+n:n}
  function tick(){
    var diff=T-Date.now();
    if(diff<=0){
      if(!done){done=true;$('s').textContent='Today is all about you. Happy 18th!';$('cd').hidden=true;burst()}
      return}
    var s=Math.floor(diff/1000);
    $('d').textContent=Math.floor(s/86400);$('hr').textContent=pad(Math.floor(s%86400/3600));
    $('m').textContent=pad(Math.floor(s%3600/60));$('sc').textContent=pad(s%60);
  }
  tick();setInterval(tick,1000);
  var a=$('a'),p=$('play');
  function playSong(){
    a.muted = false;
    a.volume = 1;
    a.play().then(function(){p.textContent='❚❚ Pause song';p.classList.add('on')}).catch(function(){p.textContent='▶ Tap to play our song';p.classList.remove('on')});
  }
  playSong();
  p.addEventListener('click',function(){
    if(a.paused){playSong()}
    else{a.pause();p.textContent='▶ Play our song';p.classList.remove('on')}
  });
  document.querySelectorAll('.note').forEach(function(c){c.addEventListener('click',function(){var o=c.classList.toggle('open');c.setAttribute('aria-expanded',o)})});
  var c=$('c'),x=c.getContext('2d'),parts=[],raf=0,cols=['#ff8fa9','#ffc978','#f7ecf1','#b79adf','#ff6f91'];
  function size(){c.width=innerWidth;c.height=innerHeight}size();addEventListener('resize',size);
  function burst(){for(var i=0;i<160;i++)parts.push({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*12,vy:Math.random()*-12-3,r:Math.random()*5+3,col:cols[i%5],rot:Math.random()*6,life:0});if(!raf)loop()}
  function loop(){x.clearRect(0,0,c.width,c.height);parts=parts.filter(function(p){return p.life<260});
    parts.forEach(function(p){p.life++;p.vy+=.28;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.rot+=.15;x.save();x.translate(p.x,p.y);x.rotate(p.rot);x.fillStyle=p.col;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});
    raf=parts.length?requestAnimationFrame(loop):0}
  c.addEventListener('click',function(){});
  $('h').addEventListener('click',burst);
})();
