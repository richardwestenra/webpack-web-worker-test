import dagre from 'dagre';

/**
 * Calculate chart layout with Dagre.js.
 * This is an extremely expensive operation so we want it to run as infrequently
 * as possible, and keep it separate from other properties (like node.active)
 * which don't affect layout.
 */
export default ({nodes, edges}) => {
  if (!nodes.length || !edges.length) {
    return;
  }
  const hasVisibleLayers = false;
  const ranker = hasVisibleLayers ? 'none' : null;
  const graph = new dagre.graphlib.Graph().setGraph({
    ranker: hasVisibleLayers ? ranker : null,
    ranksep: hasVisibleLayers ? 200 : 70,
    marginx: 40,
    marginy: 40
  });

  nodes.forEach(node => {
    graph.setNode(node.id, node);
  });

  edges.forEach(edge => {
    graph.setEdge(edge.source, edge.target, edge);
  });

  // Run Dagre layout to calculate X/Y positioning
  dagre.layout(graph);

  return graph;
};
