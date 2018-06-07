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
		table_jia()
	}
})

//请求数据列表
function table_jia() {
	//	debugger
	var pageNumber = "1";
	var pageSize = "13";
	var selectinfo = "";
	//	var pp = $("#xiashulouyu_se").val();
	//	var ppp = $("#xiashulouyu_se1").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			//			pushgroup: pp,
			//			type: ppp
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
		url: urltest + 'verify/function/selectSysNoticeList',
		data: req3,
		async: false,
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
	//	debugger
	var pageNumber = aa;
	var pageSize = "13";
	var aaaa = $("#xiashulouyu_se option:checked").val();
	if(aaaa == 0) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
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
		url: urltest + 'verify/function/selectSysNoticeList',
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
				//								debugger
				if(bb[i].merchantname == undefined) {
					bb[i].merchantname = ""
				}
				if(bb[i].pushgroup == undefined) {
					bb[i].pushgroup = ""
				} else if(bb[i].pushgroup == 1) {
					bb[i].pushgroup = "平台"
				} else if(bb[i].pushgroup == 2) {
					bb[i].pushgroup = "物业"
				} else if(bb[i].pushgroup == 3) {
					bb[i].pushgroup = "服务商"
				}
				if(bb[i].type == undefined) {
					bb[i].type = ""
				}
				if(bb[i].type == "1") {
					bb[i].type = "单发"
				}
				if(bb[i].type == "2") {
					bb[i].type = "按小区发"
				}
				if(bb[i].type == '3') {
					bb[i].type = "群发"
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = ""
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].name == undefined) {
					bb[i].name = ""
				}
				if(bb[i].pushid == undefined) {
					bb[i].pushid = ""
				}
				if(bb[i].pushtarget == undefined) {
					bb[i].pushtarget = ""
				}
				if(bb[i].title == undefined) {
					bb[i].title = ""
				}
				if(bb[i].info == undefined) {
					bb[i].info = ""
				}
				if(bb[i].merchantid == undefined) {
					bb[i].merchantid = ""
				}

				if(bb[i].isadmin == "1") {
					bb[i].isadmin = "系统管理员"
				} else {
					bb[i].isadmin = "普通用户"
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].merchantname + '</th>' +
					'<th>' + bb[i].pushgroup + '</th>' +
					'<th>' + bb[i].type + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].name + '</th>' +
					'<th style="display: none;">' + bb[i].pushid + '</th>' + //推送id
					'<th style="display: none;">' + bb[i].pushtarget + '</th>' + //推送人群
					'<th style="display: none;">' + bb[i].title + '</th>' + //推送标题
					'<th style="display: none;">' + bb[i].info + '</th>' + //推送内容					
					'<th style="display: none;">' + bb[i].merchantid + '</th>' + //物业、服务商id
					'<th style="display: none;">' + bb[i].extras + '</th>' + //附加字段	
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#xx_wuyename").html($(this).siblings().eq(1).html());
			$("#xx_zu").html($(this).siblings().eq(2).html());
			$("#xx_type").html($(this).siblings().eq(3).html());
			$("#xx_creat").html($(this).siblings().eq(4).html());
			$("#xx_creattime").html($(this).siblings().eq(5).html());
			$("#xx_yonghu").html($(this).siblings().eq(6).html());
			$("#xx_pushid").html($(this).siblings().eq(7).html());
			$("#xx_renqun").html($(this).siblings().eq(8).html());
			$("#xx_title").html($(this).siblings().eq(9).html());
			$("#xx_info").html($(this).siblings().eq(10).html());
			$("#xx_wuyeid").html($(this).siblings().eq(11).html());

		});

	}
}
$("#x_leixing").change(function() {
	debugger
	var type = $('#x_leixing').val();
	if(type != "3") {
		$(".xiaoqu_id").show();
	} else {
		$(".xiaoqu_id").hide();
	}
})

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var search_main = $('#text_sousuo').val();
	//	var userId = "";

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: search_main,

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
		url: urltest + 'verify/function/selectSysNoticeList',
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
	table_jia()
})
$("#xiashulouyu_se1").change(function() {
	table_jia()
})