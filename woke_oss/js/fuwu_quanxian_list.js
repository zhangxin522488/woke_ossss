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
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/selectMerchantPrivilege',
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
	var pp = $("#select_type").val();
	//	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var auditstatus = "0";
	} else if(pp == "全部") {
		var auditstatus = "3";
	} else if(pp == "审核不通过") {
		var auditstatus = "-1";
	} else {
		var auditstatus = "1";
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
				auditstatus: auditstatus,
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
	if(pp == "待审核") {
		var auditstatus = "0";
	} else if(pp == "全部") {
		var auditstatus = "3";
	} else if(pp == "审核不通过") {
		var auditstatus = "-1";
	} else {
		var auditstatus = "1";
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
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/selectMerchantPrivilege',
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
				//				if(bb[i].auditresult == 0) {
				//					var auditresult = "待审核"
				//				} else if(bb[i].auditresult == 1) {
				//					var auditresult = "审核通过"
				//				} else if(bb[i].auditresult == -1) {
				//					var auditresult = "审核不通过"
				//				}
				if(bb[i].auditusername == undefined) {
					bb[i].auditusername = ""
				}
				if(bb[i].accountname == undefined) {
					bb[i].accountname = ""
				}
				if(bb[i].areaname == undefined) {
					bb[i].areaname = ""
				}
				if(bb[i].auditsummary == undefined) {
					bb[i].auditsummary = ""
				}
				if(bb[i].auditdate == undefined) {
					bb[i].auditdate = ""
				}
				if(bb[i].auditsummary == undefined) {
					bb[i].auditsummary = ""
				}

				if(bb[i].auditresult == "1") {
					auditresult = '<button type="button" class="btn btn-success">' + "审核通过" + '</button>';
					//					           ='<button type="button" class="btn btn-info">'+"审核不通过"+'</button>';
				} else if(bb[i].auditresult == "0") {
					auditresult = '<button type="button" class="btn btn-primary">' + "待审核" + '</button>';
				} else if(bb[i].auditresult == "-1") {
					auditresult = '<button  type="button" class="btn btn-danger">' + "审核不通过" + '</button>';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					//这里需要改
					'<th>' + bb[i].accountname + '</th>' +
					'<th style="display: none;">' + bb[i].merchantid + '</th>' +
					'<th>' + bb[i].areaname + '</th>' +
					'<th>' + bb[i].auditusername + '</th>' +
					'<th>' + auditresult + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th  style="color:red;cursor: pointer" ;> <span class="glyphicon glyphicon-time"></span></th>' +

					'<th style="display: none;">' + bb[i].communityid + '</th>' +
					'<th style="display: none;">' + bb[i].audituser + '</th>' +
					'<th style="display: none;">' + bb[i].auditsummary + '</th>' +
					'<th style="display: none;">' + bb[i].auditdate + '</th>' +
					'<th style="display: none;">' + bb[i].createdate + '</th>' +
					'<th style="display: none;">' + bb[i].privilegeid + '</th>' +
					'<th style="display: none;">' + bb[i].logid + '</th>' +

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			var s_jieguo = $(this).siblings().eq(5).children("button").html();
			if(s_jieguo == "待审核") {
				$(".shenhe_no").css("display", "block");
				$(".wuxushenhe").css("display", "none");
			} else {
				$(".shenhe_no").css("display", "none");
				$(".wuxushenhe").css("display", "block");
			}
			var s_name = $(this).siblings().eq(1).html();
			var s_id = $(this).siblings().eq(2).html();

			var s_jiluID = $(this).siblings().eq(3).html();

			var s_shenqingjiluID = $(this).siblings().eq(12).html();

			var s_jieguo = $(this).siblings().eq(5).children("button").html();

			var s_ren = $(this).siblings().eq(4).html();

			var s_time = $(this).siblings().eq(10).html();
			var s_pizhu = $(this).siblings().eq(9).html();
			var s_creat_time = $(this).siblings().eq(11).html();
			var shenqingjilu = $(this).siblings().eq(12).html();

			$("#myModalLabel").html(s_name + "服务商详情");
			$('#s_name').html(s_name);
			$('#s_id').html(s_id);
			$('#s_jiluID').html(s_jiluID);
			$('#s_shenqingjiluID').html(s_shenqingjiluID);

			$('#s_jieguo').html(s_jieguo);
			$('#s_ren').html(s_ren);
			$('#s_time').html(s_time);
			$('#s_pizhu').html(s_pizhu);
			
			$('#s_creat_time').html(s_creat_time);
			$('#s_jiujiluId').html($(this).siblings().eq(13).html());

		});

		$("#tbbb tr th:nth-child(8)").click(function() {
			var id = $(this).siblings().eq(2).html();
			var name = $(this).siblings().eq(1).html();
			var shenqingjilu = $(this).siblings().eq(12).html();
			sessionStorage.setItem("quanxian_id_his", id);
			sessionStorage.setItem("quanxian_name_his", name);
			sessionStorage.setItem("quanxian_jilu_his", shenqingjilu);

			location.href = "History_xiaoqu_quanxian_list.html";
		})

	}

}

//点击审核通过
$(".shnehe_pass").click(function() {
	//	$(".shnehe_nopass").attr("disabled", "true");
	debugger
	var id = $("#s_jiujiluId").html();
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
	var id = $("#s_jiujiluId").html();
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
	if(pp == "待审核") {
		var auditstatus = "0";
	} else if(pp == "全部") {
		var auditstatus = "3";
	} else if(pp == "审核不通过") {
		var auditstatus = "-1";
	} else {
		var auditstatus = "1";
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
				auditstatus: auditstatus,
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