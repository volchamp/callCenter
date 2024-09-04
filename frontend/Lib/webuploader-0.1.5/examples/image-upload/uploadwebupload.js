//上传数量
var fileNum = '5';
//生成UUID
var uuid = generateMixed(32);

function onLoadUpload() {
	var $ = jQuery;
	var origin;
	var is_moveing = false;
	var $wrap = $('#uploader');
	var $queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList'));
	var $statusBar = $wrap.find('.statusBar');
	var $info = $statusBar.find('.info');
	var $upload = $wrap.find('.uploadBtn');
	var $placeHolder = $wrap.find('.placeholder');
	var $progress = $statusBar.find('.progress').hide();
	var fileCount = 0;
	var fileSize = 0;
	var state = 'pedding';
	var ratio = window.devicePixelRatio || 1;
	var thumbnailWidth = 130 || 130;
	thumbnailWidth *= ratio;
	var thumbnailHeight = 130 || 130;
	thumbnailHeight *= ratio;
	var percentages = {};
	var supportTransition = (function() {
		var s = document.createElement('p').style,
			r = 'transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
		s = null;
		return r;
	})();

	if(!WebUploader.Uploader.support()) {
		swal("提示:" + 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器', "浏览器异常", "error");
		throw new Error(
			'WebUploader does not support the browser you are using.');
	}
	// 实例化
	var uploader = WebUploader.create({
		// 不压缩image
		resize: false,
		// swf文件路径
		swf: '../../dist/Uploader.swf',
		// 开起分片上传。
		chunked: true,
		//如果要分片，分多大一片？ 默认大小为5M.
		chunkSize: 5242880,
		//如果不禁用，图片拖进来的时候会默认被浏览器打开。默认false
		disableGlobalDnd: true, // 禁掉全局的拖拽功能。
		//上传并发数。允许同时最大上传进程数。
		threads: 3,
		// 文件接收服务端。
		server: 'http://192.168.1.9:35224/api',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: {
			id: '#picker',
			label: '点击选择文件',
			multiple: false,
		},
		//传输参数
		formData: {
			batch: uuid
		},
		//是否允许在文件传输时提前把下一个文件准备好
		prepareNextFile: true,
		//指定Drag And Drop拖拽的容器，如果不指定，则不启动。
		dnd: '#uploader .queueList',
		//此功能为通过粘贴来添加截屏的图片
		paste: document.body,
		//去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
		duplicate: false,
		// [默认值：'file']  设置文件上传域的name。
		fileVal: 'upload',
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png,pdf,doc,docx,txt,xls,xlsx,ppt,pptx,zip,mp3,mp4,text,csv'
			//				mimeTypes: 'image/*,'
		},
		compress: false,
		//验证单张文件的大小
		fileSingleSizeLimit: 10 * 1024 * 1024, //10M
		fileNumLimit: fileNum, //上传数量
		duplicate: true,
		thumb: { //配置生成缩略图的选项
			width: 100,
			height: 100,

			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 70,

			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: true,

			// 是否允许裁剪。
			crop: true,

			// 为空的话则保留原有图片格式。
			// 否则强制转换成指定的类型。
			type: 'image/jpeg'
		},
		//图片压缩
		compress: {
			width: 100,
			height: 100,

			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 90,

			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: false,

			// 是否允许裁剪。
			crop: false,

			// 是否保留头部meta信息。
			preserveHeaders: true,

			// 如果发现压缩后文件大小比原来还大，则使用原来图片
			// 此属性可能会影响图片自动纠正功能
			noCompressIfLarger: false,

			// 单位字节，如果图片大小小于此值，不会采用压缩。
			compressSize: 0
		},
		//并发数为1
		threads: 1
	});

	// 添加“添加文件”的按钮，
	uploader.addButton({
		id: '#filePicker2',
		label: '继续添加'
	});

	//图片拖动方法
	function setDragEvent() {
		$(this).on('drop', function(e) {
			var $from = $(origin).parents('li');
			var $to = $(e.target).parents('li');
			var origin_pos = $from.position();
			var target_pos = $to.position();
			var from_sort = $from.attr('data-sort');
			var to_sort = $to.attr('data-sort');
			//图片移动效果
			$from.addClass('move').animate(target_pos, "fast", function() {
				$(this).removeClass('move');
			}).attr('data-sort', to_sort);
			$to.addClass('move').animate(origin_pos, 'fast', function() {
				$(this).removeClass('move');
			}).attr('data-sort', from_sort);
		}).on('dragstart', function(e) {
			if(is_moveing) {
				return false;
			}
			is_moveing = true;
			e.originalEvent.dataTransfer.effectAllowd = 'move';
			origin = this;
		}).on('dragover', function(e) {
			if(e.preventDefault)
				e.preventDefault();
			is_moveing = false;
			e.originalEvent.dataTransfer.dropEffect = 'move';
		});
	}

	function addFile(file) {
		var index = $queue.find('li').length;
		//图片放的位置
		var imgLeft = index * (thumbnailWidth + 10);
		var imgTop = 0;
		var wrapHeight = thumbnailHeight + 20;
		var wrapWidth = $queue.width() + 20 + 10;
		if(imgLeft >= wrapWidth) {
			imgTop = parseInt(imgLeft / wrapWidth) * (thumbnailHeight + 10);
			wrapHeight = imgTop + wrapHeight;
			imgLeft = (index % (parseInt(wrapWidth / (thumbnailWidth + 10)) + 1)) * (thumbnailWidth + 10);
		}
		$queue.height(wrapHeight);
		//图片拖动的前置生成
		var $li = $('<li data-key="' + file.key + '"  data-src="' + file.src + '" data-sort="' + index + '" draggable="true" id="' + file.id + '" style="position:absolute;margin:0;cursor:move;width:' + thumbnailWidth + 'px;height:' + thumbnailHeight + 'px;left:' + imgLeft + 'px;top:' + imgTop + 'px;">' +
				'<p class="title">' + file.name + '</p>' +
				'<p class="imgWrap" style="width:' + thumbnailWidth + 'px;height:' + thumbnailHeight + 'px;"></p>' +
				'<p class="progress"><span></span></p>' + '</li>'),
			$btns = $(
				'<div class="file-panel">' +
				'<span class="cancel">删除</span>' +
				'<span class="rotateRight">向右旋转</span>' +
				'<span class="rotateLeft">向左旋转</span></div>')
			.appendTo($li),
			$prgress = $li.find('p.progress span'),
			$wrap = $li.find('p.imgWrap'),
			$info = $('<p class="error"></p>'),
			showError = function(code) {
				switch(code) {
					case 'exceed_size':
						text = '文本大小超出';
						break;
					case 'interrupt':
						text = '上传暂停';
						break;
					default:
						text = '上传失败';
						break;
				}
				$info.text(text).appendTo($li);
			};
		if(file.src == "client") {
			if(file.getStatus() == 'invalid') {
				showError(file.statusText);
			} else {
				$wrap.text('预览中');
				uploader.makeThumb(file, function(error, src) {
					if(error) {
						$wrap.text('不能预览');
						return;
					}
					var img = $('<img draggable="true" src="' + src + '">');
					img.bind('load', setDragEvent);
					$wrap.empty().append(img);
				}, thumbnailWidth, thumbnailHeight);
				percentages[file.id] = [fileSize, 0];
				file.rotation = 0;
			};
			file.on('statuschange', function(cur, prev) {
				if(prev == 'progress') {
					$progress.hide().width(0);
				} else if(prev == 'queued') {
					$li.off('mouseenter mouseleave');
					$btns.remove();
				}
				if(cur == 'error' || cur == 'invalid') {
					showError(file.statusText);
					percentages[file.id][1] = 1;
				} else if(cur == 'interrupt') {
					showError('interrupt');
				} else if(cur == 'queued') {
					percentages[file.id][1] = 0;
				} else if(cur == 'progress') {
					$info.remove();
					$progress.css('display', 'block');
				} else if(cur == 'complete') {
					$li.append('<span class="success"></span>');
				}
				$li.removeClass('state-' + prev).addClass('state-' + cur);
			});
		} else {
			var img = $('<img draggable="true" src="' + file.path + '">');
			img.bind('load', setDragEvent);
			$wrap.empty().append(img);
		}
		$li.on('mouseenter', function() {
			$btns.stop().animate({
				height: 30
			});
		});
		$li.on('mouseleave', function() {
			$btns.stop().animate({
				height: 0
			})
		});
		$btns.on('click', 'span', function() {
			var index = $(this).index(),
				deg;
			switch(index) {
				case 0:
					var allImgs = {};
					var del_sort = parseInt($('#' + file.id).attr('data-sort'));
					$queue.find('li').each(function(index, obj) {
						if($(obj).attr('data-sort') > del_sort) {
							var sort = parseInt($(obj).attr('data-sort'));
							var $prevObj = $("li[data-sort=" + (sort - 1) + "]");
							if($prevObj) {
								allImgs[$(obj).attr('id')] = $prevObj.position();
							}
						}
					});
					for(var k in allImgs) {
						var sort = parseInt($('#' + k).attr('data-sort'));
						$('#' + k).attr('data-sort', sort - 1).css({
							left: allImgs[k].left + 'px',
							top: allImgs[k].top + 'px'
						});
					}
					allImgs = null;
					if(file.src == "client")
						uploader.removeFile(file);
					else {
						$('#' + file.id).remove();
					}
					return;
				case 1:
					file.rotation += 90;
					break;
				case 2:
					file.rotation -= 90;
					break;
			}
			if(supportTransition) {
				deb = 'rotate(' + file.rotation + 'deg)';
				$wrap.css({
					'-webkit-transform': deb,
					'-mos-transform': deg,
					'-o-transform': deg,
					'transform': deg
				});
			} else {}
		});
		$li.appendTo($queue);
	}

	function removeFile(file) {
		var $li = $('#' + file.id);
		delete percentages[file.id];
		updateTotalProgress();
		$li.off().find('.file-panel').off().end().remove();
	}

	function updateTotalProgress() {
		var loaded = 0,
			total = 0,
			spans = $progress.children(),
			percent;
		$.each(percentages, function(k, v) {
			total += v[0];
			loaded += v[0] * v[1];
		});
		percent = total ? loaded / total : 0;
		spans.eq(0).text(Math.round(percent * 100) + '%');
		spans.eq(1).css('width', Math.round(percent * 100) + '%');
		updateStatus();
	}
	//上传的判断
	function updateStatus() {
		var text = '',
			stats;
		if(state === 'ready') {
			text = '选中' + fileCount + '份文件，共' +
				WebUploader.formatSize(fileSize) + '。';
		} else if(state === 'confirm') {
			stats = uploader.getStats();
			if(stats.uploadFailNum) {
				text = '已成功上传' +
					stats.successNum +
					'份文件，' +
					stats.uploadFailNum +
					'份文件上传失败，<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>'
				console.log(WebUploader);
				console.log(stats);
			}
		} else {
			stats = uploader.getStats();
			// console.log(stats);
			//console.log(stats.successNum);
			text = '共' + fileCount + '份文件（' +
				WebUploader.formatSize(fileSize) + '），已上传' +
				stats.successNum + '份';
			if(stats.uploadFailNum) {
				text += '，失败' + stats.uploadFailNum + '份';
			} else {
				if(stats.successNum != 0 &&
					stats.successNum == fileCount) {
					//图片上传成功提示
					window.parent.successAlert();
				}
			}
		}
		$info.html(text);
	}

	function setState(val) {
		var file, stats;
		if(val === state) {
			return;
		}
		$upload.removeClass('state-' + state);
		$upload.addClass('state-' + val);
		state = val;
		switch(state) {
			case 'pedding':
				$placeHolder.removeClass('element-invisible');
				$queue.parent().removeClass('filled');
				$queue.hide();
				$statusBar.addClass('element-invisible');
				uploader.refresh();
				break;
			case 'ready':
				$placeHolder.addClass('element-invisible');
				$('#filePicker2').removeClass('element-invisible');
				$queue.parent().addClass('filled');
				$queue.show();
				$statusBar.removeClass('element-invisible');
				uploader.refresh();
				break;
			case 'uploading':
				$('#filePicker2').addClass('element-invisible');
				$progress.show();
				$upload.text('暂停上传');
				break;
			case 'paused':
				$progress.show();
				$upload.text('继续上传');
				break;
			case 'confirm':
				$progress.hide();
				$upload.text('开始上传').addClass('disabled');
				stats = uploader.getStats();
				if(stats.successNum && !stats.uploadFailNum) {
					setState('finish');
					return;
				}
				break;
			case 'finish':
				stats = uploader.getStats();
				if(stats.successNum) {
					$(".tbody-memos").empty();
					$queue
						.find('li')
						.each(
							function() {
								$(".tbody-memos")
									.append(
										'<tr><td>' +
										$(this)
										.find(
											'.title')
										.text() +
										'</td><td>' +
										'<input type="text" class="form-control" placeholder="备注信息" name="memos" ></td></tr>');
							});
					$("div[id='table-memo']").each(function() {
						$(this).css("display", "block");
					});

					$("div[id='uploadButton']").each(function() {
						$(this).css("display", "block");
					});
				} else {
					// 没有成功的，重设
					state = 'done';
					location.reload();
				}
				break;
		}
		updateStatus();
	}

	function fileQueue(file) {
		//排序队列中的文件，在上传之前调整可以控制上传顺序
		uploader.sort(function(obj1, obj2) {
			return obj1.id > obj2.id ? -1 : 1;
		});
		file.src = file.src || "client";
		fileCount++;
		fileSize += file.size;
		if(fileCount == 1) {
			$placeHolder.addClass('element-invisible');
			$statusBar.show();
		}
		addFile(file);
		setState('ready');
		updateTotalProgress();
	}

	uploader.on('uploadProgress', function(file, percentage) { //上传过程中触发，携带上传进度。
		var $li = $('#' + file.id),
			$percent = $li.find('.progess span');
		$percent.css("width", percentage * 100 + '%');
		updateTotalProgress();
	});
	uploader.on('fileQueued', fileQueue); //当一批文件添加进队列以后触发。
	uploader.on('fileDequeued', function(file) { //fileDequeued当文件被移除队列后触发。
		fileCount--;
		fileSize -= file.size;
		if(!fileCount) {
			setState('pedding');
		}
		removeFile(file);
		updateTotalProgress();
	});
	uploader.on('uploadSuccess', function(file) { //当文件上传成功时触发。
		$('#' + file.id).find('p.state').text('已上传');
	});
	uploader.on('uploadError', function(file) { //当文件上传出错时触发。
		console.log(file.id + '上传出错');		
		uploader.removeFile(uploader.getFile(file.id));
        uploader.onFileDequeued = function( file ) {
        console.log(uploader.getFiles());
        
             };
        $placeHolder.removeClass('element-invisible');
		$queue.parent().removeClass('filled');
		$statusBar.addClass('element-invisible');
        uploader.refresh();
             
	});
	uploader.on('uploadComplete', function(file) { //不管成功或者失败，文件上传完成时触发。
		$('#' + file.id).find('p.state').fadeOut();
	});

	//所有的操作
	uploader.on('all', function(type) {
		var stats;
		switch(type) {
			case 'uploadFinished':
				setState('confirm'); //开始上传
				break;
			case 'startUpload':
				setState('uploading'); //暂停上传
				break;

			case 'stopUpload':
				setState('paused'); //继续上传
				break;

		}
	});
	//当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次
	uploader.on('uploadBeforeSend', function(block, data) {
		data.sort = $('#' + data.id).attr('data-sort');
	});
	uploader.on("error", function(type) { //上传错误
		if(type == "Q_TYPE_DENIED") {
			alert("上传文件类型格式不满足", "文件格式错误", "error");			
		} else if(type == "F_EXCEED_SIZE") {
			alert("单个文件大小不能超过10M", "图片大小错误", "error");
		} else if(type == "Q_EXCEED_NUM_LIMIT") {
			alert("文件总数不能超过" + fileNum + "", "文件数量错误", "error");
		}else if(type == "F_DUPLICATE"){
			alert('文件已存在队列中');
		} else {
			alert("上传出错！请检查后重新上传！错误代码" + type, "错误", "error");
		}
	});
     //删除事件
    uploader.on("click", ".ion-close-round", function () {
        var fileItem = $(this).parent();
        var id = $(fileItem).attr("id");
        uploader.removeFile(id, true);
        $(fileItem).fadeOut(function () {
            $(fileItem).remove();
        });
        //删除数组(这边根据自己情况图片展示情况进行删除)
        var src = $(this).prev().attr("src");
        if (src != "" && src.length > 0) {
            var index = src.indexOf("/Upload/Image/");
            var filename = src.replace("/Upload/Image/", "");
            var arryindex = pics.indexOf(filename);
            if (arryindex > -1) {
                pics.splice(arryindex, 1);
            }
        }
    });
	function sortNumber(a, b) {
		return a - b;
	}
	//点击开始上传文件按钮
	$upload.on('click', function() {
		//修改上传的顺序
		uploader.sort(function(obj1, obj2) {
			return sortNumber($('#' + obj1.id).attr('data-sort'), $('#' + obj2.id).attr('data-sort'));
		});
		if($(this).hasClass('disabled')) {
			return false;
		}
		if(state == 'ready') {
			uploader.upload(); //文件上传
		} else if(state == 'paused') {
			uploader.upload(); //文件上传
		} else if(state == 'uploading') {
			uploader.stop(); //文件停止上传
		}
	});
	$info.on('click', '.retry', function() { //重新上传
		uploader.retry();
	});
	//忽略
	$info.on('click', '.ignore', function() {
		$placeHolder.removeClass('element-invisible');
		$queue.parent().removeClass('filled');
		$queue.hide();
		$statusBar.addClass('element-invisible');
		
		uploader.refresh();
	});
	$upload.addClass('state-' + state);
	updateTotalProgress();
	reInitUploader = function() {
		files = uploader.getFiles();
		for(var i = 0; i < files.length; i++) {
			uploader.removeFile(files[i]);
		}
		$upload.text('开始上传').removeClass('disabled');
	};
}

var _paneHtml = '<div class="panel-body">' +
	'<div id="uploadFrom">' +
	'<div id="uploader" class="uploader">' +
	'<!--拖拽上传区域-->' +
	'<div class="queueList">' +
	'<div id="dndArea" class="placeholder">' +
	'<div id="picker"></div>' +
	'</div>' +
	'</div>' +
	'<div class="statusBar" style="border-top: 0px; border-bottom: 1px solid #dadada;">' +
	'<div class="progress">' +
	'<span class="text">0%</span> <span class="percentage"></span>' +
	'</div>' +
	'<div class="info"></div>' +
	'<div class="btns">' +
	'<div id="filePicker2"></div>' +
	'<div class="uploadBtn">开始上传</div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';

function myUpload() {
	$("#panel").html(_paneHtml);
	showMP();
	onLoadUpload();
}

function showMP() {
	$("#mark").show();
	$("#panel").show();
}

function generateMixed(n) {
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var res = "";
	for(var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}