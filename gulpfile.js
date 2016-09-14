var gulp = require('gulp');
var dist = 'dist/';

gulp.task('styles', function(){
  return gulp.src('./node_modules/simplemde/dist/simplemde.min.css')
    .pipe(gulp.dest(dist))
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['styles']);
