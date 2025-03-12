export function visualizeTree(tree) {
  const levels = {}; // To organize nodes by their level in the tree
  const parents = new Map(); // To track parent-child relationships

  // First pass: identify parent-child relationships
  for (const [subject, prerequisites] of tree.subjects.entries()) {
    for (const prereq of prerequisites) {
      if (!parents.has(subject)) {
        parents.set(subject, prereq);
      }
    }
  }

  // Determine the level of each node
  function findLevel(node, cache = new Map()) {
    if (cache.has(node)) return cache.get(node);

    if (node === tree.root) {
      cache.set(node, 0);
      return 0;
    }

    const parent = parents.get(node);
    if (!parent) {
      cache.set(node, 0);
      return 0;
    }

    const level = findLevel(parent, cache) + 1;
    cache.set(node, level);
    return level;
  }

  // Group nodes by level
  for (const subject of tree.subjects.keys()) {
    const level = findLevel(subject);
    if (!levels[level]) levels[level] = [];
    levels[level].push(subject);
  }

  // Create a structure for children
  const children = new Map();
  for (const [subject, prerequisites] of tree.subjects.entries()) {
    for (const prereq of prerequisites) {
      if (!children.has(prereq)) {
        children.set(prereq, []);
      }
      children.get(prereq).push(subject);
    }
  }

  // Print ASCII tree
  function printAsciiTree() {
    let output = "";

    function printSubtree(node, prefix = "", isLast = true) {
      const nodeChildren = children.get(node) || [];

      // Print current node
      output += `${prefix}${isLast ? "└── " : "├── "}${node}\n`;

      // Prepare prefix for children
      const childPrefix = prefix + (isLast ? "    " : "│   ");

      // Print children
      for (let i = 0; i < nodeChildren.length; i++) {
        const isLastChild = i === nodeChildren.length - 1;
        printSubtree(nodeChildren[i], childPrefix, isLastChild);
      }
    }

    // Start from root
    output += `${tree.root}\n`;
    const rootChildren = children.get(tree.root) || [];
    for (let i = 0; i < rootChildren.length; i++) {
      printSubtree(rootChildren[i], "", i === rootChildren.length - 1);
    }

    return output;
  }

  return printAsciiTree();
}

// Alternative function that uses HTML to create a more visual representation
export function generateHtmlTree(tree) {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .tree ul {
        padding-left: 20px;
      }
      .tree li {
        list-style-type: none;
        position: relative;
        padding: 10px 5px 0 5px;
      }
      .tree li::before {
        content: "";
        position: absolute;
        top: 0;
        left: -10px;
        width: 10px;
        height: 1px;
        background: #ccc;
      }
      .tree li::after {
        content: "";
        position: absolute;
        top: 0;
        left: -10px;
        width: 1px;
        height: 100%;
        background: #ccc;
      }
      .tree li:last-child::after {
        height: 10px;
      }
      .tree > ul > li::before, 
      .tree > ul > li::after {
        border: 0;
      }
      .tree li a {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-decoration: none;
        color: #333;
      }
      .tree li a:hover {
        background: #f8f8f8;
      }
    </style>
  </head>
  <body>
    <div class="tree">
      <ul>`;

  // Create a structure for children
  const children = new Map();
  for (const [subject, prerequisites] of tree.subjects.entries()) {
    for (const prereq of prerequisites) {
      if (!children.has(prereq)) {
        children.set(prereq, []);
      }
      children.get(prereq).push(subject);
    }
  }

  function buildHtmlTree(node) {
    const nodeChildren = children.get(node) || [];
    let nodeHtml = `<li><a href="#">${node}</a>`;

    if (nodeChildren.length > 0) {
      nodeHtml += `<ul>`;
      for (const child of nodeChildren) {
        nodeHtml += buildHtmlTree(child);
      }
      nodeHtml += `</ul>`;
    }

    nodeHtml += `</li>`;
    return nodeHtml;
  }

  html += buildHtmlTree(tree.root);
  html += `
      </ul>
    </div>
  </body>
  </html>`;

  return html;
}
