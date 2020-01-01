create table pms_product_attribute
(
   id                   bigint not null auto_increment,
   product_attribute_category_id bigint comment '商品属性分类id',
   name                 varchar(64) comment '名称',
   sort                 int comment '排序字段：最高的可以单独上传图片',
   hand_add_status      int(1) comment '是否支持手动新增；0->不支持；1->支持',
   type                 int(1) comment '属性的类型；0->规格；1->参数',
   primary key (id)
);
create table pms_product_attribute
(
   id                   bigint not null auto_increment,
   product_attribute_category_id bigint comment '商品属性分类id',
   name                 varchar(64) comment '名称',
--    select_type          int(1) comment '属性选择类型：0->唯一；1->单选；2->多选；对应属性和参数意义不同；',
--    input_type           int(1) comment '属性录入方式：0->手工录入；1->从列表中选取',
--    input_list           varchar(255) comment '可选值列表，以逗号隔开',
--    sort                 int comment '排序字段：最高的可以单独上传图片',
--    filter_type          int(1) comment '分类筛选样式：1->普通；1->颜色',
--    search_type          int(1) comment '检索类型；0->不需要进行检索；1->关键字检索；2->范围检索',
--    related_status       int(1) comment '相同属性产品是否关联；0->不关联；1->关联',
--    hand_add_status      int(1) comment '是否支持手动新增；0->不支持；1->支持',
   type                 int(1) comment '属性的类型；0->规格；1->参数',l
   primary key (id)
);
