
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    revappend = require('gulp-rev-append'),
    makecssurlversion = require('gulp-make-css-url-version'),
    imagemin = require('gulp-imagemin'),
    cleancss = require('gulp-clean-css'),
    cache = require('gulp-cache'),
    locationSrc='../../cubetech/src/asset3.com',
    locationDist='../../cubetech/dist/asset3.com';



gulp.task('testHtmlmin',['minifycss','testuglify'],function(){
    var options={
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html')
        .pipe(revappend())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));   

});


gulp.task('testuglify',function(){
    gulp.src(['src/**/*.js','!src/**/lib/seajs','!src/**/lib/zepto'])
        .pipe(uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            //preserveComments: 'all' //保留所有注释
            //compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifycss',function(){
    gulp.src(locationSrc+'/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(locationSrc))
        .pipe(cleancss({
            inline:['none']
        }))
        .pipe(makecssurlversion())
        .pipe(gulp.dest(locationDist));
});

gulp.task('less',function(){
    gulp.src(locationSrc+'/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(locationSrc));
});

gulp.task('testimagemin',function(){
    gulp.src('src/**/home/*.{png,jpg,gif,ico}')
        .pipe(
            cache(
                imagemin({
                    optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                    arithmetic:true    //类型：Boolean 默认：false
                    //interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    //multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
                })
            )
        )
        .pipe(gulp.dest('dist'));
});



//所有文件转移到dist目录
gulp.task('copyotherfile',function(){
    gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});
gulp.task('default',['testHtmlmin','testimagemin']); 
//gulp.task('default',['watch']);





gulp.task('watch',function(){
    gulp.watch(locationSrc+'/**/*.less',['less']);
});




