# vue3_music

## Project

### 项目简介

> 利用网易云接口做的简单的H5听歌页面
>
> 功能：
>
> 查看歌单，查看排行榜，搜索歌曲，播放歌曲

### 项目相关技术

vue3(最新的script setup语法) + ts

## 项目规范

### 书写规范

#### 1、组件中引用顺序：

vue、vuex、vue-router、hooks、其他库组件、自己的组件、网络请求、其他编写的工具类函数

#### 2、组件中相关数据顺序：

data、vuex、hooks、computed、watch、methods

#### 3、命名规范： 

常见命名：

> kebab case: 用 - 连接 全小写如 get-username
>
> 小驼峰: getUsername
>
> 大驼峰：GetUsername
>
> snake case:  get_username

组件文件名（kebab case）

导入组件用大驼峰

css命名（kebab case, 每个组件最外层容器的class名和组件文件名一样）

常量全大写

变量小驼峰

hooks用use开头（文件名kebab case、导入时小驼峰）

#### 4、文件创建规范: 

vue编写的components 和 page 都是用文件夹包裹（因为这样写有些组件可以直接写在page或大组件下 因为它们只在这里使用到）, 然后用过index.js（ts）导出需要导出的部分

### 提交规范：



## 项目参考

1、样式参考coderwhy的小程序课程的样式

2、播放逻辑参考了黄奕的音乐课程代码