let searchQuery = document.querySelector(".search-ip-domain");
let searchBtn = document.querySelector(".search-btn");
let ipNumber = document.querySelector('.ip-number');
let ipLocation = document.querySelector('.location');
let timeZone = document.querySelector('.timezone');
let isp = document.querySelector('.isp');

window.onload = function() {
    let api = 'https://api.ipify.org?format=json';
    fetch(api).then(response => {
        return response.json();
    }).then(data => {
        console.log(data.ip);
        getLocation(data.ip)
    });
}

getLocation = query => {
    document.getElementById('map-deatils').innerHTML = "<div id='mapid'></div>";
    let api = `https://geo.ipify.org/api/v1?apiKey=at_mhukRTxNTpim81DTUtfNHTIJHJbUO&ipAddress=${query}&domain=${query}`;
    fetch(api).then((response) => {
        let data = response.json();
        return data;
    }).then(data => {
        console.log(data);
        let lat = data.location.lat;
        let long = data.location.lng;

        var mymap = L.map('mapid', {
            minZoom: 0,
            maxZoom: 18
        }).setView([lat, long], 14);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=xksrPP0SHRmwYmZRFUgC', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            // maxZoom: 18,
        }).addTo(mymap);

        let locationIcon = L.icon({
            iconUrl: 'images/icon-location.svg',
            iconSize: [40, 40]
        });
        
        L.marker([lat, long], {icon: locationIcon}).addTo(mymap);
        
        displayIpDetails(data);
    })
}

displayIpDetails = (obj) => {
    ipNumber.textContent = obj.ip;
    ipLocation.textContent = `${obj.location.city}, ${obj.location.region}`;
    timeZone.textContent = obj.location.timezone;
    isp.textContent = obj.isp;
}

searchBtn.addEventListener("click", event => {
    event.preventDefault();
    if(searchQuery.value == "") 
    {
        alert("Error: Empty Query is not allowed"); 
        return;
    }
    getLocation(searchQuery.value);
    searchQuery.value = "";
});