import React from 'react'
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
  const { add, cart, setQty, remove, clear, total } = useCart()

  const sections = [["Sandwiches", [["The Tasty Classic (Signature Hero)", "grilled chicken, melted provolone, roasted peppers, and Tasty\u2019s creamy house sauce on a toasted hero", 13], ["Italian Combo", "ham, salami, pepperoni, provolone, lettuce, tomato, oil & vinegar", 12], ["Turkey Avocado Club", "roasted turkey, avocado spread, bacon, lettuce, tomato, and mayo", 11], ["Philly Cheesesteak", "shaved steak, onions, peppers, and melted American cheese", 12], ["Buffalo Chicken Hero", "crispy chicken tossed in buffalo sauce with lettuce and blue cheese", 11], ["Caprese Sandwich", "fresh mozzarella, tomato, basil, and balsamic glaze", 9], ["Bacon Egg and Cheese", "", 8], ["Chopped Cheese", "", 8]]], ["Beverages", [["Fresh Brewed Iced Coffee", "", 5], ["Hot Coffee", "", 3], ["Apple / Orange Juice", "", 3], ["Cold Brew", "", 6], ["Bottled Water / Soda", "", 2]]], ["Snacks", [["Chocolate Muffin", "", 3], ["Chips (Assorted Flavors)", "", 2], ["Cookie (Chocolate Chip / Oatmeal)", "", 2], ["Brownie", "", 3], ["Fruit Cup", "", 4]]]]

  return (
    <div className="container py-4">
      <h1 className="tastys-title text-center mb-4">Menu</h1>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="tastys-surface p-3">
            {sections.map(([title, items]) => (
              <div key={title} className="mb-4">
                <h2 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>{title}</h2>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <tbody>
                      {items.map(([name, desc, price]) => (
                        <tr
                          key={name}
                          className="menu-item-row"
                          onClick={() => add(name, price)}
                          role="button"
                          title="Click to add to cart"
                        >
                          <td>
                            <div className="fw-bold">{name}</div>
                            {desc ? <div className="text-muted" style={{ fontSize: 13 }}>{desc}</div> : null}
                          </td>
                          <td className="text-end fw-bold" style={{ width: 90 }}>{money(price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-2" style={{ fontSize: 13, color: 'rgba(85,107,47,0.9)' }}>
                  Click any menu item to add it.
                </div>
              </div>
            ))}
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

            <p className="text-center mt-2 mb-0" style={{ fontSize: 12, color: 'rgba(85,107,47,0.85)' }}>
              Cart persists using localStorage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
