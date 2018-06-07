var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userkind = sessionStorage.getItem("userkind");
var fullname = sessionStorage.getItem("fullname");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {		
		top.location.href = "login.html";
	} else {
		userId = userId;
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
		//	console.log(JSON.parse(req3))
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/function/selectModuleList',
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
			auditstatus: auditstatus,
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
		url: urltest + 'verify/function/selectModuleList',
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
				if(bb[i].ismenu == undefined) {
					bb[i].ismenu = ""
				}
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].fullname + '</th>' +
					'<th>' + bb[i].ismenu + '</th>' +
					'<th>' + bb[i].sortcode + '</th>' +
					'<th style="display:none" >' + bb[i].enabledmark + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display:none" >' + bb[i].moduleid + '</th>' +
					'<th style="display:none" >' + bb[i].parentid + '</th>' +

					'<th style="display:none" >' + bb[i].urladdress + '</th>' +
					'<th style="display:none" >' + bb[i].description + '</th>' +
					'<th style="display:none" >' + bb[i].icon + '</th>' +
					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(6)").click(function() {
			var s_name = $(this).siblings().eq(1).html();
			$("#myModalLabel").html(s_name + "服务商详情");
			var s_caidan = $(this).siblings().eq(2).html();
			var s_paixu = $(this).siblings().eq(3).html();
			var s_youxiao = $(this).siblings().eq(4).html();
			var s_zhujian = $(this).siblings().eq(5).html();
			var s_parent = $(this).siblings().eq(6).html();
			var s_daohang = $(this).siblings().eq(7).html();
			var s_beizhu = $(this).siblings().eq(8).html();
			var s_icon = $(this).siblings().eq(9).html();
			$("#s_name").val(s_name);
			$("#s_caidan").val(s_caidan);
			$("#s_paixu").html(s_paixu);
			$("#s_youxiao").html(s_youxiao);
			$("#s_zhujian").html(s_zhujian);
			$("#s_parent").val(s_parent);
			$("#s_daohang").val(s_daohang);
			$("#s_beizhu").val(s_beizhu);
			//图片地址暂时没有

			//			$("#s_icon").attr("src",s_icon);

		});
		$('#add_yuangong').click(function() {
			var reque = function() {
				return {

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
				url: urltest + 'verify/function/selectTopMenu',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						var msgg = JSON.parse(msg.returnString);
						$("#fuji_xuanze").html("")
						var str = '<option value="01234">' + "请选择父级菜单" + '</option>' + '<option value="0">' + "最外层" + '</option>';
						for(var i = 0; i < msgg.length; i++) {
							str += "<option value=" + msgg[i].moduleid + ">" + msgg[i].fullname + "</option>";
						}
						$("#fuji_xuanze").append(str);
					} else {
						alert(msg.resoponseDisp);
					}
				},
				error: function() {
					alert("获取信息失败");
				}
			});
		})

		//修改
		$(".fix_fun").click(function() {
			$(this).button('loading').delay(1000).queue(function() {
				var s_name = $("#s_name").val();
				var s_caidan = $("#s_caidan").val();
				var s_paixu = $("#s_paixu").html();
				var s_youxiao = $("#s_youxiao").html();
				var s_zhujian = $("#s_zhujian").html();
				var s_parent = $("#s_parent").val();
				var s_daohang = $("#s_daohang").val();
				var s_beizhu = $("#s_beizhu").val();
				var reque = function() {
					return {
						moduleid: s_zhujian,
						parentid: s_parent,
						fullname: s_name,
						icon: "",
						urladdress: s_daohang,
						ismenu: s_caidan,
						sortcode: s_paixu,
						enabledmark: s_youxiao,
						description: s_beizhu
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
					url: urltest + 'verify/function/updateModule',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							console.log(msg);
							alert("修改成功！")
							location.href = "Function_list.html";
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
				//			var id = $("#s_id").html();
				var userId = sessionStorage.getItem("userId");
				var userName = sessionStorage.getItem("userName");
				//			var fullname = $(".box-title").html();
				//				var moduleid = $("#s_zhujian").html();
				//			var auditSummary = $('#s_pizhu').val();
				//			if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
				//				alert("请填写审核批注！")
				//			} else {
				var reque = function() {
					return {
						moduleid: moduleid,
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
					url: urltest + 'verify/function/deleteModule',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							console.log(msg);
							alert("删除成功！")
							location.href = "Function_list.html";
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
	var auditstatus = "1";
	//	var star_time = $('.input_1').val();
	//	var end_time = $('.input_2').val();
	//	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	//	date1 = date1.getTime();
	//	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	//	date2 = date2.getTime();
	//	var numm = date2 - date1;
	//	if(numm < 0) {
	//		alert("结束日期不能小于开始日期");
	//	} else {
	var search_main = $('#text_sousuo').val();
	//		var startday = star_time;
	//		var endday = end_time;
	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			auditstatus: auditstatus,
			//				startday: startday,
			//				endday: endday,
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
		url: urltest + 'verify/function/selectModuleList',
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
	var parentid = $("#fuji_xuanze").val();
	var urladdress = $("#i_daohang").val();
	var ismenu = $("#i_caidan").val();
	var sortcode = $("#i_paixu").val();
	var enabledmark = $("#i_youxiao").val();
	var description = $("#i_beizhu").val();
	if(parentid == 01234) {
		alert("请选择父级菜单");
	} else {
		var reque = function() {
			return {
				fullname: name,
				parentid: parentid,
				urladdress: urladdress,
				ismenu: ismenu,
				sortcode: sortcode,
				enabledmark: enabledmark,
				description: description
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
			url: urltest + 'verify/function/addModule',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("增加成功成功！")
					location.href = "Function_list.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

	//			}
})