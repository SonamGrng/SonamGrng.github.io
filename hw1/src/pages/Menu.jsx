import React, { useEffect, useState } from 'react'
import { useCart } from '../state/cart'

function money(n){ return `$${Number(n).toFixed(0)}` }

function QtyControls({ name, qty, onSet }){
  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-sm" style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }} onClick={() => onSet(name, qty - 1)} aria-label={`Decrease ${name}`}>
        −
      </button>
      <input
        className="form-control form-control-sm"
        style={{ width: 70 }}
        type="number"
        min="0"
        step="1"
        value={qty}
        onChange={(e) => onSet(name, e.target.value)}
        aria-label={`Quantity for ${name}`}
      />
      <button className="btn btn-sm" style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }} onClick={() => onSet(name, qty + 1)} aria-label={`Increase ${name}`}>
        +
      </button>
    </div>
  )
}

export default function Menu(){
  const { add, cart, cartId, setQty, remove, clear, total } = useCart()
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [placing, setPlacing] = useState(false)
  const [orderMsg, setOrderMsg] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load(){
      try{
        setLoading(true)
        const res = await fetch('/api/menu')
        if (!res.ok) throw new Error('Menu could not be loaded')
        const data = await res.json()
        if (cancelled) return
        setCategories(data.categories || {})
        setErr('')
      }catch(e){
        if (cancelled) return
        setErr(String(e.message || e))
      }finally{
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  async function placeOrder(){
    setOrderMsg('')
    if (!cartId){
      setOrderMsg('Cart not ready yet. Try again in a moment.')
      return
    }
    if (Object.keys(cart).length === 0){
      setOrderMsg('Your cart is empty.')
      return
    }
    try{
      setPlacing(true)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to place order')
      await clear()
      setOrderMsg(`Order placed! Order ID: ${data.orderId}`)
    }catch(e){
      setOrderMsg(String(e.message || e))
    }finally{
      setPlacing(false)
    }
  }

  return (
    <div className="container py-4">
      <h1 className="tastys-title text-center mb-4">Menu</h1>

      {loading ? <p className="text-center text-muted">Loading menu…</p> : null}
      {err ? <p className="text-center text-danger">{err}</p> : null}

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="tastys-surface p-3">
            {categories ? Object.entries(categories).map(([title, items]) => (
              <div key={title} className="mb-4">
                <h2 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>{title}</h2>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <tbody>
                      {items.map((it) => (
                        <tr
                          key={it._id || it.name}
                          className="menu-item-row"
                          onClick={() => add(it.name, it.price)}
                          role="button"
                          title="Click to add to cart"
                        >
                          <td>
                            <div className="fw-bold">{it.name}</div>
                            {it.description ? <div className="text-muted" style={{ fontSize: 13 }}>{it.description}</div> : null}
                          </td>
                          <td className="text-end fw-bold" style={{ width: 90 }}>{money(it.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-2" style={{ fontSize: 13, color: 'rgba(85,107,47,0.9)' }}>
                  Click any menu item to add it.
                </div>
              </div>
            )) : null}
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="tastys-surface p-3">
            <h2 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>Cart</h2>

            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-muted mb-3">Your cart is empty.</p>
            ) : (
              <div className="d-flex flex-column gap-2" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                {Object.entries(cart).map(([name, item]) => (
                  <div key={name} className="cart-item p-3 d-flex justify-content-between align-items-center gap-3">
                    <div className="flex-grow-1">
                      <div className="fw-bold">{name}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>{money(item.price)} each</div>
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-end">
                      <QtyControls name={name} qty={item.qty} onSet={setQty} />
                      <button className="btn btn-sm" style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }} onClick={() => remove(name)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="fw-bold text-center mt-3 mb-2" style={{ color: 'rgb(85, 107, 47)' }}>
              Total: {money(total)}
            </p>

            <div className="d-grid">
              <button className="btn" style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }} onClick={clear}>
                Clear Cart
              </button>
            </div>

            <div className="d-grid mt-2">
              <button
                className="btn"
                style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }}
                onClick={placeOrder}
                disabled={placing}
              >
                {placing ? 'Placing Order…' : 'Place Order'}
              </button>
            </div>

            {orderMsg ? (
              <p className="text-center mt-2 mb-0" style={{ fontSize: 12 }}>
                {orderMsg}
              </p>
            ) : null}

            <p className="text-center mt-2 mb-0" style={{ fontSize: 12, color: 'rgba(85,107,47,0.85)' }}>
              Menu + cart are persisted in MongoDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
