module.exports = function(grunt) {
	
	var distPaths = {
		dist: 'dist',
		less: 'dist/styles'
	},
	devPaths = {
		less: 'src/styles'
	};
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: {
				src: [
					distPaths.dist
				]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		less: {
			development: {},
			production: {
				options: {
					
				},
				files: {
					'dist/styles/main.css': devPaths.less + '/main.less'
				}
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: [
						'scripts/**',
						'views/**',
						'index.html',
					],
					dest: 'dist/'
				}],
			},
		},
		watch: {
			scripts: {
				files: [
					'src/scripts/*.js',
					'src/styles/*.less',
					'src/views/*.html',
					'src/views/*.hbs',
					'src/*.html'
				],
				tasks: ['default'],
				options: {
					spawn: false,
				},
			},
		}
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Default task(s).
	grunt.registerTask('default', [
		'clean',
		'uglify',
		'less',
		'copy'
	]);
	
};
