function setEmLevel(level) {
    switch (level) {
        case "1"://紧急
            return "<span style='color: red'>紧急</span>";
            break;
        case "2"://高
            return "<span style='color:#F4E60D;'>高</span>"
            break;
        case "3"://中
            return "<span style='color:orange;'>中</span>"
            break;
        case "4"://低
            return "<span style='color:#11BAE1;'>低</span>"
            break;
        default:
            return "<span>"+level+"</span>"
            break;
    }
}

