const tangram = Tangram.leafletLayer({
   scene: 'scene.yaml',
   events: {
      hover: handleHover
   }
})
const map = L.map('map', {
   center: [38.88790228978489, -77.0488089323044],
   zoom: 12,
   layers: [tangram],
   zoomControl: false
});
map.attributionControl.addAttribution('<a href="https://github.com/tangrams/tangram">Tangram</a> | <a href="https://here.xyz">HERE XYZ</a> | <a href="https://www.openstreetmap.org/">OSM</a>');

tangram.scene.subscribe({
   load: (scene) => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((box) => {
         box.onclick = () => {
            scene.config.layers[box.id].draw.lines.visible = box.checked ? true : false
            tangram.scene.rebuild();
         }
      })
   }
});

function handleHover(evt) {
   if (evt.feature) {
      console.log(evt)
      document.getElementById('tooltip').style.left = evt.pixel.x + 'px';
      document.getElementById('tooltip').style.top = evt.pixel.y + 'px';
      document.getElementById('tooltip').style.display = 'block';

      let text  = '';
      if (evt.feature.source_name === '_rapid_bus') {
         text = 'Rapid Bus';
      } else if (evt.feature.source_name === '_rapid_bus_transit') {
         text = 'Rapid Bus Transit'
      } else if (evt.feature.source_name === '_street_car') {
         text = 'Street Car';
      }
      document.getElementById('tooltip').innerText = text;
   } else {
      // setTimeout(() => {
      //    document.getElementById('tooltip').style.display = 'none'
      // }, 1000)

   }
}
