function changeHeartIcon(iconClasses){
    iconClasses.value === "fas fa-heart liked" ? iconClasses.value = "far fa-heart" : iconClasses.value = "fas fa-heart liked";
}

[...document.getElementsByTagName("h4")].forEach( h4 => h4.addEventListener( "click", event => {
    changeHeartIcon(event.target.childNodes[1].classList);
}));

[...document.getElementsByClassName("fa-heart")].forEach( heart => heart.addEventListener( "click", event => {
    changeHeartIcon(event.target.classList);
}));