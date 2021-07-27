import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'

import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const formatedData = await response.json()
    const updatedData = formatedData.products.map(product => ({
      title: product.title,
      brand: product.brand,
      id: product.id,
      imageUrl: product.image_url,
      price: product.price,
      rating: product.rating,
    }))
    this.setState({productsList: updatedData, isLoading: false})
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderProductsList()
        )}
      </>
    )
  }
}

export default AllProductsSection
