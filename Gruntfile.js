module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    raw: 'require "compass/import-once/activate"\n',
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    cacheDir: 'public/.sass-cache',
                    httpPath: '/',
                    imagesDir: 'public/img',
                    javascriptsDir: 'public/js',
                    outputStyle: 'compressed',
                    noLineComments: true,
                    force: true
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'public/js/src',
                    src: '*.src.js',
                    dest: 'public/js/min',
                    ext: '.min.js'
        }],
            },
        },
        responsive_images: {
            dev: {
                options: {
                    sizes: [{
                        width: 320,
                        name: 'small'
                        }, {
                        width: 640,
                        name: 'medium'
                        }, {
                        width: 800,
                        name: 'large'
                        }]
                },
                files: [{
                    expand: true,
                    cwd: 'public/img/src',
                    src: ['public/img/src/**/*.{jpg,gif,png}'],
                    dest: 'public/img/dist'
                }]
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: ['**/*', '!assets/img/**/*.*'],
                    cwd: 'src/',
                    dest: 'dist/'
        }]
            }
        },
        watch: {
            scripts: {
                files: [
                    'public/js/src/*.src.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            css: {
                files: [
                    'public/sass/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            images: {
                expand: true,
                files: 'public/img/src/*.{jpg,gif,png}',
                tasks: 'responsive_images'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('default', ['watch', 'compass', 'uglify', 'copy', 'responsive_images']);
};
