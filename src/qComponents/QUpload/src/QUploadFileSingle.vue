<template>
  <div
    class="q-upload-file-single"
    :title="fileTitle"
  >
    <div class="q-upload-file-single__icon q-icon-file" />
    <div class="q-upload-file-single__name">{{ preparedFileName }}</div>

    <button
      v-if="isClearable && !isDisabled && !isLoading"
      type="button"
      class="q-upload-file-single__btn q-icon-trash-bin"
      @click="handleRemoveFileBtnClick"
    />

    <template v-if="isLoading">
      <button
        type="button"
        class="q-upload-file-single__btn q-icon-close"
        @click="handleAbortUploadingBtnClick"
      />

      <div class="q-upload-file-single__loader">
        <div
          class="q-upload-file-single__bar"
          :style="barStyle"
        ></div>
      </div>
    </template>
  </div>
</template>

<script>
const MAX_VISIBLE_FILE_NAME_LENGTH = 23;

export default {
  name: 'QUploadFileSingle',
  componentName: 'QUploadFileSingle',

  props: {
    value: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isClearable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    fileName() {
      return this.value?.name ?? '';
    },

    barStyle() {
      let loading = this.value?.loading ?? null;

      if (loading === null) return {};

      if (loading < 0) loading = 0;
      if (loading > 100) loading = 100;
      return {
        width: `${loading}%`
      };
    },

    isTitleShown() {
      return this.fileName?.length > MAX_VISIBLE_FILE_NAME_LENGTH;
    },

    preparedFileName() {
      if (!this.fileName) return '';

      const name = this.fileName;
      return this.isTitleShown
        ? `${name.slice(0, 10)}...${name.slice(-10)}`
        : name;
    },

    fileTitle() {
      return this.isTitleShown ? this.fileName : '';
    }
  },

  methods: {
    handleRemoveFileBtnClick() {
      this.$emit('clear');
    },

    handleAbortUploadingBtnClick() {
      this.$emit('abort');
    }
  }
};
</script>
