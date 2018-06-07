var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pp = $("#select_type").val();
		var ppp = $("#select_type1").val();
		var pppp = $("#select_type2").val();
		var pageNumber = "1";
		var pageSize = "10";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		var pp = $("#select_type").val();
		var ppp = $("#select_type1").val();
		var pppp = $("#select_type2").val();
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				bookdirection: pp,
				merchantkind: ppp,
				bookkindid: pppp
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
			url: urltest + 'verify/financial/selectCapitalBooksList',
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

	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();

	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var pp = $("#select_type").val();
	var ppp = $("#select_type1").val();
	var pppp = $("#select_type2").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			bookdirection: pp,
			merchantkind: ppp,
			bookkindid: pppp
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
		url: urltest + 'verify/financial/selectCapitalBooksList',
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

})
//下拉跨状态发生改变
$("#select_type1").change(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var pp = $("#select_type").val();
	var ppp = $("#select_type1").val();
	var pppp = $("#select_type2").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			bookdirection: pp,
			merchantkind: ppp,
			bookkindid: pppp
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
		url: urltest + 'verify/financial/selectCapitalBooksList',
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

})
//下拉跨状态发生改变
$("#select_type2").change(function() {
	var pageNumber = "1";
	var pageSize = "10";

	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();

	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var pp = $("#select_type").val();
	var ppp = $("#select_type1").val();
	var pppp = $("#select_type2").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			bookdirection: pp,
			merchantkind: ppp,
			bookkindid: pppp
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
		url: urltest + 'verify/financial/selectCapitalBooksList',
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

})
$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "10";

	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;

	var pp = $("#select_type").val();
	var ppp = $("#select_type1").val();
	var pppp = $("#select_type2").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			bookdirection: pp,
			merchantkind: ppp,
			bookkindid: pppp
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
		url: urltest + 'verify/financial/selectCapitalBooksList',
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
				switch(bb[i].merchantkind) {
					case 1:
						bb[i].merchantkind = "物业公司";
						break;
					case 2:
						bb[i].merchantkind = "第三方商户";
						break;
				}
				switch(bb[i].settleway) {
					case 1:
						bb[i].settleway = "系统自动结算";
						break;
					case 2:
						bb[i].settleway = "人工结算";
						break;
				}
				switch(bb[i].bookdirection) {
					case 1:
						bb[i].bookdirection = "入账";
						break;
					case -1:
						bb[i].bookdirection = "出账";
						break;
				}
				if(bb[i].merchantname == undefined) {
					bb[i].merchantname = '';
				}
				if(bb[i].merchantkind == undefined) {
					bb[i].merchantkind = '';
				}
				if(bb[i].bookkindname == undefined) {
					bb[i].bookkindname = '';
				}
				if(bb[i].bookdirection == undefined) {
					bb[i].bookdirection = '';
				}
				if(bb[i].bookdate == undefined) {
					bb[i].bookdate = '';
				}
				if(bb[i].billid == undefined) {
					bb[i].billid = '';
				}
				if(bb[i].befamt == undefined) {
					bb[i].befamt = '';
				}
				if(bb[i].bookamt == undefined) {
					bb[i].bookamt = '';
				}
				if(bb[i].aftamt == undefined) {
					bb[i].aftamt = '';
				}
				if(bb[i].summary == undefined) {
					bb[i].summary = '';
				}
				if(bb[i].merchantid == undefined) {
					bb[i].merchantid = '';
				}
				if(bb[i].dbdate == undefined) {
					bb[i].dbdate = '';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].merchantname + '</th>' +
					'<th>' + bb[i].merchantkind + '</th>' +
					'<th>' + bb[i].bookkindname + '</th>' +
					'<th>' + bb[i].bookdirection + '</th>' +
					'<th>' + bb[i].bookdate + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].billid + '</th>' + //主键ID					
					'<th style="display: none;">' + bb[i].befamt + '</th>' + //上期余额
					'<th style="display: none;">' + bb[i].bookamt + '</th>' + //结算金额
					'<th style="display: none;">' + bb[i].aftamt + '</th>' + //本期余额
					'<th style="display: none;">' + bb[i].summary + '</th>' + //摘要
					'<th style="display: none;">' + bb[i].merchantid + '</th>' + //物业公司名称
					'<th style="display: none;">' + bb[i].dbdate + '</th>' + //入库时间

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#z_wygsmc").html($(this).siblings().eq(1).html());
			$("#z_shxz").html($(this).siblings().eq(2).html());
			$("#z_ywmc").html($(this).siblings().eq(3).html());
			$("#z_zjlx").html($(this).siblings().eq(4).html());
			$("#z_djrq").html($(this).siblings().eq(5).html());
			$("#z_zjid").html($(this).siblings().eq(6).html());
			$("#z_sqye").html($(this).siblings().eq(7).html());
			$("#z_jsje").html($(this).siblings().eq(8).html());
			$("#z_bqye").html($(this).siblings().eq(9).html());
			$("#z_zy").html($(this).siblings().eq(10).html());
			$("#z_wygsid").html($(this).siblings().eq(11).html());
			$("#z_rksj").html($(this).siblings().eq(12).html());

		});

	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var billid = '';
	var apipayid = '';
	var pp = $("#select_type").val();
	var ppp = $("#select_type1").val();
	var pppp = $("#select_type2").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			bookdirection: pp,
			merchantkind: ppp,
			bookkindid: pppp
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
		url: urltest + 'verify/financial/selectCapitalBooksList',
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

})