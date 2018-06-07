var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");

var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
	
		top.location.href = "login.html";
	} else {
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
			url: urltest + 'verify/function/selectBussiness',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg.returnString);
					var bb = JSON.parse(msg.returnString);
					//				var str = "";
					var str = '<option value="0">' + "请选择一级类别" + '</option>';
					for(var i = 0; i < bb.length; i++) {
						str += "<option value=" + bb[i].typeid + ">" + bb[i].typename + "</option>";
					}
					$("#sel_1").html("");
					$("#sel_1").append(str);
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

//第二类别
$("#sel_1").change(function() {
	var aaaa = $("#sel_1 option:checked").val();
	var reque = function() {
		return {
			parentid: aaaa,
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
		url: urltest + 'verify/function/selectBussiness',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				$("#sel_2").html("");
				$("#sel_3").html('<option value="0">' + "请选择三级类别" + '</option>');
				var str = '<option value="0">' + "请选择二级类别" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].typeid + ">" + bb[i].typename + "</option>";
				}
				$("#sel_2").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})

//第三类别
$("#sel_2").change(function() {
	//	var businessParentId = 2;
	var aaaa = $("#sel_2 option:checked").val();
	var reque = function() {
		return {
			parentid: aaaa,
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
		url: urltest + 'verify/function/selectBussiness',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				$("#sel_3").html("");
				var str = '<option value="0">' + "请选择三级类别" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].typeid + ">" + bb[i].typename + "</option>";
				}
				$("#sel_3").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
//增加一级
$(".sel_1_add").click(function() {
	var businessParentId = 0;
	var businessName = $('#sel_1_input').val();
	if(businessName == "") {
		alert("请输入需要增加的一级类别内容！")
	} else {
		var parentid = 0;
		var reque = function() {
			return {
				parentid: businessParentId,
				typename: businessName,
				createuserid: userId,
				createusername: userName
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
			url: urltest + 'verify/function/addBussiness',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					$('#myModal').modal('hide');
					location.href = "Business_setting.html"
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

//增加2级
$(".sel_2_add").click(function() {

	var businessParentId = $("#sel_1 option:checked").val();
	//	var businessParentId = 0;s
	var businessName = $('#sel_2_input').val();
	if(businessParentId == "0") {
		alert("请先选择一级类别！再对二级菜单进行操作")
	} else {
		if(businessName == "") {
			alert("请输入需要增加的二级类别！")
		} else {
			var businessParentId = $("#sel_1 option:checked").val();
			var reque = function() {
				return {
					parentid: businessParentId,
					typename: businessName,
					createuserid: userId,
					createusername: userName
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
				url: urltest + 'verify/function/addBussiness',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						$('#myModal1').modal('hide');
						location.href = "Business_setting.html"
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

//增加3级
$(".sel_3_add").click(function() {
	var businessParentId = $("#sel_2 option:checked").val();
	var businessName = $('#sel_3_input').val();
	if(businessParentId == "0") {
		alert("请先选择二级类别！再对三级菜单进行操作")
	} else {
		if(businessName == "") {
			alert("请输入需要增加的三级类别！")
		} else {
			var businessParentId = $("#sel_2 option:checked").val();
			var reque = function() {
				return {
					parentid: businessParentId,
					typename: businessName,
					createuserid: userId,
					createusername: userName
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
				url: urltest + 'verify/function/addBussiness',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						$('#myModal2').modal('hide');
						location.href = "Business_setting.html"
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

//删除
$(".sel_1_remove").click(function() {
	var businessParentId = $("#sel_1 option:checked").val();
	if(businessParentId == "0") {
		alert("请选择需要删除的一级类别！");
	} else {
		var businessParentId = $("#sel_1 option:checked").val();
		var reque = function() {
			return {
				typeid: businessParentId,
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
			url: urltest + 'verify/function/deleteBussiness',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					alert("删除成功！")
					$('#myModal3').modal('hide');
					location.href = "Business_setting.html"
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

//2删除
//删除
$(".sel_2_remove").click(function() {
	var businessParentId = $("#sel_2 option:checked").val();
	if(businessParentId == "0") {
		alert("请选择需要删除的二级类别！")
	} else {
		var businessParentId = $("#sel_2 option:checked").val();
		var reque = function() {
			return {
				typeid: businessParentId,
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
			url: urltest + 'verify/function/deleteBussiness',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					alert("删除成功！")
					$('#myModal3').modal('hide');
					location.href = "Business_setting.html"
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

//3删除
//删除
$(".sel_3_remove").click(function() {
	var businessParentId = $("#sel_3 option:checked").val();
	if(businessParentId == "0") {
		alert("请选择需要删除的三级类别！")
	} else {
		var businessParentId = $("#sel_3 option:checked").val();
		var reque = function() {
			return {
				typeid: businessParentId,
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
			url: urltest + 'verify/function/deleteBussiness',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					alert("删除成功！")
					$('#myModal4').modal('hide');
					location.href = "Business_setting.html"
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

//修改1
$(".sel_1_fix").click(function() {
	$('#s_tips').html("");
	var businessParentId = $("#sel_1 option:checked").val();
	var textt = $('#text_area').val();
	var typename = $('#sel_fix_input_1').val();
	if(typename == "") {
		$('#s_tips').html("请输入更改后的一级类别名字")
	} else {
		if(businessParentId == "0") {
			$('#s_tips').html("请选择需要修改的一级类别")
			//		alert("！")
		} else {
			if(textt == "") {
				$('#s_tips').html("请输入备注")
			} else {
				var businessParentId = $("#sel_1 option:checked").val();
				var reque = function() {
					return {
						typeid: businessParentId,
						modifyuserid: userId,
						modifyusername: userName,
						Remarks: textt,
						typename: typename
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
					url: urltest + 'verify/function/updateBussiness',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改成功！")
							$('#myModal6').modal('hide');
							location.href = "Business_setting.html"
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

//修改2
$(".sel_2_fix").click(function() {
	$('#s_tips_1').html("");
	var businessParentId = $("#sel_2 option:checked").val();
	var textt = $('#text_area_1').val();
	var typename = $('#sel_fix_input_2').val();
	if(typename == "") {
		$('#s_tips_1').html("请输入更改后的二级类别名字")
	} else {
		if(businessParentId == "0") {
			$('#s_tips_1').html("请选择需要修改的二级类别")
			//		alert("！")
		} else {
			if(textt == "") {
				$('#s_tips_1').html("请输入备注")
			} else {
				var businessParentId = $("#sel_2 option:checked").val();
				var reque = function() {
					return {
						typeid: businessParentId,
						modifyuserid: userId,
						modifyusername: userName,
						Remarks: textt,
						typename: typename
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
					url: urltest + 'verify/function/updateBussiness',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改成功！")
							$('#myModal7').modal('hide');
							location.href = "Business_setting.html"
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

//修改3
$(".sel_3_fix").click(function() {
	$('#s_tips_2').html("");
	var businessParentId = $("#sel_3 option:checked").val();
	var textt = $('#text_area_2').val();
	var typename = $('#sel_fix_input_3').val();
	if(typename == "") {
		$('#s_tips_2').html("请输入更改后的二级类别名字")
	} else {
		if(businessParentId == "0") {
			$('#s_tips_2').html("请选择需要修改的二级类别")
			//		alert("！")
		} else {
			if(textt == "") {
				$('#s_tips_2').html("请输入备注")
			} else {
				var businessParentId = $("#sel_3 option:checked").val();
				var reque = function() {
					return {
						typeid: businessParentId,
						modifyuserid: userId,
						modifyusername: userName,
						Remarks: textt,
						typename: typename
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
					url: urltest + 'verify/function/updateBussiness',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改成功！")
							$('#myModal8').modal('hide');
							location.href = "Business_setting.html"
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
///详情1
$("#xiangqing_1").click(function() {
	var name = $("#sel_1 option:checked").text();
	var id = $("#sel_1 option:checked").val();
	if(id == 0) {
		alert("请先选择一级类别，在查看详情")
	} else {
		$("#myModalLabel9").html("一级类别：" + name + "，详情");
		//		var businessParentId = $("#sel_3 option:checked").val();
		var reque = function() {
			return {
				typeid: id,

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
			url: urltest + 'verify/function/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					var msgg = JSON.parse(msg.returnString);
					$("#l_name").html(msgg.typename);
					$("#l_cr_name").html(msgg.createdate);
					$("#l_cr_time").html(msgg.createdate);
					$("#l_up_name").html(msgg.modifyusername);
					$("#l_up_time").html(msgg.modifydate);
					$("#l_beizhu").html(msgg.remarks);
					$("#l_id_zhu").html(msgg.typeId);
					$("#l_id_fu").html(msgg.parentId);
					$("#l_id_cr").html(msgg.createuserid);
					$("#l_id_up").html(msgg.modifyuserid);
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

///详情2
$("#xiangqing_2").click(function() {
	var name = $("#sel_2 option:checked").text();
	var id = $("#sel_2 option:checked").val();
	if(id == 0) {
		alert("请先选择二级类别，在查看详情")
	} else {
		$("#myModalLabel10").html("二级类别：" + name + "，详情");
		//		var businessParentId = $("#sel_3 option:checked").val();
		var reque = function() {
			return {
				typeid: id,

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
			url: urltest + 'verify/function/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					var msgg = JSON.parse(msg.returnString);
					$("#l_name1").html(msgg.typename);
					$("#l_cr_name1").html(msgg.createdate);
					$("#l_cr_time1").html(msgg.createdate);
					$("#l_up_name1").html(msgg.modifyusername);
					$("#l_up_time1").html(msgg.modifydate);
					$("#l_beizhu1").html(msgg.remarks);
					$("#l_id_zhu1").html(msgg.typeId);
					$("#l_id_fu1").html(msgg.parentId);
					$("#l_id_cr1").html(msgg.createuserid);
					$("#l_id_up1").html(msgg.modifyuserid);
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
///详情3
$("#xiangqing_3").click(function() {
	var name = $("#sel_3 option:checked").text();
	var id = $("#sel_3 option:checked").val();
	if(id == 0) {
		alert("请先选择三级类别，在查看详情")
	} else {
		$("#myModalLabel11").html("三级类别：" + name + "，详情");
		//		var businessParentId = $("#sel_3 option:checked").val();
		var reque = function() {
			return {
				typeid: id,

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
			url: urltest + 'verify/function/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					var msgg = JSON.parse(msg.returnString);
					$("#l_name2").html(msgg.typename);
					$("#l_cr_name2").html(msgg.createdate);
					$("#l_cr_time2").html(msgg.createdate);
					$("#l_up_name2").html(msgg.modifyusername);
					$("#l_up_time2").html(msgg.modifydate);
					$("#l_beizhu2").html(msgg.remarks);
					$("#l_id_zhu2").html(msgg.typeId);
					$("#l_id_fu2").html(msgg.parentId);
					$("#l_id_cr2").html(msgg.createuserid);
					$("#l_id_up2").html(msgg.modifyuserid);
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