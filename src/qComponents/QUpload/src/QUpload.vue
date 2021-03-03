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
      :multiple="multiple"
      @change="processFile"
    />

    <pre>{{ value }}</pre>
    <div
      v-if="value"
      class="q-upload-files"
      :title="fileTitle"
    >
      <div class="q-icon-file q-upload-files__file" />
      <div class="q-upload-files__name">{{ preparedFileName }}</div>

      <template v-if="isOneFile">
        <button
          v-if="clearable && !isDisabled"
          type="button"
          class="q-icon-close q-upload-files__remove"
          @click="handleRemoveFileBtnClick"
        />
      </template>
      <template v-else>
        <button
          type="button"
          class="q-icon-eye q-upload-files__show-more"
          @click="handleRemoveFileBtnClick"
        />
      </template>
    </div>
  </div>
</template>

<script>
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
      type: [Object, File, FileList],
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
    },
    onSelectFile: {
      type: Function,
      default: null
    },

    drag: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      selectedFile: null,
      isDragover: false,
      isFileLoading: false
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    classes() {
      return {
        'q-upload-drag_is-filled': this.value,
        'q-upload-drag_is-dragover': this.isDragover,
        'q-upload-drag_is-disabled': this.isDisabled,
        'q-upload-drag_is-loading': this.isFileLoading
      };
    },

    uploadDragIcon() {
      if (this.isFileLoading) return 'q-icon-reverse';

      return this.isDisabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    },

    uploadDragText() {
      if (this.isFileLoading) {
        return this.textLoadingFile ?? this.$t('QUpload.loading');
      }

      return this.value
        ? this.textReplaceFile ?? this.$t('QUpload.replaceFile')
        : this.textUploadFile ?? this.$t('QUpload.uploadFile');
    },

    fileName() {
      return this.value?.name ?? this.value?.url ?? '';
    },

    isTitleShown() {
      return this.fileName.length > MAX_VISIBLE_FILE_NAME_LENGTH;
    },

    preparedFileName() {
      if (this.selectedFilesQuantity > 1) {
        return `Загружено ${this.selectedFilesQuantity} файла`;
      }

      const name = this.fileName;

      return this.isTitleShown
        ? `${name.slice(0, 10)}...${name.slice(-10)}`
        : name;
    },

    fileTitle() {
      return this.isTitleShown ? this.fileName : '';
    },

    selectedFilesQuantity() {
      return this.value?.length ?? 0;
    },

    isOneFile() {
      return !this.multiple && this.selectedFilesQuantity === 1 && this.value;
    }
  },

  watch: {
    value() {
      if (this.validateEvent) this.qFormItem?.validateField('change');
    }
  },

  methods: {
    handleUploadClick() {
      if (this.isDisabled || this.isFileLoading) return;

      const { fileInput } = this.$refs;
      fileInput.value = null;
      fileInput.click();
    },

    async processFile({ dataTransfer, target }) {
      if (this.isDisabled) return;
      if (this.isDragover) this.isDragover = false;

      const source = dataTransfer ?? target;

      const sourceFile = !this.multiple ? source?.files?.[0] : source?.files;

      if (typeof this.onSelectFile !== 'function') {
        this.$emit('change', sourceFile);
        return;
      }

      this.isFileLoading = true;

      try {
        const file = await this.onSelectFile(sourceFile);

        this.$emit('change', file);
      } catch {
        // do nothing
      } finally {
        this.isFileLoading = false;
      }
    },

    handleRemoveFileBtnClick() {
      this.$refs.fileInput.value = null;
      this.$emit('change', null);
    },

    handleDragover() {
      if (!this.isDisabled) this.isDragover = true;
    }
  }
};
</script>
