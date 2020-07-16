<template>
  <div>
    <div class="block">
      <span class="demonstration">Default Tag</span>
      <q-tag
        v-for="tag in tags"
        :key="tag.name"
        :type="tag.type"
      >
        {{ tag.name }}
      </q-tag>
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>closable</b></span>
      <q-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        :type="tag.type"
        @close="handleCloseClick"
      >
        {{ tag.name }}
      </q-tag>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      tags: [
        {
          name: 'Tag 1',
          type: ''
        },
        {
          name: 'Tag 2',
          type: 'success'
        },
        {
          name: 'Tag 3',
          type: 'info'
        },
        {
          name: 'Tag 4',
          type: 'warning'
        },
        {
          name: 'Tag 5',
          type: 'danger'
        }
      ]
    };
  },
  methods: {
    handleCloseClick() {
      alert('Close tag clicked');
    }
  }
};
</script>