var tk_index = 0;
var xx_num;
var xx1_num;
$(function() {
	xx_num = $("#tipfloat1").attr("data-num");
	if(window.localStorage.getItem('role_id') == '1225') {
		tankuan1();
		setInterval(tankuan1, 60000)
	}
	$("#close1").click(function() {
		$("#tipfloat1").animate({
			height: "hide"
		}, 900);
	});
	xx1_num = $("#tipfloat2").attr("data-num");
	if(window.localStorage.getItem('role_id') == '1223') {
		tankuan2();
		setInterval(tankuan2, 60000)
	}
	$("#close2").click(function() {
		$("#tipfloat2").animate({
			height: "hide"
		}, 900);
	});
})

function tankuan1() {
	var _html = "";
	$.ajax({
		type: "post",
		url: urlpath + '/order/GetOrderTimeoutCount',
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true == !(document.all),
		dataType: 'json',
		success: function(res) {
			
			if(res.length == 0) {
				return false;
			} else {
				if(res[0].WDGD_TIMEOUT != 0||res[0].WDGD_TIMEOUT!=undefined) {
						_html = '<li><div style="float: left;">' +
							"<span>超时数量:</span>" +
							'<span style="color: #ea644a;font-size: 18px;font-weight: 1000;">' + res[0].WDGD_TIMEOUT + '</span></div>' +
							'<div style="float: right;">' +
							'<a onclick="WdGdCsl();">查看</a>' +
							'</div></li>';
					}
//				if(res[0].CS_NUM == undefined) {
//					if(res[0].CD_NUM != 0) {
//						_html = '<li><div style = "float: left;">' +
//							'<span>催单数量:</span><span style="color:#f1a325;font-size: 18px;font-weight: 1000;" >' + res[0].CD_NUM + '</span></div>' +
//							'<div style = "float: right;">' +
//							'<a href="javascript:lookList(\'' + res[0].CD_APPLY_ID + '\',\'催单数量\',\'' + res[0].USER_ID + '\');">查看 </a></div></li>';
//					}
//				} else if(res[0].CD_NUM == undefined) {
//					if(res[0].WDGD_TIMEOUT != 0) {
//						_html = '<li><div style="float: left;">' +
//							"<span>超时数量:</span>" +
//							'<span style="color: #ea644a;font-size: 18px;font-weight: 1000;">' + res[0].WDGD_TIMEOUT + '</span></div>' +
//							'<div style="float: right;">' +
//							'<a href="javascript:WdGdCsl(\'' + res[0].CS_APPLY_ID + '\',\'超时数量\',\'' + res[0].USER_ID + '\');">查看</a>' +
//							'</div></li>';
//					}
//				} else {
//					return false;
//					_html = '<li><div style = "float: left;">' +
//						'<span>催单数量:</span><span style="color:#f1a325;font-size: 18px;font-weight: 1000;" >' + res[0].CD_NUM + '</span></div>' +
//						'<div style = "float: right;">' +
//						'<a href="javascript:lookList(\'' + res[0].CD_APPLY_ID + '\',\'催单数量\',\'' + res[0].USER_ID + '\');">查看 </a></div></li>' +
//						'<li><div style="float: left;">' +
//						"<span>超时数量:</span>" +
//						'<span style="color: #ea644a;font-size: 18px;font-weight: 1000;">' + res[0].CS_NUM + '</span></div>' +
//						'<div style="float: right;">' +
//						'<a href="javascript:lookList(\'' + res[0].CS_APPLY_ID + '\',\'超时数量\',\'' + res[0].USER_ID + '\');">查看</a>' +
//						'</div></li>';
//				}
				$("#tipconcent1").html(_html);
				if(_html == "") {
					return false;
				} else {
					$("#tipfloat1").animate({
						height: "show"
					}, 1000);
				}

			}
		},
		error: function(err) {
			//alert('服务器出错！');
		}
	});

}

function tankuan2() {
	var _html = "";
	$.ajax({
		type: "post",
		url: urlpath + '/approval/getApprovalOverTime',
		data: {
			"P_TYPE": 2
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true == !(document.all),
		dataType: 'json',
		success: function(res) {
			if(res.length == 0) {
				return false;
			} else {
				if(res[0].TZ_APPLY_ID == 'undefined' || res[0].TZ_APPLY_ID == 0) {
					return false;
				} else {
					_html = '<li><div style="float: left;">' +
						"<span>已处理工单数量:</span>" +
						'<span style="color: #ea644a;font-size: 18px;font-weight: 1000;">' + res[0].TZ_NUM + '</span></div>' +
						'<div style="float: right;">' +
						'<a href="javascript:finish(\'' + res[0].TZ_APPLY_ID + '\',\'已处理工单\',\'' + res[0].APPLY_USER + '\');">查看</a>' +
						'</div></li>';
					$("#tipconcent2").html(_html);
					$("#tipfloat2").animate({
						height: "show"
					}, 1000);
				}

			}
		},
		error: function(err) {
			//alert('服务器出错！');
		}
	});
}
//查看已处理列表信息
function finish(id, P_TITLE, departid) {
	newTrigger.show({
		iframe: "maintenanceStaff/orderList.html?P_STATE=" + 13 + "&ID=" + id,
		height: $('body').height() * 0.90,
		width: $('body').width() * 0.90,
		title: P_TITLE
	});
}
//查看任务列表信息
function lookList(P_STATE, P_TITLE, id) {
	newTrigger.show({
		iframe: "maintenanceStaff/orderFloat.html?ID=" + P_STATE + '&P_DEPART_ID=' + id,
		height: $('body').height() * 0.90,
		width: $('body').width() * 0.85,
		title: P_TITLE
	});
}
function WdGdCsl(){
	layer.open({
		type: 2,
		title: '超时工单',
		shadeClose: false,
		shade: [0.3, '#7D8591'],
		maxmin: true, //开启最大化最小化按钮
		area: ['95%', '85%'],
		content: '../OrderManage/GoBeyond.html',
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
