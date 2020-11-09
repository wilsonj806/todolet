const gulp = require('gulp');
const del = require('del');

async function clean(cb) {
  const arr = [
    '{config,routes,specs,types,docs,__mocks__,models}/**',
    '*.md',
    'LICENSE',
    '*.{js,ts,tsx}',
    'client/**',
    'client/.storybook',
    'Dockerfile',
    'docker-compose.yml',
    'tsconfig.json',
    'nodemon.json',
    'docker.sh',
    '!**/package-lock.json',
    '!**/package.json',
    '!node_modules/**',
    '!Procfile',
    '!dist/**',
    '!gulpfile.js',
    '!assets/**',
    '!config/**/config.js'
  ];
  const deletedPaths = await del(arr, { dryRun: false });

	console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));

  cb();
}

function noTask(cb) {
  console.log('No tasks queued up');
  cb();
}

exports.default = gulp.series(process.env.NODE_ENV === 'production' ? clean : noTask);
