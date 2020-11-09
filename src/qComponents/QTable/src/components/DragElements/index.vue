<template>
  <div
    class="q-table__drag-elements"
    @mousedown.stop="handleColDrag"
  >
    <slot />
  </div>
</template>

<script>
import { throttle } from 'lodash-es';

const shadowDropOffset = 3;

export default {
  name: 'DragElements',

  props: {
    parentSelector: {
      type: String,
      required: true
    },
    limitBoxSelector: {
      type: String,
      required: true
    },
    dummySelector: {
      type: String,
      required: true
    },
    separatorSelector: {
      type: String,
      required: true
    },
    targetSelector: {
      type: String,
      required: true
    },
    dropZoneSelector: {
      type: String,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    isFirstBlocked: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      diff: 0,
      colEl: null,
      dummyEl: null,
      separatorDummyEl: null,
      parent: null,
      parentBox: null,
      draggendIndex: null
    };
  },

  created() {
    this.trottledSeparatorDummyMove = throttle(this.separatorDummyMove, 100);
  },

  methods: {
    separatorDummyMove(e) {
      this.separatorDummyEl.style.display = 'block';

      const elem = document
        .elementFromPoint(e.pageX, e.pageY - window.pageYOffset)
        ?.closest(this.dropZoneSelector);

      if (!elem) return;

      if (elem.classList.contains('dnd-before')) {
        this.separatorDummyEl.style.left = `${elem.getBoundingClientRect()
          .left -
          this.parentBox.left +
          this.parent.scrollLeft}px`;
      } else {
        this.separatorDummyEl.style.left = `${elem.getBoundingClientRect()
          .right -
          this.parentBox.left +
          this.parent.scrollLeft}px`;
      }

      this.draggendIndex = elem.attributes.dndidx.value;
    },
    handleColDrag(e) {
      this.colEl = this.$el.parentElement.parentElement;
      this.parent = document.querySelector(this.parentSelector);
      this.dummyEl = document.querySelector(this.dummySelector);
      this.separatorDummyEl = document.querySelector(this.separatorSelector);
      this.parentBox = this.parent.getBoundingClientRect();

      this.diff = e.pageX - this.colEl.getBoundingClientRect().left;

      const dummyStyles = [
        'display:block',
        `width:${this.colEl.offsetWidth}px`,
        `height:${this.parent.offsetHeight - shadowDropOffset}px`,
        `left:${e.pageX -
          this.diff -
          this.parentBox.left +
          this.parent.scrollLeft}px`
      ];

      const separatorDummyStyles = [
        `height:${this.parent.offsetHeight - shadowDropOffset}px`
      ];

      this.dummyEl.style.cssText = dummyStyles.join(';');
      this.separatorDummyEl.style.cssText = separatorDummyStyles.join(';');

      document.querySelectorAll(this.targetSelector).forEach(item => {
        item.classList.add('dragInit');
      });

      document.addEventListener('mousemove', this.handleDummyMoving);
      document.addEventListener('mouseup', this.handleDummyMovingEnd);
    },
    handleDummyMoving(e) {
      const limitBox = document
        .querySelector(this.limitBoxSelector)
        .getBoundingClientRect();

      const dummy = this.dummyEl;

      if (e.pageX - this.diff < limitBox.left) {
        dummy.style.left = 0;
        return;
      }

      if (e.pageX > this.parentBox.right) {
        this.parent.scrollLeft += e.pageX - this.parentBox.right;

        this.dummyEl.style.left = `${e.pageX - dummy.outerWidth - this.diff}px`;

        return;
      }

      if (e.pageX < this.parentBox.left) {
        this.parent.scrollLeft -= e.pageX;

        this.dummyEl.style.left = `${e.pageX - this.diff}px`;

        return;
      }

      if (e.pageX - this.diff + dummy.offsetWidth > limitBox.right) {
        dummy.style.left = `${limitBox.right - dummy.outerWidth}px`;
        return;
      }

      if (e.clientY < limitBox.top || e.clientY > limitBox.bottom) {
        dummy.style.left = `${e.pageX - this.diff - limitBox.left}px`;
        return;
      }

      this.dummyEl.style.left = `${e.pageX - this.diff - limitBox.left}px`;

      this.trottledSeparatorDummyMove(e);
    },
    handleDummyMovingEnd() {
      document.removeEventListener('mousemove', this.handleDummyMoving);
      document.removeEventListener('mouseup', this.handleDummyMovingEnd);

      this.dummyEl.style.cssText = '';
      this.separatorDummyEl.style.cssText = '';

      document.querySelectorAll('.dragInit').forEach(({ classList }) => {
        classList.remove('dragInit');
      });

      this.draggendIndex = parseInt(this.draggendIndex, 10);

      const isCurrentColBlocked = this.isFirstBlocked
        ? Boolean(this.draggendIndex)
        : this.draggendIndex > -1;

      if (
        isCurrentColBlocked &&
        this.colIndex !== this.draggendIndex &&
        this.colIndex !== this.draggendIndex - 1
      ) {
        const newPositionIndex =
          this.colIndex < this.draggendIndex
            ? this.draggendIndex - 1
            : this.draggendIndex;

        this.$emit('change-order', {
          oldPositionIndex: this.colIndex,
          newPositionIndex
        });
      }

      this.draggendIndex = null;

      this.colEl = null;
    }
  }
};
</script>
