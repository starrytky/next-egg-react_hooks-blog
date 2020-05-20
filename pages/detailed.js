import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Advert from '../components/Advert'
import Tocify from '../components/tocify.tsx'
import '../static/style/pages/detailed.css'

// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import servicePath from '../config/apiUrl'

const Detailed = (props) => {

  const renderer = new marked.Renderer()

  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)

  return (
    <div className="container">
      <Head>
        <title>Detailed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} xxl={10}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link href={{pathname:'/list', query:{id:props.typeId}}}>
                    <a>{props.typeName}</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <span><Icon type="calender" />{props.addTime}</span>
                <span><Icon type="folder" />{props.typeName}</span>
                <span><Icon type="fire" />{props.view_count}</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >

              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={6}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
        <Footer />
      </Row>
    </div>
  )
}

Detailed.getInitialProps = async (context) => {
  // console.log('context.query.id==================================', context.query.id)

  let id = context.query.id

  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id)
      .then(
        (res) => {
          // console.log(res.data)
          resolve(res.data.data[0])
        }
      )
  })
  return await promise
}

export default Detailed
