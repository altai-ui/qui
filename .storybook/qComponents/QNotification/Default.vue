<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">notification with type</span>

      <q-button @click="openWithType('success')">
        success
      </q-button>
      <q-button @click="openWithType('error')">
        error
      </q-button>
      <q-button @click="openWithType('info')">
        info
      </q-button>
      <q-button @click="openWithType('warning')">
        warning
      </q-button>
    </div>

    <div class="block">
      <span class="demonstration">extended examples</span>

      <q-button @click="openVNode">
        VNode
      </q-button>
      <q-button @click="openLongText">
        long text
      </q-button>
      <q-button @click="openWithoutClose">
        Won't close automatically
      </q-button>
    </div>

    <div class="block">
      <span class="demonstration">notification methods</span>

      <q-button @click="closeAll">
        close all
      </q-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openWithType(type) {
      this.$notify({
        message: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
        type
      });
    },

    openVNode() {
      const h = this.$createElement;

      this.$notify({
        message: h('i', { style: 'color: teal' }, 'This is a reminder')
      });
    },

    openLongText() {
      this.$notify({
        message:
          "This is a very very very very very very very very long message that does not automatically close so that you can read all what's written here"
      });
    },

    openWithoutClose() {
      this.$notify({
        message: "Won't close automatically",
        duration: 0
      });
    },

    closeAll() {
      this.$notify.closeAll();
    }
  }
};
</script>
