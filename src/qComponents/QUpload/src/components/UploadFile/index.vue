<template>
  <div :class="wrapperClasses">
    <span
      class="upload-file__icon"
      :class="iconClass"
    />

    <div class="upload-file__middle">
      <div
        class="upload-file__name"
        :title="fileName"
      >{{ fileName }}</div>

      <div
        v-if="status === 'progress'"
        class="upload-file__progress"
      >
        <div
          class="upload-file__progress-line"
          :style="progressStyles"
        />
      </div>

      <div
        v-if="error"
        class="upload-file__error-text"
      >
        {{ error }}
      </div>
    </div>

    <button
      v-if="status === 'progress'"
      type="button"
      class="upload-file__btn q-icon-close"
      @click="$emit('cancel')"
    />
    <button
      v-else
      type="button"
      class="upload-file__btn q-icon-trash-bin"
      @click="$emit('remove')"
    />
  </div>
</template>

<script>
export default {
  name: 'UploadFile',

  props: {
    fileName: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      default: null
    },

    error: {
      type: String,
      default: null
    },

    percentage: {
      type: Number,
      default: null
    }
  },

  computed: {
    wrapperClasses() {
      return {
        'upload-file': true,
        'upload-file_loading': this.status === 'progress',
        'upload-file_error': this.error
      };
    },

    iconClass() {
      if (this.status === 'progress') return 'q-icon-reverse';
      if (this.error) return 'q-icon-alert-fill';

      return 'q-icon-file';
    },

    progressStyles() {
      return {
        width: `${this.percentage}%`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-file {
  display: flex;
  justify-content: space-between;

  &__icon {
    min-width: 24px;
    height: 24px;
    font-size: 24px;
  }

  &__middle {
    width: 168px;
    margin-right: 8px;
    margin-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name {
    width: 100%;
    font-size: var(--font-size-base);
    line-height: 24px;
    text-align: left;
    color: var(--color-primary-black);
    white-space: nowrap;
  }

  &__error-text {
    display: none;
    font-size: 10px;
    line-height: 12px;
    color: var(--color-secondary-orange);
  }

  &__progress {
    display: none;
    width: 100%;
    height: 2px;
    background-color: rgba(var(--color-rgb-gray), 0.16);

    &-line {
      width: 0;
      height: 2px;
      background-color: var(--color-primary-blue);
      transition: width 0.5s linear;
    }
  }

  &__btn {
    min-width: 24px;
    height: 24px;
    margin-left: auto;
    padding: 0;
    font-size: 24px;
    color: var(--color-primary-blue);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &_loading {
    .upload-file__icon {
      animation: rotating 2s linear infinite;
    }

    .upload-file__progress {
      display: block;
    }
  }

  &_error {
    .upload-file__icon {
      color: var(--color-secondary-orange);
    }

    .upload-file__error-text {
      display: block;
    }
  }
}
</style>
