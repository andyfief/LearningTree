import groqAPI from "../src/api.js";
import { Tree } from "../src/tree.js";
import inquirer from "inquirer";

async function main() {
  const { rootTopic } = await inquirer.prompt([
    {
      type: "input",
      name: "rootTopic",
      message: "What do you want to learn about?",
    },
  ]);

  let numChildren = 3; // this will need to be in the prompt too its hard coded for now at 3
  const prerequisiteTree = new Tree(rootTopic);

  let response;
  try {
    // Await the response from the main function
    response = await groqAPI.main(rootTopic);
  } catch (error) {
    console.error("Error:", error);
  }

  console.log(response);
  const children = spliceString(response);

  for (let i = 0; i < numChildren; i++) {
    console.log(`Adding prerequisite ${i}:`, children[i]);
    prerequisiteTree.addPrerequisite(children[i], rootTopic); // maybe change rootTopic to currentTopic when i do it in a loop
  }
  console.log("Logging tree: ");

  console.log(prerequisiteTree.getTaskOrderPreorder());
}

function spliceString(response) {
  let prerequisites = response.match(/\{([^}]+)\}/g) || [];

  return prerequisites.map((prereq) => prereq.slice(1, -1));
}

main(); // Calling the async main function
