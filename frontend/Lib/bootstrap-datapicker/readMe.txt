引入CSS:    <link rel="stylesheet" href="../lib/bootstrap-datapicker/bootstrap-datetimepicker.min.css" />
引入JS：
    <script src="../lib/bootstrap-datapicker/bootstrap-datetimepicker.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="../lib/bootstrap-datapicker/bootstrap-datetimepicker.zh-CN.js" type="text/javascript" charset="utf-8"></script>

HTML：
            <tr class="form-group">
                <td>
                    <label for="V_EXPEND_TIME">付款日期：</label>
                </td>
                <td>
                    <div class="input-group date form_date col-md-5" id="V_EXPEND_TIME" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                        <input class="form-control" size="16" type="text" value="" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                </td>
            </tr>

初始化：
            $('#V_EXPEND_TIME').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            });

赋值：$("#V_EXPEND_TIME").find("input").val(res.EXPEND_TIME);
取值： $("#V_EXPEND_TIME").find("input").val();