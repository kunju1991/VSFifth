module.exports = function(grunt, config) {
    return {
        dist: {
            files: [ {
                expand: true,
                cwd: "<%= dir.src %>",
                src: [
                    '**',
                    '!test/**'
                ],
                dest: "<%= dir.dist %>"
            } ]
        }
    }
};