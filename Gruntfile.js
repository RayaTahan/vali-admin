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
				src: ['*.css','*.eot','*.ttf','*.woff','*.woff2'],
				dest: 'docs/fonts/vazir/'
			},
			fontawesomecss: {
				expand: true,
				cwd: 'node_modules/@fortawesome/fontawesome-free/', 
				src: ['css/*','webfonts/*'],
				dest: 'docs/fonts/fontawesome/'
			}
		}
	});

	// Load the Grunt plugins.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Set task aliases
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['copy','pug','sass','postcss']);
};
