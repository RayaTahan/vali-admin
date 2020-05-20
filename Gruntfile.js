const sass = require('node-sass');
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: { livereload: true },
			scss: {
				files: ['src/sass/**/*.sass', 'src/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
				options: {
					interrupt: true
				}
			},
			pug: {
				files: ['src/pug/**/*.pug'],
				tasks: ['pug'],
				options: {
					interrupt: true
				}
			}
		},
		pug: {
			compile: {
				options: {
					pretty: true
				},
				files: [{
					src: ['**/*.pug', '!**/_*.pug'],
					dest: "docs/",
					ext: ".html",
					cwd: "src/pug/",
					expand: true
				}]
			}
		},
		sass: {
			dist: {
				options: {
					implementation: sass,
					outputStyle: 'expanded',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: ['*.scss'],
					dest: 'docs/css/',
					ext: '.css'
				}]
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')
				]
			},
			dist: {
				src: ['docs/css/*.css']
			}
		},
		copy: {
			vazir: {
				expand: true,
				cwd: 'node_modules/vazir-font/dist/', 
				filter: 'isFile',
				src: ['*.eot','*.ttf','*.woff','*.woff2'],
				dest: 'docs/webfonts/'
			},
			vazircss: {
				expand: true,
				cwd: 'node_modules/vazir-font/dist/', 
				filter: 'isFile',
				src: 'font-face.css',
				dest: 'docs/css/',
				rename: function(dest, src) {
						console.log(dest + src);
						return dest + src.replace('font-face','vazir');
				  	}
			},
			fontawesomecss: {
				expand: true,
				cwd: 'node_modules/@fortawesome/fontawesome-free/', 
				src: ['css/*','webfonts/*'],
				dest: 'docs/'
			}
		},
		'string-replace': {
			vazir: {
			  options: {
				replacements: [{
				  pattern: /'Vazir/g,
				  replacement: "'..\/webfonts\/Vazir"
				}]
			  },
			  files: [
				{
				 expand: true, flatten: true, 
				 src: ['docs/css/vazir.css'], dest: 'docs/css/'
				}
			]
			}
		  }
	});

	// Load the Grunt plugins.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-string-replace');

	// Set task aliases
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['copy','string-replace','pug','sass','postcss']);
};
