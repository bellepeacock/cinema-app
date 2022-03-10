[...document.getElementsByClassName("fa-heart")].forEach( heart => heart.addEventListener( "click", event => {
    const iconClasses = event.target.classList;
    iconClasses.value === "fas fa-heart liked" ? iconClasses.value = "far fa-heart" : iconClasses.value = "fas fa-heart liked"
}));