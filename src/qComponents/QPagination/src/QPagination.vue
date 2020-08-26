<template>
  <div
    class="q-pagination"
    :class="{
      'q-pagination_disabled': disabled
    }"
  >
    <button
      type="button"
      class="q-pagination__btn q-pagination__btn_icon q-icon-triangle-left"
      :class="{
        'q-pagination__btn_disabled': isPrevBtnDisabled
      }"
      :disabled="isPrevBtnDisabled"
      @click.prevent="handlePrevBtnClick"
    />

    <button
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': currentPage === 1
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(1)"
    >
      1
    </button>

    <button
      v-if="isPrevQuickBtnShown"
      type="button"
      class="q-pagination__btn q-pagination__btn_quick q-icon-triangle-left"
      :disabled="disabled"
      @click.prevent="handlePrevQuickBtnClick"
    />

    <button
      v-for="page in pagers"
      :key="page"
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': page === currentPage
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="isNextQuickBtnShown"
      type="button"
      class="q-pagination__btn q-pagination__btn_quick q-icon-triangle-right"
      :disabled="disabled"
      @click.prevent="handleNextQuickBtnClick"
    />

    <button
      v-if="preparedPageCount > 1"
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': preparedPageCount === currentPage
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(preparedPageCount)"
    >
      {{ preparedPageCount }}
    </button>

    <button
      type="button"
      class="q-pagination__btn q-pagination__btn_icon q-icon-triangle-right"
      :class="{
        'q-pagination__btn_disabled': isNextBtnDisabled
      }"
      :disabled="isNextBtnDisabled"
      @click.prevent="handleNextBtnClick"
    />
  </div>
</template>

<script>
import { range } from 'lodash-es';

export default {
  name: 'QPagination',

  props: {
    pageCount: { type: Number, default: null },
    total: { type: Number, default: null },
    pageSize: { type: Number, default: null },
    currentPage: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    pagerCount: {
      type: Number,
      default: 7,
      validator: value => value >= 3
    }
  },

  computed: {
    preparedPageCount() {
      const pageCount = this.pageCount ?? Math.ceil(this.total / this.pageSize);

      return pageCount && Number.isFinite(pageCount) ? pageCount : 1;
    },

    isPrevBtnDisabled() {
      return this.disabled || this.currentPage <= 1;
    },

    isNextBtnDisabled() {
      return this.disabled || this.currentPage >= this.preparedPageCount;
    },

    isPrevQuickBtnShown() {
      if (this.preparedPageCount <= this.pagerCount) return false;

      const halfPagerCount = (this.pagerCount - 1) / 2;
      return this.currentPage > this.pagerCount - halfPagerCount;
    },

    isNextQuickBtnShown() {
      if (this.preparedPageCount <= this.pagerCount) return false;

      const halfPagerCount = (this.pagerCount - 1) / 2;
      return this.currentPage < this.preparedPageCount - halfPagerCount;
    },

    pagers() {
      if (this.preparedPageCount <= 1) return [];

      let rangeStart = 2;
      let rangeEnd = this.preparedPageCount;

      if (this.isPrevQuickBtnShown && this.isNextQuickBtnShown) {
        const offset = Math.floor(this.pagerCount / 2) - 1;

        rangeStart = this.currentPage - offset;
        rangeEnd = this.currentPage + offset + 1;
      } else if (this.isPrevQuickBtnShown) {
        rangeStart = this.preparedPageCount - (this.pagerCount - 2);
      } else if (this.isNextQuickBtnShown) {
        rangeEnd = this.pagerCount;
      }

      return range(rangeStart, rangeEnd);
    }
  },

  methods: {
    handlePrevBtnClick() {
      let newPage = this.currentPage - 1;
      if (newPage > this.preparedPageCount) newPage = this.preparedPageCount;

      this.$emit('prev-click', newPage);
      this.$emit('current-change', newPage);
    },

    handlePageBtnClick(newPage) {
      if (this.currentPage === newPage) return;

      this.$emit('current-change', newPage);
    },

    handleNextBtnClick() {
      const newPage = this.currentPage + 1;

      this.$emit('next-click', newPage);
      this.$emit('current-change', newPage);
    },

    handlePrevQuickBtnClick() {
      let newPage = this.currentPage - this.pagerCount - 2;
      if (newPage > this.preparedPageCount) newPage = this.preparedPageCount;
      else if (newPage < 1) newPage = 1;

      this.$emit('quick-prev-click', newPage);
      this.$emit('current-change', newPage);
    },

    handleNextQuickBtnClick() {
      let newPage = this.currentPage + this.pagerCount - 2;
      if (newPage > this.preparedPageCount) newPage = this.preparedPageCount;
      else if (newPage < 1) newPage = 1;

      this.$emit('quick-next-click', newPage);
      this.$emit('current-change', newPage);
    }
  }
};
</script>
