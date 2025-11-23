import dayjs from 'dayjs'
import axios from "axios";
import React from 'react'
import '../styles/checkout.css'
import CheckoutHeader from './CheckoutHeader'

export default function Checkout({cart}) {

  const [deliveryOptions, setDeliveryOptions] = React.useState([])
  const [paymentSummary, setPaymentSummary] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [deliveryRes, paymentRes] = await Promise.all([
          axios.get('/api/delivery-options?expand=estimatedDeliveryTime'),
          axios.get('/api/payment-summary')
        ])
        
        setDeliveryOptions(deliveryRes.data)
        setPaymentSummary(paymentRes.data)
      } catch (err) {
        setError('Failed to load checkout data. Please try again.')
        console.error('Error fetching checkout data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleDeliveryOptionChange = (productId, deliveryOptionId) => {
    // Implement delivery option change logic here
    console.log(`Change delivery option for product ${productId} to ${deliveryOptionId}`)
  }

  const handleUpdateQuantity = (productId) => {
    // Implement update quantity logic here
    console.log(`Update quantity for product ${productId}`)
  }

  const handleDeleteItem = (productId) => {
    // Implement delete item logic here
    console.log(`Delete product ${productId}`)
  }

  const handlePlaceOrder = () => {
    // Implement place order logic here
    console.log('Placing order...')
  }

  if (loading) {
    return (
      <>
        <title>Checkout</title>
        <CheckoutHeader cart={cart}/>
        <div className="checkout-page">
          <div className="loading-message">Loading checkout data...</div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <title>Checkout</title>
        <CheckoutHeader cart={cart}/>
        <div className="checkout-page">
          <div className="error-message">{error}</div>
          <button 
            className="retry-button button-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </>
    )
  }

  if (!cart || cart.length === 0) {
    return (
      <>
        <title>Checkout</title>
        <CheckoutHeader cart={cart}/>
        <div className="checkout-page">
          <div className="empty-cart-message">Your cart is empty</div>
        </div>
      </>
    )
  }

  return(
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartItem) => {
              const selectedDeliveryOption = deliveryOptions.find((option) => {
                return option.id === cartItem.deliveryOptionId
              })
              
              return(
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {selectedDeliveryOption ? 
                      dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 
                      'Select delivery option'}
                  </div>

                  <div className="cart-item-details-grid">
                    <img 
                      className="product-image"
                      src={cartItem.product.image} 
                      alt={cartItem.product.name}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        ${(cartItem.product.priceCents / 100).toFixed(2)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span 
                          className="update-quantity-link link-primary"
                          onClick={() => handleUpdateQuantity(cartItem.productId)}
                        >
                          Update
                        </span>
                        <span 
                          className="delete-quantity-link link-primary"
                          onClick={() => handleDeleteItem(cartItem.productId)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
                        let priceString = 'FREE Shipping'

                        if(deliveryOption.priceCents > 0) {
                          priceString = `$${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping`
                        }

                        return(
                          <div key={`${cartItem.productId}-${deliveryOption.id}`} className="delivery-option">
                            <input 
                              type="radio" 
                              checked={isChecked}
                              onChange={() => handleDeliveryOptionChange(cartItem.productId, deliveryOption.id)}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`} 
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="payment-summary">
            {paymentSummary ? (
              <>
                <div className="payment-summary-title">
                  Payment Summary
                </div>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    ${(paymentSummary.productCostCents / 100).toFixed(2)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    ${(paymentSummary.shippingCostCents / 100).toFixed(2)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    ${(paymentSummary.totalCostBeforeTaxCents / 100).toFixed(2)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    ${(paymentSummary.taxCents / 100).toFixed(2)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    ${(paymentSummary.totalCostCents / 100).toFixed(2)}
                  </div>
                </div>

                <button 
                  className="place-order-button button-primary"
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </button>
              </>
            ) : (
              <div className="payment-summary-error">
                Unable to load payment summary
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}