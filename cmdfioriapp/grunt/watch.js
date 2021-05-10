module.exports = function(grunt, config){
    return {
        src: {
            options: {
                livereload: true
            },
            files: [
                "<%= dir.src %>/**"
            ],
            tasks : ["eslint"]
        }
    }
};