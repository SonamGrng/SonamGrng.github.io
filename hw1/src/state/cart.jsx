import React, { createContext, useContext, useMemo, useReducer, useEffect, useRef, useState } from 'react'

// Persist cart in MongoDB via the backend.
// We store only the cartId in localStorage so the cart survives refreshes.
const CART_ID_KEY = 'tastys_cart_id_v1'

function clampQty(q){
  const n = Math.floor(Number(q))
  if (!Number.isFinite(n)) return 1
  return Math.max(0, n)
}

function reducer(state, action){
  switch(action.type){
    case 'ADD': {
      const { name, price } = action
      const next = { ...state }
      if (!next[name]) next[name] = { price: Number(price), qty: 1 }
      else next[name] = { ...next[name], qty: next[name].qty + 1 }
      return next
    }
    case 'SET_QTY': {
      const { name, qty } = action
      if (!state[name]) return state
      const next = { ...state }
      const q = clampQty(qty)
      if (q === 0) delete next[name]
      else next[name] = { ...next[name], qty: q }
      return next
    }
    case 'REMOVE': {
      const next = { ...state }
      delete next[action.name]
      return next
    }
    case 'CLEAR':
      return {}
    case 'LOAD':
      return action.payload || {}
    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }){
  const [cart, dispatch] = useReducer(reducer, {})
  const [cartId, setCartId] = useState(null)
  const readyRef = useRef(false)
  const saveTimerRef = useRef(null)

  // Ensure we have a cartId, then load cart from backend.
  useEffect(() => {
    let cancelled = false
    async function init(){
      try{
        const existing = localStorage.getItem(CART_ID_KEY)
        let id = existing
        if (!id){
          const created = await fetch('/api/cart', { method: 'POST' })
          if (!created.ok) throw new Error('Failed to create cart')
          const json = await created.json()
          id = json.cartId
          localStorage.setItem(CART_ID_KEY, id)
        }
        if (cancelled) return
        setCartId(id)

        // Try to load the existing cart. If it no longer exists (e.g., DB changed),
        // create a fresh cart and retry so checkout always works.
        let res = await fetch(`/api/cart/${id}`)
        if (res.status === 404){
          localStorage.removeItem(CART_ID_KEY)
          const created = await fetch('/api/cart', { method: 'POST' })
          if (!created.ok) throw new Error('Failed to create cart')
          const json = await created.json()
          id = json.cartId
          localStorage.setItem(CART_ID_KEY, id)
          if (cancelled) return
          setCartId(id)
          res = await fetch(`/api/cart/${id}`)
        }
        if (!res.ok) throw new Error('Failed to load cart')
        const data = await res.json()
        // backend returns items array; normalize into { [name]: {price, qty} }
        const next = {}
        for (const it of (data.items || [])){
          if (it && it.name && it.qty > 0){
            next[it.name] = { price: Number(it.price), qty: Number(it.qty) }
          }
        }
        dispatch({ type: 'LOAD', payload: next })
        readyRef.current = true
      }catch(e){
        console.error('Cart init failed:', e)
        // Still allow the app to run; cart will work in-memory.
        readyRef.current = true
      }
    }
    init()
    return () => { cancelled = true }
  }, [])

  // Debounced save to backend whenever cart changes.
  useEffect(() => {
    if (!readyRef.current) return
    if (!cartId) return

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      try{
        const items = Object.entries(cart).map(([name, it]) => ({
          name,
          price: Number(it.price),
          qty: Number(it.qty)
        }))
        await fetch(`/api/cart/${cartId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items })
        })
      }catch(e){
        console.error('Cart save failed:', e)
      }
    }, 250)

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [cart, cartId])

  const api = useMemo(() => ({
    cart,
    cartId,
    add: (name, price) => dispatch({ type:'ADD', name, price }),
    setQty: (name, qty) => dispatch({ type:'SET_QTY', name, qty }),
    remove: (name) => dispatch({ type:'REMOVE', name }),
    clear: async () => {
      dispatch({ type:'CLEAR' })
      try{
        if (cartId) await fetch(`/api/cart/${cartId}`, { method: 'DELETE' })
      }catch{}
    },
    total: Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0),
    count: Object.values(cart).reduce((sum, item) => sum + item.qty, 0),
  }), [cart, cartId])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart(){
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
