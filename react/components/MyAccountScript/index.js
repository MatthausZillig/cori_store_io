import React, { useState, useEffect } from 'react';
// import './MyAccountScript.global.css';

const ScriptAccount = () => {

  const [haveOrders, setHaveOrders] = useState(false)

  const daysDifferenceBetweenDates = (date_start, date_end) => {

    if (!date_start || !date_end) return;

    if (date_start.getTime() <= date_end.getTime()) {

      const dif = Date.UTC(date_start.getYear(), date_start.getMonth(), date_start.getDate(), 0, 0, 0) - Date.UTC(date_end.getYear(), date_end.getMonth(), date_end.getDate(), 0, 0, 0);

      return Math.abs((dif / 1000 / 60 / 60 / 24));

    } else {

      return 0;

    }

  }
  const removeCancelBtn = () => {
    [...document.querySelectorAll("a")].forEach(element => {
      if (element.href.includes("cancel")) {
        element.remove();
      }
    });
  };


  const appendButton = () => {
    if (haveOrders) {
      return
    }

    setHaveOrders(true)
    const orders = document.querySelectorAll(".vtex-my-orders-app-3-x-orderCard.myo-order-card.w-100.mv7.ba.overflow-hidden.b--muted-4")

    if (orders) {
      orders.forEach(res => {
        const string = " de "
        const replace = new RegExp(string, 'g');
        const orderID = res.childNodes[0].childNodes[2].childNodes[0].textContent.replace(" ", "").split("#")[1]
        const linkTag = document.createElement("a");
        const today = new Date(Date.now())
        let orderDate = res.childNodes[0].childNodes[0].childNodes[1].textContent.replace(replace, ' ');
        orderDate = new Date(Date.parse(orderDate))

        const diff = daysDifferenceBetweenDates(orderDate, today)

        if (diff < 120) {

          linkTag.setAttribute('href', "https://sistemas.forus.cl/devoluciones/" + orderID);
          linkTag.setAttribute('target', "_blank");
          linkTag.innerHTML = "Devolución / Cambio";
          linkTag.classList.add("vtex-btn_devolucion");

          res.childNodes[1].childNodes[1].appendChild(linkTag);
        }
      })
    }
  }

  const waitForOrders = () => {
    if (!window.location.href.includes("orders")) {
      return
    }

    if (document.querySelectorAll(".vtex-my-orders-app-3-x-orderCard.myo-order-card.w-100.mv7.ba.overflow-hidden.b--muted-4").length) {
      appendButton()
    } else {
      setTimeout(() => {
        waitForOrders()
      }, 2500);
    }
  }

  const removeButton = () => {
    if (!document.querySelectorAll(".btn_devolucion") || document.querySelectorAll(".btn_devolucion").length) {
      return
    }
    document.querySelectorAll(".btn_devolucion").forEach(el => {
      el.remove()
    })
    setHaveOrders(false)
  }

  useEffect(() => {
    const ordersElement = document.querySelectorAll(".vtex-my-orders-app-3-x-orderCard.myo-order-card.w-100.mv7.ba.overflow-hidden.b--muted-4")
    ordersElement && ordersElement.length ? appendButton() : waitForOrders()

    onhashchange = (hash) => {

      removeCancelBtn();
      console.log("removed");

      if (!hash.newURL.includes("orders")) {
        removeButton()
        return
      }

      waitForOrders()
    }

    setTimeout(() => {
      removeCancelBtn();
      console.log("removed-reload");
    }, 1500);

  }, [])

  return null
}

export default ScriptAccount