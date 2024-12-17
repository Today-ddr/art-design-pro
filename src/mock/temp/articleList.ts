import { ArticleType } from '@/api/model/articleModel'

export const ArticleList: ArticleType[] = [
  {
    id: 452,
    blog_class: '42',
    title: 'Node.js + Docker自动化部署',
    count: 56,
    create_time: '2024-08-26T00:00:00.000Z',
    home_img: '',
    brief:
      '本章将介绍 Node.js 使用 Docker 、Webhook 自动化部署、蓝绿部署、项目到服务器。1、Mac os 安装 Docker 客户端 OrbStack我这里使用的是第三方客户端，相比于官方的，较轻量，启动速度快OrbStack 是一种快速、轻便且简单的运行 Docker 容器和 Linux 的方法。使用我们的 Docker Desktop 替代方案以光速进行开发。下载地址： http',
    type_name: 'Node.js',
    html_content: ''
  },
  {
    id: 451,
    blog_class: '36',
    title: 'HTTP 协议',
    count: 109,
    create_time: '2024-02-22T00:00:00.000Z',
    home_img: '',
    brief:
      '概念HTTP（hypertext transport protocol）协议；中文叫超文本传输协议是一种基于TCP/IP的应用层通信协议这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。协议中主要规定了两个方面的内容客户端：用来向服务器发送数据，可以被称之为请求报文服务端：向客户端返回数据，可以被称之为响应报文报文：可以简单理解为就是一堆字符串请求报文的组成请求行请求头空行请求体H',
    type_name: '浏览器',
    html_content: ''
  },
  {
    id: 450,
    blog_class: '40',
    title: 'MongoDB 数据库基本操作',
    count: 66,
    create_time: '2023-11-30T00:00:00.000Z',
    home_img: '',
    brief:
      '简介Mongodb 是什么MongoDB 是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/ 数据库是什么数据库（DataBase）是按照数据结构来组织、存储和管理数据的 应用程序数据库的作用数据库的主要作用就是 管理数据 ，对数据进行 增（c）、删（d）、改（u）、查（r）数据库管理数据的特点相比于纯文件管理数据，数据库管理数据有如下特点：1. 速度更快',
    type_name: 'MongoDB',
    html_content: ''
  },
  {
    id: 449,
    blog_class: '40',
    title: 'Mac os 安装 MongoDB',
    count: 59,
    create_time: '2023-11-15T00:00:00.000Z',
    home_img: '',
    brief:
      '下载MongoDB安装包官网下载地址：https://www.mongodb.com/try/download/community?tck=docs_server安装MongoDB# 将压缩包解压到 /usr/local/目录下\nsudo tar -zxvf mongodb-macos-x86_64-5.0.24.tgz -C /usr/local\n\n# 重命名\nsudo mv mongodb-o',
    type_name: 'MongoDB',
    html_content: ''
  },
  {
    id: 448,
    blog_class: '42',
    title: 'npm、yarn、nrm 常用命令',
    count: 91,
    create_time: '2023-11-07T00:00:00.000Z',
    home_img: '',
    brief:
      '设置镜像源#1,淘宝镜像源\nnpm config set registry https://registry.npmmirror.com\nnpm config set registry https://registry.npm.taobao.org\n\n#2,腾讯云镜像源\nnpm config set registry http://mirrors.cloud.tencent.com/npm/\n\n#',
    type_name: 'Node.js',
    html_content: ''
  },
  {
    id: 447,
    blog_class: '42',
    title: 'Node.js 包管理工具',
    count: 53,
    create_time: '2023-10-31T00:00:00.000Z',
    home_img: '',
    brief:
      '介绍包是什么『包』英文单词是 package ，代表了一组特定功能的源码集合包管理工具管理『包』的应用软件，可以对「包」进行 下载安装 ， 更新 ， 删除 ， 上传 等操作借助包管理工具，可以快速开发项目，提升开发效率包管理工具是一个通用的概念，很多编程语言都有包管理工具，所以 掌握好包管理工具非常重要常用的包管理工具下面列举了前端常用的包管理工具npmyarncnpmnpmnpm 全称 Node',
    type_name: 'Node.js',
    html_content: ''
  },
  {
    id: 446,
    blog_class: '42',
    title: 'Node.js 模块化',
    count: 40,
    create_time: '2023-10-25T00:00:00.000Z',
    home_img: '',
    brief:
      '介绍什么是模块化与模块 ?将一个复杂的程序文件依据一定规则（规范）拆分成多个文件的过程称之为其中拆分出的 每个文件就是一个模块 ，模块的内部数据是私有的，不过模块可以暴露内部数据以便其他模块使用什么是模块化项目 ?编码时是按照模块一个一个编码的， 整个项目就是一个模块化的项目模块化好处下面是模块化的一些好处：1.防止命名冲突2.高复用性3.高维护性模块暴露数据模块初体验可以通过下面的操作步骤，快速',
    type_name: 'Node.js',
    html_content: ''
  },
  {
    id: 445,
    blog_class: '42',
    title: 'Node.js学习笔记',
    count: 198,
    create_time: '2023-10-15T00:00:00.000Z',
    home_img: '',
    brief:
      'fs 模块fs 全称为 file system ，称之为 文件系统 ，是 Node.js 中的 内置模块 ，可以对计算机中的磁盘进行操作。例如文件的创建、删除、修改移动，文件内容的写入、读取，以及文件夹的相关操作// 1 ------------------------------------------------------\n/**\n * 需求\n * 新建一个文件，写入内容\n */\n\n// 1',
    type_name: 'Node.js',
    html_content: ''
  },
  {
    id: 444,
    blog_class: '41',
    title: '最好用的ChatGPT应用',
    count: 78,
    create_time: '2023-05-22T00:00:00.000Z',
    home_img: '',
    brief:
      '目前为止最好用的ChatGPT网站，支持6种AI模型和每日一次GPT4的使用机会，有网页版和ios应用程序，可以使用邮箱和手机号等方式注册，中国大陆可放心使用（需要科学上网），下面就介绍一下如何使用吧。网站地址：https://poe.com/进去之后可以选择邮箱或手机号等其他方式注册。除了网页版，你还可以到AppStore搜索poe下载ios客户端',
    type_name: 'GPT',
    html_content: ''
  },
  {
    id: 443,
    blog_class: '35',
    title: 'Nuxt 百度收录 robots 和 sitemap',
    count: 109,
    create_time: '2023-04-07T00:00:00.000Z',
    home_img: '',
    brief:
      '前言robots 和 sitemap 文件，前者的作用是减少百度蜘蛛在站内的无谓爬取，后者增加百度蜘蛛在站内的有效爬取，对百度收录和自己网站的SEO推广都十分重要。robots只有一个：robot.txt，这是一个文本文件，主要利用Allow（允许）和DisAllow（禁止）两个命令，（这两个重要的是禁止），禁止百度蜘蛛爬取一些无谓的文件和文件夹，增加百度搜录速度。具体原理和写法网上去搜，制作简单',
    type_name: 'Nuxt',
    html_content: ''
  },
  {
    id: 442,
    blog_class: '12',
    title: 'Vue3+TS+Vite 项目搭建笔记（更新中）',
    count: 516,
    create_time: '2023-04-03T00:00:00.000Z',
    home_img: '',
    brief:
      '介绍本章会教你在真实项目中如何搭建 VueRouter、Vuex、pinia、axios、主题切换等，你会见证一个后台管理系统的详细搭建过程。效果图：功能：后台管理系统常用模块登录加密多标签页全局面包屑国际化异常处理Utils工具包可配置的菜单栏徽标亮色 / 暗色 侧边栏浅色主题 / 暗黑主题丰富的个性化配置可折叠侧边栏支持内嵌页面重载当前页面动态路由支持自动重载支持多级路由嵌套及菜单栏嵌套分离路',
    type_name: 'Vue',
    html_content: ''
  },
  {
    id: 441,
    blog_class: '9',
    title: 'CSS 根据系统自动切换主题方案',
    count: 184,
    create_time: '2023-04-01T00:00:00.000Z',
    home_img: '',
    brief:
      '原理是改变 css 变量 + window.matchMedia 来监听系统主题变，从而实现点击改变主题和监听系统主题变化1、首先定义 css 全局变量创建 variables.scss 文件light color（浅色模式）定义浅色模式下 css 主题变量dark color（深色模式）定义深色模式下 css 主题变量// css全局变量\n:root {\n  // 文字大小\n  --art-fo',
    type_name: 'CSS',
    html_content: ''
  },
  {
    id: 440,
    blog_class: '36',
    title: '浏览器-安全',
    count: 116,
    create_time: '2023-03-28T00:00:00.000Z',
    home_img: '',
    brief:
      '通过这篇文章你可以了解到同源策略、跨站脚本攻击（xss）、跨域请求伪造（CSRF）以及安全沙箱相关知识；以下是本文的思维导图：（手机端可能看不清）获取高清 PDF，请在微信公众号【小狮子前端】回复【浏览器安全】同源策略什么是同源策略如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。两个不同的源之间若想要相互访问资源或者操作 DOM，那么会有一套基础的安全策略的制约，我们把这',
    type_name: '浏览器',
    html_content: ''
  },
  {
    id: 439,
    blog_class: '12',
    title: 'Vue-Router4',
    count: 135,
    create_time: '2023-02-08T00:00:00.000Z',
    home_img: '',
    brief:
      "路由模式构建 router.tsimport { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, createRouterMatcher } from 'vue-router'\nimport Home from '../views/home/index.vue'\nimport Login from",
    type_name: 'Vue',
    html_content: ''
  },
  {
    id: 438,
    blog_class: '10',
    title: 'Event Loop（事件循环）',
    count: 161,
    create_time: '2023-01-03T00:00:00.000Z',
    home_img: '',
    brief:
      'js是单线程的，一次只能执行一段代码。单线程会导致很多任务需要排队，一个个去执行，如果此时某个任务执行时间太长，就会出现阻塞，为了解决这个问题，js引入了事件循环机制。为什么要区分宏任务和微任务？js是单线程的，但是分同步异步微任务和宏任务皆为异步任务，它们都属于一个队列宏任务：script（整体代码）、setTimeout、setInterval、I/O、UI、 renderingsetImme',
    type_name: 'JavaScript',
    html_content: ''
  },
  {
    id: 437,
    blog_class: '32',
    title: 'Typescript 学习笔记',
    count: 1022,
    create_time: '2022-12-02T00:00:00.000Z',
    home_img: '',
    brief:
      'TypeScript 概要TypeScript 是一种由 微软 开发的自由和开源的编程语言，它是 JavaScript 的一个超集，扩展了JavaScript的语法，而且本质上向这个语言添加了可选的 静态类型 和基于类的面向对象编程。官网：http://www.typescriptlang.org/github：https://github.com/Microsoft/TypeScript入门教程',
    type_name: 'TypeScript',
    html_content: ''
  },
  {
    id: 436,
    blog_class: '10',
    title: '前端开发规范',
    count: 116,
    create_time: '2022-11-29T00:00:00.000Z',
    home_img: '',
    brief:
      '一个好的程序员肯定是要能书写可维护的代码，而不是一次性的代码，怎么能让团队当中其他人甚至一段时间时候你再看你某个时候写的代码也能看懂呢，这就需要规范你的代码了。我是有一点强迫症的人，上周我们后端给我了一个CanUsename的接口（该接口的目的是判断输入的目的地是否是4级目的地），我真的是崩溃的。我只是觉得这个名字不够语义化，但是让我自己想一个名字我又想不出来，于是我就在想，如果有一套命名规范的话',
    type_name: 'JavaScript',
    html_content: ''
  },
  {
    id: 434,
    blog_class: '38',
    title: '网络-Websocket',
    count: 176,
    create_time: '2022-09-15T00:00:00.000Z',
    home_img: '',
    brief:
      'WebSocket 是一种在单个 TCP 连接上进行全双工通信的应用层网络传输协议。WebSocket 的特点全双工通信：允许服务端主动向客户端推送数据，使得客户端和服务器之间的数据交换变得更加简单。建立链接：一次握手，两者之间就直接可以创建持久性的连接。与 HTTP 协议有着良好的兼容性：默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP',
    type_name: '网络',
    html_content: ''
  },
  {
    id: 432,
    blog_class: '39',
    title: '操作系统',
    count: 264,
    create_time: '2022-08-17T00:00:00.000Z',
    home_img: '',
    brief:
      '操作系统作为计算机专业的必修课，也是基础理论课程，不管是前端还是后端，多少都要了解一些这方面的知识。当然按面试出现频率来看，很有可能你很多面试都不会被问到操作系统，那其中的抉择就留给你自己咯，这里提出的面试题也只是抛砖引玉。什么是操作系统？提到操作系统，其实我们并不陌生，比如 Windows、Linux、Mac 等等的这些都是操作系统，但我们不能这样浅显的回答。操作系统他是计算机硬件和应用之间的一',
    type_name: '操作系统',
    html_content: ''
  },
  {
    id: 428,
    blog_class: '25',
    title: '服务器安装Nginx、Mysql、Navicat连接Mysql',
    count: 120,
    create_time: '2022-07-21T00:00:00.000Z',
    home_img: '',
    brief:
      '腾讯云服务器-部署笔记先购买好服务器进入控制台重置密码，然后关机连接服务器这边需要用到一个FinalShell工具来连接服务器下载地址：http://www.hostbuf.com/t/988.html连接服务器：连接成功：安装Nginx去官网http://nginx.org/en/download.html下载对应的nginx包，推荐使用稳定版本，本文下载的nginx-1.18.0.tar.gz',
    type_name: '网站建设',
    html_content: ''
  }
]
