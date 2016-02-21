var fs = require('fs');
var Path = require('path');
var moment = require('moment');
var paths = Path.join(__dirname,'files');

function getJSON(name,callback){
    result = JSON.parse(fs.readFileSync(name));
    callback(name,result)
}

function getfilesList(path){
    var filesList = [];
    readPath(path,filesList);
    return filesList;
}

function readPath(path,filesList)
{
    files = fs.readdirSync(path);
    files.forEach(walk);
    function walk(file)
    {
        states = fs.statSync(path+'/'+file);
        var obj = {};
        if(states.isDirectory())
        {
            obj.type = 'dir';
            obj.path = path+'/'+file
        }else{
            obj.type = 'file'
        }
        obj.name = file;
        obj.time = moment(states.mtime).format('YYYY-MM-DD HH:mm:ss');
        obj.size = states.size;
        if(obj.size>1024){
            obj.size = Math.round(states.size/1024).toString()+' KB';
        }else if(obj.size>1048576){
            obj.size = Math.round(states.size/1048576).toString()+' MB';
        }
        filesList.push(obj);
    }
}

exports.index = function(req,res){
    var Detailed = (getfilesList(paths));
    res.render('index', {
        title: '',
        detail: Detailed,
        path:''
    })
};

exports.parseJson = function(req,res){
    var file = req.params.name;
    if(file == 'favicon.ico')file = '';
    var dir = file.replace(/\$/g,'/');
    if(file.split('$').pop() == ''){
        var Detailed = (getfilesList(Path.join(paths,dir)));
            res.render('index', {
                title: '',
                detail: Detailed,
                path:file
            });
    }else{
        thePath = Path.join(paths,dir);
        if(fs.existsSync(thePath)){
            var stat = fs.lstatSync(thePath);
            if(stat.isDirectory()){
                var Detailed = (getfilesList(thePath));
                res.render('index', {
                    title: '',
                    detail: Detailed,
                    path:file
                });
            }else{
                getJSON(thePath,function(name,result){
                    res.render('json',{
                        name:Path.basename(name),
                        content:result
                    })
                });
            }
        }else{
            res.end('404')
        }
    }
};