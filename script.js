
var typed = new Typed('.auto-type', {
    strings: ['Python Programmer', 'Flutter Dev', 'Web Dev','IronMan Follower','Tech Enthusiast','Car Enthusiast'],
    typeSpeed: 150,
    backSpeed: 50,
    loop: true

});

document.addEventListener("scroll",()=>{
    if(document.documentElement.scrollTop<500){
        document.getElementById("top").style.display="none";
    }
    else{
        document.getElementById("top").style.display="block";
    }
})
document.getElementById("top").addEventListener("click",()=>{
    document.documentElement.scrollTo(0,0)
})

