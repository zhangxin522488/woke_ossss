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
function table_jia(buildid) {
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
			organizeid: organizeid,
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
	console.log(req3)
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/property/selectBaseUserList',
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
			organizeid: organizeid,
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
		url: urltest + 'verify/property/selectBaseUserList',
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
				if(bb[i].realname == undefined) {
					bb[i].realname = ""
				}
				if(bb[i].gender == undefined) {
					bb[i].gender = ""
				}
				if(bb[i].gender == "1") {
					bb[i].gender = "男"
				}
				if(bb[i].gender == "0") {
					bb[i].gender = "女"
				}
				if(bb[i].encode == undefined) {
					bb[i].encode = ""
				}
				if(bb[i].account == undefined) {
					bb[i].account = ""
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = ""
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].isadmin == undefined) {
					bb[i].isadmin = ""
				}
				if(bb[i].isadmin == "1") {
					bb[i].isadmin = "系统管理员"
				} else {
					bb[i].isadmin = "普通用户"
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].realname + '</th>' +
					'<th>' + bb[i].encode + '</th>' +
					'<th>' + bb[i].account + '</th>' +
					'<th>' + bb[i].gender + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].isadmin + '</th>' +
					'<th style="display: none;">' + bb[i].userid + '</th>' + //套内面积
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(10)").click(function() {
			var userid = $(this).siblings().eq(8).html();
			var reque = function() {
				return {
					userid: userid,
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
				url: urltest + 'verify/property/selectBaseUserInfo',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						var data = JSON.parse(msg.returnString);
						console.log(data);
						if(data.realname == undefined) {
							data.realname = ""
						}
						if(data.gender == undefined) {
							data.realname = ""
						} else if(data.gender == "1") {
							data.gender = "男"
						} else if(data.gender == "0") {
							data.gender == "女"
						}
						if(data.isadmin == undefined) {
							data.isadmin = ""
						} else if(data.isadmin == "1") {
							data.isadmin = "系统管理员"
						} else {
							data.isadmin == "普通用户"
						}
						if(data.useronline == undefined) {
							data.useronline = ""
						} else if(data.useronline == "1") {
							data.useronline = "在线"
						} else if(data.useronline == "0") {
							data.useronline == "不在"
						}
						$("#yh_name").html(data.realname)
						$("#yh_id").html(data.userid)
						$("#yh_bianma").html(data.encode)
						$("#yh_zhanghao").html(data.account)
						$("#yh_creattime").html(data.createdate)
						$("#yh_creatname").html(data.createusername)
						$("#yh_sex").html(data.gender)
						if(data.headicon == undefined) {
							data.headicon = ""
						}
						$('#yh_touxing').attr("src", data.headicon);

						$("#yh_bir").html(data.birthday)
						$("#yh_tel").html(data.mobile)
						$("#yh_phone").html(data.telephone)
						$("#yh_email").html(data.email)
						$("#yh_qq").html(data.oicq)
						$("#yh_weixin").html(data.wechat)
						$("#yh_zaixian").html(data.useronline)
						$("#yh_miaoshu").html(data.description)
						$("#yh_xiaoqu").html(data.areaname)
						$("#yh_wuye").html(data.merchantname)
						$('#yh_shenfen').html(data.isadmin)
						if(data.enabledmark == undefined) {
							data.enabledmark = ""
						} else if(data.enabledmark == "1") {
							data.enabledmark = "有效"
							$(".yh_qiyong").hide();
							$(".yh_jinyong").show();

						} else if(data.enabledmark == "2") {
							data.enabledmark == "失效"
							$(".yh_qiyong").show();
							$(".yh_jinyong").hide();
						}
						$('#yh_type').html(data.enabledmark)

					} else {
						alert(msg.resoponseDisp)
					}
				},
				error: function() {
					alert("获取信息失败");
				}
			});
		});

	}
}
//禁用
$(".yh_jinyong").click(function() {
	debugger

	var aa = $("#yh_id").html();
	var reque = function() {
		return {
			enabledmark: 2,
			userid: aa,
			modifyuserid: userId,
			modifyusername: userName
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
		url: urltest + 'verify/property/updateBaseUserStyle',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("该用户已成功禁用")
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
//启用
$(".yh_qiyong").click(function() {
	debugger

	var aa = $("#yh_id").html();
	var reque = function() {
		return {
			enabledmark: 1,
			userid: aa,
			modifyuserid: userId,
			modifyusername: userName
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
		url: urltest + 'verify/property/updateBaseUserStyle',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("该用户已成功启用")
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
$(".yh_remove").click(function() {
	debugger

	var aa = $("#yh_id").html();
	var reque = function() {
		return {			
			userid: aa,
			modifyuserid: userId,
			modifyusername: userName
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
		url: urltest + 'verify/property/deleteBaseUser',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("该用户已成功删除")
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
	var search_main = $('#text_sousuo').val();
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			organizeid: organizeid,

			selectinfo: search_main
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
		url: urltest + 'verify/property/selectBaseUserList',
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
	if(aaaa == 0) {
		aaaa = "";
	}
	table_jia(aaaa)
})