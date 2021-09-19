const show_div = gsap.timeline();
show_div.delay(1);
show_div.fromTo(".floating_con", {scale:0}, {duration: .5,y:-20,scale:1,opacity:1,ease:'back.out(1.4)',stagger:.3})
show_div.to(".floating_con1", {duration:2,motionPath:[{y:-20},{y:0},{y:-20}],ease:'power0',repeat:-1})
show_div.to(".floating_con2", {duration:2,motionPath:[{y:-20},{y:0},{y:-20}],ease:'power0',repeat:-1},"-=1")
show_div.to(".floating_con3", {duration:2,motionPath:[{y:-20},{y:0},{y:-20}],ease:'power0',repeat:-1},"-=2.5")
/* .fromTo(".hero_headline", {opacity:0,scale:0}, {opacity:1,scale:1}) */;

function rotate(){
    let showm =  document.querySelector('.item[data-show]');
    let next  =  showm.nextElementSibling || document.querySelector('.item:first-child');
    let up  =  document.querySelector('.item[data-up]');

    if(up){
        up.removeAttribute('data-up');
    }
    showm.removeAttribute('data-show');
    showm.setAttribute('data-up',"");
    next.setAttribute('data-show',"");
    console.log('hello');
}
setInterval(rotate, 2000);
