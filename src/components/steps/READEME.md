[TOC]

## steps props 参数 
1. active(当前步骤) type(Number) default 0 
2. title(描述栏标题) type(String) default -
3. description(描述栏文字) type(String) default - 
4. icon(描述栏图标) type(String) default -
5. icon-class(图标额外类名) type(String) default -
6. direction(显示方向 可选为horizontal和vertical) type(String) default(horizontal)
7. active-color(激活状态颜色) type(String) default '#06bf04'


## steps slots
1. icon 自定义icon区域
2. message-extra 状态栏添加额外的元素



> css小技巧

```stylus
.test 
  margin 0 0 10px // 此处的margin的意思是 上右下

```


>  浮动下沉的例子(左边下沉)

```stylus
<!DOCTYPE html>
<html>
<head>
    <title>xxx</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
<div class="container">
    <style type="text/css">
        .left 
        {
            float : left;
        }
        .left i {
            display: inline-block;
            width: 10px;
            height: 60px;
            background:red;
        }
    </style>
    <div class="left"><i></i></div><div class="right">
        <div class="title">hello world</div>
        <div class="title">I am fine thanks</div>
    </div>
</div>
</body>
</html>
```
