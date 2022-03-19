function changeHeartIcon(iconClasses){
    iconClasses.value === "fas fa-heart liked" ? iconClasses.value = "far fa-heart" : iconClasses.value = "fas fa-heart liked";
}

[...document.getElementsByTagName("h4")].forEach( h4 => h4.addEventListener( "click", event => {
    changeHeartIcon(event.target.childNodes[1].classList);
}));

[...document.getElementsByClassName("fa-heart")].forEach( heart => heart.addEventListener( "click", event => {
    changeHeartIcon(event.target.classList);
}));

document.getElementById("search-form").addEventListener("submit", (event) => {
    const navigator = window.navigator;
    if (navigator.geolocation) {
        // Get current position
        // The permissions dialog will pop up
        navigator.geolocation.getCurrentPosition((position) => {
            // Create an object to match Google's Lat-Lng object format
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log('center: ', userLocation);

            // User granted permission
            // Add the longitud and the latitude to the user

        }, () => {
            console.log('Error in the geolocation service.');
        });
    } else {
        console.log('Browser does not support geolocation.');
    }
    //event.preventDefault();
});

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