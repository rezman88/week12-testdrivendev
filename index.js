// TODO: Write Code to gather information about the development team members, and render the HTML file.

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function createEngineer(team) {
  inquirer
    .prompt([
      // Engineer name
      // Engineer id
      // Engineer email
      // Engineer GitHub username
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
      },

      {
        type: "input",
        name: "id",
        message: "What is the engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github?",
      },
    ])
    .then((engineerDetails) => {
      // Initialise Engineer class to create Manager object
      const engineer = new Engineer(
        engineerDetails.name,
        engineerDetails.id,
        engineerDetails.email,
        engineerDetails.githubUsername
      );
      team.push(engineer);
      createTeam(team); // at this point we add an engineer to the team array
    });
}

function createIntern(team) {
  inquirer
    .prompt([
      // Intern name
      // Intern id
      // Intern email
      // Intern school
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
      },
    ])
    .then((internDetails) => {
      // Initialise Intern class to create Manager object
      const intern = new Intern(
        internDetails.name,
        internDetails.id,
        internDetails.email,
        internDetails.school
      );
      team.push(intern);
      createTeam(team); // at this point we add an intern to the team array
    });
}

function createTeam(team) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member you wan to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team member",
        ],
      },
    ])
    .then((choice) => {
      if (choice.memberChoice === "Engineer") {
        createEngineer(team);
      } else if (choice.memberChoice === "Intern") {
        createIntern(team);
      } else {
        // at this point, team array should have a manager and however many engineers and interns the user inputted
        const html = render(team); // html will be html file as string
        // write html to a file index.html using fs library
        fs.writeFile(outputPath, html, (err) => {
          if (err) {
            console.log("Failed to write HTML file");
          }
        });
      }
    });
}

function createManager(team) {
  inquirer
    .prompt([
      // Manager name
      // Manager id
      // Manager email
      // Manager office number (phone number)
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the team manager's email?",
      },
      {
        type: "input",
        name: "number",
        message: "What is the team manager's office phone number?",
      },
    ])
    .then((managerDetails) => {
      // Initialise Manager class to create Manager object
      const manager = new Manager(
        managerDetails.name,
        managerDetails.id,
        managerDetails.email,
        managerDetails.officeNumber
      );
      team.push(manager);
      createTeam(team); // at this point, team array have a manager in it
    });
}

function start() {
  const team = []; // array of Employee objects (array of Manager, or Engineers, or Interns)
  // Employee can be Manager, Engineer, or Intern
  createManager(team);
}

start();
