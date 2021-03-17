<template>
  <div
    class="q-upload"
    :class="wrapperClasses"
  >
    <div class="q-upload__drag-wrapper">
      <div
        class="q-upload-drag"
        :class="uploadDragClasses"
        tabindex="0"
        @dragenter.prevent
        @drop.prevent="processFiles"
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

      <upload-file
        v-if="false"
        :file-name="preparedFileName"
        :status="singleFile.status"
        :percentage="singleFile.percentage"
        class="q-upload__file"
        @remove="handleRemoveFileBtnClick"
      />
    </div>

    <div class="q-upload-list">
      <div class="q-upload-list__inner">
        <div class="q-upload-list__header">
          <div class="q-upload-list__title">Загруженные файлы</div>
          <q-button
            class="q-upload-list__clear-btn"
            type="icon"
            icon="q-icon-trash-bin"
            theme="secondary"
            size="small"
            :disabled="disabled"
            title="Очистить список файлов"
            circle
            @click="handleRemoveFileBtnClick"
          />
        </div>

        <q-scrollbar wrap-class="q-upload-list__items">
          <upload-file
            v-for="file in value"
            :key="file.id"
            :file-name="file.name"
            :percentage="file.percentage"
            :status="file.status"
            :error="file.error"
            :disabled="disabled"
            class="q-upload-list__item"
            @remove="handleRemoveFile(file.id)"
          />
        </q-scrollbar>
      </div>
    </div>

    <input
      ref="fileInput"
      class="q-upload__input"
      type="file"
      :accept="accept.toString()"
      tabindex="-1"
      :multiple="multiple"
      @change="processFiles"
    />
  </div>
</template>

<script>
import UploadFile from './components/UploadFile';
import emitter from '../../mixins/emitter';

const MAX_VISIBLE_FILE_NAME_LENGTH = 23;

export default {
  name: 'QUpload',

  componentName: 'QUpload',

  components: {
    UploadFile
  },

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
      type: [Object, Array, File, FileList],
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

    onSelectFiles: {
      type: Function,
      default: null
    },

    multiple: {
      type: Boolean,
      default: false
    },

    filesPosition: {
      type: String,
      default: 'right',
      validator: value => ['right', 'bottom'].includes(value)
    }
  },

  data() {
    return {
      isDragover: false,
      isFilesListShown: false
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    wrapperClasses() {
      return {
        'q-upload_opened-right':
          this.multiple &&
          this.filesPosition === 'right' &&
          this.isFilesListShown,
        'q-upload_opened-bottom':
          this.multiple &&
          this.filesPosition === 'bottom' &&
          this.isFilesListShown
      };
    },

    uploadDragClasses() {
      return {
        'q-upload-drag_is-filled': this.value,
        'q-upload-drag_is-dragover': this.isDragover,
        'q-upload-drag_is-disabled': this.isDisabled
      };
    },

    uploadDragIcon() {
      return this.isDisabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    },

    uploadDragText() {
      return this.value
        ? this.textReplaceFile ?? this.$t('QUpload.replaceFile')
        : this.textUploadFile ?? this.$t('QUpload.uploadFile');
    },

    singleFile() {
      if (this.multiple && this.value.length > 1) return false;
      return this.value?.[0] ?? {};
    },

    fileName() {
      if (!this.value) return '';
      return this.value?.[0]?.name ?? this.value?.[0]?.url ?? '';
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
    value() {
      if (this.validateEvent) this.qFormItem?.validateField('change');
    }
  },

  mounted() {
    if (this.multiple && this.value.length) {
      this.isFilesListShown = true;
    }
  },

  methods: {
    handleUploadClick() {
      if (this.isDisabled) return;

      const { fileInput } = this.$refs;
      fileInput.value = null;
      fileInput.click();
    },

    async processFiles({ dataTransfer, target }) {
      if (this.isDisabled) return;
      if (this.isDragover) this.isDragover = false;

      this.isFilesListShown = true;

      const sourceFiles = (dataTransfer ?? target)?.files;

      if (typeof this.onSelectFiles !== 'function') {
        this.$emit('change', sourceFiles);
        return;
      }

      try {
        const files = await this.onSelectFiles(sourceFiles);
        this.$emit('change', files);
      } catch {
        // do nothing
      }
    },

    handleRemoveFileBtnClick() {
      this.$refs.fileInput.value = null;
      this.isFilesListShown = false;
      this.$emit('change', null);
    },

    handleDragover() {
      if (!this.isDisabled) {
        this.isDragover = true;
      }
    },

    handleRemoveFile(fileId) {
      this.$emit('remove', fileId);

      this.$nextTick(() => {
        if (this.value.length === 0) {
          this.$refs.fileInput.value = null;
          this.isFilesListShown = false;
        }
      });
    }
  }
};
</script>
