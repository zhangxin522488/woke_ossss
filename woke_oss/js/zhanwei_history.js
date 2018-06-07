var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
if(userId == "" || userId == undefined || userId == null) {
	alert("请登陆之后再操作");
	top.location.href = "login.html";
} else {
	userId = userId;
}

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var currentPage = "1";
		var pageSize = "13";
		var ss1 = sessionStorage.getItem("weizhi");
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				booth:ss1
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
			url: urltest + 'verify/advertisingpostion/queryAdvertisingHisPage',
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
	var pp = $(".btn-primary").text();
	console.log(pp);
	
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
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
			url: urltest + 'verify/advertisingpostion/queryAdvertisingHisPage',
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
					'<th style="display:none" >' + bb.list[i].detial + '</th>' + //展位详情

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
			var s_yuming = $(this).siblings().eq(6).html();
			var s_rukou = $(this).siblings().eq(7).html();
			var s_zhifu = $(this).siblings().eq(8).html();

			$('#s_weizhi').html(accountname);
			$('#s_biaoti').html(s_appname);
			$('#s_creat').html(s_creat);
			$('#s_cr_time').html(s_cr_time);
			$('#s_jiage').html(s_shenhe);
			$('#s_up_name').html(s_rukou);
			$('#s_up_time').html(s_zhifu);
			$('#s_xiangqing').html(s_yuming);
			$('#s_id').html($(this).siblings().eq(9).html());

			$("#myModalLabel").html(accountname + "展位详情");

		});
	}
}