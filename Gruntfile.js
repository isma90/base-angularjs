/**
 * Created by Ismael on 15-12-16.
 */
module.export = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    var userConfig = require('./build.config.js');
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        zip: {
            'bin.zip': ['bin/**'],
            'build.zip': ['build/**']
        },
        clean: {
            build: [
                '<%= build_dir %>',
                '<%= compile_dir %>'
            ],
            css: ['<%= build_dir %>/assets/<%= pkg.name %>---<%= pkg.version %>.css', '<%= build_dir %>/assets/<%= pkg.name %>--<%= pkg.version %>.css', '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css', '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>-part-*.css', '!<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>-part-*.min.css'],
            css_folder: ['<%= build_dir %>/assets/css']
        },
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            build_fonts: {
                files: [
                    {
                        src: ['<%= vendor_files.fonts %>'],
                        dest: '<%= build_dir %>/assets/fonts',
                        expand: true,
                        rename: function (dest, src) {
                            var src_array = src.split('/');
                            src = src_array[src_array.length - 1];
                            return dest + '/' + src;
                        }
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: ['<%= vendor_files.assets %>'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        filter: 'isFile',
                        rename: function (dest, src) {
                            var path = require('path');

                            // Get the name of the component folder (or first folder in src path)
                            var component = src.split("/").slice(1, 2)[0];
                            grunt.log.writeln("path es : " + component);

                            if (component.indexOf("ism-") != -1) {
                                grunt.log.writeln("viene ism");
                                var dir_relativo = src.split("/assets/").slice(1, 2)[0];
                                grunt.log.writeln("path final es :" + dir_relativo);
                                return path.join(dest, dir_relativo);
                            }
                            else {
                                grunt.log.writeln("no viene ism");
                                grunt.log.writeln("path final es :" + path.basename(src));
                                return path.join(dest, path.basename(src));

                            }
                        }
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: ['<%= app_files.modjs %>', '<%= app_files.configjs %>', '<%= app_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>--<%= pkg.version %>.css',
                    '<%= build_dir %>/assets/<%= pkg.name %>---<%= pkg.version %>.css'
                ],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>',
                    stripBanners: true
                },
                files: [
                    {
                        src: [
                            '<%= vendor_files.js %>'
                        ],
                        dest: 'temp_compile_vendor.js',
                        cwd: '<%= build_dir %>'
                    },
                    {
                        src: [
                            '<%= app_files.modjs %>',
                            '<%= app_files.configjs %>',
                            '<%= app_files.js %>',
                            'templates-*.js'
                        ],
                        dest: 'temp_compile.js',
                        cwd: '<%= build_dir %>',
                        expand: true,
                        rename: function (dest) {
                            return dest;
                        } // IMPORTANT: https://github.com/gruntjs/grunt-contrib-concat/issues/31
                    },
                    {
                        src: [
                            'temp_compile_vendor.js',
                            'module.prefix',
                            'temp_compile.js',
                            'module.suffix'
                        ],
                        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
                    }
                ]
            }
        },
        ngmin: {
            compile: {
                files: [
                    {
                        src: ['<%= app_files.modjs %>', '<%= app_files.configjs %>', '<%= app_files.js %>'],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>',
                    mangle: false
                },
                files: {
                    '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js': '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
                }
            }
        },
        stylus: {
            build: {
                files: [
                    {
                        src: [
                            '<%= app_files.stylus_portal %>*.styl',
                            '<%= app_files.stylus_orion %>*.styl'
                        ], // compile and concat into single file
                        dest: '<%= build_dir %>/assets/<%= pkg.name %>---<%= pkg.version %>.css'
                    }
                ]
            },
            compile: {
                options: false,
                files: [
                    {
                        src: [
                            '<%= app_files.stylus_portal %>*.styl',
                            '<%= app_files.stylus_orion %>*.styl'
                        ], // compile and concat into single file
                        dest: '<%= build_dir %>/assets/<%= pkg.name %>---<%= pkg.version %>.css'
                    }
                ]
            }
        },
        csssplit: {
            split_css: {
                src: ['<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'],
                dest: '<%= build_dir %>/assets/',
                options: {
                    maxSelectors: 2000,
                    maxPages: 30,
                    suffix: '-part-'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= build_dir %>/assets/',
                    src: ['*part*.css', '!*.min.css'],
                    dest: '<%= build_dir %>/assets/',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
            src: [
                '<%= app_files.modjs %>', '<%= app_files.configjs %>', '<%= app_files.js %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                files: [
                    {
                        src: ['<%= app_files.atpl %>'],
                        dest: '<%= build_dir %>/templates-app.js'
                    }
                ]
            },

            ism: {
                options: {
                    base: 'vendor'
                },
                files: [
                    {
                        src: ['<%= app_files.btpl %>'],
                        dest: '<%= build_dir %>/templates-ism.js'
                    }
                ]
            },


            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/common'
                },
                files: [
                    {
                        src: ['<%= app_files.ctpl %>'],
                        dest: '<%= build_dir %>/templates-common.js'
                    }
                ]
            }
        },
        'string-replace': {

            single_file: {
                files: {
                    '<%= build_dir %>/templates-ism.js': '<%= build_dir %>/templates-ism.js'
                },
                options: {
                    replacements: [{
                        pattern: /ism-/g,
                        replacement: ''
                    }]
                }
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= app_files.modjs %>',
                    '<%= app_files.configjs %>',
                    '<%= app_files.js %>',
                    'templates-*.js',
                    'assets/*.css'
                ],
                expand: true,
                cwd: '<%= build_dir %>/'
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js',
                    '<%= build_dir %>/assets/*.css'
                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('build', [
        'clean:build', 'html2js',
        'string-replace', 'jshint',
        'stylus:build', 'concat:build_css',
        'copy:build_app_assets', 'copy:build_vendor_assets',
        'copy:build_fonts', 'copy:build_appjs',
        'copy:build_vendorjs', 'clean:css_folder',
        'csssplit', 'cssmin',
        'clean:css', 'index:build'
    ]);

    grunt.registerTask('compile', [
        'stylus:compile', 'concat:build_css',
        'csssplit', 'cssmin',
        'clean:css', 'clean:css_folder',
        'copy:compile_assets', 'ngmin',
        'concat:compile_js', 'clean:temp_compile',
        'uglify', 'index:compile'
    ]);

    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
};