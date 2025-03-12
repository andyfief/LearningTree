import groqAPI from "./api.js";
import { Tree } from "./tree.js";
import inquirer from "inquirer";
import { generateHtmlTree, visualizeTree } from "./visualizeTree.js";
import fs from "fs";

async function createChildren(currentTopic) {
  let response;
  try {
    // Await the response from the main function
    response = await groqAPI.main(currentTopic);
  } catch (error) {
    console.error("Error:", error);
  }

  // console.log(response);
  const children = spliceString(response);
  return children;
}

function spliceString(response) {
  let prerequisites = response.match(/\{([^}]+)\}/g) || [];

  return prerequisites.map((prereq) => prereq.slice(1, -1));
}

async function main() {
  const { rootTopic } = await inquirer.prompt([
    {
      type: "input",
      name: "rootTopic",
      message: "What do you want to learn about?",
    },
  ]);

  let numChildren = 3; // this will need to be in the prompt too its hard coded for now at 3
  let maxDepth = 3;
  const prerequisiteTree = new Tree(rootTopic);

  await prerequisiteTree.buildSubjectTree(maxDepth, numChildren);

  const htmlTree = generateHtmlTree(prerequisiteTree);

  // Save to a file
  fs.writeFileSync("tree-visualization.html", htmlTree);
  console.log("Tree visualization saved to tree-visualization.html");
}

main(); // Calling the async main function

export default { createChildren };
