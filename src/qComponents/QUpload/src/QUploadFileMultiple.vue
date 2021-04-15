<template>
  <div
    class="q-upload-file-multiple"
    :class="classes"
  >
    <div class="q-upload-file-multiple__title">
      {{ title }}

      <q-button
        v-if="isClearable"
        class="q-upload-file-multiple__clear-all"
        circle
        type="icon"
        icon="q-icon-trash-bin"
        size="small"
        theme="secondary"
        :disabled="isDisabled"
        @click="handleRemoveAllFilesBtnClick"
      />
    </div>

    <q-scrollbar
      visible
      view-class="q-dialog__view"
    >
      <div class="q-upload-file-multiple__inner">
        <div
          v-for="line in fileList"
          :key="line.file.id"
          class="q-upload-file-multiple__line"
          :title="line.file.name"
        >
          <div
            class="q-upload-file-multiple__icon"
            :class="{
              'q-icon-reverse': line.isLoading,
              'q-icon-file': !line.isLoading
            }"
          />
          <div class="q-upload-file-multiple__name">
            {{ line.file.name }}

            <div
              v-if="line.isLoading"
              class="q-upload-file-multiple__loader"
            >
              <div
                class="q-upload-file-multiple__bar"
                :style="line.barStyle"
              ></div>
            </div>
          </div>

          <div
            v-if="isDisabled"
            class="q-upload-file-multiple__action q-icon-lock"
          ></div>
          <button
            v-else-if="line.isLoading"
            type="button"
            class="q-upload-file-multiple__action q-icon-close"
            @click="handleAbortUploadingBtnClick(line.file.id)"
          />
          <button
            v-else-if="isClearable"
            type="button"
            class="q-upload-file-multiple__action q-icon-trash-bin"
            @click="handleRemoveFileBtnClick(line.file.id)"
          />
        </div>
      </div>
    </q-scrollbar>
  </div>
</template>

<script>
import { isNil } from 'lodash-es';

const calcBarStyle = loading => {
  let progress = loading ?? null;

  if (progress === null) return {};

  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;

  return {
    width: `${progress}%`
  };
};

export default {
  name: 'QUploadFileMultiple',
  componentName: 'QUploadFileMultiple',

  props: {
    value: {
      type: Array,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isClearable: {
      type: Boolean,
      default: true
    },
    textUploadedFiles: {
      type: String,
      default: null
    }
  },

  computed: {
    title() {
      return this.textUploadedFiles ?? this.$t('QUpload.uploadedFiles');
    },

    fileList() {
      if (!this.value) return [];

      return this.value.filter(Boolean).map(file => ({
        file,
        isLoading: !isNil(file.loading),
        barStyle: calcBarStyle(file?.loading)
      }));
    },

    classes() {
      return {
        'q-upload-file-multiple_shown': Boolean(this.fileList.length)
      };
    }
  },

  methods: {
    handleRemoveAllFilesBtnClick() {
      this.$emit('clear-all');
    },

    handleRemoveFileBtnClick(fileId) {
      this.$emit('clear', fileId);
    },

    handleAbortUploadingBtnClick(fileId) {
      this.$emit('abort', fileId);
    }
  }
};
</script>
