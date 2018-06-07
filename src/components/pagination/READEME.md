[TOC]
# pagination分页组件

## props 参数
1. v-model (当前页码) type=> Number defautl '-'
2. mode(模式可选为模式simple,multi) type String default=> multi
3. items-per-page(每页记录数) type=>Number default => 10 
4. previous-text(上一页文本) type=>String  default =>'上一页'
5. next-text(下一页) type=>String  default => '下一页'
6. show-page-size(显示的页码数) => type=> Number default => 5
7. force-ellipses(显示省略号) => type=> Boolean  default=> false 


## Event
1. 页码改变时触发

