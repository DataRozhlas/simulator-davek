var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
var sketch = require('gulp-sketch');


//file paths
var DIST_PATH = 'public/dist'
var SRCIPTS_PATH = 'public/scripts/**/*.js'
var CSS_PATH = 'public/css/**/*.css'
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGE_PATH = 'public/img/**/*.+(png|jpeg|jpg|svg|gif)';


// Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');


// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegrecompress = require('imagemin-jpeg-recompress');

//Icon font variable
var fontName = 'Icons'; 

// // styles
// gulp.task('styles',function (){
// 	console.log('starting styles task');
// 	return gulp.src(['public/css/reset.css', CSS_PATH])
// 		.pipe(plumber(function(err){
// 			console.log('Style Task Error');
// 			console.log(err);
// 			this.emit('end');
// 		}))
// 		.pipe(sourcemaps.init())
// 	 	.pipe(autoprefixer())
// 	 	.pipe(concat('styles.css'))
// 	 	.pipe(minifyCss())
// 	 	.pipe(sourcemaps.write())
// 	 	.pipe(gulp.dest(DIST_PATH))
// 	 	.pipe(livereload());
// });

// styles for SCSS
gulp.task('styles',function (){
	console.log('starting styles task');
	return gulp.src('public/scss/style.scss')
		.pipe(plumber(function(err){
			console.log('Style Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
	 	.pipe(autoprefixer({
	 		browsers: [
	 		'last 2 versions',
	 		'ie >= 10'
	 		]
	 	}))
	 	.pipe(sass({
	 		outputStyle: 'compressed'
	 	}))
	 	.pipe(sourcemaps.write())
	 	.pipe(gulp.dest(DIST_PATH))
	 	.pipe(livereload());
});

//Sripts
gulp.task('scripts', function(){
	console.log('starting scripts task');

	return gulp.src(SRCIPTS_PATH)
		.pipe(plumber(function(err){
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

//Image
gulp.task('images', function(){
	return gulp.src(IMAGE_PATH)
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegrecompress()
			]
			))
		.pipe(gulp.dest(DIST_PATH + '/images'));
});

//Iconfont
gulp.task('iconfont', function(){
  return gulp.src('public/img/svg/*.svg') // Source folder containing the SVG images
    .pipe(iconfontCss({
      fontName: fontName, // The name that the generated font will have
      path: 'public/_icons.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
      targetPath: '../../../scss/_icons.scss', // The path where the file will be generated
      fontPath: './dist/fonts/icons/' // The path to the icon font file
    }))
    .pipe(iconfont({
      prependUnicode: false, // Recommended option 
      fontHeight: 1001,
      fontName: fontName, // Name of the font
      formats: ['ttf', 'eot', 'woff', 'woff2', 'truetype', 'svg'], // The font file formats that will be created
      normalize: true,
      timestamp: runTimestamp // Recommended to get consistent builds when watching files
    }))
    .pipe(gulp.dest('public/dist/fonts/icons/'));
});

	/*//Iconfont v2
	consolidate = require('gulp-consolidate'),    
    iconfont = require('gulp-iconfont');

gulp.task('iconfont', function () {
   return gulp.src('public/img/svg/*.svg')
        .pipe(iconfont({
            fontName: 'iconfont',
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            appendCodepoints: true,
            appendUnicode: false,
            normalize: true,
            fontHeight: 1000,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src('public/iconfont.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(gulp.dest('public/dist/'));

            gulp.src('public/iconfont.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('public/dist/'));
        })
        .pipe(gulp.dest('public/dist/iconfont/icons'));
});

*/

// Templates
gulp.task('templates', function(){
	return gulp.src(TEMPLATES_PATH)
		.pipe(handlebars({
			handlebars: handlebarsLib
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'templates',
			noRedeclare: true
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('clean', function(){
	return del.sync([
			DIST_PATH
		])
})

//ICONS

/*gulp.task('icons', function(){

  return gulp.src('src/sketch/icons.sketch')

  // extracting SVG from Sketchfile
  .pipe(sketch({
    export: 'slices',
    formats: 'svg',
    compact: 'yes',
    saveForWeb: 'yes'
  }))
  .pipe(gulp.dest('dist/svg/'))

  // creating SVG, TTF, WOFF, EOT
  .pipe(iconfont({
    fontName: 'icons',
    appendCodepoints: false,
    normalize: true,
    centerHorizontally: true,
    fontHeight: 100 // IMPORTANT
  }))

  // creating CSS files and sample page
  .on('codepoints', function(codepoints, options) {

    // options
    var iconsOptions = {
      glyphs: codepoints,
      fontName: 'WisemblyIconfont',
      fontPath: '../font/',
      className: 'icon',
    }

    // template for modern browsers
    gulp.src('src/templates/icon-template.css')
    .pipe(consolidate('lodash', iconsOptions))
    .pipe(rename('icons.css'))
    .pipe(gulp.dest('dist/css/'));

    // template for IE
    gulp.src('src/templates/icon-template-ie.css')
    .pipe(consolidate('lodash', iconsOptions))
    .pipe(rename('icons-ie.css'))
    .pipe(gulp.dest('dist/css/'));

    // creating a sample page
    gulp.src('src/templates/icon-template.html')
    .pipe(consolidate('lodash', iconsOptions))
    .pipe(rename({ basename:'sample' }))
    .pipe(gulp.dest('dist/'));

  })
  .pipe(gulp.dest('dist/font/'));

});*/




gulp.task('default',['images', 'templates', 'iconfont', 'styles', 'scripts'] ,function(){
	console.log('starting default task');
});

gulp.task('export', function(){
	return gulp.src('public/**/*')
		.pipe(zip('website.zip'))
		.pipe(gulp.dest('./'));
})

gulp.task('watch',['default'], function(){
	console.log('starting watch task');
	require('./server.js');
	livereload.listen();
	gulp.watch(SRCIPTS_PATH, ['scripts']);
	//gulp.watch(CSS_PATH, ['styles']);
	gulp.watch('public/scss/**/*.scss', ['styles']);
	gulp.watch(TEMPLATES_PATH, ['templates']);
});