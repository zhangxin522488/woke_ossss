var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var fullname = sessionStorage.getItem("fullname");
var organizeid = sessionStorage.getItem("organizeid");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		var isdeal = 1;
		table_jia(isdeal)
	}
})

//请求数据列表
function table_jia(isdeal) {
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
			selectinfo: selectinfo,
			isdeal: isdeal
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
		url: urltest + 'verify/function/selectOpinionList',
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
	var aaaa = $("#chuli_type option:checked").val();
	if(aaaa == 0) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			isdeal: aaaa
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
		url: urltest + 'verify/function/selectOpinionList',
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
				if(bb[i].username == undefined) {
					bb[i].username = ""
				}
				if(bb[i].mobileno == undefined) {
					bb[i].mobileno = ""
				}
				if(bb[i].isdeal == "1") {
					bb[i].isdeal = "未处理"
				}
				if(bb[i].isdeal == "2") {
					bb[i].isdeal = "已处理"
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].account == undefined) {
					bb[i].account = ""
				}
				if(bb[i].dealname == undefined) {
					bb[i].dealname = ""
				}

				if(bb[i].useropinion == undefined) {
					bb[i].useropinion = ""
				}
				if(bb[i].userid == undefined) {
					bb[i].userid = ""
				}

				if(bb[i].describe == undefined) {
					bb[i].describe = ""
				}
				if(bb[i].picurl == undefined) {
					bb[i].picurl = ""
				}
				if(bb[i].dealid == undefined) {
					bb[i].dealid = ""
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].username + '</th>' +
					'<th>' + bb[i].mobileno + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].dealname + '</th>' +
					'<th>' + bb[i].isdeal + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].useropinion + '</th>' + //用户意见反馈 id
					'<th style="display: none;">' + bb[i].userid + '</th>' + //用户id
					'<th style="display: none;">' + bb[i].describe + '</th>' + //意见描述
					'<th style="display: none;">' + bb[i].picurl + '</th>' + //图片地址
					'<th style="display: none;">' + bb[i].dealid + '</th>' + //处理人id
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			//			debugger
			$("#yj_name").html($(this).siblings().eq(1).html());
			$("#yj_mibil").html($(this).siblings().eq(2).html());
			$("#yj_creatdate").html($(this).siblings().eq(3).html());
			$("#yj_clr").html($(this).siblings().eq(4).html());
			$("#yj_sfcl").html($(this).siblings().eq(5).html());
			$("#yj_yhyjid").html($(this).siblings().eq(6).html());
			$("#yj_yhid").html($(this).siblings().eq(7).html());
			$("#yj_yjms").html($(this).siblings().eq(8).html());
			//			$("#yj_tpdz").html();
			$("#yj_tpdz").attr("src", $(this).siblings().eq(9).html())
			$("#yj_clrid").html($(this).siblings().eq(10).html());
			if($(this).siblings().eq(5).html() == "已处理") {
				$(".yj_fk_chuli").hide();
			} else {
				$(".yj_fk_chuli").show();
			}
		});
	}
}
//去处理
$(".yj_fk_chuli").click(function() {
	debugger

	var aa = $("#yj_yhyjid").html();
	var reque = function() {
		return {
			useropinion: aa,
			dealid: userId,
			dealname: userName
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
		url: urltest + 'verify/function/updateOpinion',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("处理成功");
				location.href = "app_yijianfankui.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})

//删除
$(".yj_remove").click(function() {
	debugger

	var aa = $("#yj_yhyjid").html();
	var reque = function() {
		return {
			useropinion: aa,
			deleteuserid: userId,
			deleteusername: userName
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
		url: urltest + 'verify/function/deleteOpinion',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("删除成功");
				location.href = "app_yijianfankui.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var aaaa = $("#chuli_type option:checked").val();
	if(aaaa == 0) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			isdeal: aaaa
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
		url: urltest + 'verify/function/selectOpinionList',
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

//下拉跨状态发生改变
$("#chuli_type").change(function() {

	var pageNumber = "1";
	var pageSize = "10";
	var aaaa = $("#chuli_type option:checked").val();
	if(aaaa == 0) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			isdeal: aaaa
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
		url: urltest + 'verify/function/selectOpinionList',
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