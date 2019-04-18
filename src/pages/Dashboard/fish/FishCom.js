import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';

import { enquireScreen } from 'enquire-js';
import './bullet';
import './button';
import './cannon';
import './coin';
import './common';
import './drawRect'
import './fish'
import './sprite'
import { _resources,loadImgs,a2d,rnd } from './common'
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class FishCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }
  state = {
    
  };

  componentDidMount() {
    const { dispatch } = this.props;
  //   dispatch({
  //     type:'chart/fetchParents'
  // })
    let oC=document.getElementById('c1');
    let gd=oC.getContext('2d');
    let lastFire=0;     //时间戳
    let fired=false;
    let MAX_FISH=30;
    const coinCollector={x: 106, y: 576};

    let playerScore=1000;

    const W=oC.width,H=oC.height;
    
    loadImgs(_resources, function (imgs){
      //炮台
      let tower=new Sprite(new DrawRect(_imgs.bottom, 0, 0, 756, 71));
      tower.x=400;
      tower.y=H-71/2+1;

      //炮
      let cannon=new Cannon(1);

      //炮弹
      let bullets=[];
      //鱼
      let fishs=[];
      //金币
      let coins=[];
      //分数-数字
      let scores=[];


      //分数
      for(let i=0;i<6;i++){
        let sprite=new Sprite(new DrawRect(_imgs.number, 0, 9*24, 20, 24));
        sprite.x=51+23*i;
        sprite.y=586;

        scores.push(sprite);
      }

      cannon.x=443;
      cannon.y=574;

      //炮跟着鼠标转
      oC.onmousemove=function (ev){
        let a=ev.offsetX-cannon.x;
        let b=ev.offsetY-cannon.y;

        let ang=a2d(Math.atan2(b, a))+90;

        cannon.rotation=ang;
      };

      //加号、减号
      let btnMinus=new Button(
        new DrawRect(_imgs.bottom, 135, 75, 36, 28),
        new DrawRect(_imgs.bottom, 91, 75, 36, 28)
      );
      btnMinus.x=371;
      btnMinus.y=566;

      let btnPlus=new Button(
        new DrawRect(_imgs.bottom, 47, 75, 36, 28),
        new DrawRect(_imgs.bottom, 3, 75, 36, 28)
      );
      btnPlus.x=516;
      btnPlus.y=566;

      btnMinus.onclick=function (){
        if(cannon.type>1){
          cannon.setType(cannon.type-1);
        }else{
          cannon.setType(1);
        }
      };
      btnPlus.onclick=function (){
        if(cannon.type<7){
          cannon.setType(cannon.type+1);
        }else{
          cannon.setType(7);
        }
      };

      let aBtn=[btnMinus, btnPlus];

      oC.onmousedown=function (ev){
        //按钮
        aBtn.forEach(btn=>{
          btn.down(ev.offsetX, ev.offsetY);
        });

        //炮弹
        if(Date.now()-lastFire>=1000){
          lastFire=Date.now();

          let bullet=new Bullet(cannon.type, cannon.x, cannon.y, cannon.rotation);
          bullets.push(bullet);

          playerScore-=cannon.type;

          fired=true;
        }
      };
      oC.onmouseup=function (ev){
        aBtn.forEach(btn=>{
          btn.up(ev.offsetX, ev.offsetY);
        });
      };

      function animate(){
        requestAnimationFrame(animate);
        //生成鱼
        if(rnd(1, 20)==1 && fishs.length<MAX_FISH){
          let fish=new Fish(rnd(1, 5));
          if(rnd(0,2)==0){  //左
            fish.x=-100;
            fish.rotation=90;
          }else{            //右
            fish.x=W+100;
            fish.rotation=-90;
          }
          fish.y=rnd(0, H-100);
          fishs.push(fish);
        }

        gd.clearRect(0, 0, oC.width, oC.height);

        coins=coins.filter(coin=>{
          coin.move(coinCollector.x, coinCollector.y);
          coin.nextFrame();
          coin.draw(gd);

          if(
            Math.abs(coin.x-coinCollector.x)<5 && Math.abs(coin.y-coinCollector.y)<5
          ){
            playerScore+=50;

            return false;
          }else{
            return true;
          }
        });

        tower.draw(gd);

        bullets=bullets.filter(bullet=>{
          bullet.move();
          bullet.draw(gd);

          return !bullet.outOfRect(-100, -100, W+200, H+200);
        });

        /*if(Math.random()<0.1){
          if(fishs.length>0){
            fishs[rnd(0, fishs.length)].rotating=0;
          }
        }*/

        fishs=fishs.filter(fish=>{
          /*if(typeof(fish.rotating)=='number'){
            fishs[rnd(0, fishs.length)].rotating+=5;

            if(fishs[rnd(0, fishs.length)].rotating==360){
              delete fishs[rnd(0, fishs.length)].rotating;
            }
          }

          let _r=0;
          if(fishs[rnd(0, fishs.length)].rotating){
            _r=fishs[rnd(0, fishs.length)].rotation;
            fishs[rnd(0, fishs.length)].rotation=_r+fishs[rnd(0, fishs.length)].rotating
          }*/

          fish.move();
          fish.nextFrame();
          fish.draw(gd);

          /*if(fishs[rnd(0, fishs.length)].rotating){
            fishs[rnd(0, fishs.length)].rotation=_r;
          }*/

          return !fish.outOfRect(-100, -100, W+200, H+200);
        });

        if(fired){
          ret=cannon.nextFrame();

          if(ret==true){
            fired=false;
          }
        }

        cannon.draw(gd);

        btnMinus.draw(gd);
        btnPlus.draw(gd);

        //碰撞
        fishs=fishs.filter(fish=>{
          let colled=false;
          bullets=bullets.filter(bullet=>{
            if(colled==false){
              if(fish.collTest(bullet)){
                if(Math.random()<bullet.type*10/(10+(fish.type-1)*20)){
                  colled=true;
                }

                return false;
              }else{
                return true;
              }
            }else{
              return true;
            }
          });

          if(colled==true){
            fish.isDead=true;
            fish.speed=0;

            setTimeout(function (){
              //金币
              let a=fish.x-coinCollector.x;
              let b=coinCollector.y-fish.y;

              let i=0;
              let timer=setInterval(function (){
                let coin=new Coin(1, fish.x, fish.y);

                //coin.x+=rnd(-50, 50);
                //coin.y+=rnd(-50, 50);

                coins.push(coin);

                i++;
                if(i==Math.pow(2, fish.type)){
                  clearInterval(timer);
                }
              }, 50);

              fishs=fishs.filter(item=>item!=fish);
            }, 550);

            return true;
          }else{
            return true;
          }
        });

        //分数
        str=playerScore+'';
        while(str.length<6){
          str='0'+str;
        }
        scores.forEach((score,index)=>{
          score.setDrawRect(new DrawRect(_imgs.number, 0, (9-parseInt(str[index]))*24, 20, 24));
          score.draw(gd);
        });
      }
      requestAnimationFrame(animate);
    });
  // 适配手机屏幕;
  enquireScreen((b) => {
    this.setState({ isMobile: !!b });
  });
  // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
  /* 如果不是 dva 2.0 请删除 start */
  if (location.port) {
    // 样式 build 时间在 200-300ms 之间;
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 500);
  }
  /* 如果不是 dva 2.0 请删除 end */
  }



  render() {
    const { chart, loading } = this.props;
    
    return (
      <div>
        123
        <canvas id="c1" width="800" height="600">123</canvas>
      </div>
        
    );
  }
}

export default FishCom;
