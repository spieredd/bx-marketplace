import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ total }) => {
    const paypal = useRef();

    useEffect(() => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Your Order Description",
                                amount: {
                                    currency_code: "USD",
                                    value: total,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
                style: {
                    layout: 'horizontal',
                    color:  'gold',
                    shape:  'rect',
                    label:  'paypal',
                    height:  25
                }
            }).render(paypal.current);
        }

        return () => {
            if (paypal.current) {
                paypal.current.innerHTML = "";
            }
        };
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default PayPalButton;
