var urlpath = "http://192.168.1.161:9898/api";

function webapi(api, parameters, fnOK, fnerr) {
	var V_TOKEN=getCookie("V_TOKEN");
	if(!V_TOKEN)
	{
		V_TOKEN=localStorage.getItem("V_TOKEN");
	}
	
	
	$.ajax({
		type: 'post',
		url: urlpath + api,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		headers:{
			token:V_TOKEN
		},
		data: parameters,
		crossDomain: true == !(document.all),
		success: function(data) {
			fnOK(data);
		},
		error: function(err, error) {
			if (fnerr != undefined) {
				fnerr(err, error);
			}
		}
	});

}

function out() {
	new $.zui.Messager('警告：确定退出系统吗？', {
		type: 'success',
		close: false,
		actions: [{
			name: 'y',
			icon: 'ok-sign',
			text: '确定',
			action: function() { // 点击该操作按钮的回调函数
				window.location.href = "../../";
				// console.log('你点击了撤销按钮。');
			}
		},
			{
				name: 'n',
				icon: 'undo',
				text: '撤销',
				action: function() { // 点击该操作按钮的回调函数
					return;
				}
			}
		]
	}).show();

}

function trim(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }
function opentab(url) {
	window.localStorage.setItem("page",url);
	top.window.location.reload();
}

function pageopentab(url) {
	window.localStorage.setItem("page",url);
	top.window.location.reload();
}

function openwindow(type, orderid,state) {
	switch (type) {
		case 101:
			{
				loadwindow(650,'','事件转派','cogs', '../../Layout/ordinaryUsers/turnsendorder.html?p_apply_id='+orderid+'&P_OP='+type);
				break;
			}
		case 102:
			{
				loadwindow('','', '事件办结', 'cogs', '../../Layout/ordinaryUsers/transferredorder.html?p_apply_id='+orderid+'&P_OP='+type);
				break;
			}
		case 106:
			{
				loadwindow('','', '事件处理', 'cogs', '../../Layout/adminUsers/dealWith.html?P_APPLY_ID='+orderid+'&P_OP='+type,'fullscreen');
				break;
			}
		case 107:
			{
				loadwindow('','','事件评分','cogs','../../Layout/adminUsers/OrderScore.html?P_APPLY_ID='+orderid+'&P_OP='+type,'fullscreen');
				break;
			}
		case 105:{
				loadwindow('','','事件处理', 'cogs', '../../Layout/adminUsers/dealWith.html?P_APPLY_ID='+orderid,'fullscreen');
				break;
				}
		case 108:
			{
				loadwindow('','', '事件查看', 'cogs', '../../Layout/adminUsers/orderDetails.html?p_apply_id='+orderid+'&P_OP='+type,'fullscreen');
				break;
				// if(state==14){
				// 		loadwindow('','', '事件查看', 'cogs', '../../Layout/adminUsers/orderQTDetails.html?p_apply_id='+orderid+'&P_OP='+type,'fullscreen');
				// 		break;
				// 	}else{
				// 		loadwindow('','', '事件查看', 'cogs', '../../Layout/adminUsers/orderDetails.html?p_apply_id='+orderid+'&P_OP='+type,'fullscreen');
				// 		break;
				// 	}
			}
		case 109:
		{
			$.ajax({
				type: "post",
				url: urlpath + '/approval/checkCbTime',
				data: {
					'P_APPLY_ID': orderid
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				dataType: 'json',
				success: function(res) {
					if(res == "SUCCESS") {
						loadwindow('360','', '事件催办', 'cogs', '../../Layout/ordinaryUsers/pressorder.html?P_APPLY_ID='+orderid+'&P_OP='+type);
					}else{
						new $.zui.Messager('请不要频繁催办！', {
							type: 'danger',
							placement: 'center',
						}).show();
					}
				}
			});

			break;
		}
		case 110:
		{
			loadwindow('','', '事件评价', 'cogs', 'pressorder.html');
			break;
		}
		case 111:
		{
			loadwindow('400','', '事件退回', 'cogs', '../../Layout/ordinaryUsers/backorder.html?p_apply_id='+orderid+'&P_OP='+type+'&APPLY_STATUS='+state);
			break;
		}
		case 113:
		{
			new $.zui.Messager('是否将ID' + orderid + '的申请单设置为您来处理？', {
				type: 'warning',
				time:0,
				actions: [{
					name: 'check',
					icon: 'check-circle',
					text: '确定',
					action: function() {
						$.ajax({
							type: "post",
							url: urlpath + '/approval/getApplyLade',
							data: {
								'P_APPLY_ID': orderid
							},
							xhrFields: {
								withCredentials: true
							},
							crossDomain: true,
							dataType: 'json',
							success: function(res) {
								if(res.result == "SUCCESS") {
									new $.zui.Messager('提单成功！', {
										type: 'success'
									}).show();
									reload();
									// updateGrid();
								}else{
									new $.zui.Messager('提单失败！', {
										type: 'danger'
									}).show();
								}
							}
						});
					}
				}, {
					name: 'undo',
					icon: 'undo',
					text: '取消',
					action: function() { // 点击该操作按钮的回调函数
						return;
					}
				}]
			}).show();
			break;
		}
		case 114:{
			loadwindow('','', '事件重发起', 'cogs', '../../Layout/adminUsers/ReSend.html?p_apply_id='+orderid+'&P_OP='+type,'fullscreen');
			break;
		}
        case 116:{
            loadwindow('','800', '事件信息补齐', 'cogs', '../../Layout/adminUsers/completionApply.html?P_APPLY_ID='+orderid);
            break;
		}
		case 128:
			{
				new $.zui.Messager('是否交由运维人员重新处理？', {
					type: 'warning',
					time:0,
					actions: [{
						name: 'check',
						icon: 'check-circle',
						text: '确定',
						action: function() {
							$.ajax({
								type: "post",
								url: urlpath + '/approval/getApplyUnsolve',
								data: {
									'P_APPLY_ID': orderid
								},
								xhrFields: {
									withCredentials: true
								},
								crossDomain: true,
								dataType: 'json',
								success: function(res) {
									if(res.result == "SUCCESS") {
										new $.zui.Messager('操作成功！', {
											type: 'success'
										}).show();
										reload();
										// updateGrid();
									}else{
										new $.zui.Messager('操作失败！', {
											type: 'danger'
										}).show();
									}
								}
							});
						}
					}, {
						name: 'undo',
						icon: 'undo',
						text: '取消',
						action: function() { // 点击该操作按钮的回调函数
							return;
						}
					}]
				}).show();
				break;
			}
		case 129:{
			loadwindow('','','事件变更', 'cogs', '../../Layout/adminUsers/orderChange.html?P_APPLY_ID='+orderid,'fullscreen');
			break;
		}
		default:
			break;

	}
}

function loadwindow(size,wsize, title, icon, url,isrue) {
	var _height = 600;
	var _width=600;
	if (size != '') {
		_height = size;
	}
	if (wsize != '') {
		_width = wsize;
	}
	$.zui.modalTrigger.show({
		title: title,
		icon: icon,
		size:isrue?'fullscreen':'',
		type: 'iframe',
		height: _height,
		width:_width,
		iframe: url
	});
}

function openwindowByzp(type, orderid,state,jjcd){
	loadwindow(650,'485','事件转派','cogs', '../../Layout/ordinaryUsers/turnsendorder.html?p_apply_id='
	+orderid+'&P_OP='+type+'&jjcd='+jjcd);
}

function paperBack() {
	window.location.href=document.referrer;
}


//取得cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var _cookie = document.cookie;
	var ca = _cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return unescape(c.substring(nameEQ.length, c.length));
		}
	}
	return false;
}
