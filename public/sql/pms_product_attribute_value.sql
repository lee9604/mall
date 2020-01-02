create table pms_product_attribute_value
(
   id                   bigint not null auto_increment,
   product_id           bigint comment '商品id',
   product_attribute_id bigint comment '商品属性id',
   value                varchar(64) comment '手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开',
   primary key (id)
);
