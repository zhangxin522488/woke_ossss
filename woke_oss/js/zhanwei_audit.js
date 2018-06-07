var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var img_src = sessionStorage.getItem("img_src");
$('.my_feilei ul li button').click(function() {
	$(this).attr("class", "btn btn-primary");
	$(this).siblings().attr("class", "btn btn-info");
});
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var currentPage = "1";
		var pageSize = "10";
		var aduitstatus = "0";
		var startday = null;
		var endday = null;
		var appname = null;
		//		var userId = null;
		var booth = null;
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				paybdate: startday,
				payedate: endday,
				accountname: appname,
				booth: booth
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
			url: urltest + 'verify/advertising/queryAdvertisingListPage',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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

		//		$.ajax({
		//			contentType: "application/json; charset=utf-8",
		//			type: "POST",
		//			url: urltest + 'verify/advertisingpostion/queryAdvertisingNotDelete',
		//			data: req3,
		//			async: true,
		//			dataType: "json",
		//			success: function(msg) {
		//				console.log(msg);
		//				if(msg.responseCode == 200) {
		//					var msg = JSON.parse(msg.returnString);
		//					console.log(msg);
		//					var str = '<option value="' + 0 + '">' + "请选择展位" + '</option>;';
		//					var len = msg.length;
		//					$("#select_zhanwei").html("");
		//					for(var i = 0; i < len; i++) {
		//						str += '<option value="' + msg[i] + '">' + msg[i] + "号展位" + '</option>;';
		//					}
		//					$("#select_zhanwei").append(str);
		//				} else {
		//					alert(msg.resoponseDisp)
		//				}
		//			},
		//			error: function() {
		//				alert("获取信息失败");
		//			}
		//		});

	}

});

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var currentPage = aa;
	var pageSize = "10";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = "";
	} else if(pp == "审核不通过") {
		var aduitstatus = "2";
	} else {
		var aduitstatus = "1";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		if(appname == "") {
			appname = null;
		}
		var startday = star_time;
		if(startday == "") {
			startday = null;
		}
		var endday = end_time;
		if(endday = "") {
			endday = null;
		}
		var selectinfo = appname;
		var booth = $("#select_zhanwei").val();
		if(booth == "0") {
			booth = null;
		}
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				paybdate: startday,
				payedate: endday,
				accountname: appname,
				booth: booth
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
			url: urltest + 'verify/advertising/queryAdvertisingListPage',
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

})
//下拉跨状态发生改变
$("#select_type").change(function() {
	var currentPage = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = null;
	} else if(pp == "审核不通过") {
		var aduitstatus = "-1";
	} else {
		var aduitstatus = "1";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		if(appname == "") {
			appname = null;
		}
		var startday = star_time;
		if(startday == "") {
			startday = null;
		}
		var endday = end_time;
		if(endday = "") {
			endday = null;
		}
		//		var selectinfo = appname;
		var booth = $("#select_zhanwei").val();

		if(booth == "0") {
			booth = null;
		}
		var startday = star_time;
		var endday = end_time;
		//		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				paybdate: startday,
				payedate: endday,
				accountname: appname,
				booth: booth
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
			url: urltest + 'verify/advertising/queryAdvertisingListPage ',
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

})

function createShowingTable(bb) {
	//获取后台传过来的jsonData,并进行解析  
	//此处需要让其动态的生成一个table并填充数据 
	if(bb.total == 0) {
		$("#tbbb").html("");
	} else {
		console.log(bb);
		//		var bb = JSON.parse(bb);

		if(bb.list == '[]') {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			var tableStr = "";
			var len = bb.list.length;
			for(var i = 0; i < len; i++) {
				if(bb.list[i].booth == undefined) {
					bb.list[i].booth = "";
				}
				if(bb.list[i].accountName == undefined) {
					bb.list[i].accountName = "";
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
				if(bb.list[i].url == undefined) {
					bb.list[i].url = "";
				}
				if(bb.list[i].auditsummary == undefined) {
					bb.list[i].auditsummary = "";
				}
				if(bb.list[i].price == undefined) {
					bb.list[i].price = "";
				}
				//				if(bb.list[i].modifydate == undefined) {
				//					bb.list[i].modifydate = "";
				//				}

				//				if(bb.list[i].aduitstatus == "0") {
				//					var aduitstatus = "待审核";
				//				} else if(bb.list[i].aduitstatus == "1") {
				//					var aduitstatus = "审核通过";
				//				} else {
				//					var aduitstatus = "审核不通过";
				//				}
				if(bb.list[i].aduitstatus == "1") {
					aduitstatus = '<button type="button" class="btn btn-success">' + "审核通过" + '</button>';
					//					           ='<button type="button" class="btn btn-info">'+"审核不通过"+'</button>';
				} else if(bb.list[i].aduitstatus == "0") {
					aduitstatus = '<button type="button" class="btn btn-primary">' + "待审核" + '</button>';
				} else {
					aduitstatus = '<button  type="button" class="btn btn-danger">' + "审核不通过" + '</button>';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb.list[i].mname + '</th>' + //商户名字
					'<th>' + bb.list[i].boot + '</th>' + //展位位置
					'<th>' + bb.list[i].title + '</th>' + //展位标题
					'<th>' + bb.list[i].createusername + '</th>' + //创建人
					'<th>' + bb.list[i].createdate + '</th>' + //创建时间
					'<th>' + bb.list[i].uprice + '</th>' + //价格
					'<th>' + aduitstatus + '</th>' + //价格
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					//					'<th style="display:none" >' + bb.list[i].detial + '</th>' + //展位详情
					'<th style="display:none" >' + bb.list[i].id + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].price + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].url + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].pic + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].modifyusername + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].modifydate + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].paybdate + "---" + bb.list[i].payedate + '</th>' + //展位id
					'<th style="display:none" >' + bb.list[i].auditsummary + '</th>' + //展位id

					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(9)").click(function() {
			debugger
			//			var s_shenhe = $(this).siblings().eq(5).html();
			var aduitstatus = $(this).siblings().eq(7).children("button").html();
			//			var s_jieguo = $(this).siblings().eq(5).children("button").html();
			if(aduitstatus == "待审核") {
				$(".shenhe_no").show();
				$(".wuxushenhe").hide();
			} else {
				$(".shenhe_no").hide();
				$(".wuxushenhe").show();
			}

			var accountname = $(this).siblings().eq(1).html();
			var boot = $(this).siblings().eq(2).html();
			var title = $(this).siblings().eq(3).html();
			var createusername = $(this).siblings().eq(4).html();
			var createdate = $(this).siblings().eq(5).html();
			var uprice = $(this).siblings().eq(6).html();
			var aduitstatus = $(this).siblings().eq(7).children("button").html();
			var id = $(this).siblings().eq(8).html();
			var price = $(this).siblings().eq(9).html();
			var url = $(this).siblings().eq(10).html();
			var pic = $(this).siblings().eq(11).html();
			var modifyusername = $(this).siblings().eq(12).html();
			var modifydate = $(this).siblings().eq(10).html();
			var shijianduan = $(this).siblings().eq(14).html();

			$('#s_name').html(accountname)
			$('#s_weizhi').html(boot);
			$('#s_biaoti').html(title);
			$('#s_creat').html(createusername);
			$('#s_cr_time').html(createdate);
			$('#s_jiage').html(uprice);
			$('#s_up_shenhe').html(aduitstatus);
			$('#s_id').html(id);
			$('#s_up_danjia').html(price);
			$('#s_url').html(url);
			//			$('#s_up_img').html(pic);
			var picc = img_src + pic;
			$("#s_up_img").attr("src", pic)
			$('#s_up_name').html(modifyusername);
			$('#s_up_time').html(modifydate);
			$('#s_up_shiduan').html(shijianduan);
			$('#s_xiangqing').html($(this).siblings().eq(15).html());

			//			$('#s_xiangqing').html(s_yuming);
			$("#myModalLabel").html(accountname + "申请审核详情");

		});
	}
}
//点击审核通过
$(".shnehe_pass").click(function() {
	//	$(".shnehe_nopass").attr("disabled", "true");
	//	debugger
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $("#s_xiangqing").val();

	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		//		{
		//			"aduitstatus": 1,
		//			"id": "2da5a7cd01b54c76ae90763196ddbdc6",
		//			"operType": 1
		//		}
		var reque = function() {
			return {
				id: id,
				aduitstatus: 1,
				operType: 2,
				auditsummary: auditSummary
			}
		}
		rq1 = reque();
		var req = function() {
			return {
				requestString: "",
				userId: userId,
				fullname: fullname,

			}
		}
		requestObj1 = req();
		requestObj1.requestString = JSON.stringify(rq1);
		var req3 = JSON.stringify(requestObj1);

		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/advertising/updateAdvertisingt',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核成功！");
					location.href = "zhanwei_audit.html";
				} else {
					alert(msg.resoponseDisp);
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}
})
//点击审核不通过
$(".shnehe_nopass").click(function() {
	//	$(".shnehe_nopass").attr("disabled", "true");
	//	debugger
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $("#s_xiangqing").val();

	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		//		{
		//			"aduitstatus": 1,
		//			"id": "2da5a7cd01b54c76ae90763196ddbdc6",
		//			"operType": 1
		//		}
		var reque = function() {
			return {
				id: id,
				aduitstatus: -1,
				operType: 2,
				auditsummary: auditSummary
			}
		}
		rq1 = reque();
		var req = function() {
			return {
				requestString: "",
				userId: userId,
				fullname: fullname,

			}
		}
		requestObj1 = req();
		requestObj1.requestString = JSON.stringify(rq1);
		var req3 = JSON.stringify(requestObj1);

		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/advertising/updateAdvertisingt',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核不通过成功！");
					location.href = "zhanwei_audit.html";
				} else {
					alert(msg.resoponseDisp);
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}
})

//模糊查询
$('#search_chaxun').click(function() {
	var currentPage = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = "3";
	} else if(pp == "审核不通过") {
		var aduitstatus = "-1";
	} else {
		var aduitstatus = "1";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		if(appname == "") {
			appname = null;
		}
		var startday = star_time;
		if(startday == "") {
			startday = null;
		}
		var endday = end_time;
		if(endday = "") {
			endday = null;
		}
		//		var selectinfo = appname;
		var booth = $("#select_zhanwei").val();
		var startday = star_time;
		var endday = end_time;
		//		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				paybdate: startday,
				payedate: endday,
				accountname: appname,
				booth: booth
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
			url: urltest + 'verify/advertising/queryAdvertisingListPage ',
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

})