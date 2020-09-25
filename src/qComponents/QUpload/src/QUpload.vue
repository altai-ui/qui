<template>
  <div class="q-upload">
    <div
      class="q-upload-drag"
      :class="classes"
      @dragenter.prevent
      @drop.prevent="processFile"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="isDragover = false"
      @click="handleUploadClick"
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
      @change="processFile"
    />

    <div
      v-if="value"
      class="q-upload-file"
      :title="fileTitle"
    >
      <div class="q-icon-file q-upload-file__file" />
      <div class="q-upload-file__name">{{ preparedFileName }}</div>

      <button
        v-if="clearable && !disabled"
        type="button"
        class="q-icon-close q-upload-file__remove"
        @click="handleRemoveFileBtnClick"
      />
    </div>
  </div>
</template>

<script>
import emitter from '../../mixins/emitter';

const MAX_VISIBLE_FILE_NAME_LENGTH = 23;

export default {
  name: 'QUpload',

  mixins: [emitter],

  model: {
    prop: 'value',
    event: 'change'
  },

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    qForm: {
      default: ''
    },
    qFormItem: {
      default: ''
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
      default: 'загрузить файл'
    },
    textReplaceFile: {
      type: String,
      default: 'заменить файл'
    },
    textLoadingFile: {
      type: String,
      default: 'загрузка'
    },
    onSelectFile: {
      type: Function,
      default: null
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
    classes() {
      return {
        'q-upload-drag_is-filled': this.value,
        'q-upload-drag_is-dragover': this.isDragover,
        'q-upload-drag_is-disabled': this.disabled,
        'q-upload-drag_is-loading': this.isFileLoading
      };
    },

    uploadDragIcon() {
      if (this.isFileLoading) return 'q-icon-reverse';

      return this.disabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    },

    uploadDragText() {
      if (this.isFileLoading) return this.textLoadingFile;

      return this.value ? this.textReplaceFile : this.textUploadFile;
    },

    fileName() {
      return this.value?.name ?? this.value?.url ?? '';
    },

    isTitleShown() {
      return this.fileName.length > MAX_VISIBLE_FILE_NAME_LENGTH;
    },

    preparedFileName() {
      const name = this.fileName;

      return this.isTitleShown
        ? `${name.slice(0, 10)}...${name.slice(-10)}`
        : name;
    },

    fileTitle() {
      return this.isTitleShown ? this.fileName : '';
    }
  },

  watch: {
    value(value) {
      if (!this.validateEvent) return;
      this.dispatch('ElFormItem', 'el.form.change', value);
      this.dispatch('QFormItem', 'q.form.change', value);
    }
  },

  methods: {
    handleUploadClick() {
      if (this.disabled || this.isFileLoading) return;

      const { fileInput } = this.$refs;
      fileInput.value = null;
      fileInput.click();
    },

    async processFile({ dataTransfer, target }) {
      if (this.disabled) return;
      if (this.isDragover) this.isDragover = false;

      const sourceFile = (dataTransfer ?? target)?.files?.[0];

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
      if (!this.disabled) this.isDragover = true;
    }
  }
};
</script>
