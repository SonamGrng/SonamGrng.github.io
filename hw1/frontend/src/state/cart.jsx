import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react'

const CART_KEY = 'tastys_cart_v1'

function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : {}
  }catch{
    return {}
  }
}

function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)) }catch{}
}

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

  useEffect(() => {
    dispatch({ type: 'LOAD', payload: loadCart() })
  }, [])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const api = useMemo(() => ({
    cart,
    add: (name, price) => dispatch({ type:'ADD', name, price }),
    setQty: (name, qty) => dispatch({ type:'SET_QTY', name, qty }),
    remove: (name) => dispatch({ type:'REMOVE', name }),
    clear: () => dispatch({ type:'CLEAR' }),
    total: Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0),
    count: Object.values(cart).reduce((sum, item) => sum + item.qty, 0),
  }), [cart])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart(){
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
