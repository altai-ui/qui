<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >Pass <b>icon</b> key with class string to menuItems object</span>
      <q-context-menu
        ref="contextMenu"
        :menu-items="menuItems"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          action: 'action1',
          name: 'Menu item 1',
          icon: 'q-icon-account'
        },
        {
          action: 'action2',
          name: 'Menu item 2',
          icon: 'q-icon-bell'
        },
        {
          action: 'action3',
          name: 'Menu item 3',
          icon: 'q-icon-pic'
        }
      ]
    };
  },

  methods: {
    handleAction(action) {
      console.log(action);
    }
  }
};
</script>

<style lang="scss" scoped>
.overflowed {
  position: relative;
  overflow: hidden;
}

.dummy {
  padding-bottom: 1000px;
}
</style>
