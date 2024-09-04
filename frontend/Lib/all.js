var title, num, p_score = "",
	lock = false;
var ID, PERID;
//工单录入，录入后自动进入工单池
function orderAdd(keyValue) { //完成
	lock = false;
	layer.confirm('是否提交至工单池？', {
		btn: ['确定', '取消']
	}, function() {
		webapi("/order/OrderAdd", keyValue, function(res) { //完成
			if(res.RESULT == "SUCCESS") {
				layer.alert(res.MESSAGE);
			} else {
				lock = false;
				layer.alert(res.MESSAGE);
			}
		}, function(err) {
			lock = false;
			layer.alert(err);
		});
	}, function() {

	});
}
//工单暂存，录入后不进入工单池
function orderSave(keyValue) { //完成
	lock = false;
	layer.confirm('该工单将被提交至暂存,确定提交吗？', {
		btn: ['确定', '取消']
	}, function() {
		webapi("/order/OrderAdd", keyValue, function(res) {
			if(res.RESULT == "SUCCESS") {
				layer.alert(res.MESSAGE);
			} else {
				layer.alert(res.MESSAGE);
				lock = false;
			}
		}, function(err) {
			lock = false;
			layer.alert(err);
		});
	}, function() {

	});
}
//工单提交，提交后自动进入工单池
function orderSubmit(dbIds, operId) { //完成
	layer.confirm('确定提交吗？', {
		btn: ['确定', '取消']
	}, function() {
		var parames = {
			"P_DB_IDS": dbIds, //工单唯一ID,一个或多个，多个之间用英文逗号隔开
			"P_DATA_USER_ID": "", //指定工单处理人，没有传空值
			"P_OPER_ID": operId, //操作ID
			"P_OPER_DSC": "", //操作备注，没有传空值
			"P_FUJIAN_STR": "", //处理时上传的附件，附件信息拼接字符
			"P_SCORE": "", //评分
			"P_EMER_LEVEL": "" //--工单紧急程度设置
		}
		webapi("/order/orderOperAdd", parames, function(res) {
			if(res.RESULT == "SUCCESS") {
				layer.msg(res.MESSAGE, {
					icon: 6,
					time: 1000
				});
				setTimeout(function(){
					window.location.reload();
				},500);
			} else {
				layer.msg(res.MESSAGE, {
					icon: 5,
					time: 1000
				});
			}
		}, function(err) {
			layer.alert("服务器出错！");
		});
	}, function() {

	});
}

//手动调度工单至一线处理人
function orderToUserByHand(dbIds, operId, Emergency) { //完成
	//选择工单处理人、填写备注、提交做判断   dbIds工单ID   dataUserId指定工单处理人  operId 操作ID
	lock = false;
	layer.open({
		type: 2,
		title: '工单调度至一线',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderToLine.html?ID=' + dbIds + "&PERID=" + operId + "&Emergency=" + Emergency,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();

		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//工单处理   可关联知识库
function orderDeal(dbIds, operId) { //完成
	//填写处理意见（必填）、上传附件（可为空）
	lock = false;
	layer.open({
		type: 2,
		title: '工单处理',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderDeal.html?ID=' + dbIds + "&PERID=" + operId + "&Emergency=" + Emergency,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//转派工单到一线处理人
function orderToOneLine(dbIds, operId, Emergency) { //完成
	//选择工单处理人、填写备注、提交做判断
	lock = false;
	layer.open({
		type: 2,
		title: '工单调度至一线',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderToLine.html?ID=' + dbIds + "&PERID=" + operId + "&Emergency=" + Emergency,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//转派工单到二线处理人
function orderToTwoLine(dbIds, operId, Emergency) { //完成
	//选择工单处理人、填写备注、提交做判断
	lock = false;
	layer.open({
		type: 2,
		title: '工单调度至二线',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderToLine.html?ID=' + dbIds + "&PERID=" + operId + "&Emergency=" + Emergency,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//转派工单到三线处理人
function orderToTreeLine(dbIds, operId, Emergency) { //完成
	//选择工单处理人、填写备注、提交做判断
	lock = false;
	layer.open({
		type: 2,
		title: '工单调度至三线',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderToLine.html?ID=' + dbIds + "&PERID=" + operId + "&Emergency=" + Emergency,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//退回工单至调度池
function orderBack(dbIds, operId) { //完成
	//填写退回备注、提交做判断
	lock = false;
	layer.open({
		type: 2,
		title: '退回工单至调度池',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderBack.html?ID=' + dbIds + "&PERID=" + operId,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//工单催办
function orderPress(dbIds, operId) { //完成
	//填写催办原因、催办频率验证
	lock = false;
	var para = {
		"P_DB_ID": dbIds
	}
	webapi("/order/RemTimeCheck", para, function(res) {
		if(res == "NO") {
			layer.alert("请稍后在催单，你已经催过了！");
		} else {
			layer.open({
				type: 2,
				title: '工单催办',
				shadeClose: true,
				shade: [0.8, '#393D49'],
				maxmin: true, //开启最大化最小化按钮
				area: ['893px', '600px'],
				content: '../../OrderManage/OrderOper/orderPress.html?ID=' + dbIds + "&PERID=" + operId,
				btn: ["提交", "取消"],
				yes: function(index, layero) {
					//执行子页面中的验证方法
					var body = layer.getChildFrame('body', index);
					var iframe = window[layero.find('iframe')[0]['name']];
					lock = iframe.formValidator();
				},
				btn2: function(index, layero) {
					layer.close(index);
					lock = false;
				}
			});
		}
	}, function(err) {
		layer.alert("服务器出错！");
	});
}
//审核
function orderAudit(dbIds, opid) {
	lock = false;
	layer.open({
		type: 2,
		title: '工单审核',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderAudit.html?ID=' + dbIds + "&PERID=" + opid,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}
//工单重发
function orderAgain(dbIds, operId) { //完成
	title = "是否重发!";
	ID = dbIds;
	PERID = operId;
	firm(title, "", "", "");
}
//工单处理评价
function orderMark(dbIds, operId) { //完成
	lock = false;
	layer.open({
		type: 2,
		title: '工单处理评价',
		shadeClose: true,
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: '../../OrderManage/OrderOper/orderMark.html?ID=' + dbIds + "&PERID=" + operId,
		btn: ["提交", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.formValidator();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}

function firm(title, userid, dsc, fuid, id, perid, emer) {
	layer.confirm(title, {
		btn: ['确定', '取消']
	}, function() {
		webajax(userid, dsc, fuid, id, perid, emer);
	}, function() {

	});
}

function scorefirm(title, userid, dsc, fuid, id, perid, score) {
	p_score = score;
	layer.confirm(title, {
		btn: ['确定', '取消']
	}, function() {
		webajax(userid, dsc, fuid, id, perid, "");
	}, function() {

	});

}

function webajax(userid, dsc, fuid, id, perid, emer) {
	var parames = {
		"P_DB_IDS": id, //工单唯一ID,一个或多个，多个之间用英文逗号隔开
		"P_DATA_USER_ID": userid, //指定工单处理人，没有传空值
		"P_OPER_ID": perid, //操作ID
		"P_OPER_DSC": dsc, //操作备注，没有传空值
		"P_FUJIAN_STR": fuid, //处理时上传的附件，附件信息拼接字符
		"P_SCORE": p_score,
		"P_EMER_LEVEL": '' + emer //--工单紧急程度设置
	}
	webapi("/order/orderOperAdd", parames, function(res) {
		if(res.RESULT == "SUCCESS") {
			var index = parent.layer.getFrameIndex(window.name); //获取父页面窗口索引
			parent.layer.msg(res.MESSAGE, {
				icon: 6,
				time: 1000
			});
			setTimeout(function() {
				parent.layer.close(index);
				window.parent.location.href = document.referrer;
			}, 500);
		} else {
			parent.layer.msg(res.MESSAGE, {
				icon: 5,
				time: 1000
			});
			parent.lock = false;
		}
	}, function(err) {
		parent.lock = false;
		layer.alert("服务器出错！");
	});
}

function getButton(domId, dbid) {
	var buttonHtml = "";
	var menuId = $.url("menu_id");
	var signParms = {
		"P_DB_ID": dbid
	};
	webapi("/order/getUserOper", signParms, function(res) {
		for(var r = 0; r < res.length; r++) {
			if(res[r].OPER_NAME == "催单") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-bell fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "退单") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-mail-reply-all fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "调度") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-mail-reply-all fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "转派一线" || res[r].OPER_NAME == "转派二线" || res[r].OPER_NAME == "转派三线") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-mail-forward fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "处理") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "评价") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-star fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			} else if(res[r].OPER_NAME == "提交") {
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-star fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			}else if(res[r].OPER_NAME=="通过"){
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-star fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			}else if(res[r].OPER_NAME=="驳回"){
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-star fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			}else{
				buttonHtml += '<button type="button" style="margin-right: 15px;" class="btn btn-light" onclick="' + res[r].OPER_BTN + '">';
				buttonHtml += '<i class="fa fa-star fa-fw"></i>' + res[r].OPER_NAME + '</button>';
			}
		}
		buttonHtml += '<button style="margin-right: 15px;" id="collect" class="btn btn-light" type="button" onclick="collect(' + dbid + ')"><i class="fa fa-bookmark-o" aria-hidden="true"></i>收藏</button>' +
			'<button style="margin-right: 15px;" id="uncollect" style="display: none" class="btn btn-light" type="button" onclick="uncollect(' + dbid + ')"><i class="fa fa-bookmark" aria-hidden="true" ></i>取消收藏</button>' +
			'<a style="margin-right: 15px;" class="btn btn-primary" href="javascript:history.back(-1);">返回</a>';

		$(domId).html(buttonHtml);
	}, function() {
		layer.alert('按钮数据读取失败');
	})

}

function recordKnowledge(DB_ID) {
	lock = false;
	layer.open({
		type: 2,
		title: '关联知识',
		shadeClose: true,
		shade: [0.3, '#7D8591'],
		maxmin: true, //开启最大化最小化按钮
		area: ['85%', '700px'],
		content: '../../OrderManage/RecordKnowledge.html?P_DB_ID=' + DB_ID,
		btn: ["关联", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			if(lock) {
				return false;
			}
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.record();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}

function connectOrder() {
	lock = false;
	layer.open({
		type: 2,
		title: '关联工单',
		shadeClose: false,
		shade: [0.3, '#7D8591'],
		maxmin: true, //开启最大化最小化按钮
		area: ['85%', '85%'],
		content: '../../OrderManage/ConnectOrder.html',
		btn: ["添加", "取消"],
		yes: function(index, layero) {
			//执行子页面中的验证方法
			if(lock) {
				return false;
			}
			var body = layer.getChildFrame('body', index);
			var iframe = window[layero.find('iframe')[0]['name']];
			lock = iframe.connect();
		},
		btn2: function(index, layero) {
			layer.close(index);
			lock = false;
		}
	});
}

function recordSuccess() {
	layer.alert("关联成功！");
	getKnowledgeInfo();
}

function getKnowledgeInfo() {
	$('#table').bootstrapTable('destroy');
	g = $('#table').bootstrapTable({
		url: urlpath + '/order/orderRecordKnowledgeList?P_DB_ID=' + P_DB_ID,
		method: 'get',
		contentType: "text/json; charset=UTF-8",
		queryParamsType: "",
		sidePagination: 'server', //指定服务器端分页
		dataType: "json",
		sortable: true, //是否启用排序
		sortOrder: "desc", //排序方式
		sortName: "",
		pagination: true,
		pageNumber: 1,
		pageSize: 10, //单页记录数
		pageList: [10, 15, 20, 30], //分页步进值
		clickToSelect: true, //点击选中
		//得到查询的参数
		queryParams: function(params) {
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {
				page: params.pageNumber, //初始化加载第一页，默认第一页
				recPerPage: params.pageSize, //每页的记录行数
				sortBy: params.sortName,
				order: params.sortOrder
			};
			return temp;
		},
		columns: [{
				field: "KNOWLEDGE_ID",
				title: "知识库ID",
				align: "left",
				width: 80
			},
			{
				field: "TITLE",
				title: "知识库标题",
				align: 'left',
				sortable: true,
				width: 350
			},
			{
				field: "CREATE_TIME",
				title: "创建时间",
				align: 'left',
				width: 120
			},
			{
				field: "CREATE_USER",
				title: "创建人",
				align: 'left',
				width: 100
			}, {
				field: "RECORD_TIME",
				title: "关联时间",
				align: 'left',
				width: 120
			},
			{
				field: "RECORD_USER",
				title: "关联人",
				align: 'left',
				width: 100
			},
			{
				field: "OP",
				title: "操作",
				align: "center",
				width: 120,
				formatter: function(value, row, index) {
					return "<a style='cursor: pointer' onclick='knowledgeDetail(" + row.KNOWLEDGE_ID + ")'>查看详情</a>";
					// "&nbsp;<a style='cursor: pointer;color: red' onclick='delRecord("+row.KNOWLEDGE_ID+")'>删除</a>";
				}
			}
		]
	});

}

function knowledgeDetail(knowledge_id) {
	window.open("../../Layout/ordinaryUsers/lookKnowledgeContent.html?itemid=" + knowledge_id + "&itemtypeid=1", "知识详情");
}

function collect(db_id) {
	webapi('/order/orderCollect', {
		"P_DB_ID": db_id
	}, function(res) {
		if(res.RESULT == "success") {
			layer.alert("收藏成功！");
			$("#collect").hide();
			$("#uncollect").show()
		} else {
			layer.alert(res.MSG);
		}
	})
}

function uncollect(db_id) {
	webapi('/order/orderUncollect', {
		"P_DB_ID": db_id
	}, function(res) {
		if(res.RESULT == "success") {
			layer.alert("取消收藏成功！");
			$("#collect").show();
			$("#uncollect").hide();
		} else {
			layer.alert(res.MSG);
		}
	})
}
//催单
function orderPressBtn(opid) {
	orderPress(P_DB_ID, opid);
}
//退单
function orderBackBtn(opid) {
	orderBack(P_DB_ID, opid);
}
//调度
function orderToUserByHandBtn(opid) {
	orderToUserByHand(P_DB_ID, opid, Emergency);
}
//转派一线
function orderToOneLineBtn(opid) {
	orderToOneLine(P_DB_ID, opid, Emergency);
}
//转派二线
function orderToTwoLineBtn(opid) {
	orderToTwoLine(P_DB_ID, opid, Emergency);
}
//转派三线
function orderToTreeLineBtn(opid) {
	orderToTreeLine(P_DB_ID, opid, Emergency);
}
//处理
function orderDealBtn(opid) {
	orderDeal(P_DB_ID, opid);
}
//评价
function orderMarkBtn(opid) {
	orderMark(P_DB_ID, opid);
}
//通过
function orderAuditPassBtn(opid) {
	orderAudit(P_DB_ID, opid);
}

//驳回
function orderAuditRejectBtn(opid) {
	orderAudit(P_DB_ID, opid);
}
//重发
function orderAgainBtn(opid) {

}
//暂存后的提交
function orderSubmitBtn(opid) {
	orderSubmit(P_DB_ID, opid);
}

function setTable(select) {
	$("#noneInfo").remove();
	var haveIds = $(".DB_ID");
	var tableStr = "";
	for(var i = 0; i < select.length; i++) {
		var db_id = select[i].DB_ID;
		var isExist = false;
		for(var j = 0; j < haveIds.length; j++) {
			if(db_id == haveIds[j].innerText) {
				isExist = true;
				break;
			}
		}
		if(isExist) {
			continue;
		} else {
			tableStr += "<tr><td class='DB_ID'>" + db_id + "</td><td>" + select[i].ORDER_NAME + "</td><td>" + select[i].ORDER_DSC + "</td><td>" + select[i].FORM_NAME +
				"</td><td>" + select[i].CREATE_TIME + "</td><td>" + select[i].CREATE_USER + "</td><td><a onclick='delOrder(this)'>删除</a></td>"
		}
	}
	$("#connectBody").append(tableStr);
}

function delOrder(obj) {
	$(obj).parent().parent().remove();
	if($(".DB_ID").length == 0) {
		$("#connectBody").append("<tr id=\"noneInfo\"><td colspan=\"7\" style=\"text-align: center\">暂无关联信息</td></tr>")
	}
}

function getConnectIds() {
	var obj = $(".DB_ID");
	var str = "";
	if(obj.length > 0) {
		for(var i = 0; i < obj.length; i++) {
			str += obj[i].innerText + ",";
		}
	}
	return str;
}

function getConnectInfo() {
	$('#connectTable').bootstrapTable('destroy');
	g = $('#connectTable').bootstrapTable({
		url: urlpath + '/order/ListOrderConnect?P_DB_ID=' + P_DB_ID,
		method: 'get',
		contentType: "text/json; charset=UTF-8",
		queryParamsType: "",
		sidePagination: 'server', //指定服务器端分页
		dataType: "json",
		sortable: true, //是否启用排序
		sortOrder: "desc", //排序方式
		sortName: "",
		pagination: true,
		pageNumber: 1,
		pageSize: 10, //单页记录数
		pageList: [10, 15, 20, 30], //分页步进值
		clickToSelect: true, //点击选中
		//得到查询的参数
		queryParams: function(params) {
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {
				page: params.pageNumber, //初始化加载第一页，默认第一页
				recPerPage: params.pageSize, //每页的记录行数
				sortBy: params.sortName,
				order: params.sortOrder
			};
			return temp;
		},
		columns: [{
				field: "DB_ID",
				title: "ID",
				align: 'left',
				sortable: true,
				width: 80
			},
			{
				field: "FORM_NAME",
				title: "工单类型",
				align: 'left',
				width: 100
			},
			{
				field: "ORDER_NAME",
				title: "工单标题",
				align: 'left',
				width: 200
			}, {
				field: "ORDER_DSC",
				title: "工单内容",
				align: 'left',
				width: 300
			},
			{
				field: "OP",
				title: "操作",
				align: "center",
				width: 120,
				formatter:function(value, row, index) {
					return "<a style='cursor: pointer' onclick='lookDbDetail(" + row.DB_ID + "," + row.EVENT_ID + ")'>查看详情</a>";
				}
			}

		]
	});
}

function lookDbDetail(dbid, eventid) {
	switch(eventid) {
		case 1000:
			window.open("../QuestionManage/QuestionInfo.html?P_DB_ID=" + dbid + "&P_EVENT_ID=" + eventid, "问题详情");
			break;
		case 1011:
			window.open('../ReleaseManage/ReleaseDetail.html?P_DB_ID=' + dbid + "&P_EVENT_ID=" + eventid, "发布详情");
			break;
		case 1020:
			window.open("../EventManage/EventBaseInfo.html?P_DB_ID=" + dbid + "&P_EVENT_ID=" + eventid, "事件详情");
			break;
		case 1010:
			window.open("../ChanageManage/ChangeBaseInfo.html?P_DB_ID=" + dbid + "&P_EVENT_ID=" + eventid, "需求详情");
			break;
	}
}