<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>:loading="true"</b> for showing loading animation</span>
      <div>
        <q-button :loading="isLoading">Loading</q-button>
        <q-button
          theme="secondary"
          :loading="isLoading"
        >Loading</q-button>

        <q-button
          theme="link"
          :loading="isLoading"
        >Loading</q-button>

        <q-button
          type="icon"
          icon="q-icon-cloud-upload"
          :loading="isLoading"
        />

        <q-button
          theme="secondary"
          type="icon"
          icon="q-icon-pic"
          :loading="isLoading"
        />
      </div>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >add prop <b>:loading="true"</b> for showing loading animation</span>
      <div>
        <q-button
          size="small"
          icon="q-icon-cloud-upload"
          :loading="isLoading"
        />

        <q-button
          theme="secondary"
          type="icon"
          size="small"
          icon="q-icon-pic"
          :loading="isLoading"
        />
      </div>
    </div>

    <div class="block">
      <span class="demonstration">Try!</span>
      <div>
        <q-button @click="handleLoadingChange">
          Switch Loading
        </q-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      isLoading: false
    };
  },

  methods: {
    handleLoadingChange() {
      this.isLoading = !this.isLoading;
    }
  }
};
</script>
