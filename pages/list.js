import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/list.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

const MyList = (list) => {
  // console.log("=======list=========",list.data)
  const [mylist, setMylist] = useState([list.data])
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });

  useEffect(() => {
    setMylist(list.data)
  })


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} xxl={10}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{list.data.typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              header={<div>列表</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked("" + item.introduce) }}
                  >
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={6}>
          <Author />
          <Advert />
        </Col>
        <Footer />
      </Row>
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  // console.log("dafoieanfoaefjao   ", id)
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => {
        // console.log(res.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}


export default MyList
