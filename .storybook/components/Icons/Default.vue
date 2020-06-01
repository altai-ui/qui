<template>
  <div class="icons">
    <div
      v-for="[name, key] in iconsList"
      :key="key"
    >
      <span
        class="icons__icon"
        :class="name"
      />

      <input
        class="icons__input"
        type="text"
        :value="key"
        @click="handleInputClick"
      />
      <input
        class="icons__input"
        type="text"
        :value="name"
        @click="handleInputClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconsList: [
        ['q-icon-account', '\\e900'],
        ['q-icon-account-group', '\\e901'],
        ['q-icon-account-settings', '\\e902'],
        ['q-icon-arrow-left', '\\e903'],
        ['q-icon-arrow-right', '\\e904'],
        ['q-icon-bell', '\\e905'],
        ['q-icon-bell-ring', '\\e906'],
        ['q-icon-calendar-refresh', '\\e907'],
        ['q-icon-calendar', '\\e908'],
        ['q-icon-check', '\\e909'],
        ['q-icon-checkbox-square-multiply-non', '\\e90a'],
        ['q-icon-close', '\\e90b'],
        ['q-icon-cloud-upload', '\\e90c'],
        ['q-icon-diagram-round', '\\e90d'],
        ['q-icon-dots-3-horizontal', '\\e90e'],
        ['q-icon-envelope-edit', '\\e90f'],
        ['q-icon-file', '\\e910'],
        ['q-icon-graph-gisto', '\\e911'],
        ['q-icon-lock', '\\e912'],
        ['q-icon-logout', '\\e913'],
        ['q-icon-minus', '\\e914'],
        ['q-icon-pause', '\\e915'],
        ['q-icon-pic', '\\e916'],
        ['q-icon-proceed-2', '\\e917'],
        ['q-icon-proceed-1', '\\e918'],
        ['q-icon-question-mark', '\\e919'],
        ['q-icon-question', '\\e91a'],
        ['q-icon-reverse', '\\e91b'],
        ['q-icon-rubles', '\\e91c'],
        ['q-icon-search', '\\e91d'],
        ['q-icon-settings-vertical', '\\e91e'],
        ['q-icon-stop-2', '\\e91f'],
        ['q-icon-stop-1', '\\e920'],
        ['q-icon-trash-bin', '\\e921'],
        ['q-icon-triangle-down', '\\e922'],
        ['q-icon-triangle-up', '\\e923'],
        ['q-icon-view-list', '\\e924'],
        ['q-icon-wallet', '\\e925'],
        ['q-icon-wifi', '\\e926'],
        ['q-icon-triangle-right', '\\e927'],
        ['q-icon-arrow-down', '\\e928'],
        ['q-icon-arrow-up', '\\e929'],
        ['q-icon-double-triangle-left', '\\e92a'],
        ['q-icon-double-triangle-right', '\\e92b'],
        ['q-icon-triangle-left', '\\e92c'],
        ['q-icon-eye', '\\e92d'],
        ['q-icon-info', '\\e92e'],
        ['q-icon-attention-mark', '\\e92f'],
        ['q-icon-lock-fill', '\\e930'],
        ['q-icon-database-arrow-down', '\\e931'],
        ['q-icon-router', '\\e932'],
        ['q-icon-eye-close', '\\e933'],
        ['q-icon-target', '\\e934'],
        ['q-icon-comment', '\\e935'],
        ['q-icon-router-arrow-down', '\\e936']
      ]
    };
  },

  methods: {
    handleInputClick({ target }) {
      target.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        // do nothing
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icons {
  display: grid;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
  grid-gap: 32px 16px;
  grid-template-columns: repeat(5, 120px);

  &__icon {
    font-size: 40px;
    color: var(--color-primary-black);
  }

  &__input {
    width: 100%;
  }
}
</style>
