var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var fullname = sessionStorage.getItem("fullname");
var urlo = '';
var url2 = '';
var url3 = '';
var url4 = '';

var url5 = '';
var url6 = '';
var url7 = '';
var url8 = '';

$(function() {

	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		$("#Form1 .file-drop-zone-title").html("上传身份证正面图")
		$("#Form2 .file-drop-zone-title").html("上传身份证反面图")
		$("#Form3 .file-drop-zone-title").html("上传资质图")
		$("#Form4 .file-drop-zone-title").html("上传营业执照图")
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
		console.log(req3)
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/property/selectOrganizeList',
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
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
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
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/property/selectOrganizeList',
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
	}

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
				if(bb[i].fullname == undefined) {
					bb[i].fullname = ""
				}
				if(bb[i].provincename == undefined) {
					bb[i].provincename = ""
				}
				if(bb[i].cityname == undefined) {
					bb[i].cityname = ""
				}
				if(bb[i].legalper == undefined) {
					bb[i].legalper = ""
				}
				if(bb[i].telephone == undefined) {
					bb[i].telephone = ""
				}
				if(bb[i].organizeid == undefined) {
					bb[i].organizeid = ""
				}
				if(bb[i].encode == undefined) {
					bb[i].encode = ""
				}
				if(bb[i].shortname == undefined) {
					bb[i].shortname = ""
				}
				if(bb[i].fax == undefined) {
					bb[i].fax = ""
				}
				if(bb[i].email == undefined) {
					bb[i].email = ""
				}
				if(bb[i].legalperidnum == undefined) {
					bb[i].legalperidnum = ""
				}
				if(bb[i].legalperidnumpht1 == undefined) {
					bb[i].legalperidnumpht1 = ""
				}
				if(bb[i].legalperidnumpht2 == undefined) {
					bb[i].legalperidnumpht2 = ""
				}
				if(bb[i].aptitude == undefined) {
					bb[i].aptitude = ""
				}
				if(bb[i].aptitudepht == undefined) {
					bb[i].aptitudepht = ""
				}
				if(bb[i].address == undefined) {
					bb[i].address = ""
				}
				if(bb[i].bankname == undefined) {
					bb[i].bankname = ""
				}
				if(bb[i].bankattname == undefined) {
					bb[i].bankattname = ""
				}
				if(bb[i].bankattnum == undefined) {
					bb[i].bankattnum = ""
				}
				if(bb[i].costrate == undefined) {
					bb[i].costrate = ""
				}
				if(bb[i].settcycledays == undefined) {
					bb[i].settcycledays = ""
				}
				if(bb[i].description == undefined) {
					bb[i].description = ""
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = ""
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].fullname + '</th>' +
					'<th>' + bb[i].provincename + '</th>' +
					'<th>' + bb[i].cityname + '</th>' +
					'<th>' + bb[i].legalper + '</th>' +
					'<th>' + bb[i].telephone + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th data-toggle="modal" data-target="#myModal8" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display: none;">' + bb[i].organizeid + '</th>' + //id
					'<th style="display: none;">' + bb[i].encode + '</th>' + //公司编码
					'<th style="display: none;">' + bb[i].shortname + '</th>' + //公司简称
					'<th style="display: none;">' + bb[i].fax + '</th>' + //传真
					'<th style="display: none;">' + bb[i].email + '</th>' + //邮箱
					'<th style="display: none;">' + bb[i].legalperidnum + '</th>' + //法人身份证号
					'<th style="display: none;">' + bb[i].legalperidnumpht1 + '</th>' + //身份证正面
					'<th style="display: none;">' + bb[i].legalperidnumpht2 + '</th>' + //身份证国徽面
					'<th style="display: none;">' + bb[i].aptitude + '</th>' + //资质
					'<th style="display: none;">' + bb[i].aptitudepht + '</th>' + //营业执照
					'<th style="display: none;">' + bb[i].address + '</th>' + //详细地址
					'<th style="display: none;">' + bb[i].bankname + '</th>' + //开户行
					'<th style="display: none;">' + bb[i].bankattname + '</th>' + //开户行账号名
					'<th style="display: none;">' + bb[i].bankattnum + '</th>' + //开户行账号
					'<th style="display: none;">' + bb[i].costrate + '</th>' + //费率
					'<th style="display: none;">' + bb[i].settcycledays + '</th>' + //清算周期
					'<th style="display: none;">' + bb[i].description + '</th>' + //备注
					'<th style="display: none;">' + bb[i].createdate + '</th>' + //创建日期
					'<th style="display: none;">' + bb[i].createusername + '</th>' + //创建人					
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#wuye_quanming").html($(this).siblings().eq(1).html());
			$("#wuye_sheng").html($(this).siblings().eq(2).html());
			$("#wuye_shi").html($(this).siblings().eq(3).html());
			

			$("#wuye_faren").html($(this).siblings().eq(4).html());
			$("#wuye_dianhua").html($(this).siblings().eq(5).html());
			//			$("#wuye_quanming").html($(this).siblings().eq(6).html());
			$("#wuye_id").html($(this).siblings().eq(7).html());
			$("#wuye_bianma").html($(this).siblings().eq(8).html());
			$("#wuye_jiancheng").html($(this).siblings().eq(9).html());
			$("#wuye_chuanzhen").html($(this).siblings().eq(10).html());
			$("#wuye_email").html($(this).siblings().eq(11).html());
			$("#wuye_idcard").html($(this).siblings().eq(12).html());
			$('#wuye_shenfenzheng').attr("src", $(this).siblings().eq(13).html());
			$('#wuye_shenfenfan').attr("src", $(this).siblings().eq(14).html());
			$('#wuye_zizhi').attr("src", $(this).siblings().eq(15).html());
			$('#wuye_zhizhao').attr("src", $(this).siblings().eq(16).html());
			$("#wuye_dizhi").html($(this).siblings().eq(17).html());
			$("#wuye_kaihu").html($(this).siblings().eq(18).html());
			$("#wuye_zhanghaoname").html($(this).siblings().eq(19).html());
			$("#wuye_zhanghao").html($(this).siblings().eq(20).html());
			$("#wuye_feilv").html($(this).siblings().eq(21).html());
			$("#wuye_zhouqi").html($(this).siblings().eq(22).html());
			$("#wuye_beizhu").html($(this).siblings().eq(23).html());
			$("#wuye_shijian").html($(this).siblings().eq(24).html());
			$("#wuye_chuangjian").html($(this).siblings().eq(25).html());
		});
		//点击修改
		$("#tbbb tr th:nth-child(8)").click(function() {
			debugger
			$("#wuye_quanming_f").val($(this).siblings().eq(1).html());
			$("#wuye_sheng_f").html($(this).siblings().eq(2).html());
			$("#wuye_shi_f").html($(this).siblings().eq(3).html());
			
			$("#wuye_faren_f").val($(this).siblings().eq(4).html());
			$("#wuye_dianhua_f").val($(this).siblings().eq(5).html());
			$("#wuye_id_f").val($(this).siblings().eq(7).html());
			$("#wuye_bianma_f").val($(this).siblings().eq(8).html());
			$("#wuye_jiancheng_f").val($(this).siblings().eq(9).html());
			$("#wuye_chuanzhen_f").val($(this).siblings().eq(10).html());
			$("#wuye_email_f").val($(this).siblings().eq(11).html());
			$("#wuye_idcard_f").val($(this).siblings().eq(12).html());
			$('#wuye_shenfenzheng_f').attr("src", $(this).siblings().eq(13).html());
			$('#wuye_shenfenfan_f').attr("src", $(this).siblings().eq(14).html());
			$('#wuye_zizhi_f').attr("src", $(this).siblings().eq(15).html());
			$('#wuye_zhizhao_f').attr("src", $(this).siblings().eq(16).html());
			var aa = $(this).siblings().eq(13).html();
			var aa1 = $(this).siblings().eq(14).html();
			var aa2 = $(this).siblings().eq(15).html();
			var aa3 = $(this).siblings().eq(16).html();
			$("#Form1_f .file-drop-zone-title").html('<img src="' + aa + '"/>');
			$("#Form2_f .file-drop-zone-title").html('<img src="' + aa1 + '"/>');
			$("#Form3_f .file-drop-zone-title").html('<img src="' + aa2 + '"/>');
			$("#Form4_f .file-drop-zone-title").html('<img src="' + aa3 + '"/>');
			$("#wuye_dizhi_f").val($(this).siblings().eq(17).html());
			$("#wuye_kaihu_f").val($(this).siblings().eq(18).html());
			$("#wuye_zhanghaoname_f").val($(this).siblings().eq(19).html());
			$("#wuye_zhanghao_f").val($(this).siblings().eq(20).html());
			$("#wuye_feilv_f").val($(this).siblings().eq(21).html());
			$("#wuye_zhouqi_f").val($(this).siblings().eq(22).html());
			$("#wuye_beizhu_f").val($(this).siblings().eq(23).html());
			$("#wuye_shijian_f").html($(this).siblings().eq(24).html());
			$("#wuye_chuangjian_f").html($(this).siblings().eq(25).html());
			$(".wuye_fix").click(function() {
				//必须
				debugger
				var organizeid = $("#wuye_id_f").val();
				var encode = $("#wuye_bianma_f").val();
				var shortname = $("#wuye_jiancheng_f").val();
				var fullname1 = $("#wuye_quanming_f").val();
				//非必须
				var createuserid = userId; //创建人id
				var createusername = userName; //创建人
				var telephone = $("#wuye_dianhua_f").val(); //联系电话
				var fax = $("#wuye_chuanzhen_f").val(); //传真
				var email = $("#wuye_email_f").val(); //电子邮箱
				var provinceid = $("#wuye_sheng_f option:checked").val(); //省
				var cityid = $("#wuye_shi_f option:checked").val(); //市
				var legalper = $("#wuye_faren_f").val(); //法人
				var legalperidnum = $("#wuye_idcard_f").val(); //法人神风正好
				if(url5 == '') {
					url5 = $("#Form1_f .file-drop-zone-title img").attr("src");
				}
				if(url6 == '') {
					url6 = $("#Form2_f .file-drop-zone-title img").attr("src");
				}
				if(url7 == '') {
					url7 = $("#Form3_f .file-drop-zone-title img").attr("src");
				}
				if(url8 == '') {
					url8 = $("#Form4_f .file-drop-zone-title img").attr("src");
				}
				var legalperidnumpht1 = url5; //正面
				var legalperidnumpht2 = url6; //反面
				var aptitude = url7; //资质
				var aptitudepht = url8; //营业执照
				var address = $("#wuye_dizhi_f").val(); //详细地址
				var bankname = $("#wuye_kaihu_f").val(); //开户行
				var bankattname = $("#wuye_zhanghaoname_f").val(); //开户行账号名字	
				var bankattnum = $("#wuye_zhanghao_f").val(); //开户行号码
				var costrate = $("#wuye_feilv_f").val(); //费率
				var settcycledays = $("#wuye_zhouqi_f").val(); //周期
				var description = $("#wuye_beizhu_f").val(); //备注
				if(encode == '') {
					alert("公司编码必须填写")
				} else {
					if(shortname == '') {
						alert("公司简称必须填写")
					} else {
						if(fullname1 == '') {
							alert("公司名称为必须填写")
						} else {

							var reque = function() {
								return {
									organizeid: organizeid,
									encode: encode,
									shortname: shortname,
									fullname: fullname1,
									modifyuserid: createuserid,
									modifyusername: createusername,
									telephone: telephone,
									fax: fax,
									email: email,
									provinceid: provinceid,
									cityid: cityid,
									legalper: legalper,
									legalperidnum: legalperidnum,
									legalperidnumpht1: legalperidnumpht1,
									legalperidnumpht2: legalperidnumpht2,
									aptitude: aptitude,
									aptitudepht: aptitudepht,
									address: address,
									bankname: bankname,
									bankattname: bankattname,
									bankattnum: bankattnum,
									costrate: costrate,
									settcycledays: settcycledays,
									description: description,

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
								url: urltest + 'verify/property/updateOrganize',
								data: req3,
								async: true,
								dataType: "json",
								success: function(msg) {
									console.log(msg);
									if(msg.responseCode == 200) {
										alert("修改成功");
										location.href = "wuyedangan.html";
									} else {
										alert(msg.resoponseDisp)
									}
								},
								error: function() {
									alert("获取信息失败");
								}
							});

						}
					}
				}
			})

		});

		//		$("#Form1_f .file-drop-zone-title").html('<img src="dist/img/avatar2.png"/>')
		//删除
		$(".wuye_remove").click(function() {
			var userId = sessionStorage.getItem("userId");
			var userName = sessionStorage.getItem("userName");
			var organizeid = $("#wuye_id").html();
			var reque = function() {
				return {
					organizeid: organizeid,
					deleteuser: userId,
					deleteusername: userName,
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
				url: urltest + 'verify/property/deleteOrganize',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						alert("删除成功！")
						location.href = "wuyedangan.html";
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
//增加

$("#wuye_add-add").click(function() {
	sheng1();
})
//增加物业
$(".wuye_add").click(function() {
	debugger
	//必须	
	var encode = $("#wuye_bianma_a").val();
	var shortname = $("#wuye_jiancheng_a").val();
	var fullname1 = $("#wuye_quanming_a").val();
	//非必须
	var createuserid = userId; //创建人id
	var createusername = userName; //创建人
	var telephone = $("#wuye_dianhua_a").val(); //联系电话
	var fax = $("#wuye_chuanzhen_a").val(); //传真
	var email = $("#wuye_youxiang_a").val(); //电子邮箱
	var provinceid = $("#wuye_sheng_a option:checked").val(); //省

	var cityid = $("#wuye_shi_a option:checked").val(); //市
	var legalper = $("#wuye_faren_a").val(); //法人
	var legalperidnum = $("#wuye_shenfenzheng_a").val(); //法人神风正好
	if(urlo == '') {
		urlo = null
	}
	var legalperidnumpht1 = urlo; //正面
	var legalperidnumpht2 = url2; //反面
	var aptitude = url3; //资质
	var aptitudepht = url4; //营业执照
	var address = $("#wuye_dizhi_a").val(); //详细地址
	var bankname = $("#wuye_kaihu_a").val(); //开户行
	var bankattname = $("#wuye_kaihu_name_a").val(); //开户行账号名字	
	var bankattnum = $("#wuye_kaihuzhanghao_a").val(); //开户行号码
	var costrate = $("#wuye_feilv_a").val(); //费率
	var settcycledays = $("#wuye_zhouqi_a").val(); //周期
	var description = $("#wuye_beizhu_a").val(); //备注
	if(encode == '') {
		alert("公司编码必须填写")
	} else {
		if(shortname == '') {
			alert("公司简称必须填写")
		} else {
			if(fullname1 == '') {
				alert("公司名称为必须填写")
			} else {

				var reque = function() {
					return {
						encode: encode,
						shortname: shortname,
						fullname: fullname1,
						createuserid: createuserid,
						createusername: createusername,
						telephone: telephone,
						fax: fax,
						email: email,
						provinceid: provinceid,
						cityid: cityid,
						legalper: legalper,
						legalperidnum: legalperidnum,
						legalperidnumpht1: legalperidnumpht1,
						legalperidnumpht2: legalperidnumpht2,
						aptitude: aptitude,
						aptitudepht: aptitudepht,
						address: address,
						bankname: bankname,
						bankattname: bankattname,
						bankattnum: bankattnum,
						costrate: costrate,
						settcycledays: settcycledays,
						description: description,

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
					url: urltest + 'verify/property/addOrganize',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("增加成功");
							location.href = "wuyedangan.html";
						} else {
							alert(msg.resoponseDisp)
						}
					},
					error: function() {
						alert("获取信息失败");
					}
				});

			}
		}
	}

})
//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	var auditstatus = "1";
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
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
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
		//	console.log(star_time+end_time+search_main)
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/property/selectOrganizeList',
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

})

//加载市
function shi(data) {
	var parentid = data;
	var reque = function() {
		return {
			parentid: parentid,
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
		url: urltest + 'verify/property/chooseArea',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择市" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].areaid + ">" + bb[i].areaname + "</option>";
				}
				$("#wuye_shi_f").html("");
				$("#wuye_shi_f").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}
//加载市、、增加
function shi1(data) {
	var parentid = data;
	var reque = function() {
		return {
			parentid: parentid,
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
		url: urltest + 'verify/property/chooseArea',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择市" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].areaid + ">" + bb[i].areaname + "</option>";
				}
				$("#wuye_shi_a").html("");
				$("#wuye_shi_a").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}

//加载省//增加
function sheng1() {
	debugger
	var parentid = 0;
	var reque = function() {
		return {
			parentid: parentid,
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
		url: urltest + 'verify/property/chooseArea',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择省" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].areaid + ">" + bb[i].areaname + "</option>";
				}
				$("#wuye_sheng_a").html("");
				$("#wuye_sheng_a").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}
//加载省//修改
function sheng2() {
	debugger
	var parentid = 0;
	var reque = function() {
		return {
			parentid: parentid,
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
		url: urltest + 'verify/property/chooseArea',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择省" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].areaid + ">" + bb[i].areaname + "</option>";
				}
				$("#wuye_sheng_a").html("");
				$("#wuye_sheng_a").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}
//省改变
$("#wuye_sheng_f").change(function() {
	var aaaa = $("#wuye_sheng_f option:checked").val();
	shi(aaaa);
})
//省改变
$("#wuye_sheng_a").change(function() {
	var aaaa = $("#wuye_sheng_a option:checked").val();
	shi1(aaaa);
})

//查看旗下小区
$(".wuye_chaxun_qixia").click(function() {
	var organizeid = $("#wuye_id").html();
	sessionStorage.setItem("organizeid", organizeid);
	window.location.href = 'wuyexiaoqu.html';
})

//查看旗下小区
$(".wuye_chaxun_yonghu").click(function() {
	var organizeid = $("#wuye_id").html();
	sessionStorage.setItem("organizeid", organizeid);
	window.location.href = 'wuyeyonghu.html';
})