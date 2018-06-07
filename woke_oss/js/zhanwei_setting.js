var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");

var fullname = sessionStorage.getItem("fullname");
//if(userId == "" || userId == undefined || userId == null) {
//	alert("请登陆之后再操作");
//	location.href = "login.html";
//} else {
//	userId = userId;
//}
//$('.my_feilei ul li button').click(function() {
//	$(this).attr("class", "btn btn-primary");
//	$(this).siblings().attr("class", "btn btn-info");
//});
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var currentPage = "1";
		var pageSize = "13";
		//	var aduitstatus = "0";
		//	var startday = "";
		//	var endday = "";
		//	var appname = "";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				//			aduitstatus: aduitstatus,
				//			createdateEnd: startday,
				//			createdateStart: endday,
				//			appname: appname
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
			url: urltest + 'verify/advertisingpostion/queryAdvertisingPage',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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
					var table_msg = msg;
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
	var currentPage = aa;
	var pageSize = "13";

	var appname = $('#text_sousuo').val();
	var reque = function() {
		return {
			pageSize: pageSize,
			currentPage: currentPage,
			//			aduitstatus: aduitstatus,
			//			createdateEnd: startday,
			//			createdateStart: endday,
			//			appname: appname
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
		url: urltest + 'verify/advertisingpostion/queryAdvertisingPage',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				var msg = JSON.parse(msg.returnString);
				$("#count").html(msg.total);
				var gezi = msg.total;
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
				var table_msg = msg;
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
		//		var bb = JSON.parse(bb);

		if(bb == '[]') {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			var tableStr = "";
			var len = bb.list.length;
			for(var i = 0; i < len; i++) {
				if(bb.list[i].booth == undefined) {
					bb.list[i].booth = "";
				}
				if(bb.list[i].boothtitle == undefined) {
					bb.list[i].boothtitle = "";
				}
				if(bb.list[i].createusername == undefined) {
					bb.list[i].createusername = "";
				}
				if(bb.list[i].createdate == undefined) {
					bb.list[i].createdate = "";
				}
				if(bb.list[i].uprice == undefined) {
					bb.list[i].uprice = "";
				}
				if(bb.list[i].detial == undefined) {
					bb.list[i].detial = "";
				}
				if(bb.list[i].modifyusername == undefined) {
					bb.list[i].modifyusername = "";
				}
				if(bb.list[i].modifydate == undefined) {
					bb.list[i].modifydate = "";
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb.list[i].booth + '</th>' + //展位位置
					'<th>' + bb.list[i].boothtitle + '</th>' + //展位标题
					'<th>' + bb.list[i].createusername + '</th>' + //创建人
					'<th>' + bb.list[i].createdate + '</th>' + //创建时间
					'<th>' + bb.list[i].uprice + '</th>' + //价格
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th  style="color:red;cursor: pointer" ;><span class="glyphicon glyphicon-time"></span></th>' +
					
					'<th style="display:none" >' + bb.list[i].detial + '</th>' + //展位详情
					'<th style="display:none" >' + bb.list[i].modifyusername + '</th>' + //修改人名字
					'<th style="display:none" >' + bb.list[i].modifydate + '</th>' + //修改时间
					'<th style="display:none" >' + bb.list[i].id + '</th>' + //展位id

					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			var s_shenhe = $(this).siblings().eq(5).html();
			if(s_shenhe == "待审核") {
				$(".shenhe_no").hide();
				$(".shenhe_no1").show();
			} else {
				$(".shenhe_no").show();
				$(".shenhe_no1").hide();
			}
			var accountname = $(this).siblings().eq(1).html();
			var s_appname = $(this).siblings().eq(2).html();
			var s_creat = $(this).siblings().eq(3).html();
			var s_cr_time = $(this).siblings().eq(4).html();
			var s_shenhe = $(this).siblings().eq(5).html();
			var s_yuming = $(this).siblings().eq(7).html();
			var s_rukou = $(this).siblings().eq(8).html();
//			var s_rukou = $(this).siblings().eq(9).html();
			
			var s_zhifu = $(this).siblings().eq(9).html();

			$('#s_weizhi').html(accountname);
			$('#s_biaoti').val(s_appname);
			$('#s_creat').html(s_creat);
			$('#s_cr_time').html(s_cr_time);
			$('#s_jiage').val(s_shenhe);
			$('#s_up_name').html(s_rukou);
			$('#s_up_time').html(s_zhifu);
			$('#s_xiangqing').html(s_yuming);
			$('#s_id').html($(this).siblings().eq(10).html());

			$("#myModalLabel").html(accountname + "展位详情");

		});
		$("#tbbb tr th:nth-child(8)").click(function() {
			var sss1 = $(this).siblings().eq(1).html();
			sessionStorage.setItem("weizhi",sss1);
			window.location.href="zhanwei_history.html";
		})
	}
}

//删除
$(".remove").click(function() {
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditsummary = $('#s_shenhe_reson').val();

	var reque = function() {
		return {
			id: id,
			opertType: 1
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
		url: urltest + 'verify/advertisingpostion/updateAdvertisingpostion',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("删除成功！")
				location.href = "zhanwei_setting.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})
//修改
$(".fix_zhanwei").click(function() {
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var s_biaoti = $('#s_biaoti').val();
	var s_xiangqing = $('#s_xiangqing').val();
	var s_jiage = $('#s_jiage').val();
	if(s_biaoti == '' || s_xiangqing == "" || s_jiage == "") {
		$("#s_tips_xiugai").html("被修改后的标题，价格，详情，不能为空")
	} else {
		var reque = function() {
			return {
				id: id,
				opertType: 2,
				boothtitle: s_biaoti,
				uprice: s_jiage,
				detial: s_xiangqing
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
			url: urltest + 'verify/advertisingpostion/updateAdvertisingpostion',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("修改成功！")
					location.href = "zhanwei_setting.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

})
//增加
$(".add_zhanwei").click(function() {
	var weizhi = $("#zhan_weizhi").val();
	var biaoti = $("#zhan_biaoti").val();
	var jiage = $("#zhan_jiage").val();
	var miaoshu = $("#zhan_miaoshu").val();
	if(weizhi == "" || biaoti == "" || jiage == "" || miaoshu == "") {
		$("#tips").html("请确保所需填写的内容都已被填写");
	} else {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");

		var reque = function() {
			return {
				booth: weizhi,
				boothtitle: biaoti,
				uprice: jiage,
				detial: miaoshu
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
			url: urltest + 'verify/advertisingpostion/insertAdvertisingpostion',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("增加成功！")
					location.href = "zhanwei_setting.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

})