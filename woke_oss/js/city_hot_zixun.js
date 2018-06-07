var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var userName = sessionStorage.getItem("userName");
var urlo = '';
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		$("#Form1 .file-drop-zone-title").html("上传城市热点资讯图片")
		userId = userId;
		var pp = $("#select_type").val();
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
				type: pp,
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
			url: urltest + 'verify/function/selectCityHotList',
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
			type: pp,
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
		url: urltest + 'verify/function/selectCityHotList',
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

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			type: pp,
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
		url: urltest + 'verify/function/selectCityHotList',
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
				switch(bb[i].newtype) {
					case 1:
						bb[i].newtype = "网页链接";
						break;
					case 2:
						bb[i].newtype = "自定义内容";
						break;
				}

				if(bb[i].createusername == undefined) {
					bb[i].createusername = '';
				}
				if(bb[i].title == undefined) {
					bb[i].title = '';
				}
				if(bb[i].briefdescription == undefined) {
					bb[i].briefdescription = '';
				}
				if(bb[i].photourl == undefined) {
					bb[i].photourl = '';
				}
				if(bb[i].newurl == undefined) {
					bb[i].newurl = '';
				}
				if(bb[i].newcontent == undefined) {
					bb[i].newcontent = '';
				}
				if(bb[i].releasedate == undefined) {
					bb[i].releasedate = '';
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = '';
				}
				if(bb[i].createuserid == undefined) {
					bb[i].createuserid = '';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].newtype + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].releasedate + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].basehotinformationid + '</th>' + //主键ID
					'<th style="display: none;">' + bb[i].title + '</th>' + //标题
					'<th style="display: none;">' + bb[i].briefdescription + '</th>' + //内容简述
					'<th style="display: none;">' + bb[i].photourl + '</th>' + //图片地址
					'<th style="display: none;">' + bb[i].newurl + '</th>' + //新闻链接地址
					'<th style="display: none;">' + bb[i].newcontent + '</th>' + //新闻内容
					'<th style="display: none;">' + bb[i].createuserid + '</th>' + //创建人id
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(6)").click(function() {
			$("#c_xwlx").html($(this).siblings().eq(1).html());
			$("#c_cjrq").html($(this).siblings().eq(2).html());
			$("#c_fbsj").html($(this).siblings().eq(3).html());
			$("#c_cjrm").html($(this).siblings().eq(4).html());
			$("#c_zjId").html($(this).siblings().eq(5).html());
			$("#c_bt").html($(this).siblings().eq(6).html());
			$("#c_nrjs").html($(this).siblings().eq(7).html());
			//			$("#c_tpdz").html($(this).siblings().eq(8).html());
			$("#c_tpdz").attr("src", $(this).siblings().eq(8).html());

			$("#c_xwljdz").html($(this).siblings().eq(9).html());
			$("#c_xwnr").html($(this).siblings().eq(10).html());
			$("#c_cjrid").html($(this).siblings().eq(11).html());

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
		url: urltest + 'verify/function/selectCityHotList',
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

$('.remove').click(function() {
	var basehotinformationid = $("#c_zjId").html();
	var reque = function() {
		return {
			basehotinformationid: basehotinformationid,
			deleteuserid: userId,
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
	//	console.log(star_time+end_time+search_main)
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/function/deleteCityHot',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				alert("删除成功");
				location.href = "city_hot_zixun.html"
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})

//判断类型
$('#new_type').change(function() {
	var aa = $(this).val();
	if(aa == "1") {
		$(".lianjie").show();
		$(".zdynr").hide();
	} else if(aa == "2") {
		$(".lianjie").hide();
		$(".zdynr").show();
	}
})
$(".ch_sureadd").click(function() {
	var title = $("#c_add_bt").val();
	var newtype = $("#new_type").val();
	var briefdescription = $("#c_add_nrjs").val();
	var photourl = urlo;
	var releasedate1 = $("#c_add_time").val();
	var newurl = $("#c_add_ljdz").val();
	var newcontent = $("#c_add_xwnr").val();
	var createuserid = userId;
	var createusername = userName;
	
	if(title == "") {
		alert("请输入标题")
	} else {
		if(newtype == 0) {
			alert("请选择新闻类型")
		} else if(newtype == 1) {
			if(newurl == "") {
				alert("请输入新闻链接")
			} else {
				if(photourl == "") {
					alert("请先上传图片")
				} else {
					if(briefdescription == "") {
						alert('请输入新闻简介')
					} else {
						if(releasedate1 == "") {
							alert("请输入发布时间")
						} else {
							var reque = function() {
								return {
									title: title,
									newtype: newtype,
									briefdescription: briefdescription,
									photourl: photourl,
									releasedate1: releasedate1,
									newurl: newurl,
									newcontent: "",
									createuserid: createuserid,
									createusername: createusername
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

							add_ch(req3);
						}
					}
				}
			}
		} else if(newtype == 2) {
			if(newcontent == "") {
				alert("请输入转成html的新闻内容")
			} else {
				if(photourl == "") {
					alert("请先上传图片")
				} else {
					if(briefdescription == "") {
						alert('请输入新闻简介')
					} else {
						if(releasedate1 == "") {
							alert("请输入发布时间")
						} else {
							var reque = function() {
								return {
									title: title,
									newtype: newtype,
									briefdescription: briefdescription,
									photourl: photourl,
									releasedate1: releasedate1,
									newurl: "",
									newcontent: newcontent,
									createuserid: createuserid,
									createusername: createusername
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

							add_ch(req3);
						}
					}
				}
			}
		}
	}
})

function add_ch(data) {
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/function/addCityHot',
		data: data,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				alert("添加城市热点成功");
				location.href = "city_hot_zixun.html"
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}