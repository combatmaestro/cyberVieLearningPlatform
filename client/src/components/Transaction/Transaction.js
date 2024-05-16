import React, { useEffect, useState } from 'react'
import Rupee from './Rupee.svg'
import { useStyles } from './TransactionsStyle'
import Logo from '../../assets/images/Logo/favicon.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@material-ui/core'
import Loader from '../Loader/Loader'
import moment from 'moment'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userRefresh } from '../../actions/userActions'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function Transaction() {
  const dispatch = useDispatch()
  document.title = 'Transactions'
  const classes = useStyles()
  const [pageLoader, setPageLoader] = useState(true)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.user)
  const history = useHistory()

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/payment/getTransactions',
    }).then((res) => {
      setOrders(res.data.data)
      setPageLoader(false)
    })
  }, [])

  const statusColor = (status) => {
    switch (status) {
      case 'success':
        return 'green-text'
        break

      case 'pending':
        return 'orange-text'
        break

      case 'failed':
        return 'red-text'
        break

      default:
        return ''
    }
  }

  const displayRazorpay = async (oid) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    setLoading(false)

    if (!res) {
      alert('Razorpay failed to load. Are you online?')
      return
    }

    var options = {
      key: 'rzp_live_4xxvndbtEpTQKN', //cybervie account
      // key: "rzp_test_KYFujV0SSpbOG8", //my account-
      name: 'Cybervie',
      currency: 'INR',
      amount: document.getElementById('amount').value * 100,
      description: 'Payment for Cybervie Training Program',
      image: { Logo },
      order_id: oid,
      retry: {
        enabled: false,
        max_count: 1,
      },
      handler: function (response) {
        dispatch(userRefresh())
        history.push({
          pathname: '/transactionStatus/success',
          state: {
            transaction_id: response.razorpay_payment_id,
            order_id: oid,
            user_id: user.data._id,
          },
        })
      },
      prefill: {
        name: user.data.name,
        email: user.data.email,
        mobile: user.data.mobile ? user.data.mobile : '',
      },
      modal: {
        ondismiss: function () {
          axios({
            method: 'DELETE',
            url: `/payment/deleteOrder?oid=${oid}`,
          }).catch((err) => console.log(err))
        },
      },
    }

    var rzp1 = new window.Razorpay(options)
    rzp1.on('payment.failed', async function (response) {
      window.location.href = `/transactionStatus/failure/${oid}`
    })

    await rzp1.open()
  }

  const createOrder = async (e) => {
    e.preventDefault()
    const amt = document.getElementById('amount').value

    try {
      setLoading(true)
      const res = await axios({
        method: 'POST',
        url: '/payment/create',
        data: {
          total: amt,
        },
      })
      await displayRazorpay(res.data.data.razorpayOrderID)
    } catch (error) {
      console.log(error.response.data.message)
      alert('Sorry payment cannot be processed right now')
      setLoading(false)
      return
    }
  }

  const getDate = (date) => {
    return moment(date).format('DD MMMM YYYY')
  }

  if (pageLoader) return <Loader />

  return (
    <>
      <div className={classes.root}>
        <h2>My Payments</h2>
        <div className={classes.paymentHolder}>
          <h4>Make Payment</h4>
          <form className='form-inline' onSubmit={createOrder}>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='basic-addon1'>
                  <img src={Rupee} />
                </span>
              </div>
              <input
                type='text'
                className='form-control'
                id='amount'
                placeholder='Enter the Amount'
                aria-label='payment ammount'
                aria-describedby='basic-addon1'
                type='number'
                min='1'
                max='500000'
                required
              />
            </div>
            <button type='submit' disabled={loading}>
              Pay Now
            </button>
          </form>
          <h4>Payment History</h4>
          {orders.length === 0 ? (
            <div>No History Available</div>
          ) : (
            <div className={classes.historyContainer}>
              <div className={classes.historyDetails}>
                <span className={classes.spanLabel}>Date of Payment</span>
                <span className={classes.spanLabel}>Razorpay ID</span>
                <span className={classes.spanLabel}>Amount Paid</span>
                <span className={classes.spanLabel}>Status</span>
              </div>

              {orders.map((order) => {
                return (
                  <div className={classes.historyDetails}>
                    <span className={classes.spanData}>
                      {getDate(order.createdAt)}
                    </span>
                    <span className={classes.spanData}>
                      {order.razorpayOrderID}
                    </span>
                    <span className={classes.spanData}>
                      {order.pricepaid} Rs
                    </span>

                    <span
                      className={`${classes.spanData} ${statusColor(
                        order.status
                      )} spanMobile`}
                    >
                      {order.status}
                    </span>
                  </div>
                )
              })}

              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </div>

      <Backdrop open={loading} style={{ zIndex: 700 }}>
        <CircularProgress style={{ color: 'white' }} />
      </Backdrop>
    </>
  )
}

export default Transaction
