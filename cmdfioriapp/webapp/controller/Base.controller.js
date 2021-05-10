sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/fiori/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("com.fiori.controller.Base", {
	    formatter: formatter,
	    getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
	    }
	});

});