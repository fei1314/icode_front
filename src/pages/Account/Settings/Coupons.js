import React, { PureComponent } from 'react'
import styles from './Coupons.less'
import { Card, Button, Icon, List,Row,Col } from 'antd';
export default class CouponCard extends PureComponent {
  render() {
    const {
      valid = true,
      data = {
        id: 2323,
        couponDescription: '折扣卷8.115折',
        validDate: '2018.08.22-2018.09.12',
        number: 23,
        amount: 8.5,
        unit: '折',
      },
    } = this.props
    let list = [{
        id: 2323,
        couponDescription: '折扣卷8.5折',
        validDate: '2018.08.22-2018.09.12',
        number: 23,
        amount: 8.5,
        unit: '折',
    },{
        id: 23231,
        couponDescription: '折扣卷8.5折',
        validDate: '2018.08.22-2018.09.12',
        number: 23,
        amount: 8.5,
        unit: '折',
    },{
        id: 23223,
        couponDescription: '折扣卷8.5折',
        validDate: '2018.08.22-2018.09.12',
        number: 23,
        amount: 8.5,
        unit: '折',
    },{
        id: 232223,
        couponDescription: '折扣卷8.5折',
        validDate: '2018.08.22-2018.09.12',
        number: 23,
        amount: 8.5,
        unit: '折',
    }]
    const amounts = data.amount.toString().split('.')
    console.log('amounts',amounts)
    return (
        <div className={styles.cardList}>
          <List
            rowKey="id"
            // loading={loading}
            grid={{ gutter: 24, lg: 2, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
               (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card}>
                    <Card.Meta
                    //   avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                    //   title={<a>{item.title}</a>}
                      description={
                        <div className={styles.parentContainer}>
                            <div className={styles.container}>
                            <div className={valid ? styles.left : styles.leftInvalid} />
                            <div className={valid ? styles.couponName : styles.couponNameInvalid}>
                                {amounts[0]}
                                <span className={styles.subName}>
                                {amounts[1] ? `.${amounts[1]}` : ''}
                                {data.unit}
                                </span>
                            </div>
                            <div className={styles.dashed} />
                                <div className={styles.right}>
                                    <div className={valid ? styles.title : styles.invalidTitle}>
                                    折扣卷{data.amount}
                                    {data.unit}
                                    </div>
                                    <div className={styles.desc}>{data.number}张</div>
                                    <div className={styles.desc}>有效时间：{data.validDate}</div>
                                </div>
                                <div className={styles.topSemicircle} />
                                <div className={styles.bottomSemicircle} />
                            </div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              ) 
            }
          />
        </div>
    )
  }
}