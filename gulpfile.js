const gulp = require('gulp');
const gulpTypescript = require('gulp-typescript');
const merge = require('merge2');

gulp.task('watch', watchTask);
gulp.task('rebuild-ag-grid-react', rebuildAgGridReact);

const tsConfig = '../ag-grid-react/tsconfig.json';
const tsProject = gulpTypescript.createProject(tsConfig);

function rebuildAgGridReact() {
    const tsResult = gulp
        .src('../ag-grid-react/src/**/*.ts')
        .pipe(tsProject());

    return merge([
        tsResult.dts
            .pipe(gulp.dest('node_modules/ag-grid-react/lib')),
        tsResult.js
            .pipe(gulp.dest('node_modules/ag-grid-react/lib'))
    ]);
}

function watchTask() {
    gulp.watch(['../ag-grid-react/src/**/*'], rebuildAgGridReact);
}
