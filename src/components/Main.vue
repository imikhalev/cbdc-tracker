<template>
  <b-container fluid="auto" class="mt-2 ml-2 mr-2">
    <b-row  class="h-90">
      <b-col cols="9">
        <Map :chartData="chartData"/>
      </b-col>
      <b-col cols="3">
        <Filters :selectedStatuses="selectedStatuses" @update:selectedStatuses="selectedStatusesChanged"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <Table :chartData="chartData"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Map from '@/components/Map.vue';
import Filters from '@/components/Filters.vue';
import cbdc from "@/cbdc.js";
import countries from "@/countries.js";
import statuses from "@/statuses.js";
import Table from "@/components/Table.vue";

export default {
  name: 'Main',
  components: {
    Map,
    Filters,
    Table
  },
  data() {
    return {
      selectedStatuses: Object.keys(statuses)
    } 
  },
  computed: {
    chartData() {
      const result = [];
      for(const item of cbdc) {
        if (this.selectedStatuses.indexOf(item.Status) < 0) { // a quick fix to show the map when there is no checked checkboxes. Need to understand the logic better to provide a proper fix
          const country = countries.find(country => country.name === item["Country/Region"]);
          if (!country) {
            continue;
          }
          item.id = country.code;
          item.value = statuses['none'];
          result.push(item);
          // console.log(item.Status);
          continue;
        }
        const country = countries.find(country => country.name === item["Country/Region"]);
        if (!country) {
          continue;
        }
        item.id = country.code;
        item.value = statuses[item.Status];
        // item.value = null;
        result.push(item);
      }
      return result;
    }
  },
  methods: {
    selectedStatusesChanged(selectedStatuses) {
      this.selectedStatuses = selectedStatuses;
      //console.log(this.selectedStatuses);
    },
    track () {
      this.$ga.page('/')
    }
  },
  mounted() {
    this.track();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
