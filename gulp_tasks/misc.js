const path = require('path');
const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const ts = require('gulp-typescript');
const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('server:compile', compileServer);
gulp.task('server:copy', copyServer);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp, conf.paths.distServer]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,tsx}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function copyServer() {
  return gulp.src([
    path.join(conf.paths.server, '/**/*.ts'),
  ])
    .pipe(gulp.dest(conf.paths.distServer));
}


function compileServer() {
  const tsProject = ts.createProject('tsconfig.json',
    {
      jsx: 'preserve',
      target: 'ES6',
      types: [],
      moduleResolution: 'node',
      module: 'commonjs',
    }
  );

  return gulp.src([path.join(conf.paths.distServer, '**/*.ts')])
    .pipe(tsProject({experimentalAsyncFunctions: true}))
    .js
    .pipe(gulp.dest(conf.paths.distServer));
}
