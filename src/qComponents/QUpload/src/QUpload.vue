<template>
  <div :class="wrapperClasses">
    <div
      class="q-upload-drag"
      :class="uploadDragClasses"
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

      <div
        v-if="value && !multiple"
        class="q-upload-file"
        :title="fileTitle"
      >
        <div class="q-icon-file q-upload-file__file" />
        <div class="q-upload-file__name">{{ preparedFileName }}</div>

        <button
          v-if="clearable && !isDisabled"
          type="button"
          class="q-icon-close q-upload-file__remove"
          @click="handleRemoveFileBtnClick"
        />
      </div>
    </div>

    <div
      v-show="multiple"
      class="q-upload-list"
    >
      <div class="q-upload-list__inner">
        <div class="q-upload-list__header">
          <div class="q-upload-list__title">Загруженные файлы</div>
          <q-button
            class="q-upload-list__clear-btn"
            type="icon"
            icon="q-icon-trash-bin"
            theme="secondary"
            size="small"
            circle
            @click="handleRemoveFileBtnClick"
          />
        </div>

        <q-scrollbar wrap-class="q-upload-list__items">
          <div
            v-for="(file, index) in 2"
            :key="index"
            class="file-panel"
          >
            <span class="file-panel__icon q-icon-file" />

            <div class="file-panel__middle">
              <div class="file-panel__name">Filemane.csv</div>
            </div>

            <button
              type="button"
              class="file-panel__remove-btn q-icon-trash-bin"
            />
          </div>

          <div class="file-panel file-panel_loading">
            <span class="file-panel__icon q-icon-reverse" />

            <div class="file-panel__middle">
              <div class="file-panel__name">Filemane.csv</div>
              <div class="file-panel__progress">
                <div
                  class="file-panel__progress-line"
                  style="width: 70%;"
                />
              </div>
            </div>

            <button
              type="button"
              class="file-panel__remove-btn q-icon-trash-bin"
            />
          </div>

          <div class="file-panel file-panel_error">
            <span class="file-panel__icon q-icon-alert-fill" />

            <div class="file-panel__middle">
              <div class="file-panel__name">Filemane.csv</div>
              <div class="file-panel__error-text">
                Текст ошибки
              </div>
            </div>

            <button
              type="button"
              class="file-panel__remove-btn q-icon-trash-bin"
            />
          </div>

          <div class="file-panel file-panel_error">
            <span class="file-panel__icon q-icon-alert-fill" />

            <div class="file-panel__middle">
              <div class="file-panel__name">Filemane.csv</div>
              <div class="file-panel__error-text">
                Текст ошибки с очень длинным названием
              </div>
            </div>

            <button
              type="button"
              class="file-panel__remove-btn q-icon-trash-bin"
            />
          </div>
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
      @change="processFile"
    />
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
    },

    onSelectFile: {
      type: Function,
      default: null
    },

    multiple: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isDragover: false,
      isFileLoading: false
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    wrapperClasses() {
      return {
        'q-upload': true,
        'q-upload_opened-list': this.value && this.multiple
      };
    },

    uploadDragClasses() {
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
      if (this.isFileLoading)
        return this.textLoadingFile ?? this.$t('QUpload.loading');
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
      if (!this.isDisabled) {
        this.isDragover = true;
      }
    }
  }
};
</script>
