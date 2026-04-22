import React from 'react'
import { AllProducts } from './AllProducts'

export const Collection = () => {
  return (
    <div>

      <section className='gaming-cards2'>

        <div className="collection-content">
          <h1>Our Games Collection</h1>
          <p>
            Explore a curated collection of the most popular and exciting PC games.<br />
            From action-packed adventures to strategic challenges, discover titles that every gamer should have in their library.
          </p>
        </div>

        <AllProducts />
        
      </section>

    </div>
  )
}
