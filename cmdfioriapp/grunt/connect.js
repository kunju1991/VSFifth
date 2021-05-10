module.exports =  function(grunt, config) {
    return {
        src: {
            options: {
                port: "<%= serve.portSrc %>",
                hostname: "<%= serve.host %>"
            }
        },

        dist: {
            options: {
                port: "<%= serve.portDist %>",
                hostname: "<%= serve.host %>",
                keepalive: true
            }
        }
    }
};