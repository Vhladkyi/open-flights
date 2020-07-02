import React from 'react'
import styled from 'styled-components'
import Gray from './Stars/Gray'
import Hover from './Stars/Hover'
import Selected from './Stars/Selected'

const Wrapper = styled.div`
  padding: 100px 20px 20px 20px;
  height: 100vh;
  background: #000;
`

const Field = styled.div`
  border-radius: 4px;

  input {
    margin: 0 0 12px 0;
    padding: 12px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    min-height: 50px;
    width: 96%;
  }

  textarea {
    margin: 12px 0;
    padding: 12px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    width: 100%;
    min-heigth: 80px;
  }
`

const SubmitBtn = styled.button`
  margin-top: 20px;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 4px;
  width: 100%;
  font-size: 18px;
  color: #fff;
  background: #333;
  cursor: pointer;
  transition: ease-in-out 0.1s;

  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid #fff;
  }
`

const Headline = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`

const Shareline = styled.span`
  padding-top: 5px;
  display: block;
`

const RatingContainer = styled.div`
  padding: 40px 0 10px 0;
  border: 1px solid #e6e6e6;
  borger-radius: 4px;
  text-align: center;
  font-size: 18px;
  background: #fff;
`
const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;
  background: #fff;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }

  input:not(checked) ~ label:hover,
  input:not(checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
  }
`

const RatingTitle = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: bold
`

const ReviewForm = props => { 
  const ratingOptions = [5, 4, 3, 2, 1].map( (score, index) => {
      return (
        <>
          <input 
          type="radio"
          value={score}
          checked={props.review.score == score}
          name="rating"
          onChange={()=> console.log('selected:', score)}
          id={`rating-${score}`} 
          />
          <label onClick={props.setRating.bind(this, score)}></label>
        </>
      )
  })

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>
          Have an experience with {props.attributes.name}? 
          <Shareline>Share your review!</Shareline>
        </Headline>
        <Field>
          <input onChange={props.handleChange}
                 value={props.review.title} 
                 type="text" 
                 name="title" 
                 placeholder="Review Title" />
        </Field>
        <Field>
          <input onChange={props.handleChange}
                 value={props.review.description}
                 type="text"
                 name="description"
                 placeholder="Review Description" />
        </Field>
        <Field>
          <RatingContainer>
            <RatingTitle>Rate This Airline</RatingTitle>
            <RatingBox>
              {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>
        <SubmitBtn type="submit">Submit Your Review</SubmitBtn>
      </form>
    </Wrapper>
  )
}

export default ReviewForm
