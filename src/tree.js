import cliFunctions from "./cli.js";
export class Tree {
  constructor(rootSubject) {
    this.subjects = new Map(); // Subject -> Set of prerequisites
    this.root = rootSubject;
    this.addSubject(rootSubject);
  }

  addSubject(subject) {
    if (!this.subjects.has(subject)) {
      this.subjects.set(subject, new Set());
    }
  }

  async buildSubjectTree(maxDepth, numChildren) {
    // Helper function to create and populate the tree
    const buildSubtreeRecursive = async (
      parentSubject,
      currentDepth,
      maxDepth
    ) => {
      // Base case: stop recursion at max depth
      if (currentDepth >= maxDepth) {
        return;
      }
      const childrenArray = await cliFunctions.createChildren(parentSubject);

      // Create specified number of child subjects
      for (let j = 0; j < Math.min(numChildren, childrenArray.length); j++) {
        const childSubject = childrenArray[j];

        // Add the subject to the tree
        this.addSubject(childSubject);

        // Add prerequisite relationship (child depends on parent)
        this.addPrerequisite(childSubject, parentSubject);

        // Recursively build the subtree for each child
        await buildSubtreeRecursive(childSubject, currentDepth + 1, maxDepth);
      }
    };

    // Start building from the root
    await buildSubtreeRecursive(this.root, 0, maxDepth);

    return this; // Return the tree for chaining
  }

  addPrerequisite(subject, prerequisite) {
    // Ensure subject and prerequisite are both added
    this.addSubject(subject);
    this.addSubject(prerequisite);

    // Add prerequisite to the subject's prerequisites
    this.subjects.get(subject).add(prerequisite);
  }

  getPrerequisites(subject) {
    return this.subjects.get(subject) || new Set();
  }

  getSubjectOrderPreorder() {
    const order = [];
    const visited = new Set();

    const dfs = (subject) => {
      if (visited.has(subject)) return;
      visited.add(subject);
      order.push(subject);

      // Traverse all subjects that depend on the current subject (pre-order)
      for (let [dependent, prerequisites] of this.subjects) {
        if (prerequisites.has(subject)) {
          // Check if this subject is a prerequisite
          dfs(dependent); // Visit the dependent subject
        }
      }
    };

    dfs(this.root); // Start DFS traversal from the root
    return order;
  }
}
