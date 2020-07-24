<template>
  <div>
    <div style="padding-top: 500px"></div>
    <div class="block">
      <span class="demonstration">Default ContextMenu</span>
      <q-context-menu
        ref="contextMenu"
        class="default-context"
        :menu-items="menuItems"
        @action="handleAction"
      />
    </div>

    <div class="block">
      <span
        class="demonstration"
      >ContextMenu in right side (position="right")</span>
      <q-context-menu
        ref="contextMenu"
        class="default-context"
        :menu-items="menuItems"
        position="right"
        @action="handleAction"
      />
    </div>

    <div class="block">
      <span class="demonstration">ContextMenu with custom slot</span>
      <q-context-menu
        ref="contextMenu"
        :menu-items="menuItems"
        @action="handleAction"
      >
        <q-button>Open menu please</q-button>
      </q-context-menu>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >ContextMenu in right side (position="right") with custom slot</span>
      <q-context-menu
        ref="contextMenu"
        :menu-items="menuItems"
        position="right"
        @action="handleAction"
      >
        <q-button>Open right menu please</q-button>
      </q-context-menu>
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
          name: 'Menu item 1'
        },
        {
          action: 'action2',
          name: 'Menu item 2 Menu item 2 Menu item 2 Menu item 2'
        },
        {
          action: 'action3',
          name: 'Menu item 3'
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
.default-context {
  display: inline-block;
  width: 40px;
}
</style>
