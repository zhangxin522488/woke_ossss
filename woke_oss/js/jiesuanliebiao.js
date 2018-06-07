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
		var pageNumber = "1";
		var pageSize = "10";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				merchantkind: pp,
				isaudit: ppp
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
			url: urltest + 'verify/financial/selectSettlementList',
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
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var ppp = $("#select_type1").val();

	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			merchantkind: pp,
			isaudit: ppp
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
		url: urltest + 'verify/financial/selectSettlementList',
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
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var ppp = $("#select_type1").val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			merchantkind: pp,
			isaudit: ppp
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
		url: urltest + 'verify/financial/selectSettlementList',
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
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var ppp = $("#select_type1").val();
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			merchantkind: pp,
			isaudit: ppp
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
		url: urltest + 'verify/financial/selectSettlementList',
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
				switch(bb[i].isaudit) {
					case 0:
						bb[i].isaudit = "未审核";
						break;
					case 1:
						bb[i].isaudit = "审核通过";
						break;
					case 2:
						bb[i].isaudit = "审核不通过";
						break;
				}
				switch(bb[i].isred) {
					case 1:
						bb[i].isred = "是";
						break;
					case 0:
						bb[i].isred = "否";
						break;
				}
				switch(bb[i].couponretamt) {
					case 1:
						bb[i].couponretamt = "已支付";
						break;
					case 2:
						bb[i].couponretamt = "已取消";
						break;
					case 3:
						bb[i].couponretamt = "已退款";
						break;
					case 4:
						bb[i].couponretamt = "缴费失败，已退款";
						break;
					case 5:
						bb[i].couponretamt = "缴费失败，未退款";
						break;
				}
				if(bb[i].merchantname == undefined) {
					bb[i].merchantname = '';
				}
				if(bb[i].merchantkind == undefined) {
					bb[i].merchantkind = '';
				}
				if(bb[i].payenddate == undefined) {
					bb[i].payenddate = '';
				}
				if(bb[i].settleqty == undefined) {
					bb[i].settleqty = '';
				}
				if(bb[i].settleway == undefined) {
					bb[i].settleway = '';
				}
				if(bb[i].isaudit == undefined) {
					bb[i].isaudit = '';
				}
				if(bb[i].billid == undefined) {
					bb[i].billid = '';
				}
				if(bb[i].billcode == undefined) {
					bb[i].billcode = '';
				}
				if(bb[i].billdate == undefined) {
					bb[i].billdate = '';
				}
				if(bb[i].settleamt == undefined) {
					bb[i].settleamt = '';
				}
				if(bb[i].settlepayamt == undefined) {
					bb[i].settlepayamt = '';
				}
				if(bb[i].costrate == undefined) {
					bb[i].costrate = '';
				}
				if(bb[i].costamt == undefined) {
					bb[i].costamt = '';
				}
				if(bb[i].couponamt == undefined) {
					bb[i].couponamt = '';
				}
				if(bb[i].couponretamt == undefined) {
					bb[i].couponretamt = '';
				}
				if(bb[i].couponwokeamt == undefined) {
					bb[i].couponwokeamt = '';
				}
				if(bb[i].couponwokeretamt == undefined) {
					bb[i].couponwokeretamt = '';
				}
				if(bb[i].wodouamt == undefined) {
					bb[i].wodouamt = '';
				}
				if(bb[i].wodouretamt == undefined) {
					bb[i].wodouretamt = '';
				}
				if(bb[i].payamt == undefined) {
					bb[i].payamt = '';
				}
				if(bb[i].payretamt == undefined) {
					bb[i].payretamt = '';
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
				if(bb[i].isred == undefined) {
					bb[i].isred = '';
				}
				if(bb[i].reduser == undefined) {
					bb[i].reduser = '';
				}
				if(bb[i].redusername == undefined) {
					bb[i].redusername = '';
				}
				if(bb[i].reddate == undefined) {
					bb[i].reddate = '';
				}
				if(bb[i].isaudit == undefined) {
					bb[i].isaudit = '';
				}
				if(bb[i].auditdate == undefined) {
					bb[i].auditdate = '';
				}
				if(bb[i].audituser == undefined) {
					bb[i].audituser = '';
				}
				if(bb[i].auditusername == undefined) {
					bb[i].auditusername = '';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].merchantname + '</th>' +
					'<th>' + bb[i].merchantkind + '</th>' +
					'<th>' + bb[i].payenddate + '</th>' +
					'<th>' + bb[i].settleqty + '</th>' +
					'<th>' + bb[i].settleway + '</th>' +
					'<th>' + bb[i].isaudit + '</th>' + //审核状态
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].billid + '</th>' + //结算单ID
					'<th style="display: none;">' + bb[i].billcode + '</th>' + //单据号
					'<th style="display: none;">' + bb[i].billdate + '</th>' + //单据日期
					'<th style="display: none;">' + bb[i].settleamt + '</th>' + //实结算金额
					'<th style="display: none;">' + bb[i].settlepayamt + '</th>' + //应结算金额
					'<th style="display: none;">' + bb[i].costrate + '</th>' + //费率
					'<th style="display: none;">' + bb[i].costamt + '</th>' + //手续费
					'<th style="display: none;">' + bb[i].couponamt + '</th>' + //商户劵扣额
					'<th style="display: none;">' + bb[i].couponretamt + '</th>' + //商户劵退款额
					'<th style="display: none;">' + bb[i].couponwokeamt + '</th>' + //沃豆抵扣额
					'<th style="display: none;">' + bb[i].couponwokeretamt + '</th>' + //沃克卷退额
					'<th style="display: none;">' + bb[i].wodouamt + '</th>' + //沃豆抵消额
					'<th style="display: none;">' + bb[i].wodouretamt + '</th>' + //沃豆退款抵消额
					'<th style="display: none;">' + bb[i].payamt + '</th>' + //实收金额
					'<th style="display: none;">' + bb[i].payretamt + '</th>' + //实际退款金额
					'<th style="display: none;">' + bb[i].summary + '</th>' + //摘要
					'<th style="display: none;">' + bb[i].merchantid + '</th>' + //公司Id
					'<th style="display: none;">' + bb[i].dbdate + '</th>' + //入库时间
					'<th style="display: none;">' + bb[i].isred + '</th>' + //作废状态
					'<th style="display: none;">' + bb[i].reduser + '</th>' + //作废人
					'<th style="display: none;">' + bb[i].redusername + '</th>' + //作废人姓名
					'<th style="display: none;">' + bb[i].reddate + '</th>' + //作废时
					'<th style="display: none;">' + bb[i].isaudit + '</th>' + //审核状态
					'<th style="display: none;">' + bb[i].auditdate + '</th>' + //审核时间
					'<th style="display: none;">' + bb[i].audituser + '</th>' + //审核人id
					'<th style="display: none;">' + bb[i].auditusername + '</th>' + //审核人姓名
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() {
			$("#j_gsname").html($(this).siblings().eq(1).html());
			$("#j_shxz").html($(this).siblings().eq(2).html());
			$("#j_jyjzr").html($(this).siblings().eq(3).html());
			$("#j_jsbs").html($(this).siblings().eq(4).html());
			$("#j_jsfs").html($(this).siblings().eq(5).html());
			$("#j_shzt").html($(this).siblings().eq(6).html());
			$("#j_jsdID").html($(this).siblings().eq(7).html());
			$("#j_djh").html($(this).siblings().eq(8).html());
			$("#j_djrq").html($(this).siblings().eq(9).html());
			$("#j_sjsje").html($(this).siblings().eq(10).html());
			$("#j_yjsje").html($(this).siblings().eq(11).html());
			$("#j_fl").html($(this).siblings().eq(12).html());
			$("#j_sxf").html($(this).siblings().eq(13).html());
			$("#j_shqke").html($(this).siblings().eq(14).html());
			$("#j_shqtke").html($(this).siblings().eq(15).html());
			$("#j_wkqke").html($(this).siblings().eq(16).html());
			$("#j_wkqte").html($(this).siblings().eq(17).html());
			$("#j_wddxe").html($(this).siblings().eq(18).html());
			$("#j_wdtkdxe").html($(this).siblings().eq(19).html());
			$("#j_ssje").html($(this).siblings().eq(20).html());
			$("#j_sjtkje").html($(this).siblings().eq(21).html());
			$("#j_zhaiyao").html($(this).siblings().eq(22).html());
			$("#j_gsId").html($(this).siblings().eq(23).html());
			$("#j_rksj").html($(this).siblings().eq(24).html());
			$("#j_zfzt").html($(this).siblings().eq(25).html());
			$("#j_zfr").html($(this).siblings().eq(26).html());
			$("#j_zfrname").html($(this).siblings().eq(27).html());
			$("#j_zfsj").html($(this).siblings().eq(28).html());
			$("#j_shzt").html($(this).siblings().eq(29).html());
			$("#j_shsj").html($(this).siblings().eq(30).html());
			$("#j_shr").html($(this).siblings().eq(31).html());
			$("#j_shrname").html($(this).siblings().eq(32).html());
		});

	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var billid = '';
	var apipayid = '';
	var ppp = $("#select_type1").val();

	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			merchantkind: pp,
			isaudit: ppp
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
		url: urltest + 'verify/financial/selectSettlementList',
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

//审核通过
$(".jslb_pass").click(function() {
	var billid = $("#j_jsdID").html();
	var reque = function() {
		return {
			billid: billid
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
		url: urltest + 'verify/financial/updateSettlementOrderPass',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				alert("审核通过");
				location.href = "jiesuanliebiao.html"
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
//审核不通过
$(".jslb_nopass").click(function() {
	var billid = $("#j_jsdID").html();
	var reque = function() {
		return {
			billid: billid
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
		url: urltest + 'verify/financial/updateSettlementOrderNotPass',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				alert("审核不通过");
				location.href = "jiesuanliebiao.html"
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})