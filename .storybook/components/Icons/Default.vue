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
        ['q-icon-bell', '\\e905'],
        ['q-icon-bell-ring', '\\e906'],
        ['q-icon-triangle-down', '\\e922'],
        ['q-icon-triangle-up', '\\e923'],
        ['q-icon-triangle-left', '\\e92c'],
        ['q-icon-triangle-right', '\\e927'],
        ['q-icon-double-triangle-left', '\\e92a'],
        ['q-icon-double-triangle-right', '\\e92b'],
        ['q-icon-account', '\\e900'],
        ['q-icon-account-settings', '\\e902'],
        ['q-icon-account-couple-fill', '\\e93b'],
        ['q-icon-settings-vertical', '\\e91e'],
        ['q-icon-arrow-down', '\\e928'],
        ['q-icon-arrow-up', '\\e929'],
        ['q-icon-arrow-right', '\\e904'],
        ['q-icon-arrow-left', '\\e903'],
        ['q-icon-attention-mark', '\\e92f'],
        ['q-icon-alert-stroke', '\\e93a'],
        ['q-icon-alert-fill', '\\e939'],
        ['q-icon-info', '\\e92e'],
        ['q-icon-question-mark', '\\e919'],
        ['q-icon-question', '\\e91a'],
        ['q-icon-rubles-circle', '\\e93c'],
        ['q-icon-proceed-1', '\\e918'],
        ['q-icon-proceed-2', '\\e917'],
        ['q-icon-close', '\\e90b'],
        ['q-icon-check', '\\e909'],
        ['q-icon-minus', '\\e914'],
        ['q-icon-pause', '\\e915'],
        ['q-icon-reverse', '\\e91b'],
        ['q-icon-plus', '\\e937'],
        ['q-icon-router', '\\e932'],
        ['q-icon-router-arrow-down', '\\e936'],
        ['q-icon-calendar', '\\e908'],
        ['q-icon-calendar-refresh', '\\e907'],
        ['q-icon-pic', '\\e916'],
        ['q-icon-checkbox-square-multiply-non', '\\e90a'],
        ['q-icon-file', '\\e910'],
        ['q-icon-menu', '\\e93d'],
        ['q-icon-stop-1', '\\e920'],
        ['q-icon-stop-2', '\\e91f'],
        ['q-icon-view-list', '\\e924'],
        ['q-icon-graph-gisto', '\\e911'],
        ['q-icon-eye', '\\e92d'],
        ['q-icon-eye-close', '\\e933'],
        ['q-icon-search', '\\e91d'],
        ['q-icon-trash-bin', '\\e921'],
        ['q-icon-envelope-edit', '\\e90f'],
        ['q-icon-cloud-upload', '\\e90c'],
        ['q-icon-diagram-round', '\\e90d'],
        ['q-icon-wallet', '\\e925'],
        ['q-icon-lock-fill', '\\e930'],
        ['q-icon-target', '\\e934'],
        ['q-icon-database-arrow-down', '\\e931'],
        ['q-icon-dots-3-horizontal', '\\e90e'],
        ['q-icon-wifi', '\\e926'],
        ['q-icon-logout', '\\e913'],
        ['q-icon-lock', '\\e912'],
        ['q-icon-comment', '\\e935'],
        ['q-icon-credit-card', '\\e938'],
        ['q-icon-login', '\\e940'],
        ['q-icon-piggy-bank-fill', '\\e941'],
        ['q-icon-rubles', '\\e91c'],
        ['q-icon-multiply-fill', '\\e942'],
        ['q-icon-account-group', '\\e901'],
        ['q-icon-menu-2-fill', '\\e943'],
        ['q-icon-eye-fill', '\\e944'],
        ['q-icon-cog-stroke', '\\e945'],
        ['q-icon-pencil-square-stroke', '\\e946'],
        ['q-icon-play', '\\e947'],
        ['q-icon-finish-fill', '\\e93f'],
        ['q-icon-archive-arrow-down', '\\e93e'],
        ['q-icon-wallet-stroke', '\\e949'],
        ['q-icon-change-list', '\\e948'],
        ['q-icon-withdraw-fill', '\\e94b'],
        ['q-icon-info-stroke', '\\e94a'],
        ['q-icon-trash-bin-stroke', '\\e94c'],
        ['q-icon-star', '\\e94d'],
        ['q-icon-save', '\\e94e'],
        ['q-icon-percent', '\\e94f'],
        ['q-icon-filter', '\\e950'],
        ['q-icon-drag-vertical-fill', '\\e951'],
        ['q-icon-diagram-round-stroke', '\\e952'],
        ['q-icon-attach-fill', '\\e953'],
        ['q-icon-account-check-fill', '\\e954']
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
