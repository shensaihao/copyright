import React, {useState} from 'react'
import {Button} from 'antd'
import { Chart, Geom, Axis } from 'bizcharts';
import { useEffect, useRef } from 'react';


export default function StepTwo(props) {
    const timerRef = useRef();
    const [testFont, setTestFont] = useState('检测中')
    const [pageCount, setPageCount] = useState(0)
    const [max, setMax] = useState(0)
    const [data, setData] = useState([])
    const [array, setArray] = useState([0])
    const [next, setNext] = useState(false)

    useEffect(() => {
      setTimeout(() => {
        setTestFont('检测完成    检测结果：可进行版权登记')
        setNext(true)
      }, 12000);
      setMax(parseInt(array.sort().reverse()[0],10))
      console.log(array.sort())
    } ,[array,max])

    useEffect(() => {
      timerRef.current = setInterval(() => {
        if (pageCount <= 9) {
          const item = {
            works: (Math.random(0,1)*10).toString(),
            value: Math.random(0,1)*20
          }
          setPageCount(pageCount => pageCount + 1);
          setData([...data, item])
          setArray([...array, item.value])
        }
      }, 1000);
      return () => {
        setMax(parseInt(array.sort().reverse()[0],10))
        clearInterval(timerRef.current)
      }
    }, [array, data, pageCount])
  
    const handelSubmit = () => {
        props.handelStepTwoClick()
    }

    return (
        <div className="pb-30">
            <div className="flex-center">
                    <div className="step-two-top-box text-center p-y-30">
                        <div className="detecting-title">正在检测全网已备案作品</div>
                        <div className="detecting-works p-y-16">
                        已检测
                            <span className="detected-works" ref={timerRef}>
                            {
                              pageCount
                            }
                            </span>
                            个作品
                        </div>
                        <div className="detection-result">
                        {
                          testFont
                        }
                        </div>
                    </div>
            </div>
            <div className="flex-center-center">
            <div className="flex-end max-same">
                最高相似度
                <span className="max-same-number">
                  {
                    max
                  }%
                </span>
              </div>
            </div>
            <div className="flex-center mt-40">
            <Chart
                autoFit
                height={400}
                width={700}
                data={data}
                scale={{value: { min: 0, max: 100, tickCount: 3, type: 'linear',range: [0,9/10],alias: '相似度' },
                works: {type: 'linear',range: [0,10/11], alias: '作品', tickCount: data.length}
              }}
                
            >
               <Axis name="value" visible={true} 
               title
               line={{
                 style:{
                  endArrow: true,
                  stroke: '#D8DCE2'
                }}}
                grid={{
                  type: 'grid'
                }}
                label={{
                  formatter(text, item, index) {
                    if (text === '0')
                     return ''
                    else
                     return `${text}%`;
                  }
                }}
                />
                <Axis name="works" label={false} visible={true}
                title
                line={{
                  style:{
                    endArrow: true,
                    stroke: '#D8DCE2'
                  }
                }}
                grid={{
                  type: 'grid',
                  line: {
                    style :{
                      stroke: '#D8DCE2'
                    }
                  }
                }}/>
                <Geom type="line" position="works*value" color="#0054D2" />
            </Chart>
            </div>
            <div className="flex-center mt-40">
                <Button style={{width: '700px'}} type="primary" disabled={!next} onClick={handelSubmit}>下一步</Button>
            </div>
        </div>
    )
}
