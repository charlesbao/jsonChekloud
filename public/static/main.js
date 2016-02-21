var productValueHTTP = document.querySelectorAll('.productValueHTTP');
var nowComment;
for(var i=0;i<productValueHTTP.length;i++){
    var result = productValueHTTP[i].innerText;
    var reg = /(http)+(.+)\//i;
    replacement = result.match(reg);
    if(replacement != null){
        reg = /(.+?)\.(.+)/;
        replacement = reg.test(result.replace(replacement[0],''));
        if(replacement && result.indexOf('.pdf') == -1){
            productValueHTTP[i].innerHTML = "<span><img src='"+result+"'/></span>";
        }else{
            productValueHTTP[i].innerHTML = "<span><a target='_blank' href='"+result+"'>"+result+"</a></span>";
        }
    }
}
var i = 0;
var danger = document.querySelectorAll('.danger');
if(danger.length>0){
    var path = window.location.pathname.split('$');
    if(path.length == 1){
        var back = '/'
    }else{
        path.pop();
        var back = path.join('$')+'$'
    }
    document.querySelector('.show-danger').setAttribute('href','#'+danger[i].parentNode.parentNode.parentNode.id);
    document.querySelector('.show-danger').innerHTML = "<a href='"+back+"'>返回</a><span>错误</span><span>"+danger.length+"</span>"
    document.querySelector('nav').className = 'active';
    document.querySelector('.show-danger').addEventListener('click',function(){
        i += 1;
        if(i > danger.length - 1)i=0;
        this.setAttribute('href','#'+danger[i].parentNode.parentNode.parentNode.id);
    })
}

function comment(evt){
    nowComment = evt;
    if(nowComment.className == 'active'){
        nowComment.className = '';
    }else{
        nowComment.className = 'active';
    }
}