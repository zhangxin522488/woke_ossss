var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

var userkind = sessionStorage.getItem("userkind");
var fullname = sessionStorage.getItem("fullname");
var url2 = '';
$(function() {
	$(".file-drop-zone-title").html("拖拽文件到这里...<br />只能上传单一  apk 文件")
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {

		userId = userId;
		var pageNumber = "1";
		var pageSize = "13";
		var selectinfo = "";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
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
			url: urltest + 'verify/function/selectAppVersionList',
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
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
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
		url: urltest + 'verify/function/selectAppVersionList',
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
				if(bb[i].type == 1) {
					bb[i].type = "安卓"
				} else {
					bb[i].type = "苹果"
				}

				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].appversioncontrolid + '</th>' +
					'<th>' + bb[i].versioncode + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].type + '</th>' +

					'<th style="display: none;">' + bb[i].downloadurl + '</th>' +
					'<th style="display: none;">' + bb[i].updatecontent + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +

					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(9)").click(function() {
			$("#app_id").html($(this).siblings().eq(1).html());
			$("#app_hao").html($(this).siblings().eq(2).html());
			$("#app_name").html($(this).siblings().eq(3).html());
			$("#app_time").html($(this).siblings().eq(4).html());
			$("#app_down").html($(this).siblings().eq(6).html());
			$("#app_con").html($(this).siblings().eq(7).html());

			$("#app_leixing").html($(this).siblings().eq(5).html());

		});

		//删除
		$(".remove").click(function() {
			var appversioncontrolid = $("#app_id").html();
			var reque = function() {
				return {
					appversioncontrolid: appversioncontrolid,
					deleteuser: userId,
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

			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'verify/function/deleteAppVersion',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						alert("删除成功！")
						location.href = "app_banben.html";
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

	}
}

//增加
$(".app_tijiao").click(function() {
	debugger
	if(url2 == "") {
		alert("请先将文件上传");
	} else {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		var versioncode = $("#app_hao_s").val();
		var type = $("#app_type").val();

		var updatecontent = $("#app_con1").val();
		if(updatecontent == "") {
			alert("请输入更新内容之后在提交")
		} else {
			var reque = function() {
				return {
					versioncode: versioncode,
					createuserid: userId,
					createusername: userName,
					downloadurl: url2,
					type: type,
					updatecontent: updatecontent
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
				url: urltest + 'verify/function/addAppVersion',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						alert("版本增加成功！")
						location.href = "app_banben.html";
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

})

$("#uploadfile").fileinput({

	language: 'zh', //设置语言

	uploadUrl: "http://www.wkdzkj.cn/pic/picApplication/pic/addFile", //上传的地址
	allowedFileExtensions: ['zip', 'apk', 'png'], //接收的文件后缀
	//uploadExtraData:{"id": 1, "fileName":'123.mp3'},
	uploadAsync: true, //默认异步上传
	showUpload: true, //是否显示上传按钮
	showRemove: true, //显示移除按钮
	showPreview: true, //是否显示预览
	showCaption: false, //是否显示标题
	browseClass: "btn btn-primary", //按钮样式    
	dropZoneEnabled: true, //是否显示拖拽区域
	//minImageWidth: 50, //图片的最小宽度
	//minImageHeight: 50,//图片的最小高度
	//maxImageWidth: 1000,//图片的最大宽度
	//maxImageHeight: 1000,//图片的最大高度
	//maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
	//minFileCount: 0,
	maxFileCount: 1, //表示允许同时上传的最大文件个数
	enctype: 'multipart/form-data',
	validateInitialCount: true,
	previewFileIcon: "<iclass='glyphicon glyphicon-king'></i>",
	msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
}).on("fileuploaded", function(event, data, previewId, index) {
	//	debugger

	//	console.log(data.response);
	var url1 = data.response.returnString;
	var bb = JSON.parse(url1);
	url2 = "http://www.wkdzkj.cn/pic/" + bb[0].url;
	console.log(url2);
});