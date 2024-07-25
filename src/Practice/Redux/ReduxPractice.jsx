import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PLUS } from './Type'
import { minusData, plusData } from './action/countAction'

const ReduxPractice = () => {
    const reducerFun = useSelector( data => data )
    console.log(reducerFun)
    const dispatch = useDispatch()
  return (
    <>
        <div className="container py-5">
            <h2 className="text-center">Redux</h2>
            <div className="pt-4 text-center">
                <h4>Count <span className='text-success'>{reducerFun.count.count}</span></h4>
                <h4>Array:  <span className='text-success'>{reducerFun.data.data.join()}</span></h4>
                <div>
                    <button className="btn btn-primary mx-2" onClick={() => dispatch(plusData())}>PLUS</button>
                    <button className="btn btn-warning mx-2" onClick={() => dispatch(minusData())}>MINUS</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReduxPractice