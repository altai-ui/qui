<template>
  <div class="q-upload">
    <q-upload-drop-zone
      :is-disabled="isDisabled"
      :is-loading="isLoading"
      :text-upload-file="textUploadFile"
      :text-replace-file="textReplaceFile"
      :text-loading-file="textLoadingFile"
      @click.native="handleUploadClick"
      @keyup.enter.native="handleUploadClick"
    />

    <input
      ref="fileInput"
      class="q-upload__input"
      type="file"
      tabindex="-1"
      :accept="accept.toString()"
      :multiple="multiple"
      @change="processFile"
    />

    <q-upload-file-multiple
      v-if="multiple"
      :value="value"
      :is-disabled="isDisabled"
      :is-clearable="clearable"
      @clear-all="handleClearAll"
      @clear="handleClear"
      @abort="handleAbort"
    />
    <template v-else>
      <q-upload-file-single
        v-if="value"
        :value="value"
        :is-loading="isLoading"
        :is-disabled="isDisabled"
        :is-clearable="clearable"
        :text-uploaded-files="textUploadedFiles"
        @clear="handleClear"
        @abort="handleAbort"
      />
    </template>
  </div>
</template>

<script>
import { isNil } from 'lodash-es';

import { randId } from '../../helpers';

import QUploadDropZone from './QUploadDropZone';
import QUploadFileSingle from './QUploadFileSingle';
import QUploadFileMultiple from './QUploadFileMultiple';

export default {
  name: 'QUpload',
  componentName: 'QUpload',

  components: {
    QUploadDropZone,
    QUploadFileSingle,
    QUploadFileMultiple
  },

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
      type: [Object, Array],
      default: null
    },
    /**
     * whether uploading multiple files is permitted
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * maximum number of uploads allowed
     */
    limit: {
      type: Number,
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
    /**
     * whether to disable upload
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show clear button
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * whether to trigger form validation
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * text of text upload file
     */
    textUploadFile: {
      type: String,
      default: null
    },
    /**
     * text of text replace file
     */
    textReplaceFile: {
      type: String,
      default: null
    },
    /**
     * text of text loading file
     */
    textLoadingFile: {
      type: String,
      default: null
    },

    /**
     * text of text uploaded files
     */
    textUploadedFiles: {
      type: String,
      default: null
    }
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    isLoading() {
      return !this.multiple && !isNil(this.value?.loading);
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

      const fileList = (dataTransfer ?? target)?.files;

      if (!this.multiple) {
        /**
         * triggers when a file is selected
         */
        this.$emit('select', fileList?.[0], randId());
        return;
      }

      if (this.limit && this.value.length + fileList.length > this.limit) {
        /**
         * triggers when limit is exceeded
         */
        this.$emit('exceed');
        return;
      }

      const preparedFileList = Array.from(fileList).map(sourceFile => {
        const fileId = randId();
        /**
         * triggers when a file is selected
         */
        this.$emit('select', sourceFile, fileId);

        return { id: fileId, sourceFile };
      });

      /**
       * triggers when multiple files are selected
       */
      this.$emit('select-all', preparedFileList);
    },

    resetNativeInput() {
      this.$refs.fileInput.value = null;
    },

    handleClearAll() {
      this.resetNativeInput();
      /**
       * triggers when clear all files button clicked
       */
      this.$emit('clear-all');
    },

    handleClear(fileId) {
      this.resetNativeInput();
      /**
       * triggers when the file clear button clicked
       */
      this.$emit('clear', fileId);
    },

    handleAbort(fileId) {
      this.resetNativeInput();
      /**
       * triggers when the file abort button clicked
       */
      this.$emit('abort', fileId);
    }
  }
};
</script>
