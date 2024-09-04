(function($){
	$.fn.tabs = function(options){
		var def = {
			range: 100
		}
		var options = $.extend({},def,options)
		el = $(this)
		// 获取刷新的元素
		function resfEl(){
			contIndex = el.find('.wrap-content .cont-index') // 标签对应的内容容器
			contDel = el.find('.cont-scroll li .del') // 标签内的删除
			contLi = el.find('.cont-scroll li') // 标签
			contScr = el.find('.cont-scroll') // 标签父容器
			contLiActive = el.find('.cont-scroll .active') // 标签内的active
			//tab-left
			tabLeft = el.find('.tab-left')
			tabRight = el.find('.tab-right')
		}
		resfEl()				
		var moveIndex = 0;
		// 标签左滑
		tabLeft.on('click',function(){
			moveIndex < 0 ? moveIndex++ : moveIndex = 0
			el.find('.cont-scroll').stop().animate({'marginLeft':moveIndex*options.range})
		})
		// 标签右滑
		tabRight.on('click',function(){
			-(contScr.css('width').slice(0,-2)-1000) < el.find('.cont-scroll').css('margin-left').slice(0,-2) ? moveIndex-- : ''
			el.find('.cont-scroll').stop().animate({'marginLeft':moveIndex*options.range})
		})
	}	
})(jQuery);
var tabid = 0;
$(function() {
	document.oncontextmenu = function(e) {
		return false;
	}
	document.getElementById('menu').oncontextmenu = function(e) {
		return false;
	}
	//鼠标点击任意浏览器区域菜单消失
	$(document).on('click',function() {
		$("#menu").hide();
	});
	$(".wrap").tabs({
		range: 300
	});
	//tab点击
	$('.cont-scroll').on('click', 'li', function() {
		var _this = $(this);
		var contIndex = $('.wrap-content .cont-index');
		_this.addClass('active').siblings().removeClass('active');
		contIndex.eq(_this.index()).show().siblings().hide();
		$("#menu").hide();
	});
});

function addTabs(obj, text, url) {
	// 添加内容 确定按钮
	var contLi = $('.cont-scroll li');
	var contIndex = $('.wrap-content .cont-index');
	var index = 0;
	for(var i = 0; i < contLi.length; i++) {
		if(contLi.eq(i).children('span').text() == text) {
			contLi.eq(i).addClass('active');
			contLi.eq(i).siblings().removeClass('active');
			contIndex.eq(i).siblings().hide();
			contIndex.eq(i).show();
			return false;
		} else {
			index = 1;
		}
	}
	if(index == 1) {
		tabid++;
		var strLi = "<li id=\"tab" + tabid + "\"><span>" + text + "</span><a href='javascript:void(0)' onclick='deltab(this)' class='del'>X</a></li>";
		var strSec = "<div id=\"iframe_" + tabid + "\" class='cont-index'><iframe id=\"frameId_" + tabid + "\"  class='iframe' src='" + url + "'></iframe></div>";
		$('.cont-scroll').append(strLi);
		$('.wrap-content').append(strSec);
		$('.wrap-content .cont-index').eq(contLi.length).show().siblings(obj).hide();
		getliWidth();
		menu(tabid);
	}
}

function menu(index) {
	var html = '<ul class="rightMenu" id="menuId_' + index + '"><li onclick="colse(' + index + ')">关闭当前项</li>' +
		'<li onclick="colses(' + index + ')">关闭其它</li>' +
		'<li onclick="colsess()">关闭所有</li>' +
		'<li onclick="sua(' + index + ')" style="margin-bottom: 22px;" id="sua">刷新</li></ul>';
	$('.cont-scroll .active').mousedown(function(e) {
		if(e.which == 3) { // 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
			var x = e.originalEvent.x || e.originalEvent.layerX || 0;
			var y = e.originalEvent.y || e.originalEvent.layerY || 0;
			document.getElementById("menu").style.left=e.clientX+"px";
			document.getElementById("menu").style.top=e.clientY+"px";
			if($("#menuId_" + index).length == 0) {
				$("#menu").append(html);
				$("#menu").show();
			}
			if($("#menuId_" + index).is(':visible')) {
				$("#menuId_" + index).hide();
				return false;
			} else {
				$(".rightMenu").hide();
			}
			$("#menuId_" + index).css({
				"display": "block",
				"left": e.clientX + "px",
				"top": e.clientY + "px"
			});
			setTimeout(function(){
				$("#menu").show();
			},200)
		}
	})
}

function deltab(obj) {
	var contLi = $('.cont-scroll li');
	var contLiActive = $('.cont-scroll .active');
	var contIndex = $('.wrap-content .cont-index');
	var _this = $(obj);
	var parLi = _this.parent().index();
	// 如果在当前标签下 点击删除 ， 那么就在后面哪个添加active
	contLiActive.index() == $(obj).parent().index() ? contLi.eq(contLiActive.index()).addClass('active') : ''
	// 如果在最后一个标签下 点击删除 ， 那么就在倒数第二个添加active
	contLiActive.index() == contLi.length - 1 ? contLi.eq(contLi.length - 1).addClass('active') : ''
	if(contLiActive.index() == $(obj).parent().index()) {
		contIndex.eq(parLi - 1).show();
		contLi.eq(parLi - 1).addClass('active');
	}
	if(contLiActive.index() == contLi.length - 1) {
		contIndex.eq(contIndex.length).show();
	}
	contIndex.eq(parLi).remove();
	_this.parent().remove();

}

function getliWidth() {
	var contLiWidth = 50;
	var contLi = $('.cont-scroll li');
	$('.cont-scroll li').each(function() {
		contLiWidth += $(this).outerWidth(true);
	});
	contLi.eq(contLi.length - 1).addClass('active').siblings().removeClass('active');
	$('.cont-scroll').css('width', contLiWidth + 2);
}

function colse(index) {
	var intid = index - 1;
	var contLi = $('.cont-scroll li');
	var contIndex = $('.wrap-content .cont-index');
	$("#tab" + intid).addClass('active').siblings().removeClass('active');
	for(var i = 0; i < contIndex.length; i++) {
		if(contIndex.eq(i)[0].id == ("iframe_" + index)) {
			$("#" + contIndex.eq(i - 1)[0].id).show();
		}
		if(contIndex.eq(1)[0].id == ("iframe_" + index)) {
			$("#tab0").addClass('active').siblings().removeClass('active');
		}
	}
	$("#tab" + index).remove();
	$("#iframe_" + index).remove();
	$("#menu").hide();
	return false;
}

function colses(index) {
	var contLi = $('.cont-scroll li');
	var contIndex = $('.wrap-content .cont-index');
	for(var i = 1; i < contIndex.length; i++) {
		if(contIndex.eq(i)[0].id != ("iframe_" + index)) {
			$("#" + contIndex.eq(i)[0].id).remove();
		}
		if(contLi.eq(i)[0].id != ("tab" + index)) {
			$("#" + contLi.eq(i)[0].id).remove();
		}
	}
	$("#menu").hide();
	return false;
}

function colsess() {
	var contLi = $('.cont-scroll li');
	var contIndex = $('.wrap-content .cont-index');
	for(var i = 1; i < contIndex.length; i++) {
		$("#" + contIndex.eq(i)[0].id).remove();
		$("#" + contLi.eq(i)[0].id).remove();
	}
	$("#tab0").addClass('active');
	$("#iframe_0").show();
	$("#menu").hide();
	return false;
}

function sua(index) {
	var id = $("#frameId_" + index);
	id.attr('src', id.attr('src'));
	$("#menu").hide();
	return false;
}