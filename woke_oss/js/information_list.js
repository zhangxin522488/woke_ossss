var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

var userkind = sessionStorage.getItem("userkind");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
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
		//	console.log(JSON.parse(req3))
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/function/selectPermissionList',
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

});

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "13";
	var auditstatus = "1";

	var search_main = $('#text_sousuo').val();
	//		var startday = star_time;
	//		var endday = end_time;
	//		var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: search_main
			//				startday: startday,
			//				endday: endday,
			//				selectinfo: selectinfo
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
		url: urltest + 'verify/function/selectPermissionList',
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
				var num = parseInt(i) + parseInt(1);
				if(bb[i].createusername == undefined) {
					bb[i].createusername = "暂无"
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = "暂无"
				}
				if(bb[i].modifyusername == undefined) {
					bb[i].modifyusername = "暂无"
				}
				if(bb[i].modifydate == undefined) {
					bb[i].modifydate = "暂无"
				}
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].pername + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					//					'<th>' + bb[i].enabledmark + '</th>' +
					'<th style="display: none;">' + bb[i].modifyusername + '</th>' +
					'<th style="display: none;">' + bb[i].modifydate + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].id + '</th>' +
					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			var s_name = $(this).siblings().eq(1).html();
			//			$("#myModalLabel").html(s_name + "权限信息")

			var creat_name = $(this).siblings().eq(2).html();
			var s_cr_time = $(this).siblings().eq(3).html();
			var s_fixper = $(this).siblings().eq(4).html();
			var s_fix_time = $(this).siblings().eq(5).html();
			$("#s_name").val(s_name);
			$("#creat_name").html(creat_name);
			$("#s_cr_time").html(s_cr_time);
			$("#s_fixper").html(s_fixper);
			$("#s_fix_time").html(s_fix_time);
			$("#s_id").html($(this).siblings().eq(6).html());

		});
		//修改
		$(".fix_fun").click(function() {
			$(this).button('loading').delay(1000).queue(function() {
				var s_id = $("#s_id").html();
				var pername = $("#s_name").val();
				var reque = function() {
					return {
						id: s_id,
						pername: pername,
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
					url: urltest + 'verify/function/updatePermission',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							console.log(msg);
							alert("修改成功！")
							location.href = "information_list.html";
						} else {
							alert(msg.resoponseDisp);
							$(this).button('reset');
						}
					},
					error: function() {
						alert("获取信息失败");
						$(this).button('reset');
					}
				});

			});

		})
		$(".first_remove").click(function() {
			var moduleid = $("#s_zhujian").html();
			//删除
			$(".remove").click(function() {
				var s_id = $("#s_id").html();
				var pername = $("#s_name").val();
				var reque = function() {
					return {
						id: s_id,
						deleteuser: userId,
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
					url: urltest + 'verify/function/deletePermission',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							console.log(msg);
							alert("删除成功！")
							location.href = "information_list.html";
						} else {
							alert(msg.resoponseDisp)
						}
					},
					error: function() {
						alert("获取信息失败");
					}
				});
				//			}
			})
		})

	}
}

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
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/function/selectPermissionList',
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
	//	}

})

//增加
$(".add_fun").click(function() {
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var name = $("#i_name").val();
	var reque = function() {
		return {
			pername: name,
			createuserid: userId,
			createusername: userName
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
		url: urltest + 'verify/function/addPermission',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("增加成功成功！")
				location.href = "information_list.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
	//			}
})