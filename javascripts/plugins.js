/*
 * jQuery Anystretch
 * Version 1.0
 * https://github.com/danmillar/jquery-anystretch
 *
 * Add a dynamically-resized background image to the body
 * of a page or any other block level element within it
 *
 * Copyright (c) 2012 Dan Millar (@danmillar / decode.uk.com)
 * Dual licensed under the MIT and GPL licenses.
 *
 * This is a fork of jQuery Backstretch (v1.2)
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
*/
;(function($){$.fn.anystretch=function(src,options,callback){return this.each(function(i){var defaultSettings={centeredX:true,centeredY:true,speed:0,elPosition:'relative',},el=$(this),isBody=(el.get(0).tagName==undefined)?true:false,container=isBody?$('.anystretch'):el.children(".anystretch"),settings=container.data("settings")||defaultSettings,existingSettings=container.data('settings'),imgRatio,bgImg,bgWidth,bgHeight,bgOffset,bgCSS;if(options&&typeof options=="object")$.extend(settings,options);if(options&&typeof options=="function")callback=options;$(document).ready(_init);return this;function _init(){if(src){var img;if(!isBody){el.css({position:settings.elPosition,background:"none"})}if(container.length==0){container=$("<div />").attr("class","anystretch").css({left:0,top:0,position:(isBody?"fixed":"absolute"),overflow:"hidden",zIndex:(isBody?-999999:-999998),margin:0,padding:0,height:"100%",width:"100%"})}else{container.find("img").addClass("deleteable")}img=$("<img />").css({position:"absolute",display:"none",margin:0,padding:0,border:"none",zIndex:-999999}).bind("load",function(e){var self=$(this),imgWidth,imgHeight;self.css({width:"auto",height:"auto"});imgWidth=this.width||$(e.target).width();imgHeight=this.height||$(e.target).height();imgRatio=imgWidth/imgHeight;_adjustBG(function(){self.fadeIn(settings.speed,function(){container.find('.deleteable').remove();if(typeof callback=="function")callback()})})}).appendTo(container);if(el.children(".anystretch").length==0){if(isBody){$('body').append(container)}else{el.append(container)}}container.data("settings",settings);img.attr("src",src);$(window).resize(_adjustBG)}}function _adjustBG(fn){try{bgCSS={left:0,top:0};bgWidth=_width();bgHeight=bgWidth/imgRatio;if(bgHeight>=_height()){bgOffset=(bgHeight-_height())/2;if(settings.centeredY)$.extend(bgCSS,{top:"-"+bgOffset+"px"})}else{bgHeight=_height();bgWidth=bgHeight*imgRatio;bgOffset=(bgWidth-_width())/2;if(settings.centeredX)$.extend(bgCSS,{left:"-"+bgOffset+"px"})}container.children("img:not(.deleteable)").width(bgWidth).height(bgHeight).filter("img").css(bgCSS)}catch(err){}if(typeof fn=="function")fn()}function _width(){return isBody?el.width():el.innerWidth()}function _height(){return isBody?el.height():el.innerHeight()}})};$.anystretch=function(src,options,callback){var el=("onorientationchange"in window)?$(document):$(window);el.anystretch(src,options,callback)}})(jQuery);

