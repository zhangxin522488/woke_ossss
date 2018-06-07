var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var fullname = sessionStorage.getItem("fullname");
var youhuiquan_id = sessionStorage.getItem("youhuiquan_id");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		table_jia()
	}
})

//请求数据列表
function table_jia(aaaa) {
	//	debugger
	var pageNumber = "1";
	var pageSize = "13";
	var auditstatus = "1";
	var startday = "";
	var endday = "";
	var selectinfo = "";
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			userid: youhuiquan_id,
			selectinfo: selectinfo,
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);
	console.log(req3)
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/halluser/selectHallUserHouseList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 13 == 0) {
					var lenn = parseInt(gezi / 13);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 13) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: 1,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "13";

	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			userid: youhuiquan_id,
			selectinfo: selectinfo,
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/halluser/selectHallUserHouseList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 13 == 0) {
					var lenn = parseInt(gezi / 13);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 13) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: aa,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})

function createShowingTable(bb) {
	//获取后台传过来的jsonData,并进行解析  
	//此处需要让其动态的生成一个table并填充数据 
	if(bb.total == 0) {
		$("#tbbb").html("");
	} else {
		console.log(bb);
		var bb = JSON.parse(bb);
		var tableStr = "";
		var len = bb.length;
		if(len == 0) {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			for(var i = 0; i < len; i++) {
				//				debugger
				if(bb[i].areaname == undefined) {
					bb[i].areaname = ""
				}
				if(bb[i].isdefault == undefined) {
					bb[i].isdefault = ""
				}
				if(bb[i].isdefault=="1"){
					bb[i].isdefault="是"
				}
				if(bb[i].isdefault=="0"){
					bb[i].isdefault="否"
				}

				if(bb[i].buildname == undefined) {
					bb[i].buildname = ""
				}
				if(bb[i].rommcode == undefined) {
					bb[i].rommcode = ""
				}
				if(bb[i].builtarea == undefined) {
					bb[i].builtarea = ""
				}
				if(bb[i].ismcust == undefined) {
					bb[i].ismcust = ""
				}
				if(bb[i].ismcust=="1"){
					bb[i].ismcust="是"
				}
				if(bb[i].ismcust=="0"){
					bb[i].ismcust="否"
				}

				if(bb[i].authway == undefined) {
					bb[i].authway = ""
				}

				if(bb[i].authphnum == undefined) {
					bb[i].authphnum = ""
				}
				if(bb[i].authdate == undefined) {
					bb[i].authdate = ""
				}
				if(bb[i].custname == undefined) {
					bb[i].custname = ""
				}
				if(bb[i].mobilephone == undefined) {
					bb[i].mobilephone = ""
				}

				if(bb[i].goldskind == 1) {
					bb[i].goldskind = '签到获得';
				}
				if(bb[i].goldskind == 2) {
					bb[i].goldskind = '邀请好友获得';
				}
				if(bb[i].goldskind == 3) {
					bb[i].goldskind = '参加活动获得';
				}
				if(bb[i].goldskind == 4) {
					bb[i].goldskind = '付款使用';
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].areaname + '</th>' +
					'<th>' + bb[i].buildname + '</th>' +
					'<th>' + bb[i].rommcode + '</th>' +
					'<th>' + bb[i].builtarea + '</th>' +
					'<th>' + bb[i].isdefault + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].id + '</th>' + //id
					'<th style="display: none;">' + bb[i].rommid + '</th>' + //房屋id
					'<th style="display: none;">' + bb[i].ismcust + '</th>' + //是否业主
					'<th style="display: none;">' + bb[i].authway + '</th>' + //认证途径
					'<th style="display: none;">' + bb[i].authphnum + '</th>' + //认证手机号
					'<th style="display: none;">' + bb[i].authdate + '</th>' + //认证时间
					'<th style="display: none;">' + bb[i].areaid + '</th>' + //所在小区id
					'<th style="display: none;">' + bb[i].custname + '</th>' + //业主姓名
					'<th style="display: none;">' + bb[i].mobilephone + '</th>' + //联系电话
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#yh_szxiaoqu").html($(this).siblings().eq(1).html());
			$("#yh_sz_lou").html($(this).siblings().eq(2).html());
			$("#yh_room_bianhao").html($(this).siblings().eq(3).html());
			$("#yh_mianji").html($(this).siblings().eq(4).html());
			$("#yh_moren").html($(this).siblings().eq(5).html());
			$("#yh_id").html($(this).siblings().eq(6).html());
			$("#yh_roomId").html($(this).siblings().eq(7).html());
			$("#yh_yezhu").html($(this).siblings().eq(8).html());
			$("#yh_renzheng").html($(this).siblings().eq(9).html());
			$("#yh_rztel").html($(this).siblings().eq(10).html());
			$("#yh_rztime").html($(this).siblings().eq(11).html());
			$("#yh_xiaoquId").html($(this).siblings().eq(12).html());
			$("#yh_name").html($(this).siblings().eq(13).html());
			$("#yh_tel").html($(this).siblings().eq(14).html());

		});
	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var search_main = $('#text_sousuo').val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			userid: youhuiquan_id,
			selectinfo: selectinfo,
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);
	console.log(req3)
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/halluser/selectHallUserHouseList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {

				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 13 == 0) {
					var lenn = parseInt(gezi / 13);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 13) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: 1,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})