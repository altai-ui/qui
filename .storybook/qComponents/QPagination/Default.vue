<template>
  <div>
    <div class="block">
      <span class="demonstration">with <b>total</b> and <b>page-size</b></span>

      <q-pagination
        :total="999"
        :page-size="10"
        :current-page="page"
        @current-change="handleCurrentPageChange"
        @prev-click="handleEvent"
        @next-click="handleEvent"
        @quick-prev-click="handleEvent"
        @quick-next-click="handleEvent"
      />
    </div>

    <br /><br />

    <div class="block">
      <span class="demonstration">with <b>page-count</b></span>

      <q-pagination
        :page-count="100"
        :current-page="page"
        @current-change="handleCurrentPageChange"
        @prev-click="handleEvent"
        @next-click="handleEvent"
        @quick-prev-click="handleEvent"
        @quick-next-click="handleEvent"
      />
    </div>

    <br /><br />

    <div class="block">
      <span class="demonstration">with <b>disabled</b></span>

      <q-pagination
        disabled
        :page-count="100"
        :current-page="page"
        @current-change="handleCurrentPageChange"
        @prev-click="handleEvent"
        @next-click="handleEvent"
        @quick-prev-click="handleEvent"
        @quick-next-click="handleEvent"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    };
  },

  methods: {
    handleCurrentPageChange(page) {
      this.page = page;
    },

    handleEvent(...args) {
      console.log(...args);
    }
  }
};
</script>
