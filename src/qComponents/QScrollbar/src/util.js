export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

export function renderThumbStyle({ move, size, bar }) {
  const style = {};
  const translate = `translate${bar.axis}(${move}%)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
}

export function scrollBarWidth() {
  const outer = document.createElement('div');
  outer.className = 'q-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  const scrollbarWidth = widthNoScroll - widthWithScroll;

  return scrollbarWidth;
}
