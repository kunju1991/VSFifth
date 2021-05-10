module.exports =  function(grunt, config) {
    return {
        component: {
            options: {
                resources: {
                    cwd: "<%= dir.src %>",
                    prefix: "<%= project.prefix %>"
                },
                dest:  "<%= dir.dist %>"
            },
            components: true,
            compress: true
        }
    }
};