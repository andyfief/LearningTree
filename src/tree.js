export class Tree {
  constructor(rootTask) {
    this.tasks = new Map(); // Task -> Set of prerequisites
    this.root = rootTask;
    this.addTask(rootTask);
  }

  addTask(task) {
    if (!this.tasks.has(task)) {
      this.tasks.set(task, new Set());
    }
  }

  addPrerequisite(task, prerequisite) {
    // Ensure task and prerequisite are both added
    this.addTask(task);
    this.addTask(prerequisite);

    // Add prerequisite to the task's prerequisites
    this.tasks.get(task).add(prerequisite);
  }

  getPrerequisites(task) {
    return this.tasks.get(task) || new Set();
  }

  getTaskOrderPreorder() {
    const order = [];
    const visited = new Set();

    const dfs = (task) => {
      if (visited.has(task)) return;
      visited.add(task);
      order.push(task);

      // Traverse all tasks that depend on the current task (pre-order)
      for (let [dependent, prerequisites] of this.tasks) {
        if (prerequisites.has(task)) {
          // Check if this task is a prerequisite
          dfs(dependent); // Visit the dependent task
        }
      }
    };

    dfs(this.root); // Start DFS traversal from the root
    return order;
  }
}
/*
const graph = new Tree(`JavaScript`);

graph.addPrerequisite("Basics", "JavaScript");
graph.addPrerequisite("Functions", "JavaScript");
graph.addPrerequisite("Objects & Prototypes", "JavaScript");

// Level 2
graph.addPrerequisite("Variables & Data Types", "Basics");
graph.addPrerequisite("Operators & Expressions", "Basics");
graph.addPrerequisite("Control Flow (if, loops)", "Basics");

graph.addPrerequisite("Function Declarations & Expressions", "Functions");
graph.addPrerequisite("Arrow Functions & Scope", "Functions");
graph.addPrerequisite("Callbacks & Promises", "Functions");

graph.addPrerequisite("Object Literals & this", "Objects & Prototypes");
graph.addPrerequisite("Prototypes & Inheritance", "Objects & Prototypes");
graph.addPrerequisite("Classes & ES6 Features", "Objects & Prototypes");

console.log(graph.getTaskOrderPreorder());
*/
