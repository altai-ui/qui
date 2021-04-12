<template>
  <div class="q-upload">
    <div
      class="q-upload-drag"
      :class="classes"
      tabindex="0"
      @dragenter.prevent
      @drop.prevent="processFile"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="isDragover = false"
      @click="handleUploadClick"
      @keyup.enter="handleUploadClick"
    >
      <span
        class="q-upload-drag__icon"
        :class="uploadDragIcon"
      />
      <div class="q-upload-drag__text">{{ uploadDragText }}</div>
    </div>

    <input
      ref="fileInput"
      class="q-upload__input"
      type="file"
      :accept="accept.toString()"
      tabindex="-1"
      @change="processFile"
    />

    <div
      v-if="fileName"
      class="q-upload-file"
      :title="fileTitle"
    >
      <div class="q-icon-file q-upload-file__file" />
      <div class="q-upload-file__name">{{ preparedFileName }}</div>

      <button
        v-if="clearable && !isDisabled && !isLoading"
        type="button"
        class="q-upload-file__btn q-icon-trash-bin"
        @click="handleRemoveFileBtnClick"
      />

      <template v-if="isLoading">
        <button
          type="button"
          class="q-upload-file__btn q-icon-close"
          @click="handleAbortUploadingBtnClick"
        />

        <div class="q-upload-file__loader">
          <div
            class="q-upload-file__bar"
            :style="barStyle"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash-es';

import emitter from '../../mixins/emitter';

const MAX_VISIBLE_FILE_NAME_LENGTH = 23;

export default {
  name: 'QUpload',
  componentName: 'QUpload',

  mixins: [emitter],

  model: {
    prop: 'value',
    event: 'change'
  },

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  props: {
    value: {
      type: [Object, File],
      default: null
    },
    /**
     * the accept attribute value is a string or an array that defines the file types the file input should accept.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
     */
    accept: {
      type: [String, Array],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    validateEvent: {
      type: Boolean,
      default: true
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
      selectedFile: null,
      isDragover: false
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    isLoading() {
      return !isNil(this.value?.loading);
    },

    fileName() {
      return this.value?.name ?? null;
    },

    classes() {
      return {
        'q-upload-drag_is-filled': this.value,
        'q-upload-drag_is-dragover': this.isDragover,
        'q-upload-drag_is-disabled': this.isDisabled,
        'q-upload-drag_is-loading': this.isLoading
      };
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

    uploadDragIcon() {
      if (this.isLoading) return 'q-icon-reverse';

      return this.isDisabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    },

    uploadDragText() {
      if (this.isLoading)
        return this.textLoadingFile ?? this.$t('QUpload.loading');

      return this.value
        ? this.textReplaceFile ?? this.$t('QUpload.replaceFile')
        : this.textUploadFile ?? this.$t('QUpload.uploadFile');
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
      return this.isTitleShown && !this.fileName ? this.fileName : '';
    }
  },

  watch: {
    value() {
      if (this.validateEvent) this.qFormItem?.validateField('change');
    }
  },

  methods: {
    handleUploadClick() {
      if (this.isDisabled || this.isLoading) return;

      const { fileInput } = this.$refs;
      fileInput.value = null;
      fileInput.click();
    },

    async processFile({ dataTransfer, target }) {
      if (this.isDisabled) return;
      if (this.isDragover) this.isDragover = false;

      const sourceFile = (dataTransfer ?? target)?.files?.[0];

      this.$emit('select', sourceFile);
    },

    handleRemoveFileBtnClick() {
      this.$refs.fileInput.value = null;
      this.$emit('clear');
    },

    handleAbortUploadingBtnClick() {
      this.$refs.fileInput.value = null;
      this.$emit('abort');
    },

    handleDragover() {
      if (!this.isDisabled) this.isDragover = true;
    }
  }
};
</script>
