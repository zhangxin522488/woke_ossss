var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		//		debugger
		userId = userId;
		var pp = $("#select_type").val();
		var ppp = $("#select_type1").val();

		var pageNumber = "1";
		var pageSize = "10";
		var billstatus = "";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		var billid = '';
		var apipayid = '';
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				billstatus: pp,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				billid: billid,
				apipayid: apipayid,
				billkind: ppp
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
			url: urltest + 'verify/financial/selectOrderList',
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
	var billid = $("#billid_dingdan").val();
	var apipayid = '';
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			billstatus: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			billid: billid,
			apipayid: apipayid,
			billkind: ppp
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
		url: urltest + 'verify/financial/selectOrderList',
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
	var billid = '';
	var apipayid = '';
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			billstatus: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			billid: billid,
			apipayid: apipayid,
			billkind: ppp
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
		url: urltest + 'verify/financial/selectOrderList',
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
	var billid = '';
	var apipayid = '';
	var ppp = $("#select_type1").val();

	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			billstatus: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			billid: billid,
			apipayid: apipayid,
			billkind: ppp
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
		url: urltest + 'verify/financial/selectOrderList',
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
				//				0 未支付 1 已支付 2 已取消
				//				3 已退款 4 缴费失败， 已退款
				if(bb[i].username == undefined) {
					bb[i].username = '';
				}
				if(bb[i].billkindname == undefined) {
					bb[i].billkindname = '';
				}
				if(bb[i].billdate == undefined) {
					bb[i].billdate = '';
				}
				if(bb[i].paymentamt == undefined) {
					bb[i].paymentamt = '';
				}
				switch(bb[i].billstatus) {
					case 0:
						bb[i].billstatus = "未支付";
						break;
					case 1:
						bb[i].billstatus = "已支付";
						break;
					case 2:
						bb[i].billstatus = "已取消";
						break;
					case 3:
						bb[i].billstatus = "已退款";
						break;
					case 4:
						bb[i].billstatus = "缴费失败， 已退款";
						break;
					case 5:
						bb[i].billstatus = "缴费失败， 未退款";
						break;

				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].username + '</th>' +
					'<th>' + bb[i].billkindname + '</th>' +
					'<th>' + bb[i].billdate + '</th>' +
					'<th>' + bb[i].paymentamt + '</th>' +
					'<th>' + bb[i].billstatus + '</th>' +
					'<th style="display: none;">' + bb[i].billid + '</th>' + //id
					'<th style="display: none;">' + bb[i].billkind + '</th>' + //类型					
					'<th  style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);

		}

		//点击详情
		$("#tbbb tr th:nth-child(9)").click(function() {
			//			debugger
			var billkind = $(this).siblings().eq(7).html();
			var billid = $(this).siblings().eq(6).html();
			if(billkind == "1") {
				$("#myModal").modal('show');
				$("#s_jiesuantype1").html("");
				$("#s_jiesuandate1").html("");
				$("#s_jiesuanID1").html("");
				$("#s_aud1").html('');
				$("#s_jine1").html('');
				$("#s_type1").html('');
				$("#s_data1").html('');
				$("#s_qian1").html('');
				$("#s_feiyong1").html('');
				$("#s_jiaofei1").html('');
				$("#s_shifu1").html('');
				$("#s_payf1").html('');
				$("#s_paydata1").html('');
				$("#s_payid1").html('');
				$("#s_jilvid1").html('');
				$("#s_huiyuanid1").html('');
				$("#s_xuhao1").html('');
				$("#s_lohao1").html('');
				$("#s_xiaoquname1").html('');
				$("#s_wuyename1").html('');
				$("#s_quan1").html('');
				$("#s_quanid1").html('');
				$("#s_wodou1").html('');
				$("#s_zhina1").html('');
				$("#s_shifou_gn1").html('');
				$("#s_jieguo1").html('');
			} else if(billkind == "2") {
				$("#s_jiesuantype2").html("");
				$("#s_jiesuandate2").html("");
				$("#s_jiesuanID2").html("");
				$("#myModal1").modal('show');
				$("#s_chongzhilei2").html("");
				$("#s_aud2").html("");
				$("#s_jiaofei2").html("");
				$("#s_shifu2").html("");
				$("#s_payf2").html("");
				$("#s_paydata2").html("");
				$("#s_payid2").html("");
				$("#s_jilvid2").html("");
				$("#s_huiyuanid2").html("");
				$("#s_xuhao2").html("");
				$("#s_lohao2").html("");
				$("#s_xiaoquname2").html("");
				$("#s_wuyename2").html("");
				$("#s_quan2").html("");
				$("#s_quanid2").html("");
				$("#s_wodou2").html("");
				$("#s_jieguo2").html("");
				$('#s_liushui2').html("");
				$('#s_shangsong2').html("");
				$('#s_shangsongdata2').html("");
				$('#s_shouli2').html("");
				$('#s_chongzhiresult2').html("");
				$('#s_shoulitype2').html("");
				$('#s_enddata2').html("");
				$('#s_chongzhiresultma2').html("");
				$('#s_biao2').html("");
				$('#s_biaoid2').html("");
			} else if(billkind == "3") {
				$("#s_jiesuantype3").html("");
				$("#s_jiesuandate3").html("");
				$("#s_jiesuanID3").html("");
				$("#myModal2").modal('show');
				$('#s_huiyuanID3').html('');
				$('#s_dingdanzhuangtai3').html('');
				$('#s_shangpin3').html('');
				$('#s_spname3').html('');
				$('#s_paydata3').html('');
				$('#s_dingdanid3').html('');
				$('#s_shdingdanid3').html('');
				$('#s_cash3').html('');
				$('#s_shifu3').html('');
				$('#s_tuikuantype3').html('');
				$('#s_zhaiyao3').html('');
				$('#s_tuikuandata3').html('');
				$('#s_tuikuancash3').html('');
				$('#s_tongzhi3').html('');
				$('#s_tongzhiadress3').html('');
				$('#s_cishu3').html('');
				$('#s_data3').html('');
				$('#s_message3').html('');
				$('#s_chexiao3').html('');
				$('#s_chexiaodata3').html('');
				$('#s_wodou3').html('');
				$('#s_youhuiquanID3').html('');
				$('#s_youhuidixiao3').html('');
			}

			var reque = function() {
				return {
					billkind: billkind,
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
			//查看某一服务商详情
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'verify/financial/selectOrderInfo',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						var bb = JSON.parse(msg.returnString);
						//wuye

						switch(bb.issettle) {
							case 0:
								bb.issettle = "未清算";
								break;
							case 1:
								bb.issettle = "已清算";
								break;
							case 2:
								bb.issettle = "结算单审核中";
								break;
						}
						switch(bb.billstatus) {
							case 0:
								bb.billstatus = "未支付";
								break;
							case 1:
								bb.billstatus = "已支付";
								break;
							case 2:
								bb.billstatus = "已取消";
								break;
							case 3:
								bb.billstatus = "已退款";
								break;
							case 4:
								bb.billstatus = "缴费失败， 已退款";
								break;
							case 5:
								bb.billstatus = "缴费失败， 未退款";
								break;

						}
						$("#s_jiesuantype1").html(bb.issettle);
						$("#s_jiesuandate1").html(bb.settledate);
						$("#s_jiesuanID1").html(bb.settlebillid);

						$("#s_aud1").html(bb.billstatus);
						$("#s_jine1").html(bb.paymentamt);
						$("#s_type1").html(bb.billkindname);
						$("#s_data1").html(bb.billdate);
						$("#s_qian1").html(bb.billcode);
						$("#s_feiyong1").html(bb.costinterval);
						$("#s_jiaofei1").html(bb.arrearsamt);
						$("#s_shifu1").html(bb.paymentamt);
						$("#s_payf1").html(bb.paykindname);
						$("#s_paydata1").html(bb.paydate);
						$("#s_payid1").html(bb.apipayid);
						$("#s_jilvid1").html(bb.billid);
						$("#s_huiyuanid1").html(bb.vipid);
						$("#s_xuhao1").html(bb.rommcode);
						$("#s_lohao1").html(bb.buildname);
						$("#s_xiaoquname1").html(bb.areaname);
						$("#s_wuyename1").html(bb.merchantname);
						$("#s_quan1").html(bb.couponamt);
						$("#s_quanid1").html(bb.couponid);
						$("#s_wodou1").html(bb.goldcoinamt);
						$("#s_zhina1").html(bb.latefeeamt);
						switch(bb.payresult) {
							case 1:
								bb.payresult = "支付成功";
								break;
							case -1:
								bb.payresult = "支付失败";
								break;
						}
						$("#s_jieguo1").html(bb.payresult);
						switch(bb.ishostcost) {
							case 0:
								bb.ishostcost = "否";
								break;
							case 1:
								bb.ishostcost = "是";
								break;
						}
						$("#s_shifou_gn1").html(bb.ishostcost);
						//222
						switch(bb.billstatus) {
							case 0:
								bb.billstatus = "未支付";
								break;
							case 1:
								bb.billstatus = "已支付";
								break;
							case 2:
								bb.billstatus = "已取消";
								break;
							case 3:
								bb.billstatus = "已退款";
								break;
							case 4:
								bb.billstatus = "缴费失败， 已退款";
								break;
							case 5:
								bb.billstatus = "缴费失败， 未退款";
								break;

						}
						switch(bb.rechkind) {

							case 1:
								bb.rechkind = "电";
								break;
							case 2:
								bb.rechkind = "水";
								break;
							case 3:
								bb.rechkind = "燃气";
								break;
						}
						switch(bb.payresult) {
							case 1:
								bb.payresult = "支付成功";
								break;
							case -1:
								bb.payresult = "支付失败";
								break;
						}
						switch(bb.rechresult) {
							case 0:
								bb.rechresult = "未充值";
								break;
							case 1:
								bb.rechresult = "充值成功";
								break;
							case -1:
								bb.rechresult = "充值失败";
								break;
						}
						switch(bb.isrech) {
							case 0:
								bb.isrech = "未上送";
								break;
							case 1:
								bb.isrech = "已上送";
								break;
						}
						$("#s_jiesuantype2").html(bb.issettle);
						$("#s_jiesuandate2").html(bb.settledate);
						$("#s_jiesuanID2").html(bb.settlebillid);
						$("#s_chongzhilei2").html(bb.rechkind);
						$("#s_aud2").html(bb.billstatus);
						$("#s_jiaofei2").html(bb.arrearsamt);
						$("#s_shifu2").html(bb.paymentamt);
						$("#s_payf2").html(bb.paykindname);
						$("#s_paydata2").html(bb.paydate);
						$("#s_payid2").html(bb.apipayid);
						$("#s_jilvid2").html(bb.billid);
						$("#s_huiyuanid2").html(bb.vipid);
						$("#s_xuhao2").html(bb.rommcode);
						$("#s_lohao2").html(bb.buildname);
						$("#s_xiaoquname2").html(bb.areaname);
						$("#s_wuyename2").html(bb.merchantname);
						$("#s_quan2").html(bb.rommcode);
						$("#s_quanid2").html(bb.couponid);
						$("#s_wodou2").html(bb.goldcoinamt);
						$("#s_jieguo2").html(bb.payresult);
						$('#s_liushui2').html(bb.queryid);
						$('#s_shangsong2').html(bb.isrech);
						$('#s_shangsongdata2').html(bb.isrechdate);
						$('#s_shouli2').html(bb.rechmsg);
						$('#s_chongzhiresult2').html(bb.rechresult);
						$('#s_shoulitype2').html(bb.rechcode);
						$('#s_enddata2').html(bb.rechdate);
						$('#s_chongzhiresultma2').html(bb.rechresultmsg);
						$('#s_biao2').html(bb.watchid);
						$('#s_biaoid2').html(bb.meterid);
						//33333333
						$("#s_jiesuantype3").html(bb.issettle);
						$("#s_jiesuandate3").html(bb.settledate);
						$("#s_jiesuanID3").html(bb.settlebillid);
						$('#s_huiyuanID3').html(bb.vipid);
						$('#s_dingdanzhuangtai3').html(bb.ordrestatus);
						$('#s_shangpin3').html(bb.billkindname);
						$('#s_spname3').html(bb.merchantname);
						$('#s_paydata3').html(bb.paydate);
						$('#s_dingdanid3').html(bb.orderid);
						$('#s_shdingdanid3').html(bb.merchantorderid);
						$('#s_cash3').html(bb.orderamt);
						$('#s_shifu3').html(bb.payamt);
						$('#s_tuikuantype3').html(bb.isret);
						$('#s_zhaiyao3').html(bb.retdescribe);
						$('#s_tuikuandata3').html(bb.retdate);
						$('#s_tuikuancash3').html(bb.retamt);
						$('#s_tongzhi3').html(bb.isnotify);
						$('#s_tongzhiadress3').html(bb.notifyurl);
						$('#s_cishu3').html(bb.isnotifytimes);
						$('#s_data3').html(bb.lastnotifydate);
						$('#s_message3').html(bb.notifymsg);
						$('#s_chexiao3').html(bb.iscancel);
						$('#s_chexiaodata3').html(bb.canceldate);
						$('#s_wodou3').html(bb.goldcoinamt);
						$('#s_youhuiquanID3').html(bb.couponid);
						$('#s_youhuidixiao3').html(bb.couponamt);

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

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var auditstatus = "1";
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
			billstatus: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			billid: billid,
			apipayid: apipayid,
			billkind: ppp
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
		url: urltest + 'verify/financial/selectOrderList',
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