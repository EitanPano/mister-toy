<template>
    <section class="gmap">
    <GmapMap
    ref="mapRef"
        :center="center"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
        />
    </GmapMap>
    <div class="branches-box">
        <el-button v-for=" (marker, idx) in markers" :key="idx" @click="moveTo(marker.position)">{{marker.city}}</el-button>
    </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            markers: [
                { city: 'Haifa', position: { lat: 32.8, lng: 35 } },
                { city: 'Gaza', position: { lat: 31.5, lng: 34.5 } },
                { city: 'Eilat', position: { lat: 29.55, lng: 34.95 } },
            ],
            center: {lat: 32.8, lng: 35.2},
        };
    },
    created() {
        navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.center.lat = latitude
        this.center.lng = longitude
})
    },
    methods: {
    moveTo(position){
      const { lat, lng } = position;
       this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat, lng})
    })
    }
  },
};
</script>

<style>
</style>