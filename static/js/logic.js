var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
 attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
 maxZoom: 18,
 id: "mapbox.streets",
 accessToken: API_KEY
});
// map
var map = L.map("mapid", {
 center: [
   40.7, -94.5
 ],
 zoom: 3
});
graymap.addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {
 function styleInfo(feature) {
   return {
     opacity: 1,
     fillOpacity: 1,
     fillColor: getColor(feature.properties.mag),
     color: "#8693c2",
     radius: getRadius(feature.properties.mag),
     stroke: true,
     weight: 0.5
   };
 }
 
 function getColor(magnitude) {
   switch (true) {
   case magnitude > 5:
     return "#EA2C12";
   case magnitude > 4:
     return "#EC7308";
   case magnitude > 3:
     return "#EFEB0B";
   case magnitude > 2:
     return "#0F8917";
   case magnitude > 1:
     return "33FF6B";
   default:
     return "#B2A8A7";
   }
 }
   function getRadius(magnitude) {
   if (magnitude === 0) {
     return 1;
   }
   return magnitude * 4;
 }
 
 L.geoJson(data, {
   pointToLayer: function(feature, latlng) {
     return L.circleMarker(latlng);
   },
 
   style: styleInfo,
  
   onEachFeature: function(feature, layer) {
     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
   }
 }).addTo(map);

 var legend = L.control({
   position: "bottomright"
 });

 legend.onAdd = function() {
   var div = L.DomUtil.create("div", "info legend");
   var grades = [0, 1, 2, 3, 4, 5];
   var colors = [
     "#B2A8A7",
     "33FF6B",
     "#0F8917",
     "#EFEB0B",
     "#EC7308",
     "#EA2C12"
   ];
 
   for (var i = 0; i < grades.length; i++) {
     div.innerHTML +=
       "<i style='background: " + colors[i] + "'></i> " +
       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1]  + "  " + colors[i] + "<br>" : "+");
   }
   return div;
   
 };
 
 legend.addTo(map);
});
 
