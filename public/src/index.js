function changeHeartIcon(iconClasses){
    iconClasses.value === "fas fa-heart liked" ? iconClasses.value = "far fa-heart" : iconClasses.value = "fas fa-heart liked";
}

[...document.getElementsByTagName("h4")].forEach( h4 => h4.addEventListener( "click", event => {
    changeHeartIcon(event.target.childNodes[1].classList);
}));

[...document.getElementsByClassName("fa-heart")].forEach( heart => heart.addEventListener( "click", event => {
    changeHeartIcon(event.target.classList);
}));

function startMaps() {
    [...document.getElementsByClassName("map")].forEach(cinemaMap => {
        const { lat, lng, name } = cinemaMap.attributes;
        const cinema = {
            lat: Number(lat.value),
            lng: Number(lng.value)
        };
        const map = new google.maps.Map(
            cinemaMap,
            {
                zoom: 14,
                center: cinema
            }
        );
        const cinemaMarker = new google.maps.Marker({
            position: cinema,
            map: map,
            title: name
        });
    });
}
   
window.addEventListener('load', () => startMaps());