<template>
  <div>
    <div class="block">
      <span class="demonstration">Default drawer</span>
      <div class="radio">
        <q-radio-group v-model="position">
          <q-radio label="left">left to right</q-radio>
          <q-radio label="right">right to left</q-radio>
        </q-radio-group>
      </div>

      <q-button @click="drawer = true">
        open
      </q-button>

      <q-drawer
        width="300px"
        title="I'm drawer's title!"
        :visible.sync="drawer"
        :position="position"
        :before-close="handleClose"
      >
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
        I'm drawer's slot <br />
      </q-drawer>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >Drawer with falsy <b>:wrapper-closable</b> prop and truthful
        <b>destroy-on-close</b> props</span>

      <q-button @click="drawer1 = true">
        open
      </q-button>

      <q-drawer
        width="300px"
        title="I'm drawer's1 title!"
        :visible.sync="drawer1"
        :position="position"
        :before-close="handleClose"
        :wrapper-closable="false"
        destroy-on-close
      >
        I'm drawer's slot
      </q-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      drawer1: false,
      position: 'left'
    };
  },

  methods: {
    async handleClose(done) {
      try {
        await this.$message({
          title: 'Are you sure you want to close this?',
          message: '',
          confirmButtonText: 'Yes',
          cancelButtonText: 'Nope'
        });

        done();
      } catch {
        // do nothing
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.radio {
  padding-bottom: 16px;
}
</style>
