<template>
  <div>
    <div class="dummy" />
    <div class="block">
      <span class="demonstration">Default ContextMenu</span>
      <q-context-menu
        ref="contextMenu"
        root-selector="#root > div"
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
        root-selector="#root > div"
        :menu-items="menuItems"
        position="right"
        @action="handleAction"
      />
    </div>

    <div class="block">
      <span class="demonstration">ContextMenu with custom slot</span>
      <q-context-menu
        ref="contextMenu"
        root-selector="#root > div"
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
        root-selector="#root > div"
        :menu-items="menuItems"
        position="right"
        @action="handleAction"
      >
        <q-button>Open right menu please</q-button>
      </q-context-menu>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >ContextMenu appended to body <br />(you can set <b>root-id</b> prop if
        you have custom scroll)</span>
      <div class="overflowed">
        <q-context-menu
          root-selector="#root > div"
          append-to-body
          :menu-items="menuItems"
          @action="handleAction"
        />
      </div>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >ContextMenu in right side (position="right") appended to body
        <br />(you can set <b>root-id</b> prop if you have custom scroll)</span>
      <div class="overflowed">
        <q-context-menu
          root-selector="#root > div"
          append-to-body
          position="right"
          :menu-items="menuItems"
          @action="handleAction"
        />
      </div>
    </div>
    <div class="dummy" />
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
.overflowed {
  position: relative;
  overflow: hidden;
}

.dummy {
  padding-bottom: 25vh;
}
</style>
