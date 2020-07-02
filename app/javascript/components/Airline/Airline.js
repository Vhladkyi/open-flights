import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Header from './Header'
import ReviewForm from '../ReviewForm'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: hidden;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`

const Airline = props => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
         .then(responce => {
           setAirline(responce.data)
           setLoaded(true)
         })
         .catch(responce => console.log(responce))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()

    setReview(Object.assign({}, review, { [e.target.name]: e.target.value } ))
    console.log('review:', review)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id

    axios.post('/api/v1/reviews', {review, airline_id})
         .then(responce => {
           const included = [...airline.included, responce.data]
           setAirline({...airline, included})
           setReview({title: '', description: '', score: 0})
         })
         .catch(responce => {})
  }

  const setRating = (score, e) => {
    e.preventDefault()

    setReview({...review, score})
  }

  return (
    <Wrapper>
      {
        loaded && 
        <>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included} 
              />
            </Main>
            <div className="reviews"></div>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline.data.attributes}
              review={review}
            />
          </Column>
        </>
      }
    </Wrapper>
  )
}

export default Airline
