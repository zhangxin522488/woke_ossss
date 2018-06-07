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
	var pageNumber = "1";
	var pageSize = "13";
	var selectinfo = "";
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
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
		url: urltest + 'verify/halluser/selectHallUserList',
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
	var pageNumber = aa;
	var pageSize = "13";

	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,

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
		url: urltest + 'verify/halluser/selectHallUserList',
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
				if(bb[i].sex == undefined) {
					bb[i].sex = ""
				}
				if(bb[i].sex == "0") {
					bb[i].sex = "男"
				}
				if(bb[i].sex == "1") {
					bb[i].sex = "女"
				}
				if(bb[i].nickname == undefined) {
					bb[i].nickname = ""
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
				if(bb[i].mobileno == undefined) {
					bb[i].mobileno = ""
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].realname + '</th>' +
					'<th>' + bb[i].nickname + '</th>' +
					'<th>' + bb[i].sex + '</th>' +
					//					'<th>' + bb[i].gender + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].mobileno + '</th>' +
					'<th style="display: none;">' + bb[i].id + '</th>' + //套内面积				
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() {
			var userid = $(this).siblings().eq(6).html();
			var reque = function() {
				return {
					id: userid,
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
				url: urltest + 'verify/halluser/selectHallUserInfo',
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
						if(data.sex == undefined) {
							data.sex = ""
						} else if(data.sex == "0") {
							data.sex = "男"
						} else if(data.sex == "1") {
							data.sex = "女"
						}

						$("#yh_name").html(data.realname)
						$("#yh_id").html(data.id)
						$("#yh_appId").html(data.appuserid)
						$("#yh_nicheng").html(data.nickname)
						$("#yh_dengluname").html(data.username)
						$("#yh_creattime").html(data.createdate)

						$("#yh_sex").html(data.sex)
						if(data.headpic == undefined) {
							data.headpic = ""
						}

						$('#yh_touxing').attr("src", data.headpic);
						$('#yh_lasttime').html(data.lastlogintime);

						$("#yh_bir").html(data.birthday)
						$("#yh_tel").html(data.mobileno)
						$("#yh_shenfen").html(data.idnumber)

						$("#yh_qianbao").html(data.balance)
						$("#yh_youhui").html(data.coupons)
						$("#yh_wodou").html(data.wodou)

						if(data.status == undefined) {
							data.status = ""
						} else if(data.status == "1") {
							data.status = "正常"
							$(".yh_qiyong").hide();
							$(".yh_jinyong").show();

						} else if(data.status == "-1") {
							data.status = "禁用"
							$(".yh_qiyong").show();
							$(".yh_jinyong").hide();
						}
						$("#yh_type").html(data.status)

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
			status: -1,
			id: aa,
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
		url: urltest + 'verify/halluser/updateHallUserStatus',
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
			status: 1,
			id: aa,
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
		url: urltest + 'verify/halluser/updateHallUserStatus',
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
		url: urltest + 'verify/halluser/selectHallUserList',
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

//查看优惠券列表
$(".yh_youhuiquan").click(function() {
	var youhuiquan_id = $("#yh_id").html();
	sessionStorage.setItem("youhuiquan_id", youhuiquan_id);
	window.location.href = 'hy_youhuiquanliebiao.html';
})
//查看沃豆
$(".yh_wodou").click(function() {
	var youhuiquan_id = $("#yh_id").html();
	sessionStorage.setItem("youhuiquan_id", youhuiquan_id);
	window.location.href = 'wodou.html';
})
//查看房屋
$(".yh_fangwu").click(function() {
	var youhuiquan_id = $("#yh_id").html();
	sessionStorage.setItem("youhuiquan_id", youhuiquan_id);
	window.location.href = 'fangwulist.html';
})