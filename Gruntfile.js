module.exports = function(grunt) {
	
	var distPaths = {
		dist: 'dist',
		less: 'dist/styles',
		scripts: 'dist/scripts'
	},
	devPaths = {
		less: 'src/styles',
		scripts: 'src/scripts'
	},
	nodePath = 'node_modules/',
	libPaths = [
		nodePath + 'react/dist/react.js',
		nodePath + 'react/dist/JSXTransformer.j',
		nodePath + 'showdown/compressed/Showdown.js',
		nodePath + 'jquery/dist/jquery.js',
		devPaths.scripts + '/main.js'
	];
	
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
		concat: {
			main: {
				src: libPaths,
				dest: 'dist/scripts/main.js',
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: [
					'src/<%= pkg.name %>.js'
				],
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		less: {
			development: {},
			production: {
				options: {},
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
				tasks: ['dev'],
				options: {
					spawn: false,
				},
			},
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', [
		'clean',
		'concat',
		'less',
		'copy'
	]);
	
	grunt.registerTask('dev', [
		'clean',
		'less',
		'copy'
	]);
};
