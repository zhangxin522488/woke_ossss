var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var fullname = sessionStorage.getItem("fullname");
var areaid = sessionStorage.getItem("areaid");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		var buildid = "";
		table_jia(buildid)
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
			areaid: areaid,
			buildid: buildid,
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
		url: urltest + 'verify/property/selectRommList',
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
			areaid: areaid,
			buildid: aaaa,
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
		url: urltest + 'verify/property/selectRommList',
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
				if(bb[i].rommcode == undefined) {
					bb[i].rommcode = ""
				}
				if(bb[i].custsex == undefined) {
					bb[i].custsex = ""
				}
				if(bb[i].custsex == 1) {
					bb[i].custsex = "男"
				}
				if(bb[i].custsex == 0) {
					bb[i].custsex = "女"
				}
				if(bb[i].units == undefined) {
					bb[i].units = ""
				}
				if(bb[i].floor == undefined) {
					bb[i].floor = ""
				}
				if(bb[i].fewromm == undefined) {
					bb[i].fewromm = ""
				}
				if(bb[i].custname == undefined) {
					bb[i].custname = ""
				}
				if(bb[i].rommid == undefined) {
					bb[i].rommid = ""
				}
				if(bb[i].builtarea == undefined) {
					bb[i].builtarea = ""
				}
				if(bb[i].innerarea == undefined) {
					bb[i].innerarea = ""
				}
				if(bb[i].poolarea == undefined) {
					bb[i].poolarea = ""
				}
				if(bb[i].housorienid == undefined) {
					bb[i].housorienid = ""
				}
				if(bb[i].purposeid == undefined) {
					bb[i].purposeid = ""
				}
				if(bb[i].rommaddress == undefined) {
					bb[i].rommaddress = ""
				}
				if(bb[i].custsex == undefined) {
					bb[i].custsex = ""
				}
				if(bb[i].idcardnum == undefined) {
					bb[i].idcardnum = ""
				}
				if(bb[i].contactphone == undefined) {
					bb[i].contactphone = ""
				}
				if(bb[i].mobilephone == undefined) {
					bb[i].mobilephone = ""
				}
				if(bb[i].popuqty == undefined) {
					bb[i].popuqty = ""
				}

				if(bb[i].checkindate == undefined) {
					bb[i].checkindate = ""
				}
				if(bb[i].startbilldate == undefined) {
					bb[i].startbilldate = ""
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = ""
				}
				if(bb[i].buildname == undefined) {
					bb[i].buildname = ""
				}
				if(bb[i].areaname == undefined) {
					bb[i].areaname = ""
				}
				if(bb[i].merchantname == undefined) {
					bb[i].merchantname = ""
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].rommcode + '</th>' +
					'<th>' + bb[i].units + '</th>' +
					'<th>' + bb[i].floor + '</th>' +
					'<th>' + bb[i].fewromm + '</th>' +
					'<th>' + bb[i].custname + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].rommid + '</th>' + //id
					'<th style="display: none;">' + bb[i].builtarea + '</th>' + //建筑面积
					'<th style="display: none;">' + bb[i].innerarea + '</th>' + //套内面积
					'<th style="display: none;">' + bb[i].poolarea + '</th>' + //公摊面积
					'<th style="display: none;">' + bb[i].purposeid + '</th>' + //房屋朝向
					'<th style="display: none;">' + bb[i].housorienid + '</th>' + //房屋用途
					'<th style="display: none;">' + bb[i].rommaddress + '</th>' + //房屋位置
					//					'<th style="display: none;">' + bb[i].occupstatus + '</th>' + //
					'<th style="display: none;">' + bb[i].custsex + '</th>' + //性别1男0女
					'<th style="display: none;">' + bb[i].idcardnum + '</th>' + //身份证号
					'<th style="display: none;">' + bb[i].contactphone + '</th>' + //固话
					'<th style="display: none;">' + bb[i].mobilephone + '</th>' + //手机号
					'<th style="display: none;">' + bb[i].popuqty + '</th>' + //家庭人数
					'<th style="display: none;">' + bb[i].checkindate + '</th>' + //入住日期
					'<th style="display: none;">' + bb[i].startbilldate + '</th>' + //开始计费日
					'<th style="display: none;">' + bb[i].createdate + '</th>' + //创建日期
					'<th style="display: none;">' + bb[i].createusername + '</th>' + //创建人
					'<th style="display: none;">' + bb[i].buildname + '</th>' + //楼宇名称
					'<th style="display: none;">' + bb[i].areaname + '</th>' + //小区名称
					'<th style="display: none;">' + bb[i].merchantname + '</th>' + //物业名称

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#lou_fanghao").html($(this).siblings().eq(1).html());
			$("#lou_danyuan").html($(this).siblings().eq(2).html());
			$("#lou_ceng").html($(this).siblings().eq(3).html());
			$("#lou_dijihu").html($(this).siblings().eq(4).html());
			$("#lou_yezhu").html($(this).siblings().eq(5).html());
			$("#lou_id").html($(this).siblings().eq(6).html());
			$("#lou_jianzhu").html($(this).siblings().eq(7).html());
			$("#lou_taonei").html($(this).siblings().eq(8).html());
			$("#lou_gongtan").html($(this).siblings().eq(9).html());
			$("#lou_chaoxiang").html($(this).siblings().eq(10).html());
			$("#lou_yongtu").html($(this).siblings().eq(11).html());
			$("#lou_weizhi").html($(this).siblings().eq(12).html());
			$('#lou_xingbie').html($(this).siblings().eq(13).html());
			$('#lou_shenfen').html($(this).siblings().eq(14).html());
			$('#lou_guhua').html($(this).siblings().eq(15).html());
			$('#lou_shouji').html($(this).siblings().eq(16).html());
			$("#lou_jiatingrenshu").html($(this).siblings().eq(17).html());
			$("#lou_ruzhutime").html($(this).siblings().eq(18).html());
			$("#lou_kaishijiefei").html($(this).siblings().eq(19).html());
			$("#lou_chuangjiatime").html($(this).siblings().eq(20).html());
			$("#lou_chengjianren").html($(this).siblings().eq(21).html());
			$("#lou_name").html($(this).siblings().eq(22).html());
			$("#lou_xiaoqu_name").html($(this).siblings().eq(23).html());
			$("#lou_wuye").html($(this).siblings().eq(24).html());

		});

		//模态框内部页签
		$(".jichu_span").click(function() {
			$(this).attr("class", "te_p_span");
			$(this).siblings().removeClass("te_p_span");
			$(".jichu_in").show();
			$(".jichu_in").siblings().hide();
		})
		$(".fix_span").click(function() {
			$(this).attr("class", "te_p_span");
			$(this).siblings().removeClass("te_p_span");
			$(".person_in").show();
			$(".person_in").siblings().hide();
		})
		$(".zhuce_span").click(function() {
			$(this).attr("class", "te_p_span");
			$(this).siblings().removeClass("te_p_span");
			$(".zhuce_in").show();
			$(".zhuce_in").siblings().hide();
		})
		$(".img_span").click(function() {
			$(this).attr("class", "te_p_span");
			$(this).siblings().removeClass("te_p_span");
			$(".img_in").show();
			$(".img_in").siblings().hide();
		})

	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var aaaa = $("#xiashulouyu_se option:checked").val();
	if(aaaa == 0) {
		aaaa = "";
	}
	var search_main = $('#text_sousuo').val();
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			areaid: areaid,
			buildid: aaaa,
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
		url: urltest + 'verify/property/selectRommList',
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