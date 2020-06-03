<template>
    <div ref="mapdiv" class="map">
        Map here
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import statuses from "@/statuses.js";

am4core.useTheme(am4themes_animated);

function configureMap(mapChart) {
    // mapChart.zoomControl = new am4maps.ZoomControl();
    // mapChart.zoomControl.align = "right";
    // mapChart.zoomControl.marginRight = 15;
    // mapChart.zoomControl.valign = "middle";
    mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };

    mapChart.geodata = worldLow;

    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    mapChart.projection = new am4maps.projections.Miller();
    //mapChart.panBehavior = "move";
    mapChart.seriesContainer.draggable = true;
    mapChart.seriesContainer.resizable = true;
    mapChart.maxZoomLevel = 1;


    const polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    // Antarctica is excluded in non-globe projection
    polygonSeries.exclude = ["AQ"];
    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;
    // polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
    //     mapChart.zoomToMapObject(ev.target);
    // });

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: mapChart.colors.getIndex(1).brighten(1),
        max: mapChart.colors.getIndex(8).brighten(-0.3),
        minValue: Math.min(...Object.values(statuses)),
        maxValue: Math.max(...Object.values(statuses)),
    });

    polygonSeries.Status = 'none' // for countries having no cddc

    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {Status}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3cdc5b");
}



export default {
  name: 'Map',
  props: {
      chartData: Array
  },
  watch: {
      chartData(value) {
          if (this.mapChart) {
                this.mapChart.series.getIndex(0).data = value;
          }
      }
  },
  mounted() {
    const mapChart = am4core.create(this.$refs.mapdiv, am4maps.MapChart);
    configureMap(mapChart);
    this.mapChart = mapChart;
    this.mapChart.series.getIndex(0).data = this.chartData;
  },
  beforeDestroy() {
    if (this.mapChart) {
      this.mapChart.dispose();
    }
  }
}
</script>

<style lang="scss" scoped>
    .map {
        height: 100%;
    }
</style>

