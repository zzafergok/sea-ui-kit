#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const chalk = require('chalk');
const degit = require('degit');
const path = require('path');
const fs = require('fs');

program
  .name('create-sea-ui-kit')
  .description('Create a Next.js project with Sea UI Kit')
  .argument('[project-directory]', 'The directory to create the project in')
  .action(async (projectDir) => {
    console.log(chalk.bold.blue('🌊 Creating a new Sea UI Kit project...'));

    // Prompt for project directory if not provided
    if (!projectDir) {
      const response = await prompts({
        type: 'text',
        name: 'projectDir',
        message: 'What is your project named?',
        initial: 'my-sea-ui-app',
      });

      if (!response.projectDir) {
        console.log(chalk.red('No project directory specified. Exiting...'));
        process.exit(1);
      }

      projectDir = response.projectDir;
    }

    const targetDir = path.resolve(process.cwd(), projectDir);

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${projectDir} already exists. Continue?`,
        initial: false,
      });

      if (!response.overwrite) {
        console.log(chalk.red('Operation cancelled. Exiting...'));
        process.exit(1);
      }
    }

    // Prompt for project configuration
    const projectConfig = await prompts([
      {
        type: 'select',
        name: 'language',
        message: 'Select language:',
        choices: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
        ],
        initial: 0,
      },
      {
        type: 'confirm',
        name: 'darkMode',
        message: 'Include dark mode support?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'i18n',
        message: 'Include i18n support (EN/TR)?',
        initial: true,
      },
    ]);

    console.log(chalk.blue('Downloading template...'));

    // Replace with your actual GitHub repository
    const emitter = degit('yourusername/sea-ui-kit-template', {
      force: true,
      verbose: true,
    });

    try {
      await emitter.clone(targetDir);

      console.log(chalk.green.bold('✅ Success!'));
      console.log(
        chalk.green('Your Sea UI Kit project is ready at:'),
        chalk.cyan(targetDir)
      );
      console.log('');
      console.log('To get started:');
      console.log(chalk.cyan(`  cd ${projectDir}`));
      console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  npm run dev'));
      console.log('');
      console.log(chalk.blue('Happy coding! 🎉'));
    } catch (error) {
      console.error(chalk.red('Failed to download template:'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse(process.argv);
