import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Payment({amount,setAmount}) {
    
    const [paymentStatus, setPaymentStatus] = useState(''); 

    function handlePayment() {
        if (!amount) {
            console.log("Amount is empty or undefined");
            return;
        }

        console.log("Amount:", amount);

        var options = {
            key: "rzp_test_tk6FyCpRdK9ajI",
            key_secret: "Vbo6d5nIPdYaLo13L6ffJabl",
            amount: amount * 100, 
            currency: "INR",
            name: "Exclusive",
            description: "testing",
            handler: function (response) {
                
                console.log("Payment ID:", response.razorpay_payment_id);
                setPaymentStatus('success');
            },
            prefill: {
                name: "steeven",
                email: "steevenraj.sr23@gmail.com",
                contact: "8618128693"
            },
            notes: {
                address: "Razorpay"
            },
            theme: {
                color: "#3399cc"
            }
        };

        var paymentObject = new window.Razorpay(options);

        paymentObject.on('payment.failed', function (response) {
            console.log("Payment Failed:", response.error);
            setPaymentStatus('failed');
            handleOrderCancellation(); 
        });

        paymentObject.open();
    }

    function handleOrderCancellation() {
        console.log("Order cancelled due to payment failure");
     
    }

    return (
        <>
        {!paymentStatus &&
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",marginBottom:"50px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    width: "350px",
                    height: "270px",
                    marginBottom: "10px",
                    gap: "3px",
                    padding: "10px",
                    marginLeft: "10px",
                }}
            >
                <h5 style={{ padding: "10px", paddingTop: "20px" }}>Cart Total</h5>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        borderBottom: "1px solid grey",
                        paddingBottom: "8px",
                    }}
                >
                    <h6 style={{}}>Subtotal:</h6>
                    <h6>{amount}</h6>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        borderBottom: "1px solid grey",
                        paddingBottom: "8px",
                        paddingTop: "8px",
                    }}
                >
                    <h6 style={{}}>Shipping:</h6>
                    <h6>Free Shipping</h6>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        paddingTop: "10px",
                    }}
                >
                    <h6 style={{}}>Total:</h6>
                    <h6>{amount}</h6>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#DB4444",
                        border: "none",
                        width: "220px",
                        marginLeft: "40px",
                    }}
                    onClick={handlePayment}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
     }
            {paymentStatus && (
                <div style={{ marginTop: "10px", color: paymentStatus === 'success' ? 'green' : 'red' }}>
                    {paymentStatus === 'success' ? 
                       <div style={{display:"flex",justifyContent:"center",height:"300px",alignItems:"center"}}>
                       <CheckCircleIcon  sx={{ fontSize: 40 }} style={{marginRight:"5px"}}/>
                       <h1>Order Placed</h1>
                       </div>
                    
                    : 
                    <div style={{display:"flex",justifyContent:"center",height:"300px",alignItems:"center"}}>
                    <CheckCircleIcon  sx={{ fontSize: 40 }} style={{marginRight:"5px"}}/>
                    <h1>Order Cancelled</h1>
                    </div>}
                </div>
            )}
            </>
    )
}
