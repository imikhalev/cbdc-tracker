<template>
    <div class="base-demo" >
        <vue-table-dynamic :params="tableData"></vue-table-dynamic>
    </div>
</template>

<script>

    import VueTableDynamic from 'vue-table-dynamic'

    export default {
        name: 'CBDCs',
        props: {
            chartData: Array
        },
        components: { VueTableDynamic },
        computed: {
            tableData() {
                const result = [];
                const header = ["Country/Region", "Announcement Year", "Central Bank(s)", "Digital Currency", "Status", "Type", "Structure", "Technology", "Programmability", "Interoperability", "Governance structure"];
                result.push(header);

                for(const item of this.chartData){
                    // console.log("item");
                    // console.log(item);
                    if(item.value == null) {    // quick fix for the no map issue when no checkbox is selected. Need to bring a better fix when understood the map library better.
                        continue;
                    }                        
                    const row = [item["Country/Region"], item["Announcement Year"], item["Central Banks"], item["Digital Currency"], item["Status"], item["Type"], item["Structure"], item["Technology"], item["Programmability"], item["Interoperability"], item["Governance structure"]];
                    result.push(row);
                }

                return {
                    data: result,
                    header: 'row', stripe: true, sort: [0, 1, 4], columnWidth: [{column: 0, width: 140}, {column: 1, width: 80}, {column: 2, width: 300}, {column: 3, width: 110}, {column: 4, width: 80}, {column: 5, width: 100}, {column: 6, width: 100}, {column: 7, width: 200}, {column: 8, width: 120}, {column: 9, width: 120}],
                }
            }
        },
    }

</script>

<style scoped>

</style>
