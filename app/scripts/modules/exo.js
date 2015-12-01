
var objEure;
var contenuJson = {buildings: [], naturals: [], highways: [], amenities: []};

$(document).ready(function(){

  $.get('data/eure.json').success(function(data) {
     objEure = data;
     contenuJson = {buildings: [], naturals: [], highways: [], amenities: []};

    for (var cpt = 0; cpt < objEure.length; cpt++) {
      var tmpObject = objEure[cpt];

      if (tmpObject.hasOwnProperty("building") && tmpObject.building)
        contenuJson.buildings.push(window.Shapes.createBuilding(tmpObject));
      else {
        if (tmpObject.hasOwnProperty("natural"))
          contenuJson.naturals.push(window.Shapes.createNatural(tmpObject));
        else if (tmpObject.hasOwnProperty("highway"))
          contenuJson.highways.push(window.Shapes.createRoad(tmpObject));
        else if (tmpObject.hasOwnProperty("amenity"))
          contenuJson.amenities.push(window.Shapes.createAmenity(tmpObject));
      }
    }
    dessineMap();
  });
});

var svgContainer = d3.select("body").append("svg:svg")
  .attr("width", $(window).width())
  .attr("height", $(window).height())
  .call(d3.behavior.zoom().on("zoom", zoom))
  .append('svg:g');


function dessineMap(){
  /*var svgContainer = d3.select("body").append("svg")
                                      .attr("width", screen.width)
                                      .attr("height", screen.height)
                                      .call(d3.behavior.zoom().on("zoom", zoom));*/


  //dessine zone
  for(var i =0; i< contenuJson.buildings.length; i++){

    svgContainer.append("path").classed("building",1)
      .attr("d", contenuJson.buildings[i].toSvgPath()).attr("id", i)
      .attr("stroke","black").attr("fill","OliveDrab")
      .on("mouseover", function(d, i) {
        d3.select(this)
          .attr("stroke","black").attr("fill","red");
      })
      .on("mouseout", function(d, i) {
        d3.select(this)
          .attr("stroke","black").attr("fill","OliveDrab");
      })
      .on("click", function(d, a) {
        var idBuilding = d3.select(this).attr("id");
          alert(contenuJson.buildings[idBuilding].toString()+ "");
      })

      }

  for(var i =0; i< contenuJson.naturals.length; i++){
    svgContainer.append("path").attr("d", contenuJson.naturals[i].toSvgPath()).attr("stroke","aqua").attr("fill","SteelBlue");
  }
  for(var i =0; i< contenuJson.highways.length; i++){
    svgContainer.append("path").attr("d", contenuJson.highways[i].toSvgPath()).attr("stroke","black").attr("fill","none");
  }
  for(var i =0; i< contenuJson.amenities.length; i++){
    svgContainer.append("path").attr("d", contenuJson.amenities[i].toSvgPath()).attr("stroke","black").attr("fill","DarkSlateGray");
  }

}

function zoom() {
  svgContainer.attr("transform","translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}
