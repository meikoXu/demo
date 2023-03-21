import React,{useState, useEffect, useRef} from 'react';
import bigImg from './img/202303212.png'
import smallImg from './img/20230321.png'
import Mock from 'mockjs'
function CouponBanner(props) {

  const data = Mock.mock({
    code: '0',
    msg: 'success',
    'list|5': [{ name: '@name', age: '@integer(18, 25)'}]
})

  const MyComponent = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1440;
  
    React.useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
  
    return width < breakpoint ? <img src={smallImg}></img> : <img src={bigImg}></img>;
  }

  const Timer = () => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('24:00:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 43200);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    return (
        <div className="CouponBanner">
            <h2>{timer}</h2>
            <button onClick={onClickReset}>Reset</button>
        </div>
    )
}
  return (
    <div>
      <MyComponent />
      <Timer />
    </div>
  );
}

export default CouponBanner;