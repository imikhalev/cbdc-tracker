<template>
    <div>
        <h3>CBDC Tracker</h3>
        <div class="form-check" v-for="(value, name) in statuses" :key="name">
            <input 
                class="form-check-input" 
                type="checkbox" 
                :value="name"
                v-model="selectedStatusesModel"
                :id="'status-' + name">
            <label class="form-check-label" :for="'status-' + name">
                {{name}}
            </label>
        </div>
        <br>
        <div>
            <b>PoC</b> Countries that published multiple research reports about CBDC and started experimenting<br>
            <b>Development</b> Countries in the midst of launching a digital currency at larger scale or starting a pilot in small scale<br>
            <b>Pilot</b> Countries exploring CBDC for domestic interbank or just testing blockchain in a small-scale and real environment<br>
            <b>Launched</b> Countries officially launched a digital currency and issued tokens for transactions<br>
            <b>Cancelled</b> Countries cancelled or decommissioned a CBDC
        </div>

        <div><br><br>
            Source: <a target="_blank" href="https://github.com/imikhalev/cbdc-tracker">https://github.com/imikhalev/cbdc-tracker</a><br>
            Licence: <a target="_blank" href="https://github.com/imikhalev/cbdc-tracker/blob/master/LICENSE">MIT License, free for reproduction and distribution</a><br>
            Publications
            <li><a target="_blank" href="https://www.bcg.com/en-nl/publications/2020/get-ready-for-the-future-of-money.aspx">Get Ready for the Future of Money</a></li>
            <li><a target="_blank" href="https://www.coindesk.com/central-bank-digital-currencies-need-decentralization">Central Bank Digital Currencies Need Decentralization</a></li><br>
        </div>

        <div>
            Key contributors
            <li><a target="_blank" href="https://www.linkedin.com/in/mikhalev/">Igor Mikhalev</a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/kaj-burchardi-b1030242/">Kaj Burchardi</a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/bihaosong/">Bihao Song</a></li>
            <br>
        </div>

    </div>
</template>

<script>
import statuses from "@/statuses.js";

export default {
    name: 'Filters',
    props: {
        selectedStatuses: Array
    },
    computed: {
        selectedStatusesModel: {
            get () { return this.selectedStatuses },
            set (value) { this.$emit('update:selectedStatuses', value) },
        },
        statuses() {
            return statuses;
        }
    }
}
</script>
