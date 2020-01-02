-- 用于选中分类后搜索时生成筛选属性。
create table pms_product_category_attribute_relation
(
   id                   bigint not null auto_increment,
   product_category_id  bigint comment '商品分类id',
   product_attribute_id bigint comment '商品属性id',
   primary key (id)
);
