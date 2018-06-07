$('.form_date').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
});

function gaibian() {
	var st = $('.input_1').val();
	if(st != "") {
		//			$("#end_time").show();
		//			$('.input_2').val("");
		pp();
	} else {
		//			$("#end_time").hide();
	}
}

function gaibian1() {
	var st = $('.input_2').val();
	if(st != "") {
		//			$("#end_time").show();
		//			$('.input_2').val("");
		pp1();
	} else {
		//			$("#end_time").hide();
	}
}

function pp1() {
	var d1 = new Date($(".input_1").val());
	var d2 = new Date($(".input_2").val());
	$('.form_date3').datetimepicker('setStartDate', $(".input_1").val());
	$('.form_date3').datetimepicker('setEndDate', $(".input_2").val());
	$('.form_date3').datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
	});
}
$('.form_date2').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
});
$('.form_date3').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
});

function pp() {
	debugger
	var d1 = new Date($(".input_1").val());
	var d2 = new Date($(".input_2").val());
	$('.form_date2').datetimepicker('setStartDate', $(".input_1").val());
	$('.form_date2').datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
	});
	if(d2 < d1) {
		$(".input_2").val("");
		$('.form_date2').datetimepicker('setStartDate', $(".input_1").val());
	}
}

//添加优惠券
$('.form_date11').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
	startDate: new Date(),
	endDate: "2900-12-21",

});
$('.form_date22').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
	endDate: "2900-12-21",
});
$('.form_date33').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
});

function gaibian11() {
	var st = $('.input_1').val();
	if(st != "") {
		//			$("#end_time").show();
		//			$('.input_2').val("");
		pp11();
	} else {
		//			$("#end_time").hide();
	}
}

function gaibian111() {
	var st = $('.input_2').val();
	if(st != "") {
		//			$("#end_time").show();
		//			$('.input_2').val("");
		pp111();
	} else {
		//			$("#end_time").hide();
	}
}

function pp11() {
	debugger
	var d1 = new Date($(".input_1").val());
	var d2 = new Date($(".input_2").val());
	$('.form_date22').datetimepicker('setStartDate', $(".input_1").val());
	$('.form_date22').datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		endDate: "2900-12-21",
	});
	if(d2 < d1) {
		$(".input_2").val("");
		$('.form_date22').datetimepicker('setStartDate', $(".input_1").val());
	}
}

function pp111() {
	debugger
	var d1 = new Date($(".input_1").val());
	var d2 = new Date($(".input_2").val());
	$('.form_date33').datetimepicker('setStartDate', $(".input_1").val());
	$('.form_date33').datetimepicker('setEndDate', $(".input_2").val());
	$('.form_date33').datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
	});
}
//$('.form_date3').datetimepicker('setStartDate', new data);
//$('.form_date3').datetimepicker('setEndDate', $(".input_2").val());

//$('#qBeginTime').datepicker({
//	todayBtn: "linked",
//	autoclose: true,
//	todayHighlight: true,
//	endDate: new Date()
//}).on('changeDate', function(e) {
//	var startTime = e.date;
//	$('#qEndTime').datepicker('setStartDate', startTime);
//});
////结束时间：  
//$('#qEndTime').datepicker({
//	todayBtn: "linked",
//	autoclose: true,
//	todayHighlight: true,
//	endDate: new Date()
//}).on('changeDate', function(e) {
//	var endTime = e.date;
//	$('#qBeginTime').datepicker('setEndDate', endTime);
//});