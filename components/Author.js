import { Avatar,Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src=""/></div>
            <div className="author-introduction">
                这是一个个人介绍，因为一部分原因，所以希望这个要多一点字
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="qq" className="account"/>
                <Avatar size={28} icon="wechat" className="account"/>
            </div>
        </div>
    )
}

export default Author
