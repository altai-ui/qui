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
      :accept="accept.toString()"
      tabindex="-1"
      @change="processFile"
    />

    <template v-if="!multiple">
      <q-upload-file-single
        v-if="value"
        :value="value"
        :is-loading="isLoading"
        :is-disabled="isDisabled"
        :is-clearable="clearable"
        @clear="handleClear"
        @abort="handleAbort"
      />
    </template>
    <template v-else> multiple </template>
  </div>
</template>

<script>
import { isNil } from 'lodash-es';

import QUploadDropZone from './QUploadDropZone';
import QUploadFileSingle from './QUploadFileSingle';

export default {
  name: 'QUpload',
  componentName: 'QUpload',

  components: {
    QUploadDropZone,
    QUploadFileSingle
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
    multiple: {
      type: Boolean,
      default: false
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
      isDragover: false
    };
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
      if (this.isDragover) this.isDragover = false;

      const sourceFile = (dataTransfer ?? target)?.files?.[0];

      this.$emit('select', sourceFile);
    },

    handleClear() {
      this.$refs.fileInput.value = null;
      this.$emit('clear');
    },

    handleAbort() {
      this.$refs.fileInput.value = null;
      this.$emit('abort');
    }
  }
};
</script>
