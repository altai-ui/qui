import { isEqual, capitalize } from 'lodash-es';

let uid = 0;

export default class Node {
  constructor(data, config, parentNode) {
    this.data = data;
    this.config = config;
    this.parent = parentNode || null;
    this.level = !this.parent ? 1 : this.parent.level + 1;
    uid += 1;
    this.uid = uid;

    this.initState();
    this.initChildren();
  }

  initState() {
    const { value: valueKey, label: labelKey } = this.config;

    this.value = this.data[valueKey];
    this.label = this.data[labelKey];
    this.pathNodes = this.calculatePathNodes();
    this.path = this.pathNodes.map(node => node.value);
    this.pathLabels = this.pathNodes.map(node => node.label);
  }

  initChildren() {
    const { config } = this;
    const childrenKey = config.children;
    const childrenData = this.data[childrenKey];
    this.hasChildren = Array.isArray(childrenData);
    this.children = (childrenData || []).map(
      child => new Node(child, config, this)
    );
  }

  get isDisabled() {
    const { data, parent, config } = this;
    const disabledKey = config.disabled;
    return data[disabledKey] || parent?.isDisabled;
  }

  get isLeaf() {
    return !this.hasChildren;
  }

  calculatePathNodes() {
    const nodes = [this];
    let parent = this.parent;

    while (parent) {
      nodes.unshift(parent);
      parent = parent.parent;
    }

    return nodes;
  }

  getValue() {
    return this.value;
  }

  getValueByOption() {
    return this.config.emitPath ? this.path : this.getValue();
  }

  getText(allLevels, separator) {
    return allLevels ? this.pathLabels.join(separator) : this.label;
  }

  isSameNode(checkedValue) {
    const value = this.getValueByOption();
    return this.config.multiple && Array.isArray(checkedValue)
      ? checkedValue.some(val => isEqual(val, value))
      : isEqual(checkedValue, value);
  }

  broadcast(event, ...args) {
    const handlerName = `onParent${capitalize(event)}`;

    this.children.forEach(child => {
      if (child) {
        // bottom up
        child.broadcast(event, ...args);
        child[handlerName] && child[handlerName](...args);
      }
    });
  }

  emit(event, ...args) {
    const { parent } = this;
    const handlerName = `onChild${capitalize(event)}`;
    if (parent) {
      parent[handlerName] && parent[handlerName](...args);
      parent.emit(event, ...args);
    }
  }

  onParentCheck(checked) {
    if (!this.isDisabled) this.setCheckState(checked);
  }

  onChildCheck() {
    const { children } = this;
    const validChildren = children.filter(child => !child.isDisabled);
    const checked = validChildren.length
      ? validChildren.every(child => child.checked)
      : false;
    this.setCheckState(checked);
  }

  setCheckState(checked) {
    const totalNum = this.children.length;
    const checkedNum = this.children.reduce((acc, child) => {
      let num;
      if (child.checked) {
        num = 1;
      } else {
        num = child.indeterminate ? 0.5 : 0;
      }

      return acc + num;
    }, 0);

    this.checked = checked;
    this.indeterminate = checkedNum !== totalNum && checkedNum > 0;
  }

  syncCheckState(checkedValue) {
    const value = this.getValueByOption();
    const checked = this.isSameNode(checkedValue, value);

    this.doCheck(checked);
  }

  doCheck(checked) {
    if (this.checked === checked) return;
    this.broadcast('check', checked);
    this.setCheckState(checked);
    this.emit('check');
  }
}
