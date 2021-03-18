import styled from 'styled-components';


export const HelloUser = styled.h2`
  text-align: center;
  margin-top: 30px;
  color: #000000;
  font-weight: normal;
  font-size: 65px;
  margin-bottom: 0;
`
export const Title = styled.h3`
  font-size: 60px;
  margin-top: 10px;
  text-align: center;
  font-weight: normal;
  color: ${props => props.color ?? '#646464'};
`
export const WishList = styled.div`
  background: #D7D7D7;
  width: 50%;
  margin: 0 auto;
  height: 157px;
  border-radius: 20px;
  margin-top: 71px;
  display: flex;
  position: relative;
  justify-content: space-between;
`
export const ClicableDiv = styled.div`
  position: absolute;
  width: 90%;
  height: 100%;
`
export const Close = styled.div`
  color : #FF7D7D;
  font-size: 45px;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 5px;
`

export const WishTitle = styled.h2`
  font-size: 35px;
  color: white;
  margin-left: 15px;
  margin-top: 15px;
  font-weight: normal;
  margin-bottom: 0;

`
export const Button = styled.button`
  background : #72BBFF;
  color : white;
  font-size: 30px;
  width: 260px;
  height: 46px;
  border: none;
  outline: none;
  border-radius: 20px;
  margin-top: 25px;
  transition: background,0.5s;
  margin-left: 60%;
  cursor: pointer;
  
`