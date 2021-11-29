<template>
  <div v-if="alive" class="alert" :class="alertClass">
    {{ msg.txt }}
  </div>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/event-bus.service.js";
export default {
  created() {
    eventBusService.$on(SHOW_MSG, (msg) => {
      this.msg = msg;
      var delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  data() {
    return {
      alive: false,
      msg: null,
    };
  },
  computed: {
    alertClass() {
      if (!this.msg) return;
      return `alert-${this.msg.type}`;
    },
  },
};
</script>

<style>
.alert {
  color: black;
  padding: 10px;
  position: absolute;
  top: 2em;
  right: 2em;
  font-size: 1.4em;
  background-color: grey;
}

.alert-success {
  background-color: rgb(15, 122, 15);
}
.alert-danger {
  background-color: rgb(122, 11, 11);
}
</style>