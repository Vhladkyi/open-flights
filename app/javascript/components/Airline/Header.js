import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0;
  font-size: 24px;

  img {
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-right: 5px;
    margin-bottom: -8px;
  }

`

const TotalReviews = styled.div`
  padding: 10px 0;
  font-size: 18px;
`

const TotalOutOf = styled.div`
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
`

const Header = props => {
  const {name, image_url, avg_score} = props.attributes
  const total = props.reviews.length

  return (
    <Wrapper>
      <h1>
        <img src={image_url} alt={name}/>
        {name}
      </h1>
      <div>
        <TotalReviews>
          {total} User Reviews
        </TotalReviews>
        <div className="starRating"></div>
        <TotalOutOf>{avg_score} out of 5</TotalOutOf>
      </div>
    </Wrapper>
  )
}

export default Header
