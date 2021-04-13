<template>
  <div
    class="q-upload-drop-zone"
    :class="classes"
    tabindex="0"
    @dragenter.prevent
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
  >
    <span
      class="q-upload-drop-zone__icon"
      :class="icon"
    />
    <div class="q-upload-drop-zone__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'QUploadDropZone',
  componentName: 'QUploadDropZone',

  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    textUploadFile: {
      type: String,
      default: null
    },
    textReplaceFile: {
      type: String,
      default: null
    },
    textLoadingFile: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isDragover: false
    };
  },

  computed: {
    classes() {
      return {
        'q-upload-drop-zone_is-dragover': this.isDragover,
        'q-upload-drop-zone_is-disabled': this.isDisabled,
        'q-upload-drop-zone_is-loading': this.isLoading
      };
    },

    icon() {
      if (this.isLoading) return 'q-icon-reverse';

      return this.isDisabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    },

    text() {
      if (this.isLoading)
        return this.textLoadingFile ?? this.$t('QUpload.loading');

      return this.value
        ? this.textReplaceFile ?? this.$t('QUpload.replaceFile')
        : this.textUploadFile ?? this.$t('QUpload.uploadFile');
    }
  },

  methods: {
    handleDrop({ dataTransfer, target }) {
      if (this.isDisabled) return;
      if (this.isDragover) this.isDragover = false;

      const sourceFile = (dataTransfer ?? target)?.files?.[0];

      this.$emit('drop', sourceFile);
    },

    handleDragover() {
      if (!this.isDisabled) this.isDragover = true;
    },

    handleDragleave() {
      this.isDragover = false;
    }
  }
};
</script>
