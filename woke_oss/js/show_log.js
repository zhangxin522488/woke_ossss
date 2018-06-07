var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$('.my_feilei ul li button').click(function() {
	$(this).attr("class", "btn btn-primary");
	$(this).siblings().attr("class", "btn btn-info");
});
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pageNumber = "1";
		var pageSize = "10";
		var pp = $(".btn btn-primary").val();
		var auditstatus = "0";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		var executeresult = ""
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				//				auditstatus: auditstatus,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				executeresult: executeresult,

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
			url: urltest + 'verify/function/selectSysLogList',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 10 == 0) {
						var lenn = parseInt(gezi / 10);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 10) + 1;
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

});

//下拉跨状态发生改变
$("#select_type").change(function() {
	var pageNumber = "1";
	var pageSize = "10";
	//	var pp = $("#select_type").val();
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "全部") {
		var executeresult = "";
	} else if(pp == "成功") {
		var executeresult = "1";
	} else if(pp == "失败") {
		var executeresult = "-1";
	} else {
		var executeresult = "";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				executeresult: executeresult,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
			url: urltest + 'verify/function/selectSysLogList',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 10 == 0) {
						var lenn = parseInt(gezi / 10);
						var lenn = parseInt(gezi / 10);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 10) + 1;
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

})

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "10";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "全部") {
		var executeresult = "";
	} else if(pp == "成功") {
		var executeresult = "1";
	} else if(pp == "失败") {
		var executeresult = "-1";
	} else {
		var executeresult = "";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				executeresult: executeresult,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
			url: urltest + 'verify/function/selectSysLogList',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 10 == 0) {
						var lenn = parseInt(gezi / 10);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 10) + 1;
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
	}

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
				if(bb[i].categoryid == '1') {
					var categoryid = "登录";
				} else if(bb[i].categoryid == '2') {
					var categoryid = "访问";
				} else if(bb[i].categoryid == '3') {
					var categoryid = "操作";
				} else if(bb[i].categoryid == '4') {
					var categoryid = "异常";
				}
				if(bb[i].operatetype == '0') {
					var operatetype = "登录";
				} else if(bb[i].operatetype == '1') {
					var operatetype = "增加";
				} else if(bb[i].operatetype == '2') {
					var operatetype = "编辑";
				} else if(bb[i].operatetype == '3') {
					var operatetype = "删除";
				} else if(bb[i].operatetype == '4') {
					var operatetype = "查询";
				} else if(bb[i].operatetype == '5') {
					var operatetype = "其他";
				}
				if(bb[i].executeresult == "1") {
					bb[i].executeresult = "成功";
				} else {
					bb[i].executeresult = "失败";
				}
				if(bb[i].operateusername == undefined) {
					bb[i].operateusername = "";
				}
				if(bb[i].moduleid == undefined) {
					bb[i].moduleid = "";
				}
				if(bb[i].ipaddress == undefined) {
					bb[i].ipaddress = "";
				}
				if(bb[i].ipaddressname == undefined) {
					bb[i].ipaddressname = "";
				}
				if(bb[i].host == undefined) {
					bb[i].host = "";
				}
				if(bb[i].browser == undefined) {
					bb[i].browser = "";
				}
				if(bb[i].description == undefined) {
					bb[i].description = "";
				}
				if(bb[i].operateuserid == undefined) {
					bb[i].operateuserid = "";
				}
				if(bb[i].operateaccount == undefined) {
					bb[i].operateaccount = "";
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					//这里需要改
					'<th>' + categoryid + '</th>' +
					'<th style="display: none;">' + bb[i].logid + '</th>' +
					'<th>' + bb[i].operatetime + '</th>' +
					'<th>' + bb[i].operateusername + '</th>' +
					'<th >' + bb[i].modulename + '</th>' + //系统功能名
					'<th>' + operatetype + '</th>' +
					'<th>' + bb[i].executeresult + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					//					'<th  style="color:red;cursor: pointer" ;>' + "历史记录" + '</th>' +
					'<th style="display: none;">' + bb[i].operateuserid + '</th>' + //操作用户id
					'<th style="display: none;">' + bb[i].operateaccount + '</th>' + //操作用户账号
					'<th style="display: none;">' + bb[i].moduleid + '</th>' + //功能id
//					'<th style="display: none;">' + bb[i].modulename + '</th>' + //系统功能名
					'<th style="display: none;">' + bb[i].ipaddress + '</th>' + //ip地址
					'<th style="display: none;">' + bb[i].ipaddressname + '</th>' + //ip所在城市
					'<th style="display: none;">' + bb[i].host + '</th>' + //主机
					'<th style="display: none;">' + bb[i].browser + '</th>' + //浏览器
					'<th style="display: none;">' + bb[i].description + '</th>' + //日志详情
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(9)").click(function() {
			$("#s_xitong").html($(this).siblings().eq(5).html());
			$("#s_name").html($(this).siblings().eq(1).html());
			$("#s_id").html($(this).siblings().eq(2).html());
			$("#s_time").html($(this).siblings().eq(3).html());
			$("#s_jiluID").html($(this).siblings().eq(4).html());
			$("#s_type").html($(this).siblings().eq(6).html());
			$("#s_jieguo").html($(this).siblings().eq(7).html());
			$("#s_ID_caozuo").html($(this).siblings().eq(8).html());
			$("#s_zhanghao").html($(this).siblings().eq(9).html());
			$("#s_gongneng").html($(this).siblings().eq(10).html());
			
			$("#s_IP_address").html($(this).siblings().eq(11).html());
			$("#s_ip_city").html($(this).siblings().eq(12).html());
			$("#s_host").html($(this).siblings().eq(10).html());
			$("#s_liulanqi").html($(this).siblings().eq(14).html());
			$("#s_rizhi_xiangqing").html($(this).siblings().eq(15).html());
			//			$("#s_ip_city").html($(this).siblings().eq(2).html());
		});

	}

}

//点击审核通过
$(".shnehe_pass").click(function() {
	//	$(".shnehe_nopass").attr("disabled", "true");
	debugger
	var id = $("#s_jiluID").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $("#s_pizhu").val();

	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				LogId: id,
				auditUser: userId,
				auditUserName: userName,
				auditSummary: auditSummary
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
			url: urltest + 'verify/merchant/updateMerchantPrivilegeAuditPass',
			//			                merchant/updateMerchantPrivilegeAuditPass
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核成功！");
					location.href = "fuwu_quanxian_list.html";
				} else {
					alert(msg.resoponseDisp);

				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

})

//审核不通过
$(".shnehe_nopass").click(function() {
	//	$(".shnehe_nopass").attr("disabled","true");
	var id = $("#s_jiluID").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $('#s_pizhu').val();
	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				LogId: id,
				auditUser: userId,
				auditUserName: userName,
				auditSummary: auditSummary
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
			url: urltest + 'verify/merchant/updateMerchantPrivilegeAuditNotPass',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核不通过！");
					location.href = "fuwu_quanxian_list.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

})

$('#search_chaxun').click(function() {
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	//	console.log(star_time+end_time+search_main)

})

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	//	var auditstatus = "";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "全部") {
		var executeresult = "";
	} else if(pp == "成功") {
		var executeresult = "1";
	} else if(pp == "失败") {
		var executeresult = "-1";
	} else {
		var executeresult = "";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				executeresult: executeresult,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
		//	console.log(star_time+end_time+search_main)
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/merchant/selectMerchantPrivilege',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 10 == 0) {
						var lenn = parseInt(gezi / 10);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 10) + 1;
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

})