const gulp = require('gulp')
const ts = require('gulp-typescript')

function compile () {
  gulp.src(['src/**/*.ts', '!src/**/*.test.ts'])
    .pipe(ts({
      target: 'es6',
      module: 'commonjs',
      moduleResolution: 'node',
      isolatedModules: true
    }))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', () => {
  compile()
})
