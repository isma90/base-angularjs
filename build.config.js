/**
 * Created by Ismael on 15-12-16.
 */
module.export = {
    build_dir: 'build',
    compile_dir: 'bin',
    app_files: {
        modjs: ['src/**/*.module.js'],
        configjs: ['src/**/*.config.js'],
        js: ['src/**/*.js'],
        apptpl: ['src/app/**/*.tpl.html'],
        commontpl: ['src/common/**/*.tpl.html'],
        html: ['src/index.html'],
        stylus: ['stylus']
    },
    vendor_files: {
        css:[
            'vendor/bootstrap/dist/css/bootstrap.min.css',
            'vendor/Ionicons/css/ionicons.min.css'
        ],
        js:[
            'vendor/angular/angular.min.js',
            'vendor/bootstrap/dist/js/bootstrap.min.js',
            'vendor/jquery/dist/jquery.min.js'
        ],
        assets:[
            
        ],
        fonts:[
            'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
            'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
            'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
            'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
            'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
            'vendor/Ionicons/fonts/ionicons.eot',
            'vendor/Ionicons/fonts/ionicons.svg',
            'vendor/Ionicons/fonts/ionicons.ttf',
            'vendor/Ionicons/fonts/ionicons.woff'
        ]
    }
};