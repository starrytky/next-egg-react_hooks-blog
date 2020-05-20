import React, { useState, useEffect } from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import '../static/style/components/header.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const Header = () => {

    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    // console.log("res.data.data", res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        // console.log("e.key",e.key)
        if (e.key == 0) {
            Router.push('/index')
        } else {
            Router.push("/list?id=" + e.key)
        }
    }


    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={16} lg={18} xl={14} xxl={10}>
                    <span className="header-logo">
                        <Link href={{pathname:'/index'}}>
                            <a>技术博客</a>
                        </Link>
                    </span>
                    <span className="header-text">关于前端的</span>
                </Col>
                <Col xs={0} sm={0} md={7} lg={5} xl={4} xxl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header