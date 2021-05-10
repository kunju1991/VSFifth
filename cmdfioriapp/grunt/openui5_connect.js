module.exports =  function(grunt, config) {
    return {
        options: {
            resources: [
                "<%= dir.bowerComponents %>/openui5-sap.ui.core/resources",
                "<%= dir.bowerComponents %>/openui5-sap.m/resources",
                "<%= dir.bowerComponents %>/openui5-sap.ui.layout/resources",
                "<%= dir.bowerComponents %>/openui5-sap.ui.unified/resources",
                "<%= dir.bowerComponents %>/openui5-themelib_sap_belize/resources"
            ],
            proxypath: 'proxy',
            cors: {
                origin: "*"
            }
        },
        src: {
            options: {
                appresources: "<%= dir.src %>"
            }
        },
        dist: {
            options: {
                appresources: "<%= dir.dist %>"
            }
        }
    }
};