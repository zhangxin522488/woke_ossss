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
		var aaaa = "";
		table_jia(aaaa)
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
			couponstatus: aaaa
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
		url: urltest + 'verify/halluser/selectUserCoupons',
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
	var aaaa = $("#xiashulouyu_se option:checked").val();
	if(aaaa == 111) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			userid: youhuiquan_id,
			selectinfo: selectinfo,
			couponstatus: aaaa
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
		url: urltest + 'verify/halluser/selectUserCoupons',
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
				if(bb[i].lockdate == undefined) {
					bb[i].lockdate = ""
				}
				if(bb[i].custsex == undefined) {
					bb[i].custsex = ""
				}
				if(bb[i].couponkind == 1) {
					bb[i].couponkind = "满减券"
				}
				if(bb[i].couponkind == 2) {
					bb[i].couponkind = "无门槛券"
				}
				if(bb[i].couponstatus == 0) {
					bb[i].couponstatus = "未使用"
				}
				if(bb[i].couponstatus == 1) {
					bb[i].couponstatus = "已使用"
				}
				if(bb[i].islock == 0) {
					bb[i].islock = "未锁定"
				}
				if(bb[i].islock == 1) {
					bb[i].islock = "锁定"
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].couponname + '</th>' +
					'<th>' + bb[i].couponkind + '</th>' +
					'<th>' + bb[i].minamt + '</th>' +
					'<th>' + bb[i].couponamt + '</th>' +
					'<th>' + bb[i].couponstatus + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].usercouponsid + '</th>' + //id
					'<th style="display: none;">' + bb[i].vipid + '</th>' + //用户id
					'<th style="display: none;">' + bb[i].couponid + '</th>' + //优惠券id
					'<th style="display: none;">' + bb[i].begdate + '</th>' + //开始时间
					'<th style="display: none;">' + bb[i].enddate + '</th>' + //结束时间
					'<th style="display: none;">' + bb[i].islock + '</th>' + //锁定状态
					'<th style="display: none;">' + bb[i].lockdate + '</th>' + //锁定时间					
					'<th style="display: none;">' + bb[i].summary + '</th>' + //摘要
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#app_q_name").html($(this).siblings().eq(1).html());
			$("#app_q_type").html($(this).siblings().eq(2).html());
			$("#app_q_manjian").html($(this).siblings().eq(3).html());
			$("#app_q_meizhnag").html($(this).siblings().eq(4).html());
			$("#app_q_zhuangtai").html($(this).siblings().eq(5).html());
			$("#app_q_id").html($(this).siblings().eq(6).html());
			$("#app_q_yhId").html($(this).siblings().eq(7).html());
			$("#app_q_quanid").html($(this).siblings().eq(8).html());
			$("#app_q_start").html($(this).siblings().eq(9).html());
			$("#app_q_end").html($(this).siblings().eq(10).html());
			$("#app_q_suoding").html($(this).siblings().eq(11).html());
			$("#app_q_sdtime").html($(this).siblings().eq(12).html());
			$("#app_q_zhaiyao").html($(this).siblings().eq(13).html());
		});
	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var aaaa = $("#xiashulouyu_se option:checked").val();
	if(aaaa == 111) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			userid: youhuiquan_id,
			selectinfo: search_main,
			couponstatus: aaaa
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
		url: urltest + 'verify/halluser/selectUserCoupons',
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

//省改变
$("#xiashulouyu_se").change(function() {
	var aaaa = $("#xiashulouyu_se option:checked").val();
	if(aaaa == 111) {
		aaaa = "";
	}
	table_jia(aaaa)
})