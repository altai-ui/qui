import { isEqual } from 'lodash-es';
import Node from './node';

const forceToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  }
  if (val) {
    return [val];
  }
  return [];
};

const flatNodes = (data, leafOnly) => {
  return data.reduce((items, node) => {
    let res = [...items];
    if (node.isLeaf) {
      res.push(node);
    } else {
      !leafOnly && res.push(node);
      res = res.concat(flatNodes(node.children, leafOnly));
    }
    return res;
  }, []);
};

export default class Store {
  constructor(data, config) {
    this.config = config;
    this.initNodes(data);
  }

  initNodes(data) {
    const dataArray = forceToArray(data);
    this.nodes = dataArray.map(nodeData => new Node(nodeData, this.config));
    this.flattedNodes = this.getFlattedNodes(false, false);
    this.leafNodes = this.getFlattedNodes(true, false);
  }

  appendNode(nodeData, parentNode) {
    const node = new Node(nodeData, this.config, parentNode);
    const children = parentNode ? parentNode.children : this.nodes;
    children.push(node);
  }

  appendNodes(nodeDataList, parentNode) {
    forceToArray(nodeDataList).forEach(nodeData =>
      this.appendNode(nodeData, parentNode)
    );
  }

  getNodes() {
    return this.nodes;
  }

  getFlattedNodes(leafOnly, cached = true) {
    const cachedNodes = leafOnly ? this.leafNodes : this.flattedNodes;
    return cached ? cachedNodes : flatNodes(this.nodes, leafOnly);
  }

  getNodeByValue(value) {
    if (value) {
      const nodes = this.getFlattedNodes(false, true).filter(
        node => isEqual(node.path, value) || node.value === value
      );
      return nodes?.length ? nodes[0] : null;
    }
    return null;
  }
}
